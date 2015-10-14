export default class Account {

  static username = ''

  constructor (options) {

  }

  isSignedIn () {
    return !!window.localStorage.session
  }

  signUp () {

  }

  confirm () {

  }

  generateToken () {
    return Math.random().toString(36).substring(7)
  }

  signIn () {
    let self = this
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        const token = self.generateToken()
        const user = {
          name: `User #${token}`
        }
        resolve({
          token: token,
          user
        })
        window.localStorage.session = JSON.stringify({
          token,
          user
        })
      }, 300)
    })
  }

  signOut () {
    delete window.localStorage.session
  }

  request () {

  }

  get (id) {
    return this.getAccounts()
      .then((accounts) => {
        return accounts.find((account) => {
          return account.id === id
        })
      })
  }

  fetch () {

  }

  update () {

  }

  validate () {

  }

  on (eventName, handler) {

  }

  save (account) {
    return new Promise(resolve =>
      setTimeout(() => {
        var accounts = JSON.parse(window.localStorage.accounts || '[]')
        if (account.id) {
          var index = accounts.findIndex((a) => {
            console.log(account.id, a.id)
            return account.id === a.id
          })
          accounts[index] = account
        } else {
          account.id = this.generateToken()
          accounts.push(account)
        }
        window.localStorage.accounts = JSON.stringify(accounts)
        return resolve(account)
      }, 1000)
    )
  }

  getAccounts () {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve(JSON.parse(window.localStorage.accounts || '[]'))
      }, 1000)
    )
  }

}
