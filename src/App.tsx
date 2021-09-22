import { createContext, useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import { auth, firebase } from './services/firebase';
import {Home} from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

type User = {
  id: string;
  name: string;
  avatar: string
}

type AuthContextType = {
  user: User | undefined;
  singInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

function App() {
  const [user, setUser] = useState<User>();

  async function singInWithGoogle(){
    const provinder = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provinder)

        
      if(result.user){
        const { displayName, photoURL, uid } = result.user

        if (!displayName || !photoURL){
          throw new Error('Missing information from Google Accout')
        }
        setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
        })
      }
  }

  return(
    <BrowserRouter>
    <AuthContext.Provider value={{user, singInWithGoogle}}>
    <Route  path="/" exact component={Home}/>
    <Route  path="/rooms/new" component={NewRoom}/>
    </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App;
