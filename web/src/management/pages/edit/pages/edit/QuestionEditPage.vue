<template>
  <CommonTemplate>
    <template #center>
      <PreviewPanel />
    </template>
  </CommonTemplate>
</template>
<script setup lang="ts">
import CommonTemplate from '../../components/CommonTemplate.vue'
import PreviewPanel from '../../modules/questionModule/PreviewPanel.vue'
import SetterPanel from '../../modules/questionModule/SetterPanel.vue'
</script>
<style lang="scss" scoped>
.navbar {
  border-bottom: 1px solid #e7e9eb;
}
</style>
