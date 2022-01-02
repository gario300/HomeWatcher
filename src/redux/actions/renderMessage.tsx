import { RENDER_MESSAGE } from "../constants";

interface messageTypes {
  show: boolean,
  message: string,
  status: string,
}

export const renderAndChange = ( message: messageTypes ) => {
 return {
   type: RENDER_MESSAGE,
   message: message
 }
}
