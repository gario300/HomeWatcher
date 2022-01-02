import { ALTER_USER_DATA } from "../constants";

interface userTypes {
  email: string,
  uid: string
}

export const alterUser = ( user: userTypes ) => {
 return {
   type: ALTER_USER_DATA,
   user: user
 }
}
