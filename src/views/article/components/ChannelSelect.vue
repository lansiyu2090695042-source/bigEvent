<script setup>
import { artGetChannelService } from '@/api/article'
import { ref } from 'vue'
const props = defineProps({
  modelValue: {
    type: [Number, String],
  },
})

const emit = defineEmits(['update:modelValue'])

const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelService()
  channelList.value = res.data
}
getChannelList()
</script>

<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    style="width: 180px"
    placeholder="请选择"
  >
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    >
    </el-option>
  </el-select>
</template>
