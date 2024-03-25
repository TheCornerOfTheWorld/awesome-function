# effectScope

```tsx
function effectScope(detached?: boolean): EffectScope
EffectScope {
    detached: boolean;
    constructor(detached?: boolean);
    get active(): boolean;
    run<T>(fn: () => T): T | undefined;
    stop(fromParent?: boolean): void;
}

scope = effectScope(true)
const dispose = () => console.log('处理结束调用')

scope.run(() => {
    const sum = computed(() => a + b)
    watch(
      () => x.value + y.value,
      (sum) => {
        console.log(`sum of x + y is: ${sum}`)
      }
    )
    watchEffect(() => {
        sum = x.value + y.value
    })
    onScopeDispose(dispose)
})
onScopeDispose(dispose) // 先执行该调用

```

## onScopeDispose

在当前活跃的effect作用域上注册一个处理回调函数；
这个方法可以作为可复用的组合式函数中 onUnmounted 的替代品，它并不与组件耦合，因为每一个 Vue 组件的 setup() 函数也是在一个 effect 作用域中调用的。
