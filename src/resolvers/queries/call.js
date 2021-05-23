module.exports = async (_, { callId }, { models }) => {
  const call = await models.Call.findById(callId);
  if (call) {
    return call;
  } else {
    throw new Error("Call not found");
  }
};
