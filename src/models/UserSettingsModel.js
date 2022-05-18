const USERSETTINGS_LINK = 'https://molder-it-default-rtdb.firebaseio.com/usersettings.json'


export class UserSettings {
    constructor() {
        this.userId = '';
        this.isAuth = false;
        this.idToken = '';
        this.theme = 'dark';
        this.key = '';
    }

    static create(userSettings) {
        return fetch(USERSETTINGS_LINK, {
            method: 'POST',
            body: JSON.stringify(userSettings),
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
    }

    static get(userId) {
        if (!userId) {
            return Promise.resolve('unauthorized')
        }
        return fetch(USERSETTINGS_LINK, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then(response => {
                if (response && response.error) {
                    return 'Something went wrong.'
                }
                return Object.entries(response).find(
                    ([key, value]) => value.userId === userId
                )
            })
    }

    static update(userSettings) {
        if (!userSettings) {
            return Promise.resolve('Unauthorized')
        }
        return fetch(USERSETTINGS_LINK, {
            method: 'PATCH',
            body: JSON.stringify(userSettings),
            headers: {'Content-Type': 'application/json'},
        })
            .then(response => response.json())
    }
}