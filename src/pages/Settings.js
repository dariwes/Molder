import userPhoto from "../assets/user.png";
import {Block} from "./Block";
import {User} from "../models/UserModel";
import {HOME_ROUTE} from "../App";


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
                    <input type="text" class="form__input" placeholder="password" name="password" id="username" value="db not connected yet">
                    <input type="email" class="form__input" placeholder="email" name="email" id="email" value="email@a.com">
                  </div>
                  <label class="profile__theme">
                    <input type="checkbox" class="profile__checkbox" ${this.user.theme === 'light' ? 'checked' : ''}">
                    <span class="profile__switch"></span>
                  </label>
                  <button type="submit" class="btn form__btn profile__btn">save changes</button>
                  <a type="submit" class="profile__logoff btn form__btn">log off</a>
                </form>
              </section>
        `
    }

    updateUser (event) {
        event.preventDefault()
        this.user = JSON.parse(localStorage.getItem('user'))

        const isChecked = event.target.querySelector('.profile__checkbox').checked
        this.user.theme = isChecked ? 'light' : 'dark'

        localStorage.setItem('user', JSON.stringify(this.user))
        window.location.reload()
    }

    logoff (event) {
        event.preventDefault()
        localStorage.setItem('user', JSON.stringify(new User()))
        document.location.pathname = HOME_ROUTE
    }
}
