import { useLocalStorage } from '@/util';
import { createContext, useContext } from 'react';

const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useLocalStorage('taskly_user', null);

  const updateUser = (user) => {
    setUser(user);
  };

  const value = { user, updateUser };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a User Provider');
  }
  return context;
};

export { UserProvider, useUser };
