import React from 'react'
import { connect } from 'react-redux'

const  Message=props=>{
  return <div id="message">{props.message}</div>
}
const mapStateToProps=state=>{
  return {
    message:state.infoMessage
  }
}
export default connect(mapStateToProps)(Message);
