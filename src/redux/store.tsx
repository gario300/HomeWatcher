import { createStore, combineReducers } from 'redux';
import messageReducer from "./reducers/messageReducer"
import userReducer from './reducers/userReducers'
interface messageTypes {
  show: boolean,
  message: string,
  status: string
}
interface userTypes {
  email: string,
  uid: string
}

interface reducersTypes {
  message: messageTypes,
  user: userTypes
}

const rootReducer = combineReducers<reducersTypes>(
  { 
    message: messageReducer,
    user: userReducer
  }
);
const configureStore = () => {
  return createStore(rootReducer);
}


export default configureStore;
