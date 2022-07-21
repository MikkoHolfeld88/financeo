import React, { useState, useEffect } from 'react';
import {auth, db} from './firebaseService';
import {collection, query, where} from "firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";

const [user, loading, error] = useAuthState(auth);

export default user;