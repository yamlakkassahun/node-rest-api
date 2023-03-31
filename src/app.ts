import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import dotenv from 'dotenv';
import compression from 'compression'
//we need to import the passport strategy
import './config/Passport';
import { AuthRoutes } from './routes/AuthRoute';
import { GlobalErrorHandler } from './middleware/errorMiddleware';

dotenv.config()

class Server {
    public app: express.Application

    constructor() {
        this.app = express()
        this.config()
        this.routes()
        this.mongo()
    }

    public routes(): void {
        this.app.use('/api/auth', new AuthRoutes().router)
        this.app.use(GlobalErrorHandler)
    }

    public config(): void {
        this.app.set('port', process.env.PORT || 3000)
        this.app.use(express.json())
        this.app.use(compression())
        this.app.use(cors())
        this.app.use(passport.initialize());
    }

    private mongo() {
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log('Mongo Connection Established')
        })
        connection.on('reconnected', () => {
            console.log('Mongo Connection Reestablished')
        })
        connection.on('disconnected', () => {
            console.log('Mongo Connection Disconnected')
        })
        connection.on('close', () => {
            console.log('Mongo Connection Closed')
        })
        connection.on('error', (error: Error) => {
            console.log('Mongo Connection ERROR: ' + error)
        })

        const run = async () => {
            mongoose.set('strictQuery', false);
            await mongoose.connect(process.env.DB_URL_LOCAL, {
                keepAlive: true,
            })
        }

        run().catch((error) => console.error(error))
    }

    public start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('API is running at http://localhost:%d', this.app.get('port'))
        })
    }
}

const server = new Server()
server.start()