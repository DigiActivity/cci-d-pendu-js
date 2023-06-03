
let motSecret = undefined
let indice = undefined

fetch('https://trouve-mot.fr/api/random').then(r => r.json()).then(d => {
    motSecret = d[0].name
    indice = d[0].categorie
    document.querySelector('.indice').innerHTML = indice
})
