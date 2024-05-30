import { describe, it, expect } from 'vitest'
import { defineComponent, ref } from 'vue'
import computedWithControl from '../computedControl'
import { useDebouncedRef } from '../useDebouncedRef'
import { VueWrapper, mount } from '@vue/test-utils'

describe('computedControl.ts', () => {
  let count1 = 0
  let count2 = 0
  const count3 = ref(0)
  const count4 = ref(0)

  const sum = computedWithControl(
    // 响应式源
    () => [count3.value, count4.value],
    // 计算函数
    () => {
      return count1 + count2 + count3.value + count4.value
    }
  )

  const changeCount1 = () => {
    count1++
    sum.trigger()
  }
  const changeCount2 = () => {
    count2++
    sum.trigger()
  }
  const changeCount3 = () => {
    count3.value++
  }
  const changeCount4 = () => {
    count4.value++
  }

  console.log(sum.value) // 0

  it('constant', () => {
    changeCount1()
    expect(sum.value).toBe(1)
    changeCount2()
    expect(sum.value).toBe(2)
  })

  it('effect prop', () => {
    changeCount3()
    expect(sum.value).toBe(3)
    changeCount4()
    expect(sum.value).toBe(4)
  })
})

describe('useDebouncedRef.ts', async () => {
  const delay = 200
  const updatePromise = () => new Promise((res) => setTimeout(res, delay))

  const demo = defineComponent({
    setup() {
      const text = useDebouncedRef("let's", delay)
      return { text }
    },
    render() {
      return (
        <div>
          <input v-model={this.text} />
          <p>{this.text}</p>
        </div>
      )
    }
  })

  const wrapper: VueWrapper = mount(demo)
  const input = wrapper.find('input')
  const p = wrapper.find('p')
  await input.setValue('go')

  it('noEffect', async () => {
    expect(p.text()).toBe("let's")
  })

  it('updated', async () => {
    await updatePromise()
    expect(p.text()).toBe('go')
  })
})
