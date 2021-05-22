import { React } from "react";
import ReactExport from "react-export-excel";
import CustomBox from '../Helper/CustomBox';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function CodingSolutionDownload(props) {
    const codeData = props.codeData;
    const subject = props.subject;
    
    // console.log(quizData)
    return (
        <ExcelFile element={ElementToRender}>
            <ExcelSheet data={codeData} name={subject}>
                <ExcelColumn label="User ID" value="userID"/>
                <ExcelColumn label="Correct Cases" value="correctTestcases"/>
                <ExcelColumn label="total Cases" value="totalTestcases"/>
                <ExcelColumn label="Started At" value="startedAt"/>
                <ExcelColumn label="Finished At" value="finishedAt"/>
                <ExcelColumn label="Malpractice Log" value="logs"/>
            </ExcelSheet>
        </ExcelFile>
    );
}

const ElementToRender =
    <CustomBox innerText="Download Result" />
export default CodingSolutionDownload;