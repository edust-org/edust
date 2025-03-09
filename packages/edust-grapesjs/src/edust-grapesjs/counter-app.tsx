import { useCounter } from "./context/counter"

export const CounterApp = () => {
  const { dispatch, state } = useCounter()
  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
    </div>
  )
}
