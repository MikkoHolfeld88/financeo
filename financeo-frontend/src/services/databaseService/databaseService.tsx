import {db} from '../firebaseService/firebaseService';
import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";

async function getData(path: string, userUid: string) {
    try {
        const docRef = doc(db, path, userUid)
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateData(path: string, userUid: string, updateData: any) {
    try {
        await updateDoc(doc(db, path, userUid), updateData);
    } catch (error) {
        console.log(error)
    }
}

export async function addData(path: string, userUid: string, addData: any) {
    try {
        await setDoc(doc(db, path, userUid), addData);
    } catch (error) {
        console.log(error);
    }
}

export default getData;
