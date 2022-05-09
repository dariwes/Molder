import logo from '../assets/logo.svg'


export const Header = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    return `
        <header class="header">
            <section class="container header__container">
                <a href="home"><img src="${logo}" alt="molder" class="header__logo"></a>
                <div class="header__menu menu">
                    <input type="checkbox" class="menu__checkbox" id="menu__checkbox">
                        <label for="menu__checkbox" class="menu__label"></label>
                        <span class="menu__line first"></span>
                        <span class="menu__line second"></span>
                        <span class="menu__line third"></span>
                        <span class="menu__line fourth"></span>
                </div>
                <nav class="header__nav">
                    <ul role="list">
                        <li><a href="about" class="header__about">about</a></li>
                        ${user.isAuth
                        ? '<li><a href="workplace" class="btn header__workplace">workplace</a></li>' +
                        '<li><a href="settings" class="btn header__settings">settings</a></li>'
                        : '<li><a href="signin" class="header__sign-in btn">sign in</a></li>' +
                          '<li><a href="signup" class="header__signup btn">sign up</a></li>'
                        }
                    </ul>
                </nav>
            </section>
        </header>
    `
}