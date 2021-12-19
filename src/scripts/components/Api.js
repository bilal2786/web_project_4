export default class Api {
    constructor(options) {
        this._url = options.baseUrl
        this._token = options.token
    }

    async getInitialCards() {
        const response = await fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._token
            }
        })
        if (response.ok) {
            return response.json();
        }
        else {
            console.log("something goes wrong")
        }
    }
    async getUserData() {
        const response = await fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
        if (response.ok) {
            return response.json();
        }
        else {
            console.log("something goes wrong")
        }


    }
    async uploadCard(name, link) {
        const response = await fetch(`${this._url}/cards`, {
            method: "POST",
            headers: {
                authorization: this._token,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        if (response.ok) {
            return response.json();

        }
        else {
            console.log('something goes wrong')
        }


    }
    async updatingProfileInfo(name, about) {
        const response = await fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        if (response.ok) {
            return response.json();

        }
        else {
            console.log("something goes wrong", response.status, response.statusText)
        }
        console.log(data);
    }
    async updatingProfileImg(link) {
        const response = await fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                avatar: link

            })
        })
        if (response.ok) {
            return response.json();

        }
        else {
            console.log("something goes wrong", response.status, response.statusText)
        }
        console.log(data);
    }

    async deleteCard(cardId) {
        const response = await fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: {
                authorization: this._token,

            }
        })
        if (response.ok) {
            return response.json();

        }
        else {
            console.log("something goes wrong from the backend", response.status, response.statusText)
        }

    }
    async likeCard(cardId) {
        const response = await fetch(`${this._url}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },
        })
        if (response.ok) {
            return response.json();

        }
        else {
            console.log("something goes wrong from the backend", response.status, response.statusText)
        }

    }
    async removeLikeCard(cardId) {
        const response = await fetch(`${this._url}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },

        })
        if (response.ok) {
            return response.json();

        }
        else {
            console.log("something goes wrong from the backend", response.status, response.statusText)
        }
    }
}







