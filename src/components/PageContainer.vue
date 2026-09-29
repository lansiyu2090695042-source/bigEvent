<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <div class="extra">
          <!-- 子组件挖坑 -->
         <slot name="extra"></slot>
        </div>
      </div>
    </template>
    <slot></slot>
   </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  box-sizing: border-box;
  min-height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
