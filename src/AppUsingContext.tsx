import { createContext, useContext, useState, memo } from "react";
import "./App.css";

// Fruits Context
const FruitsContext = createContext({
  fruits: [],
  addFruit: () => {},
});

const FruitsProvider = ({ children }) => {
  const [fruits, setFruits] = useState(["apple", "banana", "orange"]);

  const addFruit = (fruit) => {
    setFruits((prevFruits) => [...prevFruits, fruit]);
  };

  return (
    <FruitsContext.Provider value={{ fruits, addFruit }}>
      {children}
    </FruitsContext.Provider>
  );
};

// Sizes Context
const SizesContext = createContext({
  sizes: [],
  addSize: () => {},
});

const SizesProvider = ({ children }) => {
  const [sizes, setSizes] = useState(["small", "medium", "large"]);

  const addSize = (size) => {
    setSizes((prevSizes) => [...prevSizes, size]);
  };

  return (
    <SizesContext.Provider value={{ sizes, addSize }}>
      {children}
    </SizesContext.Provider>
  );
};


const Totals = memo(() => {
  const { fruits } = useContext(FruitsContext);
  const { sizes } = useContext(SizesContext);

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
});

const Fruits = memo(() => {
  const { fruits, addFruit } = useContext(FruitsContext);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const fruit = evt.target.fruit.value;
    addFruit(fruit);
  };

  console.log("Fruits rerendered using Context");
  return (
    <>
      <dt>Fruits</dt>
      <dd>
        <ul>
          {fruits.map((fruit, index) => (
            <li key={index}>{fruit}</li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input type="text" name="fruit" placeholder="Add fruit" />
          <button type="submit">Add</button>
        </form>
      </dd>
    </>
  );
});

const Sizes = memo(() => {
  const { sizes, addSize } = useContext(SizesContext);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const size = evt.target.size.value;
    addSize(size);
  };

  console.log("Sizes rerendered using Context");
  return (
    <>
      <dt>Sizes</dt>
      <dd>
        <ul>
          {sizes.map((size, index) => (
            <li key={index}>{size}</li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input type="text" name="size" placeholder="Add size" />
          <button type="submit">Add</button>
        </form>
      </dd>
    </>
  );
});


function AppUsingContext() {
  return (
    <>
      <h2>Using React Context</h2>
      <FruitsProvider>
        <SizesProvider>
          <section>
            <Totals />
            <Fruits />
            <Sizes />
          </section>
        </SizesProvider>
      </FruitsProvider>
    </>
  );
}

export default AppUsingContext;
