import React, { createContext, useState, useEffect } from 'react';
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
const AuthContext = createContext(false);

const AuthProvider = (props:any) => {
	// user null = loading
  const [user, setUser] = useState(false);

	useEffect(() => {
		checkLogin();
	}, []);

	function checkLogin() {
    onAuthStateChanged(getAuth(), u => {
      setUser(u)
    })
	}

	return (
		<AuthContext.Provider
			value={{user}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
