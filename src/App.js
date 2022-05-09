import {MainInfo} from "./pages/MainInfo";
import {About} from "./pages/About";
import {AuthForm} from "./pages/AuthForm";
import {Workplace} from "./pages/Workplace";
import {Settings} from "./pages/Settings";
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {Block} from "./pages/Block";
import {Projects} from "./pages/Projects";


export const HOME_ROUTE = '/home'
export const ABOUT_ROUTE = '/about'
export const SIGNIN_ROUTE = '/signin'
export const SIGNUP_ROUTE = '/signup'
export const WORKPLACE_ROUTE = '/workplace'
export const SETTINGS_ROUTE = '/settings'
export const PROJECTS_ROUTE = '/projects'


const routes = {
    [HOME_ROUTE]: MainInfo,
    [ABOUT_ROUTE]: About,
    [SIGNIN_ROUTE]: AuthForm,
    [SIGNUP_ROUTE]: AuthForm,
    [WORKPLACE_ROUTE]: Workplace,
    [SETTINGS_ROUTE]: Settings,
    [PROJECTS_ROUTE]: Projects,
}


export class App extends Block {
    constructor({selector}) {
        super({selector})
    }

    init() {
        super.init()

        Object.keys(routes).forEach(key => {
            if (key === document.location.pathname) {
                this.main = new routes[key]({selector: 'main', classes: ['container']})
            }
        })
    }

    get template() {
        return `
            ${Header()}
            <main class="main"></main>
            ${Footer()}
        `
    }
}