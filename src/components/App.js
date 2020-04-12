import React from 'react';
import './App.scss';

const incIfOdd = (counter, update) => {
   if (counter % 2 !== 0) {
      update(counter + 1);
   }
}

const incAsync = (counter, update) => {
   setTimeout( () => update(counter + 1), 1000);
}

const App = ({counter = 0, update = f => f}) => (
      <div className="app">
         Clicked: {counter} times
         <button onClick={ () => update(counter + 1) }>+</button>
         <button onClick={ () => update(counter - 1) }>-</button>
         <button onClick={ () => incIfOdd(counter, update) }>increment if odd</button>
         <button onClick={ () => incAsync(counter, update) }>increment async</button>
         <button onClick={ () => update(0) }>reset</button>
      </div>
)
export default App;