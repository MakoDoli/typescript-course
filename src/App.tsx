import Counter from "./components/Counter";
import Heading from "./components/Heading";
import List from "./components/List";
import { Section } from "./components/Section";
import { useState, useEffect, useCallback, useMemo } from "react";
import { CounterProvider } from "./context/CounterContext";

import { initialState } from "./context/CounterContext";
import { useCounter } from "./context/CounterContext";

interface User {
  id: number;
  username: string;
}

type fibFunc = (n: number) => number;

function App() {
  const { count, increment, decrement } = useCounter();
  const [counter, setCounter] = useState(1);
  const [users] = useState<User[] | null>(null);

  const fib: fibFunc = (n) => {
    if (n < 2) return n;

    return fib(n - 1) + fib(n - 2);
  };

  const myNum: number = count;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const result = useMemo(() => fib(myNum), [myNum]);

  useEffect(() => {
    console.log("mounting");
    console.log(`users: ${users}`);
    return () => console.log("unmounted");
  }, [users]);

  const addTwo = useCallback((): void => {
    setCounter((prev) => prev + 2);
  }, []);

  return (
    <>
      <CounterProvider count={initialState.count}>
        <>
          <Heading title="Hello world" />
          <Section title="Different title">This is my section</Section>
          <Counter setCount={setCounter}>Count is : {counter}</Counter>
          <button onClick={addTwo}>+2</button>
          <h2>from dispatch: {count}</h2>
          <button onClick={increment}>+1</button>
          <button onClick={decrement}>-1</button>
          <h2>{result}</h2>

          <List
            items={["☕ Coffee", "🍔 Burgers", "💻 Code"]}
            render={(item: string) => (
              <span className=" text-orange-400">{item}</span>
            )}
          />
        </>
      </CounterProvider>
    </>
  );
}
export default App;
