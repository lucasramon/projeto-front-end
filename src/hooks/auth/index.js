import { createContext, useContext, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { TstAPI } from '../../Services/BaseApi'
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [cookies, setCookies, removeCookie] = useCookies();
    const baseURL = process.env.REACT_APP_API_URL;


    const login = async (email, password) => {
        return TstAPI.post(`${baseURL}/auth/signin`, { email, password }).then(response => {
            const { data } = response;
            setCookies('token', data.user.token);
            setCookies('name', data.user.name);
            setCookies('email', data.user.email);

            return data;
        })
    }

    const signUp = async (email, name, password) => {
        return TstAPI.post(`${baseURL}/auth/signup`, { email, name, password }).then(response => {
            const { data } = response;
            return data;
        })
    }

    const getUserInfo = () => {
        return TstAPI.get(`${baseURL}/auth/me`).then(response => {
            const { data } = response;
            return data;
        })
    }

    const logout = () => {
        ['token', 'name', 'email'].forEach(obj => removeCookie(obj)); // remove data save in cookies
        navigate('/login');
    };

    const value = useMemo(
        () => ({
            cookies,
            login,
            logout,
            signUp,
            getUserInfo
        }),
        [cookies]
    );

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(UserContext)
};