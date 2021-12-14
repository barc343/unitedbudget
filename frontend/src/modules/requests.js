import {AppConfig} from '../config'

class RequestHandler {
    constructor() {
        this.host = AppConfig.host;
        if (JSON.parse(sessionStorage.getItem('token')) && JSON.parse(sessionStorage.getItem('token')).hasOwnProperty('access')) {
            this.accessToken = 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))['access']
            this.refreshToken = JSON.parse(sessionStorage.getItem('token'))['refresh']
        }
        if (sessionStorage.getItem('token') && JSON.parse(sessionStorage.getItem('token')).hasOwnProperty('access')) {
            this.refresh_token().then(resp =>{
                if (resp.hasOwnProperty('access')) {
                    let old_token = JSON.parse(sessionStorage.getItem('token'))
                    old_token.access = resp.access
                    sessionStorage.setItem('token', JSON.stringify(old_token))
                } else {
                    sessionStorage.removeItem('token')
                }
            })
        }
    }

    async loginUser(loginData = {}) {
        const response = await fetch(this.host + 'token/', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(loginData) // body data type must match "Content-Type" header
        });
        if (response.ok) {
            return response.json();
        }
        return response.text()
    }

    async registerUser(registerData = {}) {
        const response = await fetch(this.host + 'register/', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(registerData) // body data type must match "Content-Type" header
        });
        if (response.ok) {
            return response.json();
        }
        return response.text()
    }

    getHeaders() {
        let headers = {}
        headers['Content-Type'] = 'application/json'
        headers['Authorization'] = this.accessToken
        return headers
    }

    async postData(url = '', data = {}) {
        let hostUrl = this.host + url
        let headers = this.getHeaders()
        const response = await fetch(hostUrl, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: headers,
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        if (response.ok) {
            return response.json();
        }
        return response.text()
        // parses JSON response into native JavaScript objects
    }

    async patchData(url = '', data = {}) {
        let hostUrl = this.host + url
        let headers = this.getHeaders()
        const response = await fetch(hostUrl, {
            method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
            headers: headers,
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        if (response.ok) {
            return response.json();
        }
        return response.text()
        // parses JSON response into native JavaScript objects
    }

    async getData(url = '') {
        let hostUrl = this.host + url
        let headers = this.getHeaders()
        const response = await fetch(hostUrl, {
            method: 'GET',
            headers: headers,
        })
        // if (response.ok) {
        //     return response.json();
        // }
        // return response.text()
        return response.json();
    }

    async deleteData(url = '') {
        let hostUrl = this.host + url
        let headers = this.getHeaders()
        const response = await fetch(hostUrl, {
            method: 'DELETE',
            headers: headers,
        })
        // if (response.ok) {
        //     return response.json();
        // }
        // return response.text()
        return response.json();
    }

    async refresh_token() {
        const hostUrl = this.host + 'token/refresh/'
        const headers = {
            'Content-Type': 'application/json',
        }
        const response = await fetch(hostUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({'refresh': this.refreshToken})
        })
        if (response.ok) {
            return response.json();
        }
        return response.text()
    }
}

export const apiHandler = new RequestHandler()