const fs = require('fs')
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000
var bodyParser = require('body-parser');

var htmlPath = path.join(__dirname, 'public');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(htmlPath));
app.get("/",function(req,res) {
    res.sendfile(path.join(htmlPath, 'index.html'))
})
app.get("/reserve",function(req,res) {
    res.sendfile(path.join(htmlPath, 'reserve.html'))
})
app.get("/tables",function(req,res) {
    res.sendfile(path.join(htmlPath, 'tables.html'))
})
app.get("/api/tables",async function(req,res) {
    res.json(await getDB("./db/tables.json"));
})
app.get("/api/waitlist",async function(req,res) {
    res.json(await getDB("./db/waitlist.json"));
})
// app.post("/api/notes", async function(req,res) {
//     const database = await getDB();
//     req.body.id = database[database.length - 1].id + 1;
//     database.push(req.body);
//     await writeDB(database)
//     res.send(req.body)
// })
// app.delete("/api/notes/:id", async function(req,res) {
//     const database = await getDB();
//     database.forEach(element => {
//         if (element.id == parseInt(req.params.id)) {
//             var index = database.indexOf(element);
//             if (index > -1) {
//                 database.splice(index, 1);
//             }
//         }
//     });
//     writeDB(database)
//     res.send(req.body);
// })
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

async function getDB(file) {
    return JSON.parse(fs.readFileSync(file));
}
async function writeDB(file,data) {
    fs.writeFileSync(file, JSON.stringify(data));
}