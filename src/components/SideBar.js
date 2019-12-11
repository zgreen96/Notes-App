import React from 'react';
import { Drawer, List, ListItem, ListItemText, colors, Button } from '@material-ui/core/';
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
            paddingTop: theme.spacing(2),
    },
    item: {
        display: 'flex',
        paddingTop: 5,
        paddingBottom: 65,
        maxHeight: '30px',

    },
    button: {
        color: colors.blueGrey[800],
        padding: '5 0 10',
        justifyContent: 'flex-start',
        textTransform: 'none',
        letterSpacing: 0,
        width: '100%',
        fontWeight: 'normal',
        borderBottom: "1px solid rgb(212, 212, 212)",
        borderTop: "1px solid rgb(212, 212, 212)"
    },
    active: {                                                           //change this later to fit notes app
        backgroundColor: '#cccccc',
        fontWeight: 'normal',
    },
    inline: {
        display: 'inline',
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
            pages: []
        }
        this.noteToggle = this.noteToggle.bind(this);
        this.renderList = this.renderList.bind(this);
    }

    componentWillReceiveProps( someProp ) {
        console.log(someProp);
        this.setState({ 
            notes: someProp.data,
            currentNote: someProp.currentNote
         });
    }

    noteToggle(page) {
        console.log(page);
        this.props.toggleNote(page.docID);
    }

    renderList(pages) {
        const that = this;
        return (
            <List>
                {pages.map(function (page, key) {
                    return (
                        <div key={key}>
                            <ListItem
                                className={that.classes.item}
                                disableGutters
                                key={key}
                            >
                                <Button
                                    activeclassname={that.classes.active}
                                    className={that.classes.button}
                                    key={key}
                                    onClick={() => that.noteToggle(page)}
                                >
                                    <ListItemText
                                        primary={page.title}
                                        secondary={page.date + " " + page.body}
                                        key={key}
                                    >
                                    </ListItemText>
                                </Button>
                            </ListItem>
                        </div>
                    )
                }
                )}
            </List>
        )
    }

    render() {
        //set list items
        var pages = [];
        var items = this.state.notes;
        console.log(items);
        if (items) {
            for (var a = 0; a < items.length; a++) {
                var noteInList = {
                    title: items[a].title,
                    date: items[a].dateTime,
                    body: items[a].body.substring(0, 12),
                    docID: items[a].docID
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
                {this.renderList(pages)}
            </Drawer>
        )
    }



}

export default withStyles(styles, { withTheme: true })(Sidebar);


