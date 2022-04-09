import {App} from './App'
import {User} from "./models/UserModel";


if (!JSON.parse(localStorage.getItem('user'))) {
    localStorage.setItem('user', JSON.stringify(new User()));
}
new App({selector: 'body'})