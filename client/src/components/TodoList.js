import React, { useContext } from 'react';
import TodosContext from '../context';
import axios from 'axios';

export default function TodoList() {
  const { state, dispatch } = useContext(TodosContext);
  const title =
    state.todos.length > 0 ? `${state.todos.length} Todos` : 'Nothing To Do!';

  return (
    <div className="container mx-auto max-w-md text-center font-mono">
      <h1 className="text-bold text-3xl">{title}</h1>
      <ul className="list-reset text-white p-0">
        {state.todos.map((todo) => (
          <li
            key={todo.id}
            className="bg-orange-400 border-black border-dashed border-2 my-2 py-4 flex items-center"
          >
            <span
              onClick={async () => {
                  const response = await axios.patch(`http://localhost:3001/todos/${todo.id}`, {
                      complete: !todo.complete
                  })
                  dispatch({ type: 'TOGGLE_TODO', payload: response.data })
            }}
              className={`cursor-pointer flex-1 ml-12 ${
                todo.complete && 'line-through text-gray-800'
              }`}
            >
              {todo.text}
            </span>
            <button
                onClick={() => dispatch({type:'SET_CURRENT_TODO', payload: todo})}
            >
              <img
                src="https://icon.now.sh/edit/0050c5"
                alt="Edit Icon"
                className="h-6"
              />
            </button>
            <button
               onClick={async() => {
                   console.log(todo.id)
                await axios.delete(`http://localhost:3001/todos/${todo.id}`)
                dispatch({type:'REMOVE_TODO', payload: todo})
            }}
            >
              <img
                src="https://icon.now.sh/delete/8b0000"
                alt="Delete Icon"
                className="h-6"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
