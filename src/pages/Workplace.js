import '../css/workplace.css'
import monster from "../assets/monster.png"
import {Block} from "./Block";


export class Workplace extends Block {
    constructor({selector, classes}) {
        super({selector, classes})
    }

    get template() {
        return `
            <section class="${['workplace', ...this.props.classes].join(' ')}">
                <section class="workplace__board place"></section>
                <section class="workplace__character">
                    <img src="${monster}" alt="monster" class="character__image">
                </section>
                <section class="workplace__tools place">
                    <div draggable="true" class="block">
                        go to x: <input type="text" class="block__input"> y: <input type="text" class="block__input">
                    </div>
                </section>
            </section>
        `
    }
}
