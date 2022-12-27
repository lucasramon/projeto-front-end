import defatultAxios from 'axios';

export const OmdbURL = defatultAxios.create({
    timeout: 300000,
});

export const TstAPI = defatultAxios.create({
    timeout: 300000
});

TstAPI.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers.authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

TstAPI.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status === 401) {
            window.location = `${window.location.origin}/#/`
        } else {
            return Promise.reject(error);
        }
    }
)

OmdbURL.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status === 401) {
            window.location = `${window.location.origin}/#/`
        } else {
            return Promise.reject(error);
        }
    }
)