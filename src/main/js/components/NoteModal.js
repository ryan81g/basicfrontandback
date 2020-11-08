import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import notesClient from "../utils/client";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    descInput: {
        width:'50ch',
    },
    submitButton: {
        float:"right",
        marginTop:"10px"
    }
}));

export default function TransitionsModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [noteTitle, setNoteTitle] = React.useState('');
    const [noteDescription, setNoteDescription] = React.useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackOpen(false);
    };

    const handleSubmit = async () => {

        if(noteTitle === ''){
            setSnackOpen(true)
            return;
        }
        const noteRequest = {
            title: noteTitle,
            description: noteDescription
        }
        const options = {
            method: 'POST',
            requestBody: noteRequest
        }

        try{
            const data = await notesClient(`saveNote`, options);
            props.onNoteSave(data)
            setOpen(false);
            setNoteTitle('');
            setNoteDescription('');
        }
        catch (e) {
            console.log(e)
            // send toaster message here
        }
    }

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Add Note
            </button>
            <Modal
                aria-labelledby="add-note"
                aria-describedby="Add a note to the list"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Add a Note</h2>

                        <div>
                            <TextField required  onChange={e => setNoteTitle(e.target.value)}
                                       id="note-title"
                                       label="Title"
                                       value={noteTitle} />
                        </div>
                        <div>
                            <TextField
                                id="note-description"
                                className={classes.descInput}
                                label="Content"
                                multiline
                                rows={4}
                                onChange={e => setNoteDescription(e.target.value)}
                                value={noteDescription}
                            />
                        </div>

                        <div className={classes.submitButton}>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </div>
                        <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                            <Alert onClose={handleSnackClose} severity="warning">
                                Missing a title!
                            </Alert>
                        </Snackbar>

                    </div>
                </Fade>
            </Modal>
        </div>
    );
}