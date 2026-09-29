<script setup>
import { ref } from 'vue'
import { artEditChannelService, artAddChannelService } from '@/api/article.js'

 const centerDialogVisible = ref(false)
 const formRef = ref()
 const formModel = ref({
  cate_name:'',
  cate_alias:''
 })
 const rules = {
  cate_name:[
    {required: true, message: '请输入分类名称', trigger: 'blur'},
    {pattern: /^\S{1,10}$/, message: '分类名必须是1-10位的非空字符', trigger: 'blur'}
  ],
  cate_alias: [
    {required: true, message: '请输入分类别名', trigger: 'blur'},
    {pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15的英文或数字', trigger: 'blur'}
  ]
 }

 // 组件对外暴露一个open方法， 基于open带来的参数 判断是添加还是编辑
 // open ({}) => 表单无需渲染 说明是添加
 // open ({ creat_name, id, ...}) => 表单需要渲染 说明是编辑
 const open = (row) => {
  centerDialogVisible.value = true
  formModel.value = { ...row.row }
 }

 const emit = defineEmits(['success'])
 const onSubmit = async () => {
  await formRef.value.validate()
  const isExid = formModel.value.id
  if(isExid) {
    await artEditchannelService(formModel.value)
    ElMessage.success ('编辑成功')
  }else {
    await artAddChannelService(formModel.value)
    ElMessage.success ('添加成功')
  }
  centerDialogVisible.value = false
  emit('success')
 }
 // 向外暴露方法
 defineExpose({
  open
 })
 </script>

<template>
<el-dialog
    v-model="centerDialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="500"
    align-center
  >
<el-form ref="formRef" :model="formModel" :rules="rules" label-width="100px" style="margin-right: 50px;">
  <el-form-item label="分类名称" prop="cate_name">
    <el-input
    v-model="formModel.cate_name"
    placeholder="请输入分类名称"></el-input>
  </el-form-item>
   <el-form-item
   prop="cate_alias"
   label="分类别名">
    <el-input
    v-model="formModel.cate_alias"
    placeholder="请输入分类别名"></el-input>
  </el-form-item>
</el-form>
<template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
