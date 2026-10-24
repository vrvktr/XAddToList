import React, { useState } from "react";

export default function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);

  const addItem = (event) => {
    event?.preventDefault();

    const trimmedItem = item.trim();
    if (!trimmedItem) return;

    setItems((currentItems) => [
      ...currentItems,
      { id: `${Date.now()}-${Math.random()}`, text: trimmedItem },
    ]);
    setItem("");
  };

  const removeItem = (id) => {
    setItems((currentItems) => currentItems.filter((entry) => entry.id !== id));
  };

  return (
    <main className="app-shell container-fluid d-flex align-items-center justify-content-center">
      <section className="list-card card border-0" aria-labelledby="page-title">
        <div className="card-body">
          <h1 id="page-title" className="list-title text-center">
            Add Items to List
          </h1>

          <form className="add-form d-flex gap-2" onSubmit={addItem}>
            <input
              className="form-control item-input"
              type="text"
              name="item"
              value={item}
              onChange={(event) => setItem(event.target.value)}
              placeholder="Type something and press Enter"
              aria-label="Item"
            />
            <button className="btn btn-primary add-button" type="submit">
              Add
            </button>
          </form>

          {items.length === 0 ? (
            <p className="empty-message text-center mb-0">
              No items yet. Add your first one!
            </p>
          ) : (
            <ul className="list-group item-list">
              {items.map((entry) => (
                <li
                  className="list-group-item item-row d-flex align-items-center justify-content-between"
                  key={entry.id}
                >
                  <span className="item-text">{entry.text}</span>
                  <button
                    className="btn btn-danger remove-button"
                    type="button"
                    onClick={() => removeItem(entry.id)}
                    aria-label={`Remove ${entry.text}`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
