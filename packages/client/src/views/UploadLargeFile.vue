<template>
  <Input type="file" @change="hanleInputChange" />
  <Progress :percent="percent" />
  <Button @click="start" type="primary" class="mr-2">开始</Button>
  <Button @click="pause">暂停</Button>
  <Button @click="keep">续传</Button>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { Button, Input, Progress } from 'ant-design-vue'
import axios, { type AxiosProgressEvent } from 'axios'

defineOptions({
  name: 'UploadLargeFile'
})

const file = ref<File | null>(null)
const hanleInputChange = (e: any) => {
  // 把所需上传的文件先存起来
  file.value = e.target.files[0]
}

interface IFileChunk {
  file: Blob
  size: number
  finish: boolean
  chunkName: string
  fileName: string
  index: number
}
// 存储切片
const chunkList = ref<IFileChunk[]>([])
// 用于axios请求的取消
const CancelToken = axios.CancelToken
let source = CancelToken.source()

// 每个切片的尺寸
const SIZE = 3 * 1024 * 1024
// 创建切片
const createChunks = () => {
  const fileName = file.value!.name
  const list: IFileChunk[] = []
  let s = 0
  let index = 0
  while (s < file.value!.size) {
    const fileChunk = file.value!.slice(s, s + SIZE)
    list.push({
      file: fileChunk,
      size: fileChunk.size,
      finish: false,
      chunkName: `${fileName}-${index}`,
      fileName,
      index
    })
    s += SIZE
    index++
  }
  chunkList.value = list
}

// 监听上传过程的回调
const onUploadProgress = (index: number, e: AxiosProgressEvent) => {
  const chunkItem = chunkList.value[index]
  const { loaded, total } = e
  if (loaded >= total!) {
    // 满足这个条件，代表这个切片已经上传完成
    chunkItem.finish = true
  }
}
// 上传的请求函数
const upload = async (list?: IFileChunk[]) => {
  const fileList = list ?? chunkList.value
  if (!fileList.length) return
  return Promise.all(
    fileList
      .map(({ file, fileName, index, chunkName }) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('fileName', fileName)
        formData.append('chunkName', chunkName)
        return { formData, index }
      })
      .map(({ formData, index }) =>
        axios.post('http://localhost:3000/upload', formData, {
          onUploadProgress: (e) => {
            onUploadProgress(index, e)
          },
          cancelToken: source.token
        })
      )
  )
}
// 合并的请求函数
const merge = () =>
  axios.post(
    'http://localhost:3000/merge',
    JSON.stringify({
      size: SIZE,
      fileName: file.value!.name
    }),
    {
      headers: {
        'content-type': 'application/json'
      }
    }
  )
// 开始上传
const start = async () => {
  if (!file.value) return
  const { shouldUpload } = await verify()
  if (!shouldUpload) {
    console.log('上传成功')
    return
  }
  createChunks()
  await upload()
  await merge()
}

const percent = ref(0)
// 监听切片列表的变化
watch(
  () => chunkList,
  (v) => {
    // 计算出多少个已经上传完成
    const finishChunks = v.value.filter(({ finish }) => finish)
    // 计算百分比
    percent.value = Number((finishChunks.length / v.value.length).toFixed(2)) * 100
  },
  {
    deep: true
  }
)

const pause = () => {
  source.cancel('中断上传!')
  source = CancelToken.source()
}

const verify = async () => {
  const { data } = await axios.post(
    'http://localhost:3000/verify',
    JSON.stringify({
      fileName: file.value!.name
    }),
    {
      headers: {
        'content-type': 'application/json'
      }
    }
  )
  return data
}
const keep = async () => {
  const { shouldUpload, uploadedList } = await verify()
  // shouldUpload = true 说明不用续传了
  if (!shouldUpload) return
  // 计算出哪些切片没有上传
  const uploadList = chunkList.value.filter(({ chunkName }) => !uploadedList.includes(chunkName))
  // 进行续传
  await upload(uploadList)
  await merge()
}
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
