import express from 'express';
import IndexController from '../controllers/index.js';
import tablesRouter from './tables.js';

const router = express.Router();
const indexController = new IndexController();

export function setRoutes(app) {
    router.get('/', indexController.home);
    router.get('/about', indexController.about);
    // Add more routes as needed

    app.use('/', router);
    app.use('/api', tablesRouter); // Add this line to use the tables router
}