import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { Authenticate } from '../middleware/authMiddleware';

export class AuthRoutes {
    router: Router
    public userController: AuthController = new AuthController()
  
    constructor() {
      this.router = Router()
      this.routes()
    }
    
    routes() {
      this.router.post('/signup', this.userController.registerUser)
      this.router.post('/signin', this.userController.authenticateUser)
    }
  }