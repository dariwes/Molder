import '../css/about.css'
import molder from '../assets/molder.png'
import ring from '../assets/ring.png'
import {Block} from "./Block";
import {Skills} from "../components/Skills";


export class About extends Block {
    constructor({selector, classes}) {
        super({selector, classes})
    }

    get template() {
        let skills = [
            '',
            'computational thinking',
            'problem-solving skills',
            'creative teaching and learning',
            'self-expression and cooperation',
            'equality in computing'
        ]

        return `
            <section class="${['about', ...this.props.classes].join(' ')}">
                <article class="about__dfn dfn">
                    <dfn title="molder" class="dfn__meaning">
                        <img src="${molder}" alt="molder" class="dfn__image">
                    </dfn>
                    <p class="dfn__definition">is a programming language with a simple visual interface
                    that allows people to create their own projects without programming knowledge.</p>
                </article>
                <h1 class="h1">molder develops</h1>
                ${Skills({classes: ['about__skills'], skills, image: ring})}
            </section>
        `
    }
}
