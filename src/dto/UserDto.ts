import { IsEmail, IsString, validate, validateOrReject } from 'class-validator';

export class UserDTO {
    @IsString({ message: 'Username is required' })
    username: String;
    @IsString()
    password: String
    @IsEmail()
    email: String;
}
