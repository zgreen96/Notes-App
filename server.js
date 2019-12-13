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
const serviceAccount = require('./src/firebase/firebase-key.json');

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
                    docData.docID = doc.id.toString();
                    notes.push(docData);
                })
                
                //sort notes by edit date
                for(var a = 0; a < notes.length; a++){
                    for(var b = 1; b < notes.length; b++){
                        if(notes[a].dateTime < notes[b]){
                            var temp = notes[a];
                            notes[a] = notes[b];
                            notes[b] = temp;
                        }
                    }
                }
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
app.post('/newNote', function(req, res){
    var params = req.body;
    var docID;
    try{
        let addDoc = db.collection('userNotes').doc().set(params)
                    .then(ref => {
                        docID = ref.id;
                    })
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})

//delete note
app.delete('/deleteNote/:docID', function(req, res){
    try{
        var docID = req.params.docID;
        let deleteDoc = db.collection('userNotes').doc(docID).delete();         //Need unique IDs to avoid multiple deletes
        res.sendStatus(200);
    }
    catch(err){
        console.log('error deleting doc: ', err);
        res.sendStatus(500);
    }
})

//update note
app.put('/updateNote/:docID', function(req, res){
    try{
        var docID = req.params.docID;
        var params = req.body;
        let updateDoc = db.collection('userNotes').doc(docID).update(params);       
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})

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