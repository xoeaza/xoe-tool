//1. 利用 useRef 可以规避 capture value 特性：
function MessageThread() {
  // 将赋值与取值的对象变成 useRef，而不是 useState，就可以躲过 capture value 特性，在 3 秒后得到最新的值。
  const latestMessage = useRef('');

  const showMessage = () => {
    alert('You said: ' + latestMessage.current);
  };

  const handleSendClick = () => {
    setTimeout(showMessage, 3000);
  };

  const handleMessageChange = e => {
    latestMessage.current = e.target.value;
  };
}

//2. 替代 forceUpdate
// 我们知道 useState 下标为 1 的项是用来更新数据的，而且就算数据没有变化，调用了也会刷新组件，所以我们可以把返回一个没有修改数值的 setValue，这样它的功能就仅剩下刷新组件了。
const useUpdate = () => useState(0)[1];

//3. 在 Function Component 中也可以聚合管理 State：
// 只是更新的时候，不再会自动 merge，而需要使用 ...state 语法：
function FunctionComponent() {
  const [state, setState] = useState({
    left: 0,
    top: 0,
    width: 100,
    height: 100
  });
}

setState(state => ({ ...state, left: e.pageX, top: e.pageY }));

//4. 获取上一个 props
// 通过 useEffect 在组件渲染完毕后再执行的特性，再利用 useRef 的可变特性，让 usePrevious 的返回值是 “上一次” Render 时的。
// 可见，合理运用 useEffect useRef，可以做许多事情，而且封装成 CustomHook 后使用起来仍然很方便。
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return (
    <h1>
      Now: {count}, before: {prevCount}
    </h1>
  );
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

//5. 性能注意事项
// useState 函数的参数虽然是初始值，但由于整个函数都是 Render，因此每次初始化都会被调用，如果初始值计算非常消耗时间，建议使用函数传入，这样只会执行一次：
function FunctionComponent(props) {
  const [rows, setRows] = useState(() => createRows(props.count));
}
