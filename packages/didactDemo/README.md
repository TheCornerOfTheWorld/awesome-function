# MiniReact

- 数据结构

```js
type Fiber = {
  type?: string | function; // Fiber Root 不需要此类型，详见
  props: { children: DidactElement[]; [props: string]: any; };
  dom: HTMLElement | null;
  alternate: Fiber | null;
  parent?: Fiber;
  child?: Fiber;
  sibling?: Fiber;
  effectTag?: string;
  hooks?: hook[];
};
// 元组
/**
  第一个元素是类型为 T 或 undefined 的值。
  第二个元素是一个函数，接受一个类型为 T 的参数，并返回类型为 T 的值。
 */
type hook = <T>(
  initialValue?: T | (() => T)
) => [T | undefined, (value: T) => T];
```

- 入口的方法为`workLoop`、render()、setState()

- Scheduler和Reconciler在工作， 从jsx --> Element --> fiber

每一个fiber为一个最小切片，执行`performUnitOfWork`，判断是否为函数组件，标记filter.effectTag(UPDATE | PLACEMENT | DELETION)，返回下一个没有子返回兄弟，没有兄弟返回叔辈fiber

- Renderer在工作

Didact有两棵树，一棵是当前展示的DOM对应Fiber Tree，一棵是WorkInProgress Fiber Tree，当前正在构建的树，通过对应节点alternate指针连接

commit阶段了，用 WIP Fiber Tree 及其对应的 DOM Tree 来替换掉 Current Fiber Tree 及其对应的 DOM Tree

当全部执行完执行DOM替换更新删除操作

- Function Component

  useState 实现原理其实很简单：

  - 执行 setState 导致重渲染；
  - 重渲染的时候，会再次执行 Function Component 函数；
  - 执行函数时，会执行 useState，拿到最新的 state，return 的 JSX 中使用了最新的 state；
  - state 的流转过程：JSX -> Element -> Fiber -> DOM，最终视图刷新。

Function Component与Host Component 区别

- children需要通过执行函数获得，而不是直接从 props
- 没有对应的dom
