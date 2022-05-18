import {Form} from "../components/Form";
import {Block} from "./Block";
import {login, registration} from "../Auth";
import {SIGNUP_ROUTE, WORKPLACE_ROUTE} from "../App";


export class AuthForm extends Block {
    constructor({selector, classes}) {
        super({selector, classes})
    }

    init() {
        super.init()
        this.$el.addEventListener('submit', this.auth.bind(this))
    }

    get template() {
        let title = location.pathname === SIGNUP_ROUTE ? 'sign up' : 'sign in'
        let fields = `
            <label class="form__label" for="email">email:</label>
            <input type="email" placeholder="email" name="email" class="form__input" id="email" required>
            <label class="form__label" for="password">password:</label>
            <input type="password" placeholder="password" name="password" class="form__input" id="password" autocomplete="true" required>
        `
        if (location.pathname === SIGNUP_ROUTE) {
            fields = `
                <label class="form__label" for="username">username:</label>
                <input type="text" placeholder="username" name="username" class="form__input" id="username" required>
            ` + fields + `
                <input type="password" placeholder="password again" name="password2" class="form__input" id="password2" required>
            `
        }
        fields = `<h1 class="h1">${title}</h1>` + fields

        return `
            <section class="${this.props.classes}">
                ${Form({classes: ['sign__form'], fields, buttonTitle: title})}
            </section>
        `
    }

    auth(event) {
        event.preventDefault()
        const email = event.target.querySelector('#email').value
        const password = event.target.querySelector('#password').value

        if (location.pathname === SIGNUP_ROUTE) {
            const username = event.target.querySelector('#username').value
            const password_2 = event.target.querySelector('#password2').value
            registration(username, email, password, password_2)
                .then(response => {
                    if (typeof response === 'string') {
                        if (!document.querySelector('.error')) {
                            document.querySelector('.h1')
                                .insertAdjacentHTML(
                                    'afterend',
                                    `<p class="error">${response}</p>`
                                )
                        }
                    } else {
                        localStorage.setItem('user', JSON.stringify(response))
                        document.location.pathname = WORKPLACE_ROUTE
                    }
                })
        }
         else {
            login(email, password)
                .then(response => {
                    if (typeof response === 'string') {
                        if (!document.querySelector('.error')) {
                            document.querySelector('.h1')
                                .insertAdjacentHTML(
                                    'afterend',
                                    `<p class="error">${response}</p>`
                                )
                        }
                    } else {
                        localStorage.setItem('user', JSON.stringify(response))
                        document.location.pathname = WORKPLACE_ROUTE
                    }
                })
        }
    }
}
