import {Block} from "./Block";


export class MainInfo extends Block {
    constructor({selector, classes}) {
        super({selector, classes})
    }

    get template() {
        return `
            <section class="${['main-info', ...this.props.classes].join(' ')}">
                <p class="main-info__text">it’s time to create your own application</p>
                <a href="workplace" class="btn main-info__btn">start now!</a>
            </section>
        `
    }
}
