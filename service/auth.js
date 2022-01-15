import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

class FirebaseAuth {
  constructor(firebaseApp) {
    this.auth = getAuth(firebaseApp);
  }

  signUp = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    return userCredential;
  };

  signIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    return userCredential;
  };

  userChange = (onUserChange) => {
    onAuthStateChanged(this.auth, (user) => onUserChange(user));
  };

  signout = async () => {
    return signOut(this.auth);
  };

  getIdToken = async () => {
    if (this.auth.currentUser) {
      return await this.auth.currentUser.getIdToken();
    }
  };
}

export default FirebaseAuth;
