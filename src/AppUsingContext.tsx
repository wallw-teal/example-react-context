import { createContext, useContext, useState } from "react";
import "./App.css";

type AppContextType = {
  fruits: string[];
  addFruit: (fruit: string) => void;
  sizes: string[];
  addSize: (size: string) => void;
};

const AppContext = createContext<AppContextType>({} as AppContextType);

const AppContextWrapper = ({ children }) => {
  const [fruits, setFruits] = useState<string[]>(["apple", "banana", "orange"]);
  const [sizes, setSizes] = useState<string[]>(["small", "medium", "large"]);

  const addFruit = (fruit: string) => {
    setFruits([...fruits, fruit]);
  };

  const addSize = (size: string) => {
    setSizes([...sizes, size]);
  };

  return (
    <AppContext.Provider value={{ fruits, addFruit, sizes, addSize }}>
      {children}
    </AppContext.Provider>
  );
};

function Totals() {
  const { fruits, sizes } = useContext(AppContext);

  console.log("Totals rerendered using Context");
  return (
    <>
      <dt>Totals</dt>
      <dd>
        <ul>
          <li>Fruits: {fruits.length}</li>
          <li>Sizes: {sizes.length}</li>
          <li>Combinations: {fruits.length * sizes.length}</li>
        </ul>
      </dd>
    </>
  );
}

function Fruits() {
  const { fruits, addFruit } = useContext(AppContext);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.target;
    const fruit = form.fruit.value;
    addFruit(fruit);
  };

  console.log("Fruits rerendered using Context");
  return (
    <>
      <dt>Fruits</dt>
      <dd>
        <ul>
          {fruits.map((fruit) => (
            <li key={fruit}>{fruit}</li>
          ))}
        </ul>

        <form onSubmit={handleSubmit}>
          <input type="text" name="fruit" placeholder="Add fruit" />
          <button type="submit">Add</button>
        </form>
      </dd>
    </>
  );
}

function Sizes() {
  const { sizes, addSize } = useContext(AppContext);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.target;
    const size = form.size.value;
    addSize(size);
  };

  console.log("Sizes rerendered using Context");
  return (
    <>
      <dt>Sizes</dt>
      <dd>
        <ul>
          {sizes.map((size) => (
            <li key={size}>{size}</li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input type="text" name="size" placeholder="Add size" />
          <button type="submit">Add</button>
        </form>
      </dd>
    </>
  );
}

function AppUsingContext() {
  return (
    <>
      <h2>Using React Context</h2>
      <AppContextWrapper>
        <section>
          <Totals />
          <Fruits />
          <Sizes />
        </section>
      </AppContextWrapper>

      <ul>
        <li>Totals section needs to rerender when either section changes.</li>
        <li>
          Fruits section <em>should</em> only need to rerender when the{" "}
          <code>fruits</code> list changes.
        </li>
        <li>
          Sizes section <em>should</em> only need to rerender when the{" "}
          <code>sizes</code> list changes.
        </li>
      </ul>
    </>
  );
}

export default AppUsingContext;
