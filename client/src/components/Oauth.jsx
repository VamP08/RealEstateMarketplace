import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import {app} from '../firebase';
import {useDispatch} from 'react-redux';
import { signInSuccess } from '../redux/user/user.Slice';
import {useNavigate} from 'react-router-dom';

export default function Oauth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlegoogle = async () => {
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth,provider);
            
            const res = await fetch('/server/auth/google', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({ 
                    name: result.user.displayName, 
                    email: result.user.email, 
                    photo: result.user.photoURL 
                })
            })
            const data = await res.json();
            dispatch(signInSuccess());
            navigate('/');
        }catch (error) {
            console.log('Could not sign in with google', error);
        }
    } 
    return (
    <button onClick={handlegoogle} type='button' className='bg-red-700 text-white p-3 rounded-lg 
    uppercase hover:opacity-95'> Continue with google</button>
  )
}
