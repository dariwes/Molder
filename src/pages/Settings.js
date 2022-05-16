import userPhoto from "../assets/user.png";
import {Block} from "./Block";
import {HOME_ROUTE} from "../App";
import {updateEmail} from "../Auth";
import {UserSettings} from "../models/UserSettingsModel";


export class Settings extends Block {
    constructor({selector, classes}) {
        super({selector, classes})
        this.user = {}
    }

    init() {
        super.init();
        this.$el.addEventListener('submit', this.updateUser)
        if (this.user.isAuth) {
            document.querySelector('.profile__logoff').addEventListener('click', this.logoff)
        }
    }

    get template() {
        this.user = JSON.parse(localStorage.getItem('user'))
        if (!this.user.isAuth) {
            return `<p class="error">You are not authorized to visit this page.</p>`
        }

        return `
            <section class="${['profile', ...this.props.classes].join(' ')}">
                <form class="form profile__form"> 
                  <div class="profile__photo">
                    <img src="${userPhoto}" alt="user">
                  </div>
                  <div class="profile__info">
                    <input type="text" class="form__input" placeholder="username" name="username" id="username" value="${this.user.username}">
                    <input type="email" class="form__input" placeholder="email" name="email" id="email" value="${this.user.email}">
                  </div>
                  <label class="profile__theme">
                    <input type="checkbox" class="profile__checkbox" ${this.user.theme === 'light' ? 'checked' : ''}">
                    <span class="profile__switch"></span>
                  </label>
                  <button type="submit" class="btn form__btn profile__btn">save changes</button>
                  <button type="submit" class="profile__logoff btn form__btn">log off</button>
                </form>
              </section>
        `
    }

    updateUser (event) {
        event.preventDefault()
        let user = JSON.parse(localStorage.getItem('user'))
        const username = event.target.querySelector('input#username').value
        const email = event.target.querySelector('input#email').value
        const theme = event.target.querySelector('.profile__checkbox').checked ? 'light' : 'dark'
        if (user.email !== email) {
            updateEmail(user.idToken, email).then(response => {
                if (response && !response.error) {
                    user.email = response.email
                    user.idToken = response.idToken
                }
            })
        }
        if (user.username !== username || user.theme !== theme) {
            console.log(user)
            UserSettings.update({
                [user.key]: {username, userId: user.userId, theme}
            })
            user.username = username
            user.theme = theme
        }
        localStorage.setItem('user', JSON.stringify(user))
        window.location.reload()
    }

    logoff (event) {
        event.preventDefault()
        localStorage.setItem('user', JSON.stringify(new UserSettings()))
        document.location.pathname = HOME_ROUTE
    }
}
