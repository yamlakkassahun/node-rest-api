import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            delete ret.password;
        }
    },
    timestamps: true
});

export default mongoose.model('User', userSchema);