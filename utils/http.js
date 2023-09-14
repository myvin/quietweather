const fetch = (options) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      data: options.data,
      method: options.method,
      success (res) {
        if (res.statusCode === 200) {
          return resolve((res.data || {}));
        } else {
          return reject(new Error(`状态码${res.statusCode}`));
        }
      },
      fail (err) {
        console.error(`[${options.url} ${options.method} err]: `, err);
        return reject(new Error(`${err.message}`));
      }
    })
  })
};

export const post = (url, params) => {
  var option = {
    url: url,
    data: params,
    method: 'POST'
  }
  return fetch(option);
}

export const get = (url, params) => {
  var option = {
    url: url,
    data: params,
    method: 'GET'
  }
  return fetch(option);
}