const parseResponseError = (err, fallbackMessage) =>
    err.response
        ? err.response.json().then(responseBody => {
              return responseBody;
          })
        : Promise.resolve({ message: fallbackMessage });

module.exports = { parseResponseError };
