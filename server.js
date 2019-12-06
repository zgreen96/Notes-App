const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fbAdmin = require('firebase-admin');
const path = require('path');
var cors = require('cors');
app.use(cors());
var moment = require('moment');

//for post requests
app.use(bodyParser.urlencoded({entended: false}));
app.use(bodyParser.json());

//init firebase
const serviceAccount = require('./firebase-key.json');

fbAdmin.initializeApp({
    credential: fbAdmin.credential.cert(serviceAccount),
    databaseURL: "https://notesapp-261216.firebaseio.com"
});

const db = fbAdmin.firestore();
var ref = db.collection('userNotes');



//init landing page
app.use(express.static(path.join(__dirname, './build')));

app.get('/',function(req, res){
    res.sendFile(path.join(__dirname, './build','index.html'));
});

//get existing notes
app.get('/notes', function(req, res){
    var notes = [];
    try{
        ref.get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    var docData = doc.data();
                    docData.docID = doc.id;
                    notes.push(docData);
                })
                console.log(notes);
                res.json(notes);
            })
            .catch(err => {
                console.log("Error getting documents, ", err);
                res.send(err);
            })
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})


//post new note



//init server
const start = async () => {
    try{
        const port = process.env.PORT || 8080;
        app.listen(port);
        console.log('app listening on port', port);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

start();

/*
Note Schema:

Note{
    title: "",
    dateTime: "MM:DD:YY TT",
    body: "",
    locked: bool,

}
*/