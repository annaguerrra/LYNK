import mongoose from 'mongoose';
import config from 'config'
import { GridFSBucket, MongoClient } from "mongodb";

let client: MongoClient
let bucket: GridFSBucket

const connectDB = async () => {
    try {
        const uri: string = config.get("db");

        client = new MongoClient(uri);
        await client.connect();

        const db = client.db();

        bucket = new GridFSBucket(db)
        console.log('MongoDB Connected');
        
    } catch (error) {
        console.error('MongoDB Connection Failed', error);
        process.exit(1);
    }
};

export const getBucket = (): GridFSBucket => {
    if (!bucket) {
        throw new Error('MongoDB is not connected.');
    }

    return bucket;
};

export const getClient = (): MongoClient => {
    if (!client) {
        throw new Error("MongoDB is not connected.");
    }

    return client;
};

export default connectDB;