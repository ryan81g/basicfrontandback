import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";


/**
 * Search bar component that takes a user input and
 * triggers filter function for the note list
 */
export default class SearchBar extends React.Component {
    render() {
        return (
            <TextField className={'search'} label="Search" id="search-bar"
                       onChange={this.props.onSearchChange}
                       InputProps={{
                           endAdornment: (<InputAdornment position="end"><SearchIcon/></InputAdornment>)
                       }}
            />
        )
    }
}