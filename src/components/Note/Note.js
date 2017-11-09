import React from 'react'
import './Note.css'

class Note extends React.Component{
    
    constructor(props){
        super(props)

        this.noteContent = props.noteContent
        this.noteId = props.noteId
        this.removeTodo = this.removeTodo.bind(this)
    }
    removeTodo(){
        this.props.removeNote(this.noteId)
    }
    render(){
        return(
            <div className="note fade-in">
                <span className="closebtn" onClick={()=> this.removeTodo(this.noteId)}>&times;</span>
                <p className="noteContent">{this.noteContent}</p>
            </div>
        )
    }
}



export default Note