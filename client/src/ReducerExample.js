import React, { useContext, useReducer } from 'react';
import { UserContext } from './index';

const initialState = {
  count: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + 1
      };
    case 'decrement':
      return {
        count: state.count - 1
      }
    case 'reset':
      return initialState;
    default:
      return initialState;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useContext(UserContext);
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'increment'})} className="border m-1 p-1">Increment</button>
      <button onClick={() => dispatch({type: 'decrement'})} className="border m-1 p-1">Decrement</button>
      <button onClick={() => dispatch({type: 'reset'})} className="border m-1 p-1">Reset</button>
    </div>
  );
}

export default App;
