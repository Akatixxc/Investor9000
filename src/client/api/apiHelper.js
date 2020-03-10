const parseJSON = response => {
    if (response.status === 204 || response.status === 205) {
        return null;
    }
    return response.json().catch(err => console.log(err));
};

const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
};

const request = (url, options) => {
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON);
};

export const get = (url, options) => {
    const { headers, ...rest } = options || {};
    return request(url, {
        credentials: 'include',
        method: 'GET',
        ...rest,
        headers: {
            ...headers,
        },
    });
};

export const post = (url, options) => {
    const { headers, ...rest } = options || {};
    return request(url, {
        credentials: 'include',
        method: 'POST',
        ...rest,
        headers: {
            ...headers,
        },
    });
};

export default request;
