import React, { Component } from 'react'

import { fetchQuiz, selectAnswer,postAnswer } from './../state/action-creators'
import { connect } from 'react-redux';

// { "quiz_id": "fughc",
//  "question": "An ES6 module is a...",
//   "answers": [
//        { "answer_id": "lyysf", "text": "JS file" }, 
//        { "answer_id": "suvzq", "text": "Fruit fly" }
//       ] 
// }


class Quiz extends Component {
  //Selecting an answer, navigating away and back, should keep the selected answer.
  //- Navigating away and back shouldn't cause a new quiz to be fetched from the API,
  //Review how to persist state using global state with redux.
  //componentDidMount()：只要render component，componentDidMount()会自动启动，从而帮助运行fetchQuiz()
  //this.props.questions.length === 0：只要页面不刷新和提交，quiz内容不会改变
  componentDidMount(){
    if (this.props.questions.length === 0) {
      this.props.fetchQuiz();
    }
  }

  handleSelect(x,y){
    const selected = { "quiz_id": x, "answer_id": y } 
    this.props.selectAnswer(selected)

  }
  handleSubmit(){
   
    this.props.postAnswer()

  }
  
  render(){
    const { questions, loading, selectedAnswer }=this.props
    const answers = questions && questions.answers ? questions.answers : [];
    const quizId = questions.quiz_id
    return (
      <div id="wrapper">
        {
          // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
          loading ? 'Loading next quiz...': (
            <>
              <h2> {questions.question}</h2>

              <div id="quizAnswers">
                {answers.map(answer=>(
                  
                    <div key={answer.answer_id}
                   
                    className={selectedAnswer && selectedAnswer.quiz_id === quizId && selectedAnswer.answer_id === answer.answer_id ? "answer selected" : "answer"}

                    onClick={()=>this.handleSelect(quizId, answer.answer_id)}
                    >
                      {answer.text}
                      <button>
                        
                      {selectedAnswer && selectedAnswer.quiz_id === quizId && selectedAnswer.answer_id === answer.answer_id ? "SELECTED" : "SELECT"}
                      </button>
                    </div>
                
               
                
                ))}
              </div>

              <button id="submitAnswerBtn" onClick={() => this.handleSubmit()} disabled={!selectedAnswer} >Submit answer</button>
            </>
          ) 
        }
      </div>
    )
  }
}
const mapStateToProps=state=>{
  return {
    questions:state.quiz.questions,
    loading:state.quiz.loading,
    selectedAnswer:state.selectedAnswer
  }
}

export default connect(mapStateToProps, { fetchQuiz, selectAnswer, postAnswer })(Quiz);
