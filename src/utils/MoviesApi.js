class MoviesApi {
    constructor(options) {
        this.baseUrl = options.baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getAllMovies() {
        return fetch(`${this.baseUrl}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => { return this._checkResponse(res) })
    }

}

export const moviesApi = new MoviesApi({
    baseUrl: ' https://api.nomoreparties.co/beatfilm-movies',
}); 