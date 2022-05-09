import monster from "../assets/monster.png";
import trash from "../assets/trash.png";
import {Block} from "./Block";
import {blocks} from "../models/BlockModel";


export class Workplace extends Block {
    constructor({selector, classes}) {
        super({selector, classes})
    }

    init() {
        super.init();

        document.body.classList.add('blur')
        document.body.style.overflow = 'hidden';

        document.querySelector('.workplace__play')
            .addEventListener('click', this.startPlay)

        Array.from(document.getElementsByClassName('block')).forEach(block => {
            dragBlock(block.id)
        })
    }

    get template() {
        return `
            <section class="${['workplace', ...this.props.classes].join(' ')}">
                <section class="workplace__board place" id="workplace__board"></section>
                <section class="workplace__character">
                    <div class="workplace__play">
                      <i class="fas fa-play"></i>
                    </div>
                    <img src="${monster}" alt="monster" class="character__image">
                </section>
                <section class="workplace__tools place">
                    ${blocks.map(block => block.template).join('')}
                </section>
            </section>
            <img src="${trash}" alt="trash" class="workplace__trash droppable" id="workplace__trash">
        `
    }

    startPlay() {
        const board = document.querySelector('.workplace__board');
        const children = board.children

        Array.from(children).forEach(child => {
            Array.from(child.classList).forEach(className => {
                switch (className) {
                    case 'block-say':
                        say(child.children[0].value, child.children[1].value);
                        break;
                    case 'block-move':
                        const {name} = child.children[0]
                        move({[name]: child.children[0].value});
                        break;
                    case 'block-wait':
                        wait(+child.children[0].value * 1000);
                        break;
                }
            })
        })
    }
}


function dragBlock(block_id) {
    const copyBlock = document.getElementById(block_id);
    const board = document.querySelector('.workplace__board');
    const trash = document.querySelector('.workplace__trash');

    copyBlock.onmousedown = function (event) {
        const block = copyBlock.cloneNode(true);
        block.id = '';
        block.style.position = 'absolute';
        block.style.zIndex = '1000';
        block.style.top = copyBlock.getBoundingClientRect().y + 'px';
        block.style.left = copyBlock.offsetLeft + 'px';

        block.onmousedown = function (event) {
            block.style.transition = 'none';
            let initPositionX = block.style.left;
            let initPositionY = block.style.top;
            let shiftX = event.clientX - block.getBoundingClientRect().left;
            let shiftY = event.clientY - block.getBoundingClientRect().top;

            moveAt(event.pageX, event.pageY);

            function moveAt(pageX, pageY) {
                block.style.left = pageX - shiftX + 'px';
                block.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            block.onmouseup = function (event) {
                block.hidden = true;
                let elementBelow = document.elementFromPoint(event.clientX, event.clientY);
                block.hidden = false;

                if (elementBelow === trash) {
                    trash.style.transform = 'scale(1.2)';

                    setTimeout(() => {
                        block.remove();
                        trash.style.transform = 'scale(1)';
                    }, 1000)
                } else if (
                    board.offsetLeft + board.offsetWidth < event.pageX + shiftX ||
                    board.offsetLeft > event.pageX - shiftX ||
                    board.offsetTop + board.offsetHeight < event.pageY + shiftY ||
                    board.offsetTop > event.pageY - shiftY
                ) {
                    block.style.transition = 'all 500ms ease';
                    block.style.left = initPositionX;
                    block.style.top = initPositionY;
                }

                document.removeEventListener('mousemove', onMouseMove);
                block.onmouseup = null;
            };
        };

        block.ondragstart = function () {
            return false;
        };

        copyBlock.onmouseup = null;
        board.append(block);
        block.onmousedown(event);
    }
}


function say(message, delay) {
    const oldMessage = document.querySelector('.message');
    if (oldMessage) {
        oldMessage.remove()
    }
    const {offsetTop, offsetLeft, offsetWidth} = document.querySelector('.character__image');;
    const response = document.createElement('div');

    response.className = 'message';
    response.innerText = message;
    response.style.top = offsetTop - 10 + 'px';
    response.style.left = offsetLeft + offsetWidth + 'px';
    response.style.maxWidth = document.body.offsetWidth - offsetWidth - offsetLeft - 50 + 'px';

    document.body.append(response);

    setTimeout(() => {
        response.remove()
    }, delay * 1000)
}


function move({left = 0, right = 0, up = 0, down = 0}) {
    const character = document.querySelector('.character__image');
    const {
        left: maxLeft, right: maxRight, top: maxTop, bottom: maxBottom
    } = document.querySelector('.workplace__character').getBoundingClientRect()
    const {
        left: curLeft, right: curRight, top: curTop, bottom: curBottom
    } = character.getBoundingClientRect()

    if (left && curLeft - left > +maxLeft) {
        character.style.left = character.style.left.slice(0, -2) - left + 'px';
    } else if (right && +curRight + +right < +maxRight) {
        character.style.left = +character.style.left.slice(0, -2) + +right + 'px';
    } else if (up && curTop - +up > +maxTop) {
        character.style.top = character.style.top.slice(0, -2) - up + 'px';
    } else if (down && +curBottom + +down < +maxBottom) {
        character.style.top = +character.style.top.slice(0, -2) + +down + 'px';
    }
}

function wait(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
