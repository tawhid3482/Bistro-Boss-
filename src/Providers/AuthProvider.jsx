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
import UserAxiosPublic from "../Hooks/UserAxiosPublic";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const GoogleProvider = new GoogleAuthProvider();
  const axiosPublic = UserAxiosPublic();
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
    return signInWithPopup(auth, GoogleProvider);
  };
  const updateProfileUser = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const observe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };

        axiosPublic.post("/jwt", userInfo)
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        });
      }
       else{
        localStorage.removeItem("access-token")
      }
      
      setLoading(false);
    });
    return () => {
      return observe();
    };
  }, [axiosPublic]);
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = {
    user,
    loading,
    LoginbyEmail,
    CreateUser,
    loginbyGoogle,
    logout,
    updateProfileUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
