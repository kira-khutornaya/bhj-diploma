/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
  const f = function () {},
        {
          method = 'GET',
          callback = f,
          responseType,
          async = true,
          data = {},
        } = options,
        request = new XMLHttpRequest,
        formData = new FormData;
    let {url}  = options,
        items = '';

  if (method === 'GET') {
    for (item in data) {
      items += `${item}=${data[item]}&`;
    }
    url += '?' + items.slice(0, -1);
  } else {
    for (item in data) {
      formData.append(item, data[item]);
    }
  }

  try {
    request.open(method, url);
    request.responseType = responseType;
    request.withCredentials = true;
    request.send(formData);
  } catch (err) {
    callback(err);
  }

  request.addEventListener('readystatechange', () => {
    if (request.readyState === request.DONE && request.status == 200) {
      !request.response.success ? callback(request.response.error, request.response) : callback(null, request.response);
    }
  })
}
