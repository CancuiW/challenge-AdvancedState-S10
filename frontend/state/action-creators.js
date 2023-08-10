// ❗ You don't need to add extra action creators to achieve MVP
import axios from "axios"
import { SET_QUIZ_INTO_STATE,
         SET_SELECTED_ANSWER, 
         SET_INFO_MESSAGE, 
         INPUT_CHANGE, 
          RESET_FORM,
         MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE
} from './action-types'

// export const MOVE_CLOCKWISE = 'MOVE_CLOCKWISE'
// export const MOVE_COUNTERCLOCKWISE = 'MOVE_COUNTERCLOCKWISE'

export function moveClockwise() {
  return { type: MOVE_CLOCKWISE }
 }
export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE }
 }

export function selectAnswer(answer) {
  return { type: SET_SELECTED_ANSWER,payload:answer }
 }
export function setMessage(message) { 
  return { type: SET_INFO_MESSAGE, payload: message }
}

export function setQuiz(item) {
  return { type: SET_QUIZ_INTO_STATE ,payload:item}
 }



export function inputChange(content) {
  return { type: INPUT_CHANGE, payload: content }
 }
export function resetForm() { 
  return { type: RESET_FORM}
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    dispatch({ type: 'SET_QUIZ_IS_LOADING' })
    axios.get('http://localhost:9000/api/quiz/next')
         .then(res=>{
          //console.log(res.data)
           dispatch(setQuiz(res.data))
         })
         .catch(err=>{
           const information = `Error ${err.response.status}:${err.response.data.message}`
           dispatch({ type: 'SET_QUIZ_FAIL', payload: information })
         })
        .finally(() => {
          dispatch({ type: 'RESET_QUIZ_IS_LOADING' }); // Reset loading to false regardless of success or failure
        });


  }
}
export function postAnswer() {
  return function (dispatch,getState) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz

    const selectedAnswer = getState().selectedAnswer
    axios.post('http://localhost:9000/api/quiz/answer', selectedAnswer)
    .then(res=>{
      //console.log(res)
      dispatch({ type: 'RESET_SELECTED_ANSWER' });
      dispatch(setMessage(res.data.message))
      dispatch(fetchQuiz())
    })
    .catch(err => {
      const information = `Error ${err.response.status}:${err.response.data.message}`
      console.log(information)
    })
  }
}
export function postQuiz() {
  return function (dispatch,getState) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    const newQuiz=getState().form
    
    const postNewQuiz = { "question_text": newQuiz.newQuestion, 
                       "true_answer_text": newQuiz.newTrueAnswer,
                        "false_answer_text": newQuiz.newFalseAnswer }
    //console.log(postNewQuiz)
    axios.post('http://localhost:9000/api/quiz/new',postNewQuiz)
         .then(res=>{
          console.log(res)
           const backMessage =`Congrats: "${res.data.question}" is a great question!`
           dispatch(setMessage(backMessage))
           dispatch(resetForm())
         })
        .catch(err => {
          const information = `Error ${err.response.status}:${err.response.data.message}`
          console.log(information)
        })



  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
