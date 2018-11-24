import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import loginReducer from './reducers/loginReducer';


const persistConfig = {
  key: 'root',
  storage
}

const reducer = combineReducers({
  notification: notificationReducer,
  users: userReducer,
  blogs: blogReducer,
  loggedInUser: loginReducer
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