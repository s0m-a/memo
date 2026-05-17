import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
});

const Image = mongoose.model('Image', imageSchema);

export default Image;
