import aikenToMoodleXML from 'aiken-to-moodlexml'

const fs = require('fs');
const path = require('path');

const xmlString = fs.readFileSync("C:\Users\admin\Desktop\Quiz.txt", 'utf8');

aikenToMoodleXML(aikenString, (result, error) => {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
    }
});