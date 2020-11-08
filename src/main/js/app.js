import React, {useEffect, useState} from 'react';

import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";

const ReactDOM = require('react-dom');

import notesClient from "./utils/client";
import NoteList from "./components/NoteList";
import SearchBar from "./components/SearchBar";
import NoteContent from "./components/NoteContent";
import NoteModal from "./components/NoteModal";

/**
 * Main React Application Function
 * Uses Material UI as a component framework
 *
 * Calls to the Notes API to get a list of notes from
 * the in memory db to populate the notes list. For each
 * NoteListItem that is clicked on the note list,
 * another call is made to get the contents of that note and
 * is then displayed via the NoteContent function.
 *
 * Since this is a small app, the state management functions can live in the
 * app component. For a larger project I would use a state management tool like Redux
 */

class App extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {notes: [], filteredNotes:[], selectedNoteContent: '', showNoteTitle: false, noteTitle:''};
        this.onNoteChange = this.onNoteChange.bind(this);
        this.onNoteClose = this.onNoteClose.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onNoteDelete = this.onNoteDelete.bind(this);
        this.onNoteSave = this.onNoteSave.bind(this);

    }

    // Functions for lifted state management
    onNoteChange(content, title) {
        this.setState({selectedNoteContent: content, showNoteTitle:true, noteTitle:title})
    }
    onNoteClose(){
        this.setState({selectedNoteContent:'', showNoteTitle:false, noteTitle:''})
    }
    onNoteDelete(id){
        let newNotes = this.state.notes.filter((note) => {
            return note.id !== id;
        })
        this.setState({notes:newNotes, filteredNotes: newNotes});
        this.state.filteredNotes= this.state.notes;
    }
    onNoteSave(note){
        this.setState(state=> {
            const notes = state.notes.concat(note)
            const filteredNotes = state.notes.concat(note);
            return{
                notes,
                filteredNotes
            }
        });
    }

    //Search Functionality
    onSearchChange(searchParam) {
        let searchVal = searchParam.target.value;
        let filteredNotes = this.state.notes.filter( (note) => {
            if(searchVal == null || searchVal == ''){
                return note;
            }
            else if(note.title.toLowerCase().includes(searchVal.toLowerCase())){
                return note;
            }
        });
        this.setState({filteredNotes:filteredNotes})
    }

    async componentDidMount() {

        let options = {
            method: 'GET'
        }
        try {
            const data = await notesClient('notes', options);
            console.log(data._embedded.noteList)
            this.setState({notes: data._embedded.noteList, filteredNotes: data._embedded.noteList})
        } catch (e) {
            console.log(e)
            // TODO send toaster message here to inform user of error occurrence
        }

    }


    render() {
        return (
            <Container maxWidth={'md'} className={'mainContainer'}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <SearchBar onSearchChange={this.onSearchChange}/>
                        <NoteList notes={this.state.filteredNotes} onNoteChange={this.onNoteChange}
                                  onSearchChange={this.onSearchChange} onNoteDelete={this.onNoteDelete} />
                        <br />
                        <NoteModal onNoteSave={this.onNoteSave}/>
                    </Grid>
                    <Grid item xs={9}>
                        <NoteContent onNoteClose={this.onNoteClose} showNoteTitle={this.state.showNoteTitle}
                                     noteTitle={this.state.noteTitle}
                                     selectedNoteContent={this.state.selectedNoteContent}/>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
)