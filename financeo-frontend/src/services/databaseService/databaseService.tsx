import {auth, db} from '../firebaseService/firebaseService';
import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";

const UserUidExtractor = () => {
    const [ user ] = useAuthState(auth);
    return user ? user.uid : 'none';
}

async function getData(path: string, userUid: string ) {
    try {
        const docRef = doc(db, path, userUid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch(error) {
        console.log(error)
    }
}

export async function updateData(path: string, userUid: string, updateValue: any){
    const docRef = doc(db, path, userUid);
    await updateDoc(docRef, updateValue);
}

export async function addData(path: string, userUid: string, addValue: any){
    await setDoc(doc(db, path, userUid), addValue);
}

export default getData;
