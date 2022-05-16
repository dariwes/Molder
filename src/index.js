import {App} from './App'
import {UserSettings} from "./models/UserSettingsModel";


if (!JSON.parse(localStorage.getItem('user'))) {
    localStorage.setItem('user', JSON.stringify(new UserSettings()));
}
new App({selector: 'body'})