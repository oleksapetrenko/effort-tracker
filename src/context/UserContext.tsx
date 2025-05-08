import React, { createContext, useContext, useState } from 'react';

/* eslint-disable no-unused-vars*/
interface UserContextType {
  name: string | null;
  login: (name: string) => void;
  logout: () => void;
}
/* eslint-enable no-unused-vars */

const UserContext = createContext<UserContextType>({
  name: null,
  login: () => {},
  logout: () => {}
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [name, setName] = useState<string | null>(null);

  const login = (userName: string) => setName(userName);
  const logout = () => setName(null);

  return <UserContext.Provider value={{ name, login, logout }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
