const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId();

console.log(id.getTimestamp());

const isvalid = mongoose.Types.ObjectId.isValid('1234');

console.log(isvalid);