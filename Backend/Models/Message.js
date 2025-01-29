const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  timestamp: { type: Date, default: Date.now }
});

messageSchema.pre('save', function (next) {
  if (this.sender === 'undefined' || !mongoose.Types.ObjectId.isValid(this.sender)) {
    return next(new Error('Invalid sender ID'));
  }
  next();
});

module.exports = mongoose.model('Message', messageSchema);
