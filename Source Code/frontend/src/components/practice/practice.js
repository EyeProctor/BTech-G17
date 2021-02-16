// Practicing Login

import { useState } from "react";
import { Redirect} from 'react-router-dom';

const Practice = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [redirect, setRedirect] = useState(false);
    const onSuccess = (token) => {
        console.log(token);
        setRedirect(true);
    }
    const submitForm = (e) => {
        e.preventDefault();
        fetch(
            "http://localhost:5000/login",
            {
                method: "POST",
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        email,
                        pass
                    }
                )
            }
        ).then(
            response => response.json().then( data => onSuccess(data))
        ).catch((err) => {console.error(err)});
    }
    return(
        <div>
            {redirect?<Redirect to="/quiz" />
            :
            <form onSubmit={ submitForm}>
                Email: <input value={email} onChange={(e)=> { console.log(e.target.value); setEmail(e.target.value) }} type="text" /> <br/>
                Password: <input value={pass} onChange={(e)=> {  console.log(e.target.value); setPass(e.target.value) }} type="password"/> <br/>
                <br/>
                <input type="submit" />
            </form>
            }           
            
        </div>
    );
}






export default Practice;