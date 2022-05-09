class BlockModel  {
    constructor ({tag, isClosing = true, isDraggable = true, blockId = '', classes = [], args = [], name = '', type = '', color = ''}) {
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
                id="${this.blockId}" 
                class="${this.classes.join(' ')}" 
                ${this.isDraggable ? 'draggable="true"' : ''} 
                ${this.name ? `name="${this.name}"` : ''} 
                ${this.type ? `type="${this.type}"` : ''} 
            >
            ${this.isClosing ? `${this.args.join(' ')}</${this.tag}>` : ''}
        `
    }
}


const MoveRightBlock = new BlockModel({
    tag: 'div',
    isClosing: true,
    isDraggable: true,
    blockId: 'block-move-right',
    classes: ['block', 'block-move'],
    args: [
        new BlockModel({tag: 'input', isClosing: false, isDraggable: false, classes: ['block__input'], name: 'right', type: 'number'}).template,
        'steps to the right'
    ]
});

const MoveLeftBlock = new BlockModel({
    tag: 'div',
    isClosing: true,
    isDraggable: true,
    blockId: 'block-move-left',
    classes: ['block', 'block-move'],
    args: [
        new BlockModel({tag: 'input', isClosing: false, isDraggable: false, classes: ['block__input'], name: 'left', type: 'number'}).template,
        'steps to the left'
    ]
});

const MoveUpBlock = new BlockModel({
    tag: 'div',
    isClosing: true,
    isDraggable: true,
    blockId: 'block-move-up',
    classes: ['block', 'block-move'],
    args: [
        new BlockModel({tag: 'input', isClosing: false, isDraggable: false, classes: ['block__input'], name: 'up', type: 'number'}).template,
        'steps up'
    ]
});

const MoveDownBlock = new BlockModel({
    tag: 'div',
    isClosing: true,
    isDraggable: true,
    blockId: 'block-move-down',
    classes: ['block', 'block-move'],
    args: [
        new BlockModel({tag: 'input', isClosing: false, isDraggable: false, classes: ['block__input'], name: 'down', type: 'number'}).template,
        'steps down'
    ]
});

const SayBlock = new BlockModel({
    tag: 'div',
    isClosing: true,
    isDraggable: true,
    blockId: 'block-say',
    classes: ['block', 'block-say'],
    args: [
        'say',
        new BlockModel({tag: 'input', isClosing: false, isDraggable: false, classes: ['block__input'], type: 'text'}).template,
        'for',
        new BlockModel({tag: 'input', isClosing: false, isDraggable: false, classes: ['block__input'], type: 'number'}).template,
        'seconds'
    ]
});

const WaitBlock = new BlockModel({
    tag: 'div',
    isClosing: true,
    isDraggable: true,
    blockId: 'block-wait',
    classes: ['block', 'block-wait'],
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