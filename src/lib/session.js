
const isLoggedIn = () => {
    return (getJWTToken() !== undefined);
}

const getSession = () => {
    let session = {
        "credentials": {
            "accessToken": undefined
        }
    };
    if (sessionStorage.getItem('yogalates.session')){
        session = JSON.parse(sessionStorage.getItem('yogalates.session'));
    }
    return session;
}

const setSession = session => {
    sessionStorage.setItem('yogalates.session', JSON.stringify(session));
}

const removeSession = () => {
    sessionStorage.removeItem('yogalates.session');
}

const getJWTToken = () => {
    return getSession().credentials.idToken;
}

const getEmail = () => {
    return getSession().user.email;
}

export default {
    setSession,
    isLoggedIn,
    getJWTToken,
    getEmail,
    removeSession
}
