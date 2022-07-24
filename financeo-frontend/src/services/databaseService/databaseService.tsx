import React from 'react';
import {db} from '../firebaseService/firebaseService';
import {doc, getDoc} from "firebase/firestore";
import { addAccounts } from "../../store";
import { useDispatch } from "react-redux";

async function getData(path: string, user: string ) {
    try {
        const docRef = doc(db, path, user);
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

export default getData;