import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {store} from './reducers'
import App2 from './App2';

ReactDOM.render(
  <Provider store={store}>
    <App2 />
  </Provider>,
  document.getElementById('root')
);
