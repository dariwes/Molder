const BLOCKS_LINK = ''


export class Blocks {
    static create(block) {
        return fetch(BLOCKS_LINK, {
            method: 'POST',
            body: JSON.stringify(block),
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
    }

    static get(token) {
        if (!token) {
            return Promise.resolve('?')
        }
        return fetch(BLOCKS_LINK + `?auth${token}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then(response => {
                if (response && response.error) {
                    return '?'
                }
                return response
            })
    }
}