<script setup>
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { ref } from 'vue'
import { artPublishService } from '@/api/article.js'
import { ElMessage } from 'element-plus'
const emit = defineEmits(['success'])
// 控制抽屉显示隐藏
const visibleDrawer = ref(false)

// 默认数据
const defaultForm = {
  title: '', // 标题
  cate_id: '', // 分类
  cover_img: '', // 封面图片 要是file文件
  content: '', // 内容
  state: '', // 状态}
}
// 图片上传相关逻辑
const imgUrl = ref('')
const onUploadFile = (uploadFile) => {
  // console.log(uploadFile)
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
}
// 提交逻辑
const onPublish = async (state) => {
  // 将已发布还是草稿状态存入formModel
  formModel.value.state = state
  // 当前接口需要的是formDate的对象
  // 需要将普通对象转化为 formDate对象
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  // 发请求
  if (formModel.value.id) {
    // 编辑操作
    console.log('编辑操作')
  } else {
    // 添加操作
    await artPublishService(fd)
    ElMessage.success('添加成功')
    visibleDrawer.value = false
    // 通知父组件 添加成功
    emit('success', 'add')
  }
}
// 准备数据
const formModel = ref({
  ...defaultForm,
})
// 组件对外暴露一个open方法， 基于open带来的参数 判断是添加还是编辑
// open ({}) => 表单无需渲染 说明是添加
// open ({ creat_name, id, ...}) => 表单需要渲染 说明是编辑
const editorRef = ref()
const open = (row) => {
  visibleDrawer.value = true
  if (row.id) {
    // 需要基于 row.id 发送请求 获取对应编辑的详情数据 进行回显
    // console.log('编辑回显')
  } else {
    formModel.value = { ...defaultForm } // 基于默认数据 重置form数据
    // console.log('添加')
    // 重置表单数据 图片上传img地址 和富文本编辑器内容需要手动重置
    imgUrl.value = ''
    editorRef.value.setHTML('')
  }
}
defineExpose({
  open,
})
</script>
<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select v-model="formModel.cate_id" width="100%"></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
          ref="editorRef"
            v-model:content="formModel.content"
            content-type="html"
            theme="snow"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')" type="primary">发布</el-button>
        <el-button @click="onPublish('草稿')" type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
