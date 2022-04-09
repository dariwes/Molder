import {setTheme} from "../utils";

export class Block {
    constructor({selector, ...props}) {
        this.$el = document.querySelector(selector)
        this.props = props
        this.init()
    }

    init() {
        setTheme(JSON.parse(localStorage.getItem('user')).theme)
        this.$el.insertAdjacentHTML('afterbegin', this.template)
    }

    get template() {
        throw new Error('Needs to be redefined.')
    }
}