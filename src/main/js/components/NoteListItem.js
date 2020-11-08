import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';


const React = require('react');
import notesClient from "../utils/client";
import ListItem from "@material-ui/core/ListItem";

/**
 * Represents the individual Note entries in the note list
 * When clicked, triggers state of NoteContent component to change
 */
class NoteListItem extends React.Component{

    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this)
    }

    async handleDeleteNote(){

        const options = {
            method: 'DELETE',
        }

        try{
            const data = await notesClient(`deleteNote/${this.props.note.id}`, options);
            this.props.onNoteDelete(this.props.note.id)
        }
        catch (e) {
            console.log(e)
            // send toaster message here
        }

    }


    async handleItemClick() {

        const options = {
            method: 'GET',
        }

        try{
            const data = await notesClient(`notes/${this.props.note.id}`, options);
            this.props.onNoteChange(data.description, this.props.note.title)
        }
        catch (e) {
            console.log(e)
            // send toaster message here
        }
    }
    render() {
        return (
            <div>
                <ListItem className={'fileListItem'} divider={true}>
                    <span onClick={this.handleItemClick}>{this.props.note.title}</span>
                    <IconButton className={'listItemDelete'} aria-label="delete" onClick={this.handleDeleteNote}>
                        <DeleteIcon />
                    </IconButton>
                </ListItem>

            </div>


        )
    }
}

export default NoteListItem;