import CryptoJS from 'crypto-js';
import {
  CustomWindow,
  TypeJavascriptInterface,
  TypeKeyValueForm,
  TypeThrowCustomErrorInAPI,
  TypeThrowErrorInAPI,
} from './types';
import {
  BadGatewayError,
  BadRequestError,
  CustomAPIError,
  ForbiddenError,
  InternalServerErrorError,
  MethodNotAllowedError,
  NativeError,
  NotFoundError,
  RequestTimeoutError,
  ServiceUnavailableError,
  UnauthorizedError,
} from './customErrorClasses';
import { SECTION_KEY } from './constants';

/**
 * 네트워크 구간 암복호화 키
 */
const KEY = SECTION_KEY || '';
/**
 * 네트워크 구간 암복호화 IV
 */
const IV = CryptoJS.enc.Utf8.parse(KEY.substring(0, 16)); // Use the first 16 characters for IV

/**
 * [API 상태 코드에 따른 에러 발생 함수]
 *
 * 상태코드, 에러 메세지, 에러팝업 콜백 함수 담고 있는 파라미터 객체
 * @param {TypeThrowErrorInAPI} parameters
 */
export function handleThrowErrorInAPI({ status, failCb }: TypeThrowErrorInAPI) {
  failCb?.();
  switch (status) {
    case 400:
      throw new BadRequestError();
    case 401:
      throw new UnauthorizedError();
    case 403:
      throw new ForbiddenError();
    case 404:
      throw new NotFoundError();
    case 405:
      throw new MethodNotAllowedError();
    case 408:
      throw new RequestTimeoutError();
    case 500:
      throw new InternalServerErrorError();
    case 502:
      throw new BadGatewayError();
    case 503:
      throw new ServiceUnavailableError();
    default:
      break;
  }
}

/**
 * [Status Code는 정상이지만 서버 로직에 의한 에러 발생 함수]
 *
 * 코드, 에러 메세지, 에러팝업 콜백 함수 담고 있는 파라미터 객체
 * @param {TypeThrowErrorInAPI} parameters
 */
export function handleThrowCustomErrorInAPI({
  code,
  message = 'You should set default error message',
  failCb,
}: TypeThrowCustomErrorInAPI) {
  failCb?.(code, message);
  // TODO: 코드에 따라 switch case 분기 필요
  throw new CustomAPIError(message, code);
}

/**
 * [네트워크 구간 암호화 함수]
 *
 * @param plainText 평문
 * @returns
 */
export const encrypt = (plainText: string) => {
  if (!plainText) return '';

  try {
    const keyUtf8 = CryptoJS.enc.Utf8.parse(KEY);
    const cipherText = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(plainText),
      keyUtf8,
      {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      },
    ).toString();

    return cipherText;
  } catch (error) {
    return null;
  }
};

/**
 * [네트워크 구간 복호화 함수]
 *
 * @param cipherText 암호화된 텍스트
 * @returns
 */
export const decrypt = (cipherText: string) => {
  try {
    const keyUtf8 = CryptoJS.enc.Utf8.parse(KEY);
    const bytes = CryptoJS.AES.decrypt(cipherText, keyUtf8, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return null;
  }
};

/**
 * [화면 접근 OS 반환 함수]
 *
 * @returns {string}
 */
export function handleGetOsType(): string {
  const { userAgent } = navigator;

  if (/android/i.test(userAgent)) {
    return 'AND';
  }

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return 'IOS';
  }

  return 'BACK';
}

/**
 * [AOS용 Javascript Interface 호출 함수]
 *
 * @param {TypeJavascriptInterface} params bridge, action, data, hasCb, isActiveErrorPopup 들고 있는 객체
 * @returns {Promise<any>}
 */
export function handleJavascriptInterfaceForAOS({
  bridge,
  action,
  data,
  isActiveErrorPopup,
}: TypeJavascriptInterface): Promise<any> {
  return new Promise((resolve, reject) => {
    const interfaceNm = bridge as keyof Window;

    try {
      if (window[interfaceNm] && window[interfaceNm][action]) {
        if (data !== undefined) resolve(window[interfaceNm][action](data));
        else resolve(window[interfaceNm][action]());
      } else {
        if (!isActiveErrorPopup) throw new NativeError();

        throw Error(
          `Native에서 [${interfaceNm} ${action}]와 관련된 데이터를 가져올 수 없습니다.`,
        );
      }
    } catch (error: any) {
      reject(error);
    }
  });
}

/**
 * [IOS용 Javascript Interface 호출 함수]
 *
 * @param {TypeJavascriptInterface} params bridge, action, data, hasCb 들고 있는 객체
 * @returns {Promise<any>}
 */
export function handleJavascriptInterfaceForIOS({
  bridge,
  action,
  data,
  hasCb,
  isActiveErrorPopup,
}: TypeJavascriptInterface): Promise<any> {
  return new Promise((resolve, reject) => {
    const { webkit } = window as CustomWindow;
    const callbackName = `callback${action.replace(/\b[a-z]/, (letter) =>
      letter.toUpperCase(),
    )}`;

    try {
      if (webkit.messageHandlers[bridge])
        if (hasCb) {
          (window as any)[callbackName] = resolve;

          webkit.messageHandlers[bridge].postMessage({
            action,
            data,
          });
        } else
          resolve(
            webkit.messageHandlers[bridge].postMessage({
              action,
              data,
            }),
          );
      else {
        if (!isActiveErrorPopup) throw new NativeError();

        throw Error(
          `Native에서 [${bridge}]와 관련된 데이터를 가져올 수 없습니다.`,
        );
      }
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * [Javascript Interface 호출 함수]
 *
 * @param {TypeJavascriptInterface} params bridge, action, data, hasCb 들고 있는 객체
 * @returns {Promise<any>}
 */
export async function handleJavascriptInterface({
  bridge,
  action,
  data,
  hasCb,
  isActiveErrorPopup,
}: TypeJavascriptInterface): Promise<any> {
  if (handleGetOsType() === 'AND')
    return handleJavascriptInterfaceForAOS({
      bridge,
      action,
      data,
      isActiveErrorPopup,
    });

  if (handleGetOsType() === 'IOS')
    return handleJavascriptInterfaceForIOS({
      bridge,
      action,
      data,
      hasCb,
      isActiveErrorPopup,
    });

  return '';
}

/**
 * [javascript interface 리턴값 파싱 함수]
 *
 * @param {TypeJavascriptInterface} params bridge, action, data, hasCb 들고 있는 객체
 * @returns
 */
export async function handleParseDataFromJSInterface({
  bridge,
  action,
  data,
  hasCb,
  isActiveErrorPopup,
}: TypeJavascriptInterface): Promise<any> {
  const value = await handleJavascriptInterface({
    bridge,
    action,
    data,
    hasCb,
    isActiveErrorPopup,
  });

  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
}

/**
 * Promise가 포함된 API 파라미터 객체, 동기적으로 resolve 시키기 위한 함수
 * @param {any} params API 파라미터 객체
 * @returns {Promise<TypeKeyValueForm>} resolve된 파라미터 객체
 */
export async function handleSetParamsWithSync(
  params?: any,
): Promise<TypeKeyValueForm> {
  const newParams: TypeKeyValueForm = {};
  const keyArray: string[] = [];
  const promiseValueArray: any[] = [];

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      keyArray.push(key);
      promiseValueArray.push(
        new Promise<string | number>((resolve, reject) => {
          try {
            resolve(value as string | number);
          } catch (error: any) {
            reject(error);
          }
        }),
      );
    });

    const valueArray: (string | number)[] = await Promise.all(
      promiseValueArray,
    );

    keyArray.forEach((key, idx) => {
      newParams[key] = valueArray[idx];
    });
  }

  return newParams;
}

/**
 * 입력 시간을 원하는 포맷으로 변환해주는 함수
 * @param {Date} date 변환하고 싶은 날짜
 * @param {string} format 반환할 포맷
 * @returns {string} 변환된 포맷 날짜 혹은 시간값
 */
export function handleConvertDateFormat(date: Date, format: string): string {
  switch (format) {
    case 'yyyy-mm-dd':
      return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(
        2,
        '0',
      )}-${`${date.getDate() + 1}`.padStart(2, '0')}`;
    case 'yyyymmdd':
      return `${date.getFullYear()}${`${date.getMonth() + 1}`.padStart(
        2,
        '0',
      )}${`${date.getDate() + 1}`.padStart(2, '0')}`;
    case 'yyyyMMddhhmmss':
      const handleSetPadZero = (value: number) =>
        value < 10 ? `0${value}` : value;
      return `${date.getFullYear()}${handleSetPadZero(
        date.getMonth() + 1,
      )}${handleSetPadZero(date.getDate())}${handleSetPadZero(
        date.getHours(),
      )}${handleSetPadZero(date.getMinutes())}${handleSetPadZero(
        date.getSeconds(),
      )}`;
    case 'yyyy':
      return `${date.getFullYear()}`;
    default:
      return '';
  }
}

/**
 * 문자열 첫번째 글자만 대문자로 변환시키는 함수
 * @param {string} value 변환될 값
 * @returns {string} 변환된 값
 */
export function handleSetUpperCaseFirstCharacter(value: string): string {
  return value.replace(/^[a-z]/, (char) => char.toUpperCase());
}

/**
 * 이메일 포맷 검증 함수
 * @param {string} email 이메일
 * @returns {boolean}
 */
export function handleCheckEmail(email: string): boolean {
  // eslint-disable-next-line
  return /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/.test(email);
}

/**
 * 천의 자리마다 컴마 찍힌 숫자 문자열 만들기 함수
 *
 * @param {string} numStr 문자열 숫자
 * @returns {string} 천의자리 컴마 찍힌 숫자 문자열
 */
export function handleReturnNumberWithCommas(numStr: string) {
  return numStr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
