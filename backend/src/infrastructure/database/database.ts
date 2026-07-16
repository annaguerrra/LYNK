import mongoose from 'mongoose';
import config from '../config/'
import { GridFSBucket } from "mongodb";

let bucket: GridFSBucket;

const connectDB = async () => {
    try {
        const db: string = config.get('db');
        await mongoose.connect(db);
        bucket = new GridFSBucket(mongoose.connection.db);
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

export default connectDB;