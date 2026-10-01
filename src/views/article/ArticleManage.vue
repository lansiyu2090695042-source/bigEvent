<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ChannelSelect from './components/ChannelSelect.vue'
import ArticleEdit from './components/ArticleEdit.vue'
import { artGetListService, artDelService } from '@/api/article.js'
import { formatTime } from '@/utils/format.js'

const articleList = ref([]) // 文章列表
const total = ref(0) // 总条数
const loading = ref(false)
// 定义请求参数对象
const params = ref({
  pagenum: 1, // 当前页
  pagesize: 5, // 当前生效的每页条数
  cate_id: '',
  state: '',
})

// 基于params参数 获取列表
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  total.value = res.total
  articleList.value = res.data
  loading.value = false
}
getArticleList()

// 处理分页逻辑
const onSizeChange = (size) => {
  // console.log('每页条数变化了', size)
  params.value.pagenum = 1
  params.value.pagesize = size
  // 基于每页条数和最新当前页 渲染数据
  getArticleList()
}
const onCurrentChange = (page) => {
  // console.log('页码发生变化了', page)
  // 更新当前页
  params.value.pagenum = page
  getArticleList()
}
// 搜索逻辑 => 按照最新的条件检索
const onSearch = () => {
  params.value.pagenum = 1 // 重置页面
  getArticleList()
}
// 重置逻辑 => 筛选条件清空，重新检索从第一页展示
const onReset = () => {
  params.value.pagenum = 1 // 重置页面
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}
const articleEditRef = ref()
// 添加逻辑
const onAddArticle = () => {
  articleEditRef.value.open({})
}
// 编辑逻辑
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}
// 删除逻辑
const onDelArticle = async (row) => {
  await ElMessageBox.confirm('你确定要删除吗', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
  })
  await artDelService(row.id)
  ElMessage.success('删除成功')
  getArticleList()
}
// 添加或者编辑的回调
const onSuccess = (type) => {
  if (type === 'add') {
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}
</script>
<template>
  <page-container title="文章管理">
    <!-- 父组件填坑 -->
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <ChannelSelect v-model:modelValue="params.cate_id"></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select v-model="params.state" style="width: 180px" placeholder="请选择">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table v-loading="loading" :data="articleList" style="width: 100%">
      <el-table-column label="文章标题" width="400">
        <template #default="{ row }">
          <el-link type="primary" underline="never">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 4, 5, 10]"
      layout="sizes, prev, pager, next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: center"
    />
    <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
  </page-container>
</template>

<style lang="scss" scoped></style>
