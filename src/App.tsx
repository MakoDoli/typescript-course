import Counter from "./components/Counter";
import Heading from "./components/Heading";
import List from "./components/List";
import { Section } from "./components/Section";
import { useState } from "react";
function App() {
  const [count, setCount] = useState(1);
  return (
    <>
      {" "}
      <Heading title="Hello world" />
      <Section title="Different title">This is my section</Section>
      <Counter setCount={setCount}>Count is : {count}</Counter>
      <List
        items={["☕ Coffee", "🍔 Burgers", "💻 Code"]}
        render={(item: string) => (
          <span className=" text-orange-400">{item}</span>
        )}
      />
    </>
  );
}
export default App;
