import {db} from '../firebaseService/firebaseService';
import {addDoc, collection, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {FirebaseDatabaseError} from "firebase-admin/lib/utils/error";
import { FirebaseError } from 'firebase/app';



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
        const docRef = doc(db, path, userUid);
        await updateDoc(docRef, updateData);
    } catch (error: unknown) {
        if (error instanceof FirebaseError){
            // could not find
            addAllData(path, userUid, updateData)
        } else {
            console.log(error);
        }
    }
}

// addAllData adds all data to the database
// since data often resembles states, it gets loaded on application start
// so all the "old" data is available
// addAllData overwrites everything that is currently in the database
export async function addAllData(path: string, userUid: string, addData: any) {
    try {
        // uid needs to be added for security reasons
        // every user is only able to see his own data
        await setDoc(doc(db, path, userUid), {...addData, uid: userUid});
    } catch (error) {
        console.log("Could not add data " + addData + " to " + path + "/" + userUid);
        console.log(error);
    }
}

// addData only adds new data to determined collection in the database
export async function addData(path: string, userUid: string, addData: any) {
    try {
        await addDoc(collection(db, path),  {...addData, uid: userUid});
    } catch(error) {
        console.log("Could not add data " + addData + " to " + path + "/" + userUid);
        console.log(error);
    }
}

export default getData;
