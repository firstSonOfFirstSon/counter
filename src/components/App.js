import React from 'react';

const incIfOdd = (counter, increment) => {
   if (counter % 2 !== 0) {
      increment();
   }
}

const incAsync = (counter, increment) => {
   setTimeout(increment, 1000);
}

const App = ({counter = 0, increment = f => f, decrement = f => f}) => (
      <div className="app">
         Clicked: {counter} times
         <button onClick={increment}>+</button>
         <button onClick={decrement}>-</button>
         <button onClick={ () => incIfOdd(counter, increment) }>increment if odd</button>
         <button onClick={ () => incAsync(counter, increment) }>increment async</button>
      </div>
)
export default App;