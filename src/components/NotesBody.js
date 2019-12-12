import React from 'react';
import { Paper, TextField, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    paper: {
        width: '90%',
        height: '100%',
        padding: theme.spacing(2),
        flexGrow: 1,
        paddingLeft: 300,
        paddingRight: 300,
        marginTop: 15,
        display: 'flex'
    },
    field: {
        width: '90%',
        verticalAlign: 'middle'
    },
    title: {
        fontSize: 18
    },
    body: {
        fontSize: 12
    }
})

class NotesBody extends React.Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;
        var note = props.currentNote;
        this.state = {
            note: note
        }
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.renderNote = this.renderNote.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    componentWillReceiveProps(someProp) {
        console.log(someProp.currentNote);
        this.setState({
            note: someProp.currentNote
        })

    }

    handleBodyChange(event) {
        var currentNote = this.state.note;
        currentNote.body = event.target.value
        currentNote.dateTime = Date.now()
        this.setState({
            note: currentNote
        })
        this.props.handleChange(currentNote);
    }

    handleTitleChange(event) {
        var currentNote = this.state.note;
        currentNote.title = event.target.value
        currentNote.dateTime = Date.now()
        this.setState({
            note: currentNote
        })
        this.props.handleChange(currentNote);
    }

    renderNote(currentNote){
        if(currentNote.locked === false){
            return(
                <Paper className={this.classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item xs={9} style={{ textAlign: 'left' }}>
                                <TextField
                                    id='title'
                                    className={this.classes.field}
                                    rowsMax="1"
                                    rows='1'
                                    onChange={ this.handleTitleChange }
                                    InputProps={{
                                        classes: {
                                            input: this.classes.title
                                        }
                                    }}
                                    value={currentNote.title}
                                />
                            </Grid>
                            <Grid item xs={9} style={{ textAlign: 'left' }}>
                                <TextField
                                    id='outlined-textarea'
                                    className={this.classes.field}
                                    InputProps={{
                                        classes: {
                                            input: this.classes.body
                                        }
                                    }}
                                    rows='40'
                                    rowsMax='40'
                                    multiline
                                    variant='outlined'
                                    value={currentNote.body}
                                    onChange={this.handleBodyChange}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
            )
        }
        else{
            return(
                <Paper className={this.classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item xs={9} style={{ textAlign: 'left' }}>
                                <TextField
                                    id='title'
                                    className={this.classes.field}
                                    rowsMax="1"
                                    rows='1'
                                    onChange={() => { this.handleChange() }}
                                    InputProps={{
                                        classes: {
                                            input: this.classes.title
                                        }
                                    }}
                                    value={currentNote.title}
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={9} style={{ textAlign: 'left' }}>
                                <TextField
                                    id='outlined-textarea'
                                    className={this.classes.field}
                                    InputProps={{
                                        classes: {
                                            input: this.classes.body
                                        }
                                    }}
                                    rows='40'
                                    rowsMax='40'
                                    multiline
                                    variant='outlined'
                                    value={currentNote.body}
                                    onChange={this.handleChange}
                                    disabled={true}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
            )
        }
        
    }

    render() {
        var currentNote = this.state.note;
        return (
            <div>
                {this.renderNote(currentNote)}
            </div>
        )


    }


}

export default withStyles(styles, { withTheme: true })(NotesBody);