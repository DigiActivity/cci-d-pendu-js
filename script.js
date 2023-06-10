let motSecret = []
let indice = undefined

fetch('https://trouve-mot.fr/api/random').then(r => r.json()).then(d => {

    const mesLettres = d[0].name.split("")

    motSecret = mesLettres.map((lettre) => {
        return { lettre: lettre, trouvee: false }
    })

    console.log(motSecret)

    indice = d[0].categorie
    document.querySelector('.indice').innerHTML = indice

    const formulaireLettre = document.querySelector('#formulaire-lettre')

    formulaireLettre.addEventListener('submit', (e) => {
        // empêcher le rechargement de la page
        e.preventDefault()
        console.log("test")
        // récupérer les données du formulaire
        const data = new FormData(e.target)
        const lettre = data.get("lettre")
        console.log("Ma lettre :", lettre)
    })
})
