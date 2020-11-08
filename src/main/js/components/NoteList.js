import React from "react";
import NoteListItem from "./NoteListItem";
import List from "@material-ui/core/List";


/**
 * A listing of NoteListItem components
 */
export default class NoteList extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const notes = this.props.notes.map(note =>
            <NoteListItem key={note.id} note={note} onNoteDelete={this.props.onNoteDelete} onNoteChange={this.props.onNoteChange}/>
        );
        return (

            <List dense={true} className={'fileListing'}>
                {notes}
            </List>
        )
    }
}