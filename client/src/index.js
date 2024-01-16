import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
// import reducers from './reducers'; // reducers 
// import { createStore, applyMiddleware } from 'redux'; // redux@4.1.2
// import thunk from 'redux-thunk'; // useDispatch 사용시 필요
// import promiseMiddleware from 'redux-promise' // store 사용시
import store from './store';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from 'redux-persist';
import Test from './component/test/test';

export let persistor = persistStore(store)

// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, thunk)(createStore)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <Provider store={ createStoreWithMiddleware (reducers) }>
  <Provider store={store}>
    <PersistGate loading={<Test />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
reportWebVitals();
