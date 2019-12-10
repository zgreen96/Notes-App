import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faLock, faBars } from '@fortawesome/free-solid-svg-icons';
import MenuIcon from '@material-ui/icons/MenuOpen';
import { withStyles, MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { Toolbar, Typography } from '@material-ui/core';

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
        position: 'relative',
        zIndex: 3,
        background: '#d9d9d9'
    },
    menuButton: {
       // marginRight: theme.spacing(2),
        position: 'relative',
    },
    buttons: {
        paddingLeft: 300,
    },
    search: {
        position: 'relative',
        //borderRadius: theme.shape.borderRadius,
        //backgroundColor: fade(theme.palette.common.white, 0.15),
        //'&:hover': {
        //    backgroundColor: fade(theme.palette.common.white, 0.25),
        //},
       // marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        //[theme.breakpoints.up('sm')]: {
        //    marginLeft: theme.spacing(3),
        //    width: 'auto',
        //},
    },
    searchIcon: {
    //    width: theme.spacing(7),
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
    //    padding: theme.spacing(1, 1, 1, 7),
    //    transition: theme.transitions.create('width'),
        width: '100%',
    /*    [theme.breakpoints.up('md')]: {
            width: 200,
        },*/
    }
});



class TopBar extends React.Component {
    constructor(props){
        super(props);
        this.classes = props.classes;
        var notes = props.data;
        this.state = {
          notes: notes,
          currentNote: {},
        }
    }

    onDelete = (docID) => {

    }

    onAddNote = () => {

    }

    onLockNote = (docID) => {

    }

    onSearch = (term) => {

    }

    slider = () =>{
        this.props.open();
    }

    render(){
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
                                    onClick={() => {this.slider()}}
                                >
                                    <MenuIcon fontSize='large' />
                                </IconButton>
                                <IconButton className={this.classes.menuButton} color='inherit'>
    
                                </IconButton>
                            </div>
    
                        </Toolbar>
                    </AppBar>
                </div>
            </MuiThemeProvider>
        )
    }



}

export default withStyles(styles, {withTheme: true})(TopBar);