/**
 * credentials: 'include' 참고 사이트
 * https://velog.io/@seungrok-yoon/Fetch-API%EC%9D%98-credentials
 */

import {
  handleSetParamsWithSync,
  handleThrowCustomErrorInAPI,
  handleThrowErrorInAPI,
} from './utils';

/**
 * GET API
 * @param {string} url 요청 URL
 * @param {string | undefined} accessToken AccessToken
 * @param {Function | undefined} failCb API 실패시 바로 실행하는 콜백
 * @returns {Promise<any>}
 */
function getAPI(
  url: string,
  accessToken: string = '',
  failCb?: () => any,
): Promise<any> {
  console.debug('URL: ', url);
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      //   mode: "no-cors",
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        }

        return handleThrowErrorInAPI({ status: response.status, failCb });
      })
      .then((result) => {
        console.debug('result: ', result);
        const {
          result: { code, message },
          data,
        } = result;

        if (code !== '000000')
          handleThrowCustomErrorInAPI({ code, message, failCb });

        resolve(data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

/**
 * POST API
 * @param {string} url 요청 URL
 * @param {any} payload 요청 DATA
 * @param {string | undefined} accessToken AccessToken
 * @param {Function | undefined} failCb API 실패시 바로 실행하는 콜백
 * @returns {Promise<any>}
 */
async function postAPI(
  url: string,
  payload: any,
  accessToken: string = '',
  failCb?: () => any,
): Promise<any> {
  const data = await handleSetParamsWithSync(payload);
  console.debug('URL: ', url);
  console.debug('parameters: ', data);
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      //   mode: "no-cors",
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        }

        return handleThrowErrorInAPI({ status: response.status, failCb });
      })
      .then((result) => {
        console.debug('result: ', result);
        const {
          result: { code, message },
          data,
        } = result;

        if (code !== '000000')
          handleThrowCustomErrorInAPI({ code, message, failCb });

        resolve(data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

/**
 * PUT API
 * @param {string} url 요청 URL
 * @param {any} payload 요청 DATA
 * @param {string | undefined} accessToken AccessToken
 * @param {Function | undefined} failCb API 실패시 바로 실행하는 콜백
 * @returns {Promise<any>}
 */
async function putAPI(
  url: string,
  payload: any,
  accessToken: string = '',
  failCb?: () => any,
): Promise<any> {
  const data = await handleSetParamsWithSync(payload);
  console.debug('URL: ', url);
  console.debug('parameters: ', data);
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'PUT',
      //   mode: "no-cors",
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        }

        return handleThrowErrorInAPI({ status: response.status, failCb });
      })
      .then((result) => {
        console.debug('result: ', result);
        const {
          result: { code, message },
          data,
        } = result;

        if (code !== '000000')
          handleThrowCustomErrorInAPI({ code, message, failCb });

        resolve(data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

/**
 * DELETE API
 * @param {string} url 요청 URL
 * @param {any} payload 요청 DATA
 * @param {string | undefined} accessToken AccessToken
 * @param {Function | undefined} failCb API 실패시 바로 실행하는 콜백
 * @returns {Promise<any>}
 */
async function deleteAPI(
  url: string,
  payload: any,
  accessToken: string = '',
  failCb?: () => any,
): Promise<any> {
  const data = await handleSetParamsWithSync(payload);
  console.debug('URL: ', url);
  console.debug('parameters: ', data);
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'DELETE',
      //   mode: "no-cors",
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        }

        return handleThrowErrorInAPI({ status: response.status, failCb });
      })
      .then((result) => {
        console.debug('result: ', result);
        const {
          result: { code, message },
          data,
        } = result;

        if (code !== '000000')
          handleThrowCustomErrorInAPI({ code, message, failCb });

        resolve(data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

export { getAPI, postAPI, putAPI, deleteAPI };
