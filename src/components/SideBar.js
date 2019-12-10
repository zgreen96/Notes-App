import React from 'react';
import { Drawer } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import RenderList from './RenderList';
import zIndex from '@material-ui/core/styles/zIndex';

const styles = theme => ({
    drawer: {
        width: 240,
        paddingTop: 64,
        height: 'calc(100% - 64px)',
        /*     [theme.breakpoints.up('lg')]: {
                 paddingTop: 64,
                 height: 'calc(100% - 64px)'
             },*/
        zIndex: 0,
    },
    drawerPaper: {
        width: 240,
        zIndex: 0,
        paddingTop: 87
    },
    root: {
        backgroundColor: 'white',                                       //can change to grey
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        //    paddingTop: theme.spacing(2),
    },
});

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;
        var notes = props.data;
        this.state = {
            notes: notes,
            currentNote: {},
        }
    }

    noteToggle (docID) {
        this.props.toggleNote(docID);
    }

    render() {
        //set list items
        console.log(this.props.data);
        var pages = [];
        var items = this.state.notes;
        if (items) {
            for (var a = 0; a < items.length; a++) {
                var noteInList = {
                    title: items[a].title,
                    date: items[a].dateTime,
                    body: items[a].body.substring(0, 12)
                }
                pages.push(noteInList);
            }
        }
        return (
            <Drawer
                className={this.classes.drawer}
                variant="persistent"
                anchor="left"
                open={this.props.open}
                classes={{
                    paper: this.classes.drawerPaper,
                }}
            >
                <RenderList data={pages} toggleNote={this.noteToggle}/>
            </Drawer>
        )
    }



}

export default withStyles(styles, { withTheme: true })(Sidebar);


