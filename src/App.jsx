import { useState } from 'react';

function parseTags(raw) {
  return raw
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter((t) => t.length > 0);
}

function allTags(todos) {
  const set = new Set();
  todos.forEach((t) => t.tags.forEach((tag) => set.add(tag)));
  return [...set].sort();
}

function loadTodos() {
  try {
    const stored = JSON.parse(localStorage.getItem('todos') || '[]');
    return stored.map((t) => ({ tags: [], ...t }));
  } catch {
    return [];
  }
}

function saveTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

export default function App() {
  const [todos, setTodos] = useState(loadTodos);
  const [text, setText] = useState('');
  const [tagText, setTagText] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);

  function updateTodos(next) {
    setTodos(next);
    saveTodos(next);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    const tags = parseTags(tagText);
    updateTodos([...todos, { text: trimmed, done: false, tags }]);
    setText('');
    setTagText('');
  }

  function toggleDone(index) {
    const next = todos.map((t, i) =>
      i === index ? { ...t, done: !t.done } : t
    );
    updateTodos(next);
  }

  function deleteTodo(index) {
    const next = todos.filter((_, i) => i !== index);
    const tags = allTags(next);
    if (activeFilter && !tags.includes(activeFilter)) {
      setActiveFilter(null);
    }
    updateTodos(next);
  }

  function handleFilterClick(tag) {
    setActiveFilter((prev) => (prev === tag ? null : tag));
  }

  const tags = allTags(todos);
  const visible = activeFilter
    ? todos.filter((t) => t.tags.includes(activeFilter))
    : todos;

  return (
    <div className="app">
      <h1>Todo</h1>

      <form className="add-form" onSubmit={handleSubmit}>
        <div className="add-form-row">
          <input
            type="text"
            placeholder="Add a task…"
            autoComplete="off"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Add</button>
        </div>
        <input
          type="text"
          placeholder="Tags (comma-separated, optional)"
          autoComplete="off"
          value={tagText}
          onChange={(e) => setTagText(e.target.value)}
        />
      </form>

      {tags.length > 0 && (
        <div className="filter-bar">
          {tags.map((tag) => (
            <button
              key={tag}
              className={`filter-chip${activeFilter === tag ? ' active' : ''}`}
              onClick={() => handleFilterClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <ul className="list">
        {visible.map((todo) => {
          const index = todos.indexOf(todo);
          return (
            <li key={index} className={`item${todo.done ? ' done' : ''}`}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleDone(index)}
              />
              <div className="item-body">
                <span className="item-text">{todo.text}</span>
                {todo.tags.length > 0 && (
                  <div className="item-tags">
                    {todo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="tag"
                        title={`Filter by "${tag}"`}
                        onClick={() => handleFilterClick(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button
                aria-label="Delete"
                onClick={() => deleteTodo(index)}
              >
                ×
              </button>
            </li>
          );
        })}
      </ul>

      {visible.length === 0 && (
        <p className="empty">No tasks yet.</p>
      )}
    </div>
  );
}
