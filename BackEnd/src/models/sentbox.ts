
import mongoose, { Schema } from 'mongoose';

interface Mail{
    recipient: String,
    sender: String,
    subject: String,
    body: String,
    isRead: Boolean,
    createdDate: Date,
    updatedDate: Date,
}

const SentboxSchema = new Schema<Mail>({
    recipient: {
        type: String,
        require: true,
    },
    sender:{
        type: String,
        require: true,
    },
    subject:{
        type: String,
        require: true,
    },
    body:{
        type: String,
        require: true,
    },
    isRead: {
        type: Boolean,
        require: true,
        default: false,
    },
    createdDate: {
        type: Date,
        require: true,
        default: new Date(),
    },
    updatedDate: {
        type: Date,
        require: true,
        default: new Date(),
    }
});

export default mongoose.model('Sentbox', SentboxSchema);