import React, { Component } from 'react';
import  NotesBody from './NotesBody';
import  TopBar from './TopBar';
import  SideBar from './SideBar';


class Main extends Component {
    constructor(props){
        super(props);
        console.log(props.data);
        var notes = props.data;
        console.log(notes);
        this.state = ({
          notes: notes,
          currentNote: {},
          openBar: true
        });

    }

    //delete note
    async deleteNote (noteID){
        
    }

    //open side bar
    openSideBar = () => {
        var bool = this.state.openBar;
        this.setState({
            openBar: !bool
        });                                                         
    }

    //add note
    addNote = () => {

    }

    //lock note
    lockNote = (noteID) => {

    }

    //toggle notes
    pickNote = (noteID) => {
        
        for(var c = 0; c < this.state.notes.length; c++){
            if(this.state.notes[c].docID === noteID){
                var cNote = this.state.notes[c];
                break;
            }
        }
        this.setState({
            currentNote: cNote
        })
        console.log(this.state.currentNote);
    }

    search = (term) => {

    }

    render(){
        console.log(this.state.notes|| 0);
        if(this.state.notes){
            return (
                <div>
                    <TopBar key={'top'} data={this.state.notes} deleteNote={this.deleteNote} addNote={this.addNote} lockNote={this.lockNote} open={this.openSideBar} search={this.search} />
                    <SideBar key={'side'} data={this.state.notes} open={this.state.openBar} toggleNote = {this.pickNote} addNote={this.addNote} deleteNote={this.deleteNote}/>
                </div>
            )
        }
        else{
            return (
                <div>
                    <h3>Data Loading... </h3>
                </div>
            )
        }
       
    }
    
}




export default Main;

