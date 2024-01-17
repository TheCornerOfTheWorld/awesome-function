// @ts-nocheck
const state = reactive({
  num: 1
})

effect(() => {
  console.log('num', state.num)
})

let count = 100

while (count--) {
  state.num++
}

// Vue只会渲染最后一次的101
