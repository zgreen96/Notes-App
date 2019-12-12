import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import MenuIcon from '@material-ui/icons/MenuOpen';
import { withStyles, MuiThemeProvider, createMuiTheme, fade } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { Toolbar, Typography, Tooltip } from '@material-ui/core';

const muiTheme = createMuiTheme({
    palette: {
        primary: { main: '#d9d9d9' },
        secondary: { main: '#525252' }
    }
})

const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    appbar: {
        position: 'fixed',
        zIndex: 3,
        background: '#d9d9d9'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        position: 'relative',
    },
    buttons: {
        paddingLeft: 125,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        /*    [theme.breakpoints.up('md')]: {
                width: 200,
            },*/
    }
});

var API_URL = "http://localhost:8080";

class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;
        var notes = props.data;
        var currentNote = props.currentNote
        this.onDelete = this.onDelete.bind(this);
        this.onAddNote = this.onAddNote.bind(this);
        this.onLockNote = this.onLockNote.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.slider = this.slider.bind(this);
        this.runScript = this.runScript.bind(this);
    }

    onDelete = () => {
        this.props.deleteNote();
    }

    onAddNote = () => {
        this.props.addNote();
    }

    onLockNote = (docID) => {
        this.props.lockNote();
    }

    onSearch = (event) => {
        var term = event.target.value;
        console.log(term);
        var items = [];
        var newList = [];
        if(term !== ""){
            items = this.props.data;
            newList = items.filter(item => {
                return (item.title.toLowerCase().includes(term) || item.body.toLowerCase().includes(term));
            })
            console.log(newList);
        }
        else{
            newList = this.props.data
        }
        /*this.setState({
            filtered: newList
        })*/
        this.props.search(newList)
    }

    slider = () => {
        this.props.open();
    }

    runScript(e){
        if(e.which === 13 || e.keyCode === 13){
            this.props.addNote(e.target.value)
        }
    }


    render() {
        console.log(this.props.currentNote);
        if (this.props.currentNote.locked === false) {
            return (
                <MuiThemeProvider theme={muiTheme}>
                    <div className={this.classes.grow}>
                        <AppBar className={this.classes.appbar}>
                            <Toolbar>
                                <Typography variant='h6' color='inherit' id='title'>
                                    My Notes
                                </Typography>
                                <div className={this.classes.buttons}>
                                    <IconButton
                                        className={this.classes.menuButton}
                                        color='inherit'
                                        onClick={() => { this.slider() }}
                                    >
                                        <Tooltip title='show/hide list' arrow>
                                            <MenuIcon fontSize='large' />
                                        </Tooltip>
                                    </IconButton>
                                    <IconButton
                                        className={this.classes.menuButton}
                                        color='inherit'
                                        onClick={() => { this.onDelete() }}
                                    >

                                        <FontAwesomeIcon icon={faTrashAlt} title='Delete' />
                                    </IconButton>
                                    <IconButton
                                        className={this.classes.menuButton}
                                        color='inherit'
                                        onClick={() => { this.onAddNote() }}
                                    >

                                        <FontAwesomeIcon icon={faEdit} />
                                    </IconButton>
                                    <IconButton
                                        className={this.classes.menuButton}
                                        color='inherit'
                                        onClick={() => { this.onLockNote() }}
                                    >
                                        <FontAwesomeIcon icon={faLock} />
                                    </IconButton>
                                </div>
                                <div className={this.classes.search}>
                                    <div className={this.classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        placeholder="Search…"
                                        classes={{
                                            root: this.classes.inputRoot,
                                            input: this.classes.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                        onChange={this.onSearch}
                                        onKeyPress={this.runScript} 
                                    />
                                </div>

                            </Toolbar>
                        </AppBar>
                    </div>
                </MuiThemeProvider>
            )
        } else {
            return (
                <MuiThemeProvider theme={muiTheme}>
                    <div className={this.classes.grow}>
                        <AppBar className={this.classes.appbar}>
                            <Toolbar>
                                <Typography variant='h6' color='inherit' id='title'>
                                    My Notes
                                </Typography>
                                <div className={this.classes.buttons}>
                                    <IconButton
                                        className={this.classes.menuButton}
                                        color='inherit'
                                        onClick={() => { this.slider() }}
                                    >
                                        <MenuIcon fontSize='large' />
                                    </IconButton>
                                    <IconButton
                                        className={this.classes.menuButton}
                                        color='inherit'
                                        onClick={() => { this.onDelete() }}
                                    >

                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </IconButton>
                                    <IconButton
                                        className={this.classes.menuButton}
                                        color='inherit'
                                        onClick={() => { this.onAddNote() }}
                                    >

                                        <FontAwesomeIcon icon={faEdit} />
                                    </IconButton>
                                    <IconButton
                                        className={this.classes.menuButton}
                                        color='inherit'
                                        onClick={() => { this.onLockNote() }}
                                    >
                                        <FontAwesomeIcon icon={faLockOpen} />
                                    </IconButton>
                                </div>

                            </Toolbar>
                        </AppBar>
                    </div>
                </MuiThemeProvider>
            )
        }

    }



}

export default withStyles(styles, { withTheme: true })(TopBar);