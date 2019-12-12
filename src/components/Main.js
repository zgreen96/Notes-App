import React, { Component } from 'react';
import NotesBody from './NotesBody';
import TopBar from './TopBar';
import SideBar from './SideBar';

var API_URL = "http://localhost:8080";
API_URL = window.location.protocol + '//' + window.location.hostname

class Main extends Component {
    constructor(props) {
        super(props);
        console.log(props.data);
        var notes = props.data;
        //console.log(notes);
        this.state = ({
            notes: notes,
            openBar: true,
            currentNote: notes[0],
            filtered: notes
        });
        this.deleteNote = this.deleteNote.bind(this);
        this.openSideBar = this.openSideBar.bind(this);
        this.addNote = this.addNote.bind(this);
        this.lockNote = this.lockNote.bind(this);
        this.pickNote = this.pickNote.bind(this);
        this.search = this.search.bind(this);
        this.updateNote = this.updateNote.bind(this);
    }

    //delete note
    deleteNote() {
        var items = [];
        if (this.state.currentNote.locked === false) {

            for (var a = 0; a < this.state.notes.length; a++) {
                if (this.state.notes[a].docID !== this.state.currentNote.docID) {
                    items.push(this.state.notes[a]);
                }
            }

            var id = this.state.currentNote.docID;
            console.log(id);
            fetch(API_URL + '/deleteNote/' + id, { method: 'DELETE' })
                .then(res => {
                    if (res.ok) {
                        console.log('delete succesful');

                    }
                    else {
                        throw new Error('something went wrong')
                    }
                })
                .then(res => {
                    this.setState({
                        notes: items,
                        currentNote: items[0] || {},
                        filtered: items
                    })
                });
        }
        else {
            alert('Please select an unlocked note or unlock this one to continue')
        }
        this.forceUpdate();
    }

    //open side bar
    openSideBar = () => {
        var bool = this.state.openBar;
        this.setState({
            openBar: !bool
        });
    }

    //add note
    addNote = (title) => {
        var newNote;

        if (title) {
            newNote = {
                title: title,
                body: '',
                dateTime: Date.now(),
                locked: false,
                docID: '1234'
            }
        }
        else {
            newNote = {
                title: 'New Note',
                body: '',
                dateTime: Date.now(),
                locked: false,
                docID: '1234'
            }
        }

        var items = this.state.notes;
        items.unshift(newNote);
        fetch(API_URL + '/newNote', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNote)
        }).then(res => {
            if (res.ok) {
                console.log('newNote added');
            }
            else {
                throw new Error('something went wrong')
            }
        })
            .then(res => {
                this.setState({
                    notes: items,
                    currentNote: newNote,
                    filtered: items
                })
            })




    }

    //lock note
    lockNote = () => {
        var note = this.state.currentNote;
        var items = [];

        for (var i = 0; i < this.state.notes.length; i++) {
            if (this.state.notes[i].docID !== this.state.currentNote.docID) {
                items.push(this.state.notes[i]);
            }
        }

        if (this.state.currentNote) {
            if (this.state.currentNote.locked === false) {
                note.locked = true;
                items.unshift(note);
                fetch(API_URL + '/updateNote/' + note.docID, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(note)
                }).then(res => {
                    this.setState({
                        notes: items,
                        currentNote: note
                    })
                })
            }
            else {
                note.locked = false;
                items.unshift(note);
                fetch(API_URL + '/updateNote/' + note.docID, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(note)
                }).then(res => {
                    this.setState({
                        notes: items,
                        currentNote: note,
                        filtered: items
                    })
                })
            }
        }
    }

    //toggle notes
    pickNote = (noteID) => {
        console.log(noteID)
        var cNote;
        var notes = this.state.notes;
        for (var c = 0; c < this.state.notes.length; c++) {
            if (notes[c].docID === noteID) {
                cNote = notes[c];
                break;
            }
        }
        console.log(cNote);
        this.setState({
            currentNote: cNote
        })
    }

    //send sideBar the list of filtered items
    search = (items) => {
        this.setState({
            filtered: items
        })
    }

    //updateNote in body and sideBar
    updateNote = (note) => {
        var items = [];
        for (var i = 0; i < this.state.notes.length; i++) {
            if (this.state.notes[i].docID !== this.state.currentNote.docID) {
                items.push(this.state.notes[i]);
            }
        }
        items.unshift(note);

        fetch(API_URL + '/updateNote/' + note.docID, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note)
        }).then(res => {
            this.setState({
                notes: items,
                currentNote: note,
                filtered: items
            })
        })

    }

    render() {
        console.log(this.state.notes || 0);
        console.log(this.state.currentNote);
        var notes = this.state.notes
        if (this.state.notes) {
            return (
                <div className='root'>
                    <TopBar
                        key={'top'}
                        data={this.state.notes}
                        deleteNote={this.deleteNote}
                        addNote={this.addNote}
                        lockNote={this.lockNote}
                        open={this.openSideBar}
                        search={this.search}
                        currentNote={this.state.currentNote} />
                    <SideBar key={this.state.notes.length}
                        data={notes}
                        currentNote={this.state.currentNote}
                        open={this.state.openBar}
                        toggleNote={this.pickNote}
                        addNote={this.addNote}
                        deleteNote={this.deleteNote}
                        filtered={this.state.filtered}
                    />
                    <main className='content'>
                        <NotesBody
                            key={'body'}
                            currentNote={this.state.currentNote}
                            handleChange={this.updateNote}
                        />
                    </main>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h3>Data Loading... </h3>
                </div>
            )
        }

    }

}




export default Main;

