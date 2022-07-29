import {initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";

import {addDoc, collection, getDocs, getFirestore, query, where} from "firebase/firestore";
import {firebaseConfig} from "../../components/firebase"
import {listOfCollectoins} from "../../constants/collections";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const responseFromGoogle = await signInWithPopup(auth, googleProvider);
        const user = responseFromGoogle.user;
        const findUserQuery = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(findUserQuery);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }

    } catch (error: any) {
        process.env.REACT_APP_RUN_MODE === 'DEVELOP' && console.log(error);
    }
}

const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
        process.env.REACT_APP_RUN_MODE === 'DEVELOP' && console.log(error);
    }
}

const getAuthprovider = (email: string) => {
    return email.substring(
        email.indexOf("@") + 1,
        email.lastIndexOf(".")
    );
}

const registerWithEmailAndPassword = async (name: any, email: string, password: string) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: getAuthprovider(email),
            email,
            password: password
        });
    } catch (error: any) {
        process.env.REACT_APP_RUN_MODE === 'DEVELOP' && console.log(error);
    }
}

const sendPasswordReset = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (error: any) {
        process.env.REACT_APP_RUN_MODE === 'DEVELOP' && console.log(error);
    }
}

const logout = () => {
    signOut(auth);
}

export {
    auth,
    db,
    firebaseApp,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};