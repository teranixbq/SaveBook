const responseWithData = (h, status, message, data = null) => {
  const response = h.response({
    status,
    message,
    data
  });
  return response;
};

const responseNoMsg = (h, status, data = null) => {
  const response = h.response({
    status,
    data
  });
  return response;
};

const responseNoData = (h, status, message) => {
  const response = h.response({
    status,
    message
  });
  return response;
};

module.exports = {
  responseWithData,
  responseNoData,
  responseNoMsg
};
