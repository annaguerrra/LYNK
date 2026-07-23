import { Express } from 'express';
import express from 'express'

import areaRoutes from './areaRoutes.js'
import classRoutes from './classRoutes.js'
import competenceRoutes from './competenceRoutes.js'
import disciplineRoutes from './disciplineRoutes.js'
import examRoutes from './examRoutes.js'
import logRoutes from './logRoutes.js'
import materialRoutes from './materialRoutes.js'
import userRoutes from './userRoutes.js'

export default function (app: Express) {
    app
        .use(express.json())
        
        .use('/lynk', areaRoutes)
        .use('/lynk', classRoutes)
        .use('/lynk', competenceRoutes)
        .use('/lynk', disciplineRoutes)
        .use('/lynk', examRoutes)
        .use('/lynk', logRoutes)
        .use('/lynk', materialRoutes)
        .use('/lynk', userRoutes)
}