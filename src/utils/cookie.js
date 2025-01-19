// src/utils/cookieUtils.js

/**
 * getCookieValue
 *   - document.cookie에서 특정 이름의 쿠키 값을 찾아 리턴
 */
export function getCookieValue(name) {
  const cookieStr = document.cookie || '';
  // "; " 기준으로 split 해서 trim
  const cookies = cookieStr.split(';').map(c => c.trim());
  for (let c of cookies) {
    if (c.startsWith(`${name}=`)) {
      return c.substring(name.length + 1);
    }
  }
  return ''; // 없으면 빈 문자열 (필요시 null 등 반환도 가능)
}

/**
 * setCookie
 *   - 쿠키 key, value, 옵션(path, expires 등)을 받아서 document.cookie에 설정
 *   - 예: setCookie('CT_AT', 'abc123', { path: '/', 'max-age': 3600 })
 */
export function setCookie(name, value, options = {}) {
  let cookieStr = `${name}=${value}`;
  // options에 따라 path, expires, secure 등 부가 설정
  if (options.path) {
    cookieStr += `; path=${options.path}`;
  }
  if (options.expires instanceof Date) {
    cookieStr += `; expires=${options.expires.toUTCString()}`;
  }
  if (options['max-age']) {
    cookieStr += `; max-age=${options['max-age']}`;
  }
  if (options.secure) {
    cookieStr += `; secure`;
  }
  // 필요한 옵션 추가 가능 (SameSite, domain 등)
  document.cookie = cookieStr;
}

/**
 * deleteCookie
 *   - 쿠키를 만료시켜 삭제
 */
export function deleteCookie(name, options = {}) {
  // 만료시킬 때 expires 과거 날짜
  setCookie(name, '', {
    ...options,
    expires: new Date(0), // 1970년 1월 1일
  });
}
