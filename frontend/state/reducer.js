// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux';
import { SET_QUIZ_INTO_STATE, 
         SET_SELECTED_ANSWER, 
         SET_INFO_MESSAGE, 
         INPUT_CHANGE, 
         RESET_FORM,
         MOVE_CLOCKWISE,
        MOVE_COUNTERCLOCKWISE
        } from './action-types.js'

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case MOVE_CLOCKWISE:
      if (state>4){
        return 0
      }
      return state+1
    case MOVE_COUNTERCLOCKWISE:
      if (state > 0) {
        return state - 1
      }
      return 5

    default:
      return state

  }
}




const initialQuizState = {
                          questions:[],
                          error:"",
                          loading:false
                        }
function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case 'SET_QUIZ_IS_LOADING':
      return ({
        ...state, loading: true
      })
    case SET_QUIZ_INTO_STATE:
      return ({
        ...state, loading: false, questions: action.payload
      })
    case 'SET_QUIZ_FAIL':
      return ({
        ...state, loading: false,error:action.payload
      })
    case 'RESET_QUIZ_IS_LOADING':
      return ({
        ...state, loading: false
      })
  
    default:
      return state
     
  }
}




//SET_SELECTED_ANSWER
//当点击一个选项时，得到的数据，----{ "quiz_id": "LVqUh", "answer_id": "0VEv0" }
const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case SET_SELECTED_ANSWER:
      return action.payload
    case 'RESET_SELECTED_ANSWER':
      return null
    default:
      return state

  }
}
//
//post correct answer to 'http://localhost:9000/api/quiz/answer' and get the relative message
const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case SET_INFO_MESSAGE:
      return action.payload
    default:
      return state

  }
}


//INPUT_CHANGE
//{ "question_text": "Love JS?", "true_answer_text": "yes", "false_answer_text": "nah" }
const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,...action.payload
      }
    case RESET_FORM:
      return {
        ...initialFormState
      }
    default:
      return state

  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
//RESET_FORM 