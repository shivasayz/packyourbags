import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleCheckedItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleDeleteList() {
    const remove = window.confirm("Are you sure? Want to delete?");
    if (remove) setItems([]);
  }

  return (
    <div className="container">
      <Header />
      <AddItems onAddItems={handleAddItems} />
      <Itemlist
        items={items}
        onDelete={handleDelete}
        onCheckItem={handleCheckedItem}
        onDeleteList={handleDeleteList}
      />
      <Footer items={items} />
    </div>
  );
}

function Header() {
  return (
    <div className="hero">
      <h1>Pack Your Bags 👜</h1>
    </div>
  );
}

function AddItems({ onAddItems }) {
  const [desc, setDesc] = useState("");
  const [qunt, setQunt] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!desc) return;
    const newdata = { desc, qunt, packed: false, id: Date.now() };
    onAddItems(newdata);
    setDesc("");
    setQunt(1);
  }

  return (
    <form className="addlist" onSubmit={handleSubmit}>
      <p>Add Essentials for Trip</p>
      <div className="input-group">
        <select value={qunt} onChange={(e) => setQunt(+e.target.value)}>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Add item..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

function Itemlist({ items, onDelete, onCheckItem, onDeleteList }) {
  const [sortBy, setSortby] = useState("input");

  let itemsSorted =
    sortBy === "input"
      ? items
      : items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list-items">
      <ul>
        {itemsSorted.map((item) => (
          <Item
            item={item}
            onDelete={onDelete}
            onCheckItem={onCheckItem}
            key={item.id}
          />
        ))}
      </ul>

      <div className="sticky-actions">
        <div className="actions">
          <select value={sortBy} onChange={(e) => setSortby(e.target.value)}>
            <option value="input">Sort by input order</option>
            <option value="packed">Sort by packed status</option>
          </select>
          <button onClick={onDeleteList}>Clear All</button>
        </div>
      </div>
    </div>
  );
}

function Item({ item, onDelete, onCheckItem }) {
  return (
    <li className="item-card">
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onCheckItem(item.id)}
      />
      <span className={item.packed ? "packed" : ""}>
        {item.qunt} {item.desc}
      </span>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
}

function Footer({ items }) {
  const numOfItems = items.length;
  const itemsPacked = items.filter((item) => item.packed).length;

  return (
    <footer>
      <p>
        {itemsPacked === numOfItems
          ? "All Packed! Happy & Safe journey"
          : `${numOfItems} ${numOfItems > 1 ? "Items" : "Item"} in the list, 
        ${itemsPacked} ${itemsPacked > 1 ? "Items" : "Item"} packed`}
      </p>
    </footer>
  );
}
