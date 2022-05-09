class BlockModel  {
    constructor ({id, tag, isClosing = true, isDraggable = true, blockId = '', classes = [], args = [], name = '', type = '', color = ''}) {
        this.id = id;
        this.tag = tag;
        this.isClosing = isClosing;
        this.isDraggable = isDraggable;
        this.blockId = blockId;
        this.classes = classes;
        this.args = args;
        this.name = name;
        this.type = type;
        this.color = color;
    }

    get template() {
        return `
            <${this.tag} 
                ${this.blockId ? `id="${this.blockId}"` : ''} 
                ${this.classes ? `class="${this.classes.join(' ')}"` : ''} 
                ${this.isDraggable ? 'draggable="true"' : ''} 
                ${this.name ? `name="${this.name}"` : ''} 
                ${this.type ? `type="${this.type}"` : ''} 
            >
            ${this.isClosing ? `${this.args.join(' ')}</${this.tag}>` : ''}
        `
    }
}


export class Blocks {
    static create(block) {
        console.log(block)
        return fetch(BLOCKS_LINK, {
            method: 'POST',
            body: JSON.stringify(block),
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
    }

    static get(token) {
        if (!token) {
            return Promise.resolve('unauthorized')
        }
        return fetch(BLOCKS_LINK, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then(response => {
                if (response && response.error) {
                    return 'Something went wrong.'
                }
                let blocks = []
                Object.keys(response).forEach(key => {
                    blocks.push(new BlockModel(response[key]))
                })
                return blocks
            })
    }
}


const MoveRightBlock = new BlockModel({
    id: 1,
    tag: 'div',
    isClosing: true,
    isDraggable: true,
    blockId: 'block-move-right',
    classes: ['block', 'block-move', 'move-right'],
    args: [
        new BlockModel({tag: 'input', isClosing: false, isDraggable: false, classes: ['block__input'], name: 'right', type: 'number'}).template,
        'steps to the right'
    ]
});

const MoveLeftBlock = new BlockModel({
    id: 2,
    tag: 'div',
    isClosing: true,
    isDraggable: true,
    blockId: 'block-move-left',
    classes: ['block', 'block-move', 'move-left'],
    args: [
        new BlockModel({tag: 'input', isClosing: false, isDraggable: false, classes: ['block__input'], name: 'left', type: 'number'}).template,
        'steps to the left'
    ]
});

const MoveUpBlock = new BlockModel({
    id: 3,
    tag: 'div',
    isClosing: true,
    isDraggable: true,
    blockId: 'block-move-up',
    classes: ['block', 'block-move', 'move-up'],
    args: [
        new BlockModel({tag: 'input', isClosing: false, isDraggable: false, classes: ['block__input'], name: 'up', type: 'number'}).template,
        'steps up'
    ]
});

const MoveDownBlock = new BlockModel({
    id: 4,
    tag: 'div',
    isClosing: true,
    isDraggable: true,
    blockId: 'block-move-down',
    classes: ['block', 'block-move', 'block-down'],
    args: [
        new BlockModel({tag: 'input', isClosing: false, isDraggable: false, classes: ['block__input'], name: 'down', type: 'number'}).template,
        'steps down'
    ]
});

const SayBlock = new BlockModel({
    id: 5,
    tag: 'div',
    isClosing: true,
    isDraggable: true,
    blockId: 'block-say',
    classes: ['block', 'block-say', 'say'],
    args: [
        'say',
        new BlockModel({tag: 'input', isClosing: false, isDraggable: false, classes: ['block__input'], type: 'text'}).template,
        'for',
        new BlockModel({tag: 'input', isClosing: false, isDraggable: false, classes: ['block__input'], type: 'number'}).template,
        'seconds'
    ]
});

const WaitBlock = new BlockModel({
    id: 6,
    tag: 'div',
    isClosing: true,
    isDraggable: true,
    blockId: 'block-wait',
    classes: ['block', 'block-wait', 'wait'],
    args: [
        'wait',
        new BlockModel({tag: 'input', isClosing: false, isDraggable: false, classes: ['block__input'], type: 'number'}).template,
        'seconds'
    ]
});

export const blocks = [
    MoveRightBlock,
    MoveLeftBlock,
    MoveUpBlock,
    MoveDownBlock,
    SayBlock,
    WaitBlock,
]