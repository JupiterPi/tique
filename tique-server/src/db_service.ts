import * as mongoDB from "mongodb";

export class Tag {
    constructor(
        public name: string,
        public icon: string,
        public id?: mongoDB.ObjectId
    ) {}
}

export class Board {
    constructor(
        public name: string,
        public total: number,
        public progress: number,
        public id?: mongoDB.ObjectId
    ) {}
}

export const collections: {
    tagsCollection?: mongoDB.Collection,
    boardsCollection?: mongoDB.Collection
} = {};

export async function connectToDatabase() {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient("mongodb://localhost");
    await client.connect();
    const db: mongoDB.Db = client.db("tique");
    collections.tagsCollection = db.collection("tags");
    collections.boardsCollection = db.collection("boards");
    console.log(`Successfully connected to database: ${db.databaseName}`);
}