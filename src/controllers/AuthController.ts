import User from '../models/User'
import { NextFunction, Request, Response } from 'express'
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { ErrorException } from '../exceptions/ErrorExceptions';
import { UserDTO } from '../dto/UserDto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class AuthController {
    public async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        //this will convert the input to class
        const userInput = plainToClass(UserDTO, req.body); 
        const inputErrors = await validate(userInput, { validationError: { target: false } });

        if (inputErrors.length > 0) {
            return res.status(400).json(inputErrors);
        }

        //get user input
        const { email, password, username } = req.body;

        try {
            //hashing password
            const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

            //creating new user
            const user = await User.create({ email, username, password: hashedPassword })

            //generating token 
            const token = jwt.sign({ email, username }, process.env.JWT_SECRET)

            //return token
            return res.status(200).send({ user, token: token })
        } catch (err) {
            return next(new ErrorException("Error with Signup", 400));
        }
    }

    public async authenticateUser(req: Request, res: Response, next: NextFunction) {
        //get user input
        const { email, password } = req.body;

        try {
            //get user if it exists
            const user = await User.findOne({ email });

            //handling if the user dose not exists
            if (!user) return res.status(401).json({ message: 'unauthorized' })

            //checking the password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ success: false, error: 'Incorrect password.' });

            //generating token
            const token = jwt.sign({ email: user.email, username: user.email }, process.env.JWT_SECRET)
            return res.status(200).send({ user, token: token })
        } catch (err) {
            next();
        }
    }
}