import { React } from "react";
import ReactExport from "react-export-excel";
import CustomBox from '../Helper/CustomBox';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function QuizDownload(props) {
    const quizData = props.quizData;
    const subject = props.subject;
    
    console.log(quizData)
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
    <CustomBox innerText="Download Result" />
export default QuizDownload;