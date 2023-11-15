import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.config";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const GoogleProvider = new GoogleAuthProvider()
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const LoginbyEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const CreateUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginbyGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth,GoogleProvider);
  };
const updateProfileUser = (name,photo)=>{
  return updateProfile(auth.currentUser,{
    displayName:name, photoURL:photo
  })
}

  useEffect(() => {
    const observe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
      setLoading(false);
    });
    return () => {
      return observe();
    };
  }, []);
  const logout = ()=>{
    setLoading(true)
    return signOut(auth)
  }

  const authInfo = {
    user,
    loading,
    LoginbyEmail,
    CreateUser,
    loginbyGoogle,
    logout,
    updateProfileUser
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
