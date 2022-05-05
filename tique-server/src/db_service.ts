import * as mongoDB from "mongodb";
const fs = require("fs");

export class Tag {
    constructor(
        public name: string,
        public icon: string,
        public _id?: mongoDB.ObjectId
    ) {}
}

export class Board {
    constructor(
        public name: string,
        public total: number,
        public progress: number,
        public tags: string[],
        public _id?: mongoDB.ObjectId
    ) {}
}

export const collections: {
    tagsCollection?: mongoDB.Collection,
    boardsCollection?: mongoDB.Collection
} = {};

export async function connectToDatabase() {
    const connectionUrl = fs.readFileSync("mongodb_connect_url.txt").toString();
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(connectionUrl);
    await client.connect();
    const db: mongoDB.Db = client.db("tique");
    collections.tagsCollection = db.collection("tags");
    collections.boardsCollection = db.collection("boards");
    console.log(`Successfully connected to database: ${db.databaseName}`);
}