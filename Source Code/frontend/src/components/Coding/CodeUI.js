import {useState} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Box, Typography } from '@material-ui/core';
import Editor from "@monaco-editor/react";
import Button from '@material-ui/core/Button';


function CodeUI() {

    const [Code, setCode] = useState("");
    const [Output, setOutput] = useState("Output of Code");

    function fetchResult(sid) {
        fetch("/code/fetchResult",
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
            (res) => res.json().then(resData => {
                if (resData.status === 'IN-QUEUE') {
                    return fetchResult(sid);
                }
                setOutput(resData.output);
                return;
            })
        ).catch(err => console.log(err)).catch(err => console.log(err));
    }
    function SubmitForm(e) {
        e.preventDefault();
        fetch("/code/compile",
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
        ).catch(err => console.log(err)).catch(err => console.log(err));



    }
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    document.oncontextmenu = new Function("return false;");
    return (
        <div oncopy = 'return false' oncut = 'return false'>
            <form onSubmit={SubmitForm}>
                <table>
                    <tbody>
                        <tr>
                            <Typography style={{ marginLeft: '45vw', marginTop: 10, fontWeight: 600, fontSize: 30 }}> Coding Exam</Typography>
                            
                        </tr>
                        
                        <hr/>

                        <tr>
                            <td>
                            <Box ml={4}>
                            <Typography style={{fontSize:'20px',fontWeight:'bold'}}>Question</Typography>
                                                                
                                <Editor
                                marginLeft='100px'
                                height='100vh'
                                theme='vs-dark'
                                width='75vw'
                                height='30vw'
                                fontSize = '30px'
                                options = {{"fontSize": "19",lineNumbers:'off'}}
                                />
                            </Box>
                            </td>
                        </tr>
                        <br/>

                        
                        <tr>
                            <td>
                            <Box ml={4}>
                            
                            
                            <Dropdown isOpen={dropdownOpen} toggle={toggle} style={{ marginTop: '0px', marginBottom: '5px' }}>
                                    <DropdownToggle caret style={{ background: '#03A9F4' }}>
                                                               Language
                                    </DropdownToggle>
                                    <DropdownMenu>

                                        <DropdownItem>
                                            Java
                                        </DropdownItem>
                                        <DropdownItem>
                                            Python
                                        </DropdownItem>
                                        <DropdownItem>
                                            C
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                            <Editor
                            marginLeft='100px'
                            height='100vh'
                            theme='vs-dark'
                            defaultLanguage="java"
                            width='75vw'
                            fontSize = '30px'
                            options = {{"fontSize": "19"}}
                           />
                           
                           
                           <Button variant="contained" type='submit' color="primary" style={{marginRight:'1vh',marginTop:'1vh',marginBottom:'1vh',background: '#03A9F4'}}>
                            Run
                            </Button>
                            
                            
                            <Button variant="contained" color="primary" style={{marginTop:'1vh',marginBottom:'1vh',background: '#03A9F4'}}>
                            Submit
                            </Button>
                           <br/>
                           
                           <textarea onChange={(e) => setOutput(e.target.value)} value={Output} rows="10" cols="100">

                            </textarea>
                            </Box>
                        
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
    /* return(
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
     );*/
}

export default CodeUI;