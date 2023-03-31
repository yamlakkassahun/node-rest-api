import express from 'express';
import DbService from './services/Database';
import App from './services/Application';

const Server = async () => {
    const app = express();
    await DbService();
    await App(app);
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Listing on Port ${process.env.PORT}`);
    });
}

Server();