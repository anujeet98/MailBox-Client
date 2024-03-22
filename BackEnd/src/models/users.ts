import mongoose, { Schema } from 'mongoose';

interface User{
    email: String,
    password: String,
}

const UserSchema = new Schema<User>({
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password:{
        type: String,
        require: true,
    }
});

export default mongoose.model('User', UserSchema);