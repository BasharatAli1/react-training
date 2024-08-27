import cookies from 'browser-cookies'

export const setAccessToken = (token) => {
    cookies.set('accessToken', token, { expires: 365 });
}

export const getAccessToken = () => {
    return cookies.get('accessToken');
}