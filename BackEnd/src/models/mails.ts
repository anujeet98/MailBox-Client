
import mongoose, { Schema } from 'mongoose';

interface Mail{
    recipient: String,
    sender: String,
    subject: String,
    body: String,
    createdDate: Date,
    updatedDate: Date,
}

const MailSchema = new Schema<Mail>({
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

export default mongoose.model('Mail', MailSchema);