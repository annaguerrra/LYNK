import { Express } from 'express';
import express from 'express'
import user from './userRoutes.js';

export default function (app: Express) {
    app
        .use(express.json())
        .use('/lynk', user)
}