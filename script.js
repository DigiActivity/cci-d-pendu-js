let motSecret = []
let historique = []
let indice = undefined
let nbLettreTrouvees = 0

let motHTML = document.querySelector('div.mot-cache')
let historiqueHTML = document.querySelector('p.historique')

function actualiseMot () {
    // vider les caractères dans motHTML
    motHTML.innerHTML = ""
    // pour chaque obj dans motSecret
    motSecret.forEach(objLettre => {
		// si lettre trouvée : on affiche lettre
        if (objLettre.trouvee === true) {
            motHTML.innerHTML += "<span>" + objLettre.lettre + '</span>'
        }
		// sinon : on affiche -
        else {
            motHTML.innerHTML += "<span>_</span>"
        }
	})
}

function actualiseHistorique() {
    historiqueHTML.innerHTML = historique.join(", ")
}

fetch('https://trouve-mot.fr/api/random').then(r => r.json()).then(d => {

    console.log(d)

    const mesLettres = d[0].name.split("")
    console.log(mesLettres)

    motSecret = mesLettres.map((lettre) => {
        return { lettre: lettre, trouvee: false }
    })
    actualiseMot()

    indice = d[0].categorie
    document.querySelector('.indice').innerHTML = indice

    const formulaireLettre = document.querySelector('#formulaire-lettre')

    formulaireLettre.addEventListener('submit', (e) => {
        // empêcher le rechargement de la page
        e.preventDefault()
        // récupérer les données du formulaire
        const data = new FormData(e.target)
        const lettre = data.get("lettre")
        console.log("Ma lettre :", lettre)
        
        if (historique.includes(lettre)) {
            console.log("La lettre est déjà proposée.")
        } else {
            // on ajoute la lettre à l'historique
            historique.push(lettre)
            console.log(historique)
            actualiseHistorique()
            // si la lettre correspond à une lettre dans motSecret,
            // on va mettre la lettre en "trouvée"
            motSecret.forEach(objLettre => {
                if (lettre === objLettre.lettre && objLettre.trouvee === false) {
                    objLettre.trouvee = true
                    nbLettreTrouvees ++
                }
            })
            actualiseMot()

            if (nbLettreTrouvees === motSecret.length) {
                alert('VICTOIRE')
            }
        }
        
        // on supprime le contenu du formulaire (de l'input)
        e.target.querySelector('input').value = ''
    })
})
