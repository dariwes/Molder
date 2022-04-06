export const Skills = ({classes = [], skills = [], image}) => {
    let resultSkills = skills.reduce((result, skill) => {
        result += `<p class="skills__skill"><img src="${image}" alt="" class="skill__ring">${skill}</p>`
        return result
    })

    return `
        <article class="${['skills', ...classes].join(' ')}">
            ${resultSkills}
        </article>
    `
}