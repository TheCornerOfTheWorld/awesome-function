import { customRef } from 'vue'

export function useDebouncedRef(value: any, delay = 200) {
  let timeout: NodeJS.Timeout
  return customRef((track, trigger) => ({
    get() {
      track()
      return value
    },
    set(newValue) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        value = newValue
        trigger()
      }, delay)
    }
  }))
}
