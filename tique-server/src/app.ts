import {Board, Tag} from "./db_service";
import * as uuid from "uuid";
import {ObjectId} from "mongodb";

const fs = require("fs");

const express = require("express");
const app = express();
const port = 63107;

app.use(express.json());

/* static files */

app.use(express.static("dist/tique-webapp"));

/* api */

const db = require("./db_service");
db.connectToDatabase();

// GET /tag
app.get("/tag", async (req, res) => {
    const tags = (await db.collections.tagsCollection.find().toArray()) as Tag[];
    res.status(200).send(tags);
});

// POST /tag
app.post("/tag", async (req, res) => {
    const tag = req.body;
    let result = await db.collections.tagsCollection.insertOne({
        name: tag.name,
        icon: tag.icon
    });
    res.status(200).send(result.insertedId);
});

// PUT /tag
app.put("/tag/:id", async (req, res) => {
    const id = req.params.id;
    const tag = req.body;
    await db.collections.tagsCollection.updateOne({ _id: new ObjectId(id) }, { $set: {
        name: tag.name,
        icon: tag.icon
    }});
    res.status(200).send();
});

// DELETE /tag
app.delete("/tag/:id", async (req, res) => {
    const id = req.params.id;
    await db.collections.tagsCollection.deleteOne({_id: new ObjectId(id)});

    console.log(id);
    const boards = (await db.collections.boardsCollection.find({}).toArray()) as Board[];
    for (const board of boards) {
        const newTags = board.tags.filter(tag => {
            console.log(tag);
            return tag != id;
        });
        const replacement = {
            name: board.name,
            total: board.total,
            progress: board.progress,
            tags: newTags
        };
        await db.collections.boardsCollection.replaceOne({ _id: board._id }, replacement);
    }

    res.status(200).send();
});

// GET /board
app.get("/board", async (req, res) => {
    try {
        const tags = (await db.collections.boardsCollection.find().toArray()) as Board[];
        res.status(200).send(tags);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// POST /board
app.post("/board", async (req, res) => {
    const board = req.body;
    let result = await db.collections.boardsCollection.insertOne({
        name: board.name,
        total: board.total,
        progress: board.progress,
        tags: board.tags
    });
    res.status(200).send(result.insertedId);
});

// POST /tick
app.post("/tick/:id", async (req, res) => {
    const id = req.params.id;
    const board = await db.collections.boardsCollection.findOne({ _id: new ObjectId(id) }) as Board;
    const progress = board.progress == board.total ? 0 : board.progress + 1;
    await db.collections.boardsCollection.updateOne({ _id: new ObjectId(id) }, { $set: { progress: progress }});
    res.status(200).send();
});

// PUT /board
app.put("/board/:id", async (req, res) => {
    const id = req.params.id;
    const board = req.body;
    await db.collections.boardsCollection.updateOne({ _id: new ObjectId(id) }, {
        name: board.name,
        total: board.total,
        progress: board.progress,
        tags: board.tags
    });
    res.status(200).send();
});

// DELETE /board
app.delete("/board/:id", async (req, res) => {
    const id = req.params.id;
    await db.collections.boardsCollection.deleteOne({_id: new ObjectId(id)});
    res.status(200).send();
});

/* user images */

const fileUpload = require("express-fileupload");
app.use(fileUpload());

const userImgDir = "user_images";
if (!fs.existsSync(userImgDir)) {
    fs.mkdirSync(userImgDir);
}

app.post("/uploadUserImage", (req, res) => {
    const file = req["files"].image;
    const id = uuid.v4().toString();
    fs.writeFileSync("user_images/" + id + file.name, file.data);
    res.status(200).send(id);
});

app.get("/userImage/:id", (req, res) => {
    const id = req.params.id;
    let sent = false;
    for (let file of fs.readdirSync(userImgDir)) {
        if (file.startsWith(id)) {
            res.status(200).sendFile(file, {root: userImgDir});
            sent = true;
        }
    }
    if (!sent) res.status(404).send();
});

app.listen(port, () => {
    console.log(`Tique server listening on port ${port}`);
});