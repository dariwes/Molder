import '../css/settings.css'
import '../css/form.css'
import userPhoto from "../assets/user.png";
import {Block} from "./Block";


export class Settings extends Block {
    constructor({selector, classes}) {
        super({selector, classes})
    }

    get template() {
        return `
            <section class="${['profile', ...this.props.classes].join(' ')}">
                <form class="form profile__form"> 
                  <div class="profile__photo">
                    <img src="${userPhoto}" alt="user">
                  </div>
                  <div class="profile__info">
                    <input type="text" class="form__input" placeholder="password" name="password" id="username" value="username">
                    <input type="email" class="form__input" placeholder="email" name="email" id="email" value="email@a.com">
                  </div>
                  <label class="profile__theme">
                    <input type="checkbox">
                    <span class="profile__switch"></span>
                  </label>
                  <button type="submit" class="btn form__btn profile__btn">save changes</button>
                </form>
              </section>
        `
    }
}
