// Practicing Login

import { useState } from "react";
import { Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';

const Practice = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [redirect, setRedirect] = useState(false);
    const onSuccess = (data) => {
        console.log(data);
        const {msg} = data;
        if(msg){
            alert(msg);
            return;
        }
        dispatch({type: "AUTHENTICATE", payload: data});
        setRedirect(true);
    }
    const submitForm = (e) => {
        e.preventDefault();
        fetch(
            "/user/login",
            {
                method: "POST",
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        email,
                        password,
                    }
                )
            }
        ).then(
            response => response.json().then( data => onSuccess(data))
        ).catch((err) => {console.error(err)});
    }
    return(
        <center style={{marginTop: "20%"}}>
            {redirect?<Redirect to="/home" />
            :
            <form onSubmit={ submitForm}>
                Email: <input value={email} onChange={(e)=> { console.log(e.target.value); setEmail(e.target.value) }} type="text" /> <br/>
                Password: <input value={password} onChange={(e)=> {  console.log(e.target.value); setPass(e.target.value) }} type="password"/> <br/>
                <br/>
                <input type="submit" />
            </form>
            }           
            
        </center>
    );
}






export default Practice;