import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import factory from './store'
import { PersistGate } from 'redux-persist/integration/react'
import {BrowserRouter as Router } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

const {store, persistor} = factory();

const PersistGateWithRouter = withRouter(PersistGate)

ReactDOM.render(
  <Provider store={store}>
 <Router>
  <PersistGateWithRouter loading={null} persistor={persistor}>
    <App />
    </PersistGateWithRouter>
    </Router>
  </Provider>,
  document.getElementById('root'))