import React from 'react';
import { List, ListItem, ListItemText, colors, Button } from '@material-ui/core';
import { withStyles, useTheme } from '@material-ui/core/styles';

const styles = theme => ({
    divider: {
        margin: theme.spacing(2, 0),

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

/*const RenderLis = (props) => {
    var pages = props.data;
    const classes = styles();
    //console.log(pages);
    if(pages){
        var items = cutBody(pages);
    }

    const handleClick = (docID) => {
        props.toggleNote(docID);
    }

    return (
        <List>
            {pages.map(page => (
                <div key={page.docID}>
                    <ListItem
                        className={classes.item}
                        disableGutters
                        key={page.docID}
                    >
                        <Button
                            activeclassname={classes.active}
                            className={classes.button}
                            key={page.docID}
                            onClick={() => handleClick(page.docID)}
                        >
                            <ListItemText
                                primary={page.title}
                                secondary={page.date + " " + page.body}
                            >
                            </ListItemText>
                        </Button>
                    </ListItem>

                </div>


            ))}
        </List>
    )
}*/

class RenderList extends React.Component{
    constructor(props) {
        super(props);
        this.classes = props.classes;
        var notes = props.data;
        this.state = {
            notes: notes,
            items: []
        }
    }

    componentDidMount(){
        var pages = this.props.data;
        var cutItems = cutBody(pages);
        this.setState({
            items: cutItems
        })
    }

    handleClick (docID) {
        this.props.toggleNote(docID);
    }

    render(){
        var pages = this.state.items;
        return (
            <List>
                {pages.map(page => (
                    <div key={page.docID}>
                        <ListItem
                            className={this.classes.item}
                            disableGutters
                            key={page.docID}
                        >
                            <Button
                                activeclassname={this.classes.active}
                                className={this.classes.button}
                                key={page.docID}
                                onClick={() => this.handleClick(page.docID)}
                            >
                                <ListItemText
                                    primary={page.title}
                                    secondary={page.date + " " + page.body}
                                >
                                </ListItemText>
                            </Button>
                        </ListItem>
    
                    </div>

                ))}
            </List>
        )
    }
}

const cutBody = (items) => {
    for(var b = 0; b < items.length; b++){
        if(items[b].body.length < 12){
            items[b].body = items[b].body.substring(0,12); 
        }
    }
    return items;
}



export default (withStyles)(RenderList);
