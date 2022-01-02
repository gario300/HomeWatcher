import { ALTER_USER_DATA } from "../constants";

interface userTypes {
  email: string;
  uid: string;
}

interface actionTypes {
  type: string | null;
  user: userTypes;
}

const initialState : userTypes = {
    email: '',
    uid: '',
}

const userReducer = ( state : userTypes = initialState, action : actionTypes   ) => {
  switch(action.type){
    case ALTER_USER_DATA :
      return action.user;
    default :
      return state
  };
}

export default userReducer
