export class Block {
    constructor({selector, ...props}) {
        this.$el = document.querySelector(selector)
        this.props = props
        this.init()
    }

    init() {
        this.$el.insertAdjacentHTML('afterbegin', this.template)
    }

    get template() {
        throw new Error('Needs to be redefined.')
    }
}