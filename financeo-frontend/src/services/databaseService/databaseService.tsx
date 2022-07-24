import React from 'react';
import {db} from '../firebaseService/firebaseService';
import {doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { addAccounts } from "../../store";
import { useDispatch } from "react-redux";

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

async function addData(path: string, userUid: string, addValue: any){
    await setDoc(doc(db, path, userUid), addValue);
}

export default getData;
