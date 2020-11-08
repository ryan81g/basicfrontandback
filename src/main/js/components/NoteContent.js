import React from "react";
import Paper from "@material-ui/core/Paper";

/**
 * Component that shows note content of selected note from list
 * Also displays the title as a tab, that can be closed
 */
export default class NoteContent extends React.Component{
    render() {
        return (
            <Paper className={'textContentPaper'}>
                <div style={{display: this.props.showNoteTitle ? "block" : "none"}}className={'fileTab'}>
                    <span className={'fileName'}> {this.props.noteTitle} <span onClick={this.props.onNoteClose}
                                                                              className={'fileNameClose'}>X</span>
                                                                        </span></div>
                <div className={'paperText'}>
                    {this.props.selectedNoteContent}
                </div>
            </Paper>
        )
    }
}