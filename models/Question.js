const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  answers: {
    type: Array,
    required: true
  }
});

const Question = mongoose.model('Question', QuestionSchema, 'questions');

module.exports = Question;
