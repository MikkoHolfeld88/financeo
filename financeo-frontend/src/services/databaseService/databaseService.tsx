import {db} from '../firebaseService/firebaseService';
import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";


// the database is structured as follows:
// database/collection/documentID/document/fields
// collectionName depends on the data e.g.: accountsAndDepots
// documentID represents the uid of the user
// document is the data itself
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
        console.log("Error at writing data to " + path + "/" + userUid);
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
        // uid needs to be added for security reasons
        // every user is only able to see his own data
        await setDoc(doc(db, path, userUid), {...addData, uid: userUid});
    } catch (error) {
        console.log("Could not add data " + addData + " to " + path + "/" + userUid);
        console.log(error);
    }
}

export default getData;
