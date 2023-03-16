import { useReducer } from "react";

export const EVENT = { ADD: "ADD_ITEM", DELETE: "DELETE_ITEM" };

function reducer(state, action) {
  if (action.type === EVENT.ADD) {
    return [...state, action.payload];
  } else if (action.type === EVENT.DELETE) {
    return state.filter((item, key) => key !== action.payload);
  }
}

function Count() {
  const [state, dispatch] = useReducer(reducer, []);

  const onSave = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    dispatch({ payload: data, type: EVENT.ADD });
    form.reset();
  };

  return (
    <div>
      <ul>
        {state.map((item, key) => (
          <li key={key}>
            {item.nom} {item.prenom}
            <button
              onClick={() => dispatch({ payload: key, type: EVENT.DELETE })}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={onSave}>
        <input name="nom" />
        <input name="prenom" />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Count;
