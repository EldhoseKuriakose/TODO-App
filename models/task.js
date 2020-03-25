const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    category: {
        type: String,
        required: true
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;