import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../FirebaseConfig";
import { User as AuthUser } from "firebase/auth";
import { User, UserData } from "../utils/types";

export const signUp = async (newUser: UserData) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    newUser.email,
    newUser.password
  );
  return await updateProfile(userCredential.user, {
    displayName: newUser.name,
  });
};

export const signInService = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
};

export const logOut = async () => {
  return await signOut(auth);
};

export const updateUserProfile = async (user: Partial<User>) => {
  if (auth) {
    await updateProfile(auth.currentUser as AuthUser, {
      displayName: user.name,
    });
  }
};
