    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        let photographers = []

        await fetch('data/photographers.json').then(async (response) => {
            let data = await response.json()
            photographers = data.photographers    
        }).catch((err) => {
            console.log('rejected', err)
            })

        // et bien retourner le tableau photographers seulement une fois
        return ({
            photographers})
        
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            // eslint-disable-next-line no-undef
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    