import cookies from 'browser-cookies'

export const setAccessToken = (token) => {
    cookies.set('accessToken', token, { expires: 365 });
}

export const getAccessToken = () => {
    return cookies.get('accessToken');
}

export const eraseAccessToken = () => {
    cookies.erase('accessToken');
}

export const setRefreshToken = (token) => {
    cookies.set('refreshToken', token, { expires: 365 });
}

export const getRefreshToken = () => {
    return cookies.get('refreshToken');
}

export const eraseRefreshToken = () => {
    cookies.erase('refreshToken');
}