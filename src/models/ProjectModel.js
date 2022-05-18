const PROJECT_LINK = ``


export class Project {
    static create(block) {
        console.log(block)
        return fetch(PROJECT_LINK, {
            method: 'POST',
            body: JSON.stringify(block),
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
    }

    static get(userId) {
        if (!userId) {
            return Promise.resolve('unauthorized')
        }
        return fetch(PROJECT_LINK, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then(response => {
                if (response && response.error) {
                    return 'Something went wrong.'
                }
                let projects = []
                Object.keys(response).forEach(key => {
                    if (response[key].userId === userId) {
                        projects.push(response[key])
                    }
                })
                return projects
            })
    }
    static getById(projectId) {
        return fetch(PROJECT_LINK, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then(response => {
                if (response && response.error) {
                    return 'Something went wrong.'
                }
                return Object.values(response).find(value => value.id === projectId)
            })
    }
}