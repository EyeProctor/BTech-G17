import axios from 'axios';

export const getQuiz =  () =>(dispatch) => {
    try {
        axios.get("/quiz/getQuiz/1234").then(quizData => {
            console.log("Fetched", JSON.stringify(quizData.data))
            dispatch({type: "SET_QUIZDATA", payload: quizData.data})
        }).catch(err => console.log(err))

        
    } catch (error) {
        console.log(error)
    }
}