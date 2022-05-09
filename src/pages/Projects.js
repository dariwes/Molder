import {Block} from "./Block";
import {Project} from "../models/ProjectModel";
import {WORKPLACE_ROUTE} from "../App";


export class Projects extends Block {
    constructor({selector, classes}) {
        super({selector, classes})
    }

    init() {
        super.init();
        this.user = JSON.parse(localStorage.getItem('user'))
        Project.get(this.user.userId).then(response => {
            response.forEach(item => {
                document.querySelector('.projects')
                    .insertAdjacentHTML(
                        'beforeend',
                        `<a href="" class="projects__item blur" id="${item.id}">${item.title}</a>`
                    )
                document.querySelector(`#${item.id}`).addEventListener('click', this.openProject)
            })
        })
    }

    get template() {
        return `
            <section class="${['projects', ...this.props.classes].join(' ')}">
                <h1 class="h1">My projects</h1>
            </section>
        `
    }

    openProject(event) {
        event.preventDefault()
        localStorage.setItem('projectId', event.target.id);
        document.location.pathname = WORKPLACE_ROUTE
    }
}
