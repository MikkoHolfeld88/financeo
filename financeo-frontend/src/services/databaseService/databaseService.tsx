import {db} from '../firebaseService/firebaseService';
import {collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where} from "firebase/firestore";


async function getData(path: string, userUid: string ) {
    try {
        const docs = getDocs(query(collection(db, path), where("documentId", "==", userUid)));
        console.log(docs.then((docs) => console.log(docs)));

        const docRef = doc(db, path, userUid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const q = query(collection(db, "accountsAndDepots"), where(docSnap.id, "==", userUid));

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
