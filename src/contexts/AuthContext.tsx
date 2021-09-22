import { createContext, ReactNode, useEffect, useState } from 'react'
import { auth, firebase } from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string
}
  
type AuthContextType = {
    user: User | undefined;
    singInWithGoogle: () => Promise<void>;
}

type AuthContextProvinderProps = {
      childreen: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvinder(props: AuthContextProvinderProps){
    const [user, setUser] = useState<User>();
    useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL){
          throw new Error('Missing information from Google Accout')
        }
        setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
        })
      }
    })

    return () =>{
      unsubscribe();
    }

  }, [])

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
        <AuthContext.Provider value={{user, singInWithGoogle}}>
            {props.childreen}
        </AuthContext.Provider>
    );
}