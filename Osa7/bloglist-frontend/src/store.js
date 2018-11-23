import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'root',
  storage
}

const reducer = combineReducers({
  notification: notificationReducer,
  users: userReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

export default () => {
  let store = createStore(
    persistedReducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    ))
  let persistor = persistStore(store)
  return { store, persistor }
}