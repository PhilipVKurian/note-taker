const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'db/db.json'))
})

app.post('/api/notes', (req, res) => {
    let db = fs.readFileSync('db/db.json');
    db = JSON.parse(db);
    res.json(db);
    let note = {
        title: req.body.title,
        text: req.body.text,
        id: uniqid(),
    };
    db.push(note);
    fs.writeFileSync('db/db.json', JSON.stringify(db))
    res.json(db);
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
