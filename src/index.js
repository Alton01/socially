import React from 'react';
import ReactDom from 'react-dom/client';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
//import { configureStore, applyMiddleware, compose} from 'redux'; 
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './App';
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDom.createRoot(document.getElementById('root')).render(
      <Provider store={store}> 
       <App /> 
       </Provider>
);
