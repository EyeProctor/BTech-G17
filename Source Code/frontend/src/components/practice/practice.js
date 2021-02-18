// Practicing Login

import { useState } from "react";
import { Redirect} from 'react-router-dom';

const Practice = () => {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [redirect, setRedirect] = useState(false);
    const onSuccess = (token) => {
        console.log(token);
        localStorage.setItem("UserToken", token.value);
        setRedirect(true);
    }
    const submitForm = (e) => {
        e.preventDefault();
        fetch(
            "http://localhost:5000/user/login",
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
        <div>
            {redirect?<Redirect to="/home" />
            :
            <form onSubmit={ submitForm}>
                Email: <input value={email} onChange={(e)=> { console.log(e.target.value); setEmail(e.target.value) }} type="text" /> <br/>
                Password: <input value={password} onChange={(e)=> {  console.log(e.target.value); setPass(e.target.value) }} type="password"/> <br/>
                <br/>
                <input type="submit" />
            </form>
            }           
            
        </div>
    );
}






export default Practice;