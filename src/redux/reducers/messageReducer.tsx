import { RENDER_MESSAGE } from "../constants";

interface messageTypes {
  show: boolean;
  message: string;
  status: string;
}

interface actionTypes {
  type: string | null;
  message: messageTypes;
}

const initialState : messageTypes = {
    show: false,
    message: '',
    status: 'N',
}

const messageReducer = ( state : messageTypes = initialState, action : actionTypes   ) => {
  switch(action.type){
    case RENDER_MESSAGE :
      return action.message;
    default :
      return state
  };
}

export default messageReducer
