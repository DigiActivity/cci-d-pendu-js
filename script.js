let motSecret = []
let indice = undefined

fetch('https://trouve-mot.fr/api/random').then(r => r.json()).then(d => {
    // On isole toutes les lettres du mot à deviner
    const mesLettres = d[0].name.split("")
    // Pour chaque lettre, on va transformer "a" en structure : {lettre: "a", trouvee: false}
    // on utilise la méthode "map"
    motSecret = mesLettres.map((lettre) => {
        return { lettre: lettre, trouvee: false }
    })

    console.log(motSecret)

    // on affiche l'indice dans le DOM
    indice = d[0].categorie
    document.querySelector('.indice').innerHTML = indice

})
