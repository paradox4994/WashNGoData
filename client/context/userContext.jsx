import axios from 'axios';
import { createContext, useReducer } from 'react';

export const UserContext = createContext({});

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...action.payload };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};

export function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, {});

  console.log("Fron Reducer",state)

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

/*

const [user, setUser] = useState(null);
    useEffect(() => {
        if(!user){
            axios.get('/profile').then(({data}) => {
                setUser(data)
            })
        }
    },[])
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )

*/