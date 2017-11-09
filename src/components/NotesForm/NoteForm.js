import React from 'react'
import './NoteForm.css'

class NoteForm extends React.Component{
    constructor(props){
        super(props)

        this.state ={
            newNoteContent:''
        }

        this.handleUserInput = this.handleUserInput.bind(this)
        this.writeNote = this.writeNote.bind(this)
    }

    handleUserInput(e){
        this.setState({newNoteContent:e.target.value})
        console.log(e.target.value)
    }

    writeNote(){
        this.props.writeNote(this.state.newNoteContent)
        console.log(`Enviado como: ${this.state.newNoteContent}`)
        this.setState({newNoteContent:''})
    }
    render(){
        return(
            <div className="formWrapper">
                <input className="noteInput" placeholder="Write a new note"
                    value={this.state.newNoteContent}
                    onChange={this.handleUserInput}
                />
                <button className="noteButton" onClick={this.writeNote}>Add note</button>
            </div>
        )
    }
}

export default NoteForm