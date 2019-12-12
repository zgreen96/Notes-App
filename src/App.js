import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/Main';

var API_URL = "http://localhost:8080/notes";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    }
  }

  //load notes data
  async componentDidMount() {
    API_URL = window.location.protocol + '//' + window.location.hostname + '/notes';
    var items = await this.loadNotes();
  }

  async loadNotes() {
    API_URL = window.location.protocol + '//' + window.location.hostname + '/notes';
    await fetch(API_URL)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        else {
          console.log(response);
          throw new Error('response returned error code');
        }
      }).catch(error => console.log(error))
      .then(response => {
        this.setState({
          notes: response,
        })
      });
  }

  render() {
    var data = this.state.notes;
    console.log(data);
    if (data) {
      if (this.state.notes.length < 1) {
        this.loadNotes();
      }
      else {
        return (
          <div id='root'>
            <Main data={data} key={'main'} />
          </div>
        )
      }
    }

    return <div>Data Loading...</div>;






  }

}

export default App;
