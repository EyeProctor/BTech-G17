import {useState} from 'react'

const CodeUI = () => {

    const [Code, setCode] = useState("");
    const [Output, setOutput] = useState("Output of Code");

    function SubmitForm(e){
        e.preventDefault();
        

        // var postData = []
        // for (var property in data) {
        // var encodedKey = encodeURIComponent(property);
        // var encodedValue = encodeURIComponent(data[property]);
        // postData.push(encodedKey + "=" + encodedValue);
        // }
        // postData = postData.join("&");

        fetch( "/code/testOutput", 
            {
                method: 'POST',
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
            (res) => res.json().then(resData => console.log(resData))
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