import { effectScope, EffectScope, onScopeDispose, ref, type Ref } from 'vue'

type Alias = {
  x: Ref
  y: Ref
}

function useMouse() {
  const x = ref(0)
  const y = ref(0)
  function handler(e: MouseEvent) {
    x.value = e.x
    y.value = e.y
  }
  window.addEventListener('mousemove', handler)

  onScopeDispose(() => {
    window.removeEventListener('mousemove', handler)
  })
  return { x, y }
}
function createSharedComposable(composable: any): Function {
  let subscribers = 0
  let state: any
  let scope: null | EffectScope

  const dispose = () => {
    if (scope && --subscribers <= 0) {
      scope.stop()
      state = scope = null
    }
  }
  return (...args: any): (() => Alias) => {
    subscribers++
    if (!state) {
      scope = effectScope(true)
      state = scope.run(() => composable(...args))
    }
    onScopeDispose(dispose)
    return state
  }
}

const useSharedMouse = createSharedComposable(useMouse)

export default useSharedMouse
