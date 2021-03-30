import {useState} from 'react'
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github"

const CodeUI = () => {

    const [Code, setCode] = useState("");
    const [Output, setOutput] = useState("Output of Code");

    function fetchResult(sid){
        fetch( "/code/fetchResult", 
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                        },
                body: JSON.stringify({
                    sid
                })
            }
        ).then(
            (res) => res.json().then(resData =>{
                if(resData.status === 'IN-QUEUE'){
                    return fetchResult(sid);
                }
                setOutput(resData.output);
                return;
            })
        ).catch(err=> console.log(err)).catch(err=> console.log(err))
    }
    function SubmitForm(e){
        e.preventDefault();
        fetch( "/code/compile", 
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                        },
                body: JSON.stringify({
                    lang: "Python",
                    code: Code,
                    input: "",
                    save: false
                })
            }
        ).then(
            (res) => res.json().then(resData => fetchResult(resData.sid))
        ).catch(err=> console.log(err)).catch(err=> console.log(err))



    }

    return(
        <div>
            <form onSubmit={SubmitForm}>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <textarea onChange={(e)=> setCode(e.target.value)} value={Code} rows="25" cols="200">

                            </textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <textarea onChange={(e)=> setOutput(e.target.value)} value={Output} rows="10" cols="200">
                            
                            </textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="submit"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default CodeUI;