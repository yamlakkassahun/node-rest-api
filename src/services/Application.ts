import express, { Application } from 'express';
import cors from 'cors';
import passport from 'passport';
import dotenv from 'dotenv';
import compression from 'compression'
import { GlobalErrorHandler } from '../middleware';
import { AuthRoutes } from '../routes/AuthRoute';
dotenv.config()

export default async (app: Application) => { 
    //middleware
    app.use(express.json())
    app.use(compression())
    app.use(cors())
    app.use(passport.initialize());

    //routes
    app.use('/api/auth', new AuthRoutes().router)

    //global error handler
    app.use(GlobalErrorHandler)
    
    return app;
}