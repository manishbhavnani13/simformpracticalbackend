const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({

    category_name: {
        type: String,
        required: true
    },
    category_title: {
        type: String,
        required: false
    },
    user : {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: false
    }
}, {
    collection: 'categories',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('categories', CategorySchema);