import React, { createContext, useState, useEffect } from 'react';
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
const AuthContext = createContext(false);

const AuthProvider = (props:any) => {
	// user null = loading
  const [user, setUser] = useState<boolean>(false);

	useEffect(() => {
		checkLogin();
	}, []);

	function checkLogin() {
    const auth = getAuth();
    onAuthStateChanged(auth, u => {
      if (u != null) {
        setUser(true)
      } else {
        setUser(false)
      }
    })
	}

	return (
		<AuthContext.Provider
			value={user}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
