import React from 'react'
import { connect } from 'react-redux'
import { inputChange, postQuiz} from './../state/action-creators'

export function Form(props) {
  const { newQuestion, newTrueAnswer, newFalseAnswer }=props

  const onChange = evt => {
 
    const item = evt.target.id
    const value =evt.target.value
    props.inputChange({[item]:value})
  }
    

  

  const onSubmit = evt => {
    evt.preventDefault()
    props.postQuiz()
    
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={newQuestion}/>
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={newTrueAnswer}/>
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={newFalseAnswer}/>
      <button id="submitNewQuizBtn" disabled={(!newQuestion.trim().length) || (!newTrueAnswer.trim().length) || (!newFalseAnswer.trim().length )}>Submit new quiz</button>
    </form>
  )
}
const mapStateToProps=state=>{
  return {
    newQuestion:state.form.newQuestion,
    newTrueAnswer:state.form.newTrueAnswer,
    newFalseAnswer:state.form.newFalseAnswer
  }
}

export default connect(mapStateToProps, { inputChange, postQuiz })(Form)
