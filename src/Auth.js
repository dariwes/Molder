import {UserSettings} from "./models/UserSettingsModel";

const API_KEY = ''
const SIGNIN_LINK = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
const SIGNUP_LINK = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
const UPDATE_EMAIL_LINK = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key='


export const updateEmail = (idToken, email) => {
    return fetch(UPDATE_EMAIL_LINK + API_KEY, {
        method: 'POST',
        body: JSON.stringify({
            idToken, email,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
}


export const login = (email, password) => {
    if (!email || !password) {
        return null
    }
    return fetch(SIGNIN_LINK + API_KEY, {
        method: 'POST',
        body: JSON.stringify({
            email, password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data && data.error) {
                return 'Incorrect email or password.'
            }
             return UserSettings.get(data.localId).then(userSettings => {
                 if (userSettings) {
                     const [key, value] = userSettings
                     if (userSettings && !userSettings.error) {
                         return {isAuth: true, email, idToken: data.idToken, key, ...value}
                     }
                     return {isAuth: true, email, idToken: data.idToken}
                 }
            })
        })
}


export const registration = (username, email, password, password_2) => {
    if (!username || !email || !password) {
        return Promise.resolve('Incorrect username, email or password.')
    }
    if (password !== password_2) {
        return Promise.resolve('Passwords are different.')
    }
    return fetch(SIGNUP_LINK + API_KEY, {
        method: 'POST',
        body: JSON.stringify({
            email, password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data && data.error) {
                return data.error.message === 'EMAIL_EXISTS'
                    ? 'The email already exists'
                    : 'Something went wrong. Try later.'
            }
            return UserSettings.create({name: data.localId, username, theme: 'dark'}).then(userSettings => {
                if (userSettings && !userSettings.error) {
                    return {
                        isAuth: true, email, username, idToken: data.idToken,
                        userId: data.localId, key: userSettings.name, theme: 'dark'
                    }
                }
                return {isAuth: true, email, idToken: data.idToken, userId: data.localId, theme: 'dark'}
            })
        })
}
