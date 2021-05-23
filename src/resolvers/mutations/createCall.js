const { Call } = require("../../models/");

const checkAuth = require("../../config/checkAuth");

module.exports = async (
  _,
  {
    call: {
      to,
      from,
      type,
      status,
      endTime,
      orgUuid,
      txnUuid,
      startTime,
      answerTime,
      webhookCode,
      durationInMinutes,
      durationInSeconds,
    },
  }
) => {
  const newCall = new Call({
    to,
    from,
    type,
    status,
    endTime,
    orgUuid,
    txnUuid,
    startTime,
    answerTime,
    webhookCode,
    durationInMinutes,
    durationInSeconds,
  });
  const call = await newCall.save();

  return call;
};
