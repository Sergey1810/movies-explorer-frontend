
export class Api {
    constructor(options) {
      this.baseUrl = options.baseUrl;
      this.headers = options.headers;
    }
    _checkResponse(res){
        if(res.ok){
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserInfo(){
       return fetch(`${this.baseUrl}/users/me`, {
        headers: {
            'Authorization': `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
            })
            .then((res) => {return this._checkResponse(res)})
        }
  
    getMyMovies() {
       return fetch(`${this.baseUrl}/movies`, {
        headers: {
            'Authorization': `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {return this._checkResponse(res)})
    }

    setUserInfo(name, email){
    return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
              name: `${name}`,
             email: `${email}`
            })})
            .then(res => {return this._checkResponse(res)})
    }

    setAddMovies(data){
    return fetch(`${this.baseUrl}/movies`, {
            method: 'POST',
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)   
         })
         .then(res => {return this._checkResponse(res)})
        }

    setDeleteMovies(id){ 
    return fetch(`${this.baseUrl}/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              }
            })
            .then(res => {return this._checkResponse(res)})
    }  

    // setAddLike(id){
    //     return fetch(`${this.baseUrl}/cards/${id}/likes`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Authorization': `${localStorage.getItem('token')}`,
    //                 'Content-Type': 'application/json'
    //               }
    //          }) 
    //          .then(res => {return this._checkResponse(res)})
    // }

    // setRemoveLike(id){
    //       return fetch(`${this.baseUrl}/cards/${id}/likes`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Authorization': `${localStorage.getItem('token')}`,
    //                 'Content-Type': 'application/json'
    //               }
    //          })
    //          .then(res => {return this._checkResponse(res)})
    // }

  }

  export const api = new Api({
    baseUrl: 'https://api.ls.nomoreparties.sbs',
    headers: {
      'Content-Type': 'application/json'
    }
  }); 


class Auth {
    constructor(options) {
        this.baseUrl = options.baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    register(email,password, name) {
        return fetch(`${this.baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, name })
        })
            .then(res => { return this._checkResponse(res) })
    }

    authorize(password, email) {
        return fetch(`${this.baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, email })
        })
            .then(res => { return this._checkResponse(res) })
    };

    checkToken(token) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            }
        })
            .then(res => { return this._checkResponse(res) })
    }

}

export const auth = new Auth({
    baseUrl: 'https://api.ls.nomoreparties.sbs',
}); 