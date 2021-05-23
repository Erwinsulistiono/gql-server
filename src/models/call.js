const mongoose = require("mongoose");
const { Schema } = mongoose;

const callSchema = new Schema({
  to: {
    key: String,
    label: String,
    number: String,
  },
  from: {
    key: String,
    label: String,
    number: String,
  },
  type: String,
  status: String,
  endTime: String,
  orgUuid: String,
  txnUuid: String,
  startTime: String,
  answerTime: String,
  webhookCode: String,
  durationInMinutes: String,
  durationInSeconds: String,
});

const Call = mongoose.model("Call", callSchema);

module.exports = { Call };
