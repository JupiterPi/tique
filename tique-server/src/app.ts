import {Board, Tag} from "./db_service";
import {ObjectId} from "mongodb";

const express = require("express");
const app = express();
const port = 63107;

app.use(express.json());

/* static files */

app.use(express.static("dist/tique-webapp"));

/* api */

const db = require("./db_service");
db.connectToDatabase();

app.get("/tag", async (req, res) => {
    const tags = (await db.collections.tagsCollection.find().toArray()) as Tag[];
    res.send(tags);
});

app.get("/tag/:id", async (req, res) => {
    const tagId = req.params.id;
    const tag = (await db.collections.tagsCollection.findOne({ _id: new ObjectId(tagId) })) as Tag;
    res.send(tag);
});

app.get("/board", async (req, res) => {
    try {
        const tags = (await db.collections.boardsCollection.find().toArray()) as Board[];
        res.send(tags);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.get("/board/:id", async (req, res) => {
    const boardId = req.params.id;
    const board = (await db.collections.boardsCollection.findOne({ _id: new ObjectId(boardId) })) as Tag;
    res.send(board);
});

app.listen(port, () => {
    console.log(`Tique server listening on port ${port}`);
});