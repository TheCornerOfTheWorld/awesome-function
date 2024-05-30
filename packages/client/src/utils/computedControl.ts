import type {
  ComputedGetter,
  ComputedRef,
  WatchSource,
  WritableComputedOptions,
  WritableComputedRef
} from 'vue'
import { customRef, ref, watch } from 'vue'

export interface computedWithControlRefExtra {
  // 手动调用更新
  trigger(): void
}

export interface computedRefWithControl<T> extends ComputedRef<T>, computedWithControlRefExtra {}
export interface WritableComputedRefWithControl<T>
  extends WritableComputedRef<T>,
    computedWithControlRefExtra {}

export default function computedWithControl<T, S>(
  source: WatchSource<S> | WatchSource<S>[],
  fn: ComputedGetter<T> | WritableComputedOptions<T>
) {
  let v: T = undefined!
  let track: () => void
  let trigger: () => void
  const dirty = ref(true)

  const update = () => {
    dirty.value = true
    trigger()
  }
  watch(source, update, { flush: 'sync' })

  const get = typeof fn === 'function' ? fn : fn.get
  const set = typeof fn === 'function' ? undefined : fn.set

  const result = customRef<T>((_track, _trigger) => {
    track = _track
    trigger = _trigger
    return {
      get() {
        if (dirty.value) {
          v = get()
          dirty.value = false
        }
        track()
        return v
      },
      set(v) {
        set?.(v)
      }
    }
  }) as computedRefWithControl<T>

  if (Object.isExtensible(result)) {
    result.trigger = update
  }
  return result
}
