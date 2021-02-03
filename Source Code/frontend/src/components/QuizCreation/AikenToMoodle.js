import aikenToMoodleXML from 'aiken-to-moodlexml'

const fs = require('fs');
const path = require('path');

const xmlString = fs.readFileSync("/path/to/your/aiken/file.txt", 'utf8');

aikenToMoodleXML(aikenString, (result, error) => {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
    }
}); 