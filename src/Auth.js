const API_KEY = ''
const SIGNIN_LINK = ''
const SIGNUP_LINK = ''


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
                return null
            }
            return data.idToken
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
            console.log(data)
            if (data && data.error) {
                return data.error.message === 'EMAIL_EXISTS'
                    ? 'The email already exists'
                    : 'Something went wrong. Try later.'
            }
            return data
        })
}