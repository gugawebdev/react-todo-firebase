import React, { Component } from 'react';
import './App.css';
import Note from './components/Note/Note'
import NoteForm from './components/NotesForm/NoteForm'
import {DB_CONFIG} from './config'
import firebase from 'firebase/app'
import 'firebase/database'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      notes:[]   
    }

    this.addNote = this.addNote.bind(this)
    this.removeNote = this.removeNote.bind(this)
    

    this.app = firebase.initializeApp(DB_CONFIG)
    this.database = this.app.database().ref().child('notes')


  }

  addNote(note){
    this.database.push().set({noteContent:note})
  }

  removeNote(id){
    this.database.child(id).remove()
  }

  componentWillMount(){
    const previousNotes = this.state.notes
    

    this.database.on('child_added', snap =>{
      previousNotes.push({
        id:snap.key,
        noteContent: snap.val().noteContent
      })

      this.setState({notes: previousNotes})
    })

    this.database.on('child_removed', snap => {
      for(var i=0; i < previousNotes.length; i++){
        if(previousNotes[i].id === snap.key){
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        notes: previousNotes
      })
    })
    
  }
  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          React and Firebase TODO App
        </div>

        <div className="notesBody">
              {this.state.notes.map( (note, index) => {
                return <Note key={index} noteId={note.id} noteContent={note.noteContent} removeNote={this.removeNote}/>
              })}
        </div>
        
        <div className="notesFooter">
             <NoteForm writeNote={this.addNote}/>
        </div>
      </div>
    );
  }
}

export default App;

