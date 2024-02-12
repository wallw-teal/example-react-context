import "./App.css";
import { writable } from "svelte/store";
import { useReadable } from "react-use-svelte-store";

const fruitStore = writable<string[]>(["apple", "banana", "orange"]);

const addFruit = (fruit: string) => {
  fruitStore.update((list) => [...list, fruit]);
};

const sizeStore = writable<string[]>(["small", "medium", "large"]);

const addSize = (size: string) => {
  sizeStore.update((list) => [...list, size]);
};

function Totals() {
  const fruits = useReadable(fruitStore);
  const sizes = useReadable(sizeStore);

  console.log("Totals rerendered");
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
  const fruits = useReadable(fruitStore);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.target;
    const fruit = form.fruit.value;
    addFruit(fruit);
  };

  console.log("Fruits rerendered");
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
  const sizes = useReadable(sizeStore);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.target;
    const size = form.size.value;
    addSize(size);
  };

  console.log("Sizes rerendered");
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
      <h2>Using Svelte stores via React hooks</h2>
      <section>
        <Totals />
        <Fruits />
        <Sizes />
      </section>
    </>
  );
}

export default AppUsingContext;
