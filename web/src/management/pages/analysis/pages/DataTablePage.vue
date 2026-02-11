<template>
  <div class="data-table-page">
    <template v-if="tableData.total">
      <div class="menus">
        <el-button type="primary" :loading="isDownloading" @click="onDownload"
          >导出数据</el-button
        >
        <el-switch
          class="desensitize-switch"
          :model-value="isShowOriginData"
          active-text="是否展示原数据"
          @input="onIsShowOriginChange"
        >
        </el-switch>
      </div>
    </template>

    <template v-if="tableData.total">
      <DataTable :main-table-loading :table-data />
      <el-pagination
        background
        layout="prev, pager, next"
        popper-class="analysis-pagination"
        :total="tableData.total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </template>
    <div v-else>
      <EmptyIndex :data="noDataConfig" />
    </div>


  </div>
</template>

<script setup>
import { reactive, toRefs, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/src/message.scss'
import EmptyIndex from '@/management/components/EmptyIndex.vue'
import { getRecycleList } from '@/management/api/analysis'
import { noDataConfig } from '@/management/config/analysisConfig'
import DataTable from '../components/DataTable.vue'
import { createDownloadTask, getDownloadTask } from '@/management/api/download'

const dataTableState = reactive({
  mainTableLoading: false,
  tableData: {
    total: 0,
    listHead: [],
    listBody: []
  },
  currentPage: 1,
  isShowOriginData: false,
  tmpIsShowOriginData: false,
  isDownloading: false
})

const { mainTableLoading, tableData, isShowOriginData, isDownloading } =
  toRefs(dataTableState)

const route = useRoute()

const formatHead = (listHead) => {
  const head = []

  listHead.forEach((headItem) => {
    head.push({
      field: headItem.field,
      title: headItem.title
    })

    if (headItem.othersCode?.length) {
      headItem.othersCode.forEach((item) => {
        head.push({
          field: item.code,
          title: `${headItem.title}-${item.option}`
        })
      })
    }
  })

  return head
}

const onIsShowOriginChange = async (data) => {
  if (dataTableState.mainTableLoading) {
    return
  }
  dataTableState.tmpIsShowOriginData = data
  await init()
  dataTableState.isShowOriginData = data
}

const handleCurrentChange = async (page) => {
  if (dataTableState.mainTableLoading) {
    return
  }
  dataTableState.currentPage = page
  await init()
}

const init = async () => {
  if (!route.params.id) {
    ElMessage.error('没有传入问卷参数~')
    return
  }
  dataTableState.mainTableLoading = true
  try {
    const res = await getRecycleList({
      page: dataTableState.currentPage,
      surveyId: route.params.id,
      isMasked: !dataTableState.tmpIsShowOriginData // 发起请求的时候，isShowOriginData还没改变，暂存了一个字段
    })

    if (res.code === 200) {
      const listHead = formatHead(res.data.listHead)
      dataTableState.tableData = { ...res.data, listHead }
      dataTableState.mainTableLoading = false
    }
  } catch (error) {
    ElMessage.error('查询回收数据失败，请重试')
  }
}
onMounted(() => {
  init()
})
const onDownload = async () => {
  if (isDownloading.value) {
    return
  }
  try {
    isDownloading.value = true
    const createRes = await createDownloadTask({
      surveyId: route.params.id,
      isMasked: false
    })
    if (createRes.code !== 200) {
      ElMessage.error('导出失败，请重试')
    }
    ElMessage.success(`下载文件计算中，可前往“下载中心”查看`)
    try {
      const taskInfo = await checkIsTaskFinished(createRes.data.taskId)
      if (taskInfo.url) {
        window.open(taskInfo.url)
        ElMessage.success('导出成功')
      }
    } catch (error) {
      ElMessage.error('导出失败，请重试')
    }
  } catch (error) {
    ElMessage.error('导出失败，请重试')
  } finally {
    isDownloading.value = false
  }
}

const checkIsTaskFinished = (taskId) => {
  return new Promise((resolve, reject) => {
    const run = () => {
      getDownloadTask(taskId).then((res) => {
        if (res.code === 200 && res.data) {
          const status = res.data.status
          if (status === 'new' || status === 'computing') {
            setTimeout(() => {
              run()
            }, 5000)
          } else {
            resolve(res.data)
          }
        } else {
          reject('导出失败')
        }
      })
    }
    run()
  })
}
</script>

<style lang="scss" scoped>
.data-table-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.download-tips {
  display: flex;
  color: #ec4e29;
}

.menus {
  margin-bottom: 20px;
}

:deep(.el-pagination) {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.data-list {
  margin-bottom: 20px;
}

.desensitize-switch {
  float: right;
}
</style>
