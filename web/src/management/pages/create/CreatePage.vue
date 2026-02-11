<template>
  <div class="new">
    <div class="header-wrapper">
      <nav-header :box-shadow="true" />
    </div>
    <CreateForm :selectType="selectType" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavHeader from './components/NavHeader.vue'
import CreateForm from './components/CreateForm.vue'

const selectType = ref<string>('vote')
</script>

<style lang="scss" scoped>
.new {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  
  .header-wrapper {
    width: 100%;
    flex-shrink: 0;
  }
}
@media screen and (max-height: 800px) {
  #new {
    .new-title {
      margin-bottom: 33px;
    }
    .btn-wrap {
      margin-top: -10px;
    }
  }
}
</style>
