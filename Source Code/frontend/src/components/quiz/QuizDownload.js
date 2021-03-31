import { React, useEffect, useState } from "react";
import ReactExport from "react-export-excel";
import {Button} from '@material-ui/core'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function QuizDownload(props) {
    const quizId = props.match.params.quizID;
    const [quizData, setQuizData] = useState([]);
    const [subject, setSubject] = useState(null);
    useEffect( () => {
       fetch(`/quiz/getAll/${quizId}`)
        .then(data =>  data.json().then(res => {setQuizData(res);
        setSubject(res[0].quizName);
        }))
        .catch(err => console.log(err));
    },[]);
    
    return (
        <ExcelFile element={ElementToRender}>
            <ExcelSheet data={quizData} name={subject}>
                <ExcelColumn label="User ID" value="userID"/>
                <ExcelColumn label="First Name" value="firstName"/>
                <ExcelColumn label="Middle Name" value="middleName"/>
                <ExcelColumn label="Last Name" value="lastName"/>
                <ExcelColumn label="Correct" value="correct"/>
                <ExcelColumn label="Incorrect" value="incorrect"/>
                <ExcelColumn label="Started At" value="startedAt"/>
                <ExcelColumn label="Finished At" value="finishedAt"/>
            </ExcelSheet>
        </ExcelFile>
    );
}

const ElementToRender =
    <div
    style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}
    >
    <Button variant="contained" color="primary">Download Quiz Result Excel</Button>
  </div>
export default QuizDownload;