import '../css/form.css'


export const Form = ({classes = [], fields, buttonTitle = ''}) => {
    return `
        <form class="${['form', ...classes].join(' ')}">
            ${fields}
            <button type="submit" class="btn form__btn">${buttonTitle}</button>
        </form>
    `
}