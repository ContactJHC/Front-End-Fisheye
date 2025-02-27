


async function getData() {

    let data = ''
    // Récupération des productions des artistes
    await fetch('data/photographers.json').then(async (response) => {
        // on récupère les données photographers et media
        data = await response.json()  
    }).catch((err) => {
        console.log('rejected', err)
        })

    // on retourne l'objet data
    return (data)
}

function displayPhotos(dataAllMediaOneID) {
    // dataAllMediaOneID vaut data.media triée selon l'ID de l'artiste de la page affichée
    const sectionPhotographPhotos = document.querySelector(".photograph-photos")
    // On affiche en HTML toutes les photos et vidéos de l'artiste en parcourant dataAllMediaOneID
    dataAllMediaOneID.forEach((e) => {
        // eslint-disable-next-line no-undef
        const mediaOneId = media(e)
        const oneArtworksDOM = mediaOneId()        
        sectionPhotographPhotos.appendChild(oneArtworksDOM)
    // l'affichage HTML d'une Card de photo/vidéo se fait par l'appel de la méthode cardOneArtwork

    })
    
        
    
}

const params = (new URL(document.location)).searchParams
const idOnePhotographer = params.get('id')

async function allMediaOnePhotographerFunction() {
    // Récupère les datas des photographes, photographer et media
    const allData = await getData();
    //  Récupère les photos du photographe dont la page est affichée
    const allMediaOnePhotographer = 
        allData.media.filter(e => e.photographerId == idOnePhotographer)
    const tableauResultats = [allData, allMediaOnePhotographer]
    return tableauResultats
}

async function lightboxFunction(allMediaOnePhotographer) {

    // Créer la lightbox - récupérer src, implémenter un indice, récupérer le titre
    let arrayRefSrc = []
    let arrayIndex = []
    let arrayTitle = []
    let refSrc = ''
    let index = 0
    // displayPhotos(allMediaOnePhotographer)
    // alt vaut title, pas besoin de le déclarer 
    allMediaOnePhotographer.forEach((dataOneArtwork) => {
        const {photographerId, title, image, video} = dataOneArtwork
        // distinction entre image et vidéo        
        if (dataOneArtwork.image) {
            refSrc = `assets/images/${photographerId}/${image}`
            arrayRefSrc.push(refSrc)
            arrayIndex.push(index)
            arrayTitle.push(title)
            index ++
        } else {
            refSrc = `assets/images/${photographerId}/${video}`
            arrayRefSrc.push(refSrc)
            arrayIndex.push(index)
            arrayTitle.push(title)
            index ++
        }
    })
    // affichage d'une image cliquée dans la lightbox
    const photosAffichees = document.querySelectorAll(".photoAffichee, .videoAffichee")
    const lightboxContainerVideo = document.createElement('video')
    const lightboxContainerVideoSource = document.createElement('source')
    photosAffichees.forEach((uneSeulePhoto,indexUneSeulePhoto) => {
        uneSeulePhoto.addEventListener("click", () => {
// affichage du titre pour image et pour vidéo 
        let titreDeLaPhoto = document.querySelector('div.lightbox__title')
        let indexPhoto = indexUneSeulePhoto
        titreDeLaPhoto.textContent = arrayTitle[indexPhoto]

// affichage photo et vidéo                
        const LAlightbox = document.querySelector('#lightbox')
        LAlightbox.style.display = 'block'
        const lightboxContainer = document.querySelector('.lightbox__container')
        const lightboxContainerImg = document.querySelector('div.lightbox__container img')
        const croixDeFermeture = document.querySelector(".lightbox__close")
        LAlightbox.setAttribute('tabindex','0')
        LAlightbox.focus()

        
        if (uneSeulePhoto.classList.contains('videoAffichee')) {
            let sourceVideo = arrayRefSrc[indexPhoto]
            lightboxContainerImg.style.display = 'none'
            lightboxContainerImg.setAttribute('aria-hidden', 'true')
            lightboxContainerVideo.style.display = 'block'
            lightboxContainerVideo.setAttribute('aria-hidden', 'false')
    // Création de l'élément complet de lecture vidéo - en cas de premier clic sur vidéo
            lightboxContainerVideo.setAttribute('class', 'htmlVideo')
            lightboxContainerVideo.setAttribute('controls', '')
            lightboxContainerVideoSource.setAttribute('src', sourceVideo)
            lightboxContainerVideoSource.setAttribute('type', 'video/mp4')
            lightboxContainerVideoSource.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
            lightboxContainer.insertBefore(lightboxContainerVideo, titreDeLaPhoto)
            lightboxContainerVideo.appendChild(lightboxContainerVideoSource)
    // fermeture de la lightbox au clic pour empêcher l'empilement de vidéos consécutives
            croixDeFermeture.addEventListener('click', () => {
                LAlightbox.style.display = 'none'
                lightboxContainerVideo.style.display = 'none'
                lightboxContainerVideo.setAttribute('aria-hidden', 'true')
            })
                        
        } else {

    // changement attributs de l'élément img HTML - en cas de premier clic sur image
            lightboxContainerImg.style.display = 'block'
            let sourcePhoto = uneSeulePhoto.getAttribute('src')
            lightboxContainerImg.setAttribute('src', sourcePhoto)
            lightboxContainerImg.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
            lightboxContainerVideo.setAttribute('aria-hidden', 'true')
            lightboxContainerImg.setAttribute('aria-hidden', 'false')

        }            

                // navigations photos de gauche au clic sur la flèche 'précédent'
        const flechePrecedent = document.querySelector('.lightbox__prev')        
        const nombrePhotos = photosAffichees.length
        flechePrecedent.addEventListener("click", () => {
            if (indexPhoto == 0) {
                // lightboxContainerVideo.style.display = 'none'
                indexPhoto = nombrePhotos - 1
        // cas : passer d'une image à une vidéo précédente en début de liste
                if (photosAffichees[indexPhoto].classList.contains('videoAffichee')) {
                    lightboxContainerVideo.style.display = 'block'
                    lightboxContainerImg.setAttribute('aria-hidden', 'true')
                    lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                    lightboxContainerImg.style.display = 'none'
                    let sourceVideo = arrayRefSrc[indexPhoto]
                    lightboxContainerVideo.setAttribute('class', 'htmlVideo')
                    lightboxContainerVideo.setAttribute('controls', '')
                    lightboxContainerVideoSource.setAttribute('src', sourceVideo)
                    lightboxContainerVideoSource.setAttribute('type', 'video/mp4')
                    lightboxContainerVideoSource.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                    lightboxContainer.insertBefore(lightboxContainerVideo, titreDeLaPhoto)
                    lightboxContainerVideo.appendChild(lightboxContainerVideoSource)
            // fermeture de la lightbox au clic pour empêcher l'empilement consécutif de vidéos 
                    croixDeFermeture.addEventListener('click', () => {
                        LAlightbox.style.display = 'none'
                        lightboxContainerVideo.style.display = 'none'
                        lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                    })
                    titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
    // cas : passer d'une image à une image précente en début de liste
                } else {
                    let sourcePhoto = arrayRefSrc[indexPhoto]
                    lightboxContainerImg.style.display = 'block'
                    lightboxContainerVideo.setAttribute('aria-hidden', 'true')
                    lightboxContainerImg.setAttribute('aria-hidden', 'false')

                    lightboxContainerVideo.style.display = 'none'
                    lightboxContainerImg.setAttribute('src', sourcePhoto)
                    lightboxContainerImg.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                    titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                }

            } else { 
                // cas : passer d'une vidéo à une image 
                if (uneSeulePhoto.classList.contains('videoAffichee')) {
                    lightboxContainerVideo.style.display = 'none'
                    lightboxContainerImg.style.display = 'block' 
                    lightboxContainerImg.setAttribute('aria-hidden', 'false')
                    lightboxContainerVideo.setAttribute('aria-hidden', 'true')


                    }
                indexPhoto = indexPhoto - 1 
                // cas : passer d'une image à une vidéo précédente qqs indice non nul
                if (photosAffichees[indexPhoto].classList.contains('videoAffichee')) {
                    let sourceVideo = arrayRefSrc[indexPhoto]
                    lightboxContainerImg.style.display = 'none'
                    lightboxContainerImg.setAttribute('aria-hidden', 'true')
                    lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                    lightboxContainerVideo.style.display = 'block'
                    lightboxContainerVideo.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                    lightboxContainerVideoSource.setAttribute('src', sourceVideo)
                    lightboxContainerVideoSource.setAttribute('type', 'video/mp4')                        
                    lightboxContainerVideo.setAttribute('class', 'htmlVideo')
                    lightboxContainerVideo.setAttribute('controls', '')
                    lightboxContainer.insertBefore(lightboxContainerVideo, titreDeLaPhoto)
                    lightboxContainerVideo.appendChild(lightboxContainerVideoSource)
            // fermeture de la lightbox au clic pour empêcher l'empilement consécutif de vidéos 
                    croixDeFermeture.addEventListener('click', () => {
                        LAlightbox.style.display = 'none'
                        lightboxContainerVideo.style.display = 'none'
                        lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                    })
                    titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                //cas : passer d'une image à une image précédente qqs indice non nul
                } else {
                    let sourcePhoto = arrayRefSrc[indexPhoto]
                    lightboxContainerImg.style.display = 'block'
                    lightboxContainerVideo.style.display = 'none'
                    lightboxContainerVideo.setAttribute('aria-hidden', 'true')
                    lightboxContainerImg.setAttribute('aria-hidden', 'false')
                    lightboxContainerImg.setAttribute('src', sourcePhoto)
                    lightboxContainerImg.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                    titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                }
        }})
        // navigation photos de gauche en appuyant sur la flèche de gauche du clavier
        LAlightbox.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft') {
                console.log('entrée entendue');
                if (indexPhoto == 0) {
                    // lightboxContainerVideo.style.display = 'none'
                    indexPhoto = nombrePhotos - 1
            // cas : passer d'une image à une vidéo précédente en début de liste
                    if (photosAffichees[indexPhoto].classList.contains('videoAffichee')) {
                        lightboxContainerVideo.style.display = 'block'
                        lightboxContainerImg.setAttribute('aria-hidden', 'true')
                        lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                        lightboxContainerImg.style.display = 'none'
                        let sourceVideo = arrayRefSrc[indexPhoto]
                        lightboxContainerVideo.setAttribute('class', 'htmlVideo')
                        lightboxContainerVideo.setAttribute('controls', '')
                        lightboxContainerVideoSource.setAttribute('src', sourceVideo)
                        lightboxContainerVideoSource.setAttribute('type', 'video/mp4')
                        lightboxContainerVideoSource.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                        lightboxContainer.insertBefore(lightboxContainerVideo, titreDeLaPhoto)
                        lightboxContainerVideo.appendChild(lightboxContainerVideoSource)
                // fermeture de la lightbox au clic pour empêcher l'empilement consécutif de vidéos 
                        croixDeFermeture.addEventListener('click', () => {
                            LAlightbox.style.display = 'none'
                            lightboxContainerVideo.style.display = 'none'
                            lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                        })
                        titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
        // cas : passer d'une image à une image précente en début de liste
                    } else {
                        let sourcePhoto = arrayRefSrc[indexPhoto]
                        lightboxContainerImg.style.display = 'block'
                        lightboxContainerVideo.setAttribute('aria-hidden', 'true')
                        lightboxContainerImg.setAttribute('aria-hidden', 'false')

                        lightboxContainerVideo.style.display = 'none'
                        lightboxContainerImg.setAttribute('src', sourcePhoto)
                        lightboxContainerImg.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                        titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                    }

                } else { 
                    // cas : passer d'une vidéo à une image 
                    if (uneSeulePhoto.classList.contains('videoAffichee')) {
                        lightboxContainerVideo.style.display = 'none'
                        lightboxContainerImg.style.display = 'block' 
                        lightboxContainerImg.setAttribute('aria-hidden', 'false')
                        lightboxContainerVideo.setAttribute('aria-hidden', 'true')


                        }
                    indexPhoto = indexPhoto - 1 
                    // cas : passer d'une image à une vidéo précédente qqs indice non nul
                    if (photosAffichees[indexPhoto].classList.contains('videoAffichee')) {
                        let sourceVideo = arrayRefSrc[indexPhoto]
                        lightboxContainerImg.style.display = 'none'
                        lightboxContainerImg.setAttribute('aria-hidden', 'true')
                        lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                        lightboxContainerVideo.style.display = 'block'
                        lightboxContainerVideo.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                        lightboxContainerVideoSource.setAttribute('src', sourceVideo)
                        lightboxContainerVideoSource.setAttribute('type', 'video/mp4')                        
                        lightboxContainerVideo.setAttribute('class', 'htmlVideo')
                        lightboxContainerVideo.setAttribute('controls', '')
                        lightboxContainer.insertBefore(lightboxContainerVideo, titreDeLaPhoto)
                        lightboxContainerVideo.appendChild(lightboxContainerVideoSource)
                // fermeture de la lightbox au clic pour empêcher l'empilement consécutif de vidéos 
                        croixDeFermeture.addEventListener('click', () => {
                            LAlightbox.style.display = 'none'
                            lightboxContainerVideo.style.display = 'none'
                            lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                        })
                        titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                    //cas : passer d'une image à une image précédente qqs indice non nul
                    } else {
                        let sourcePhoto = arrayRefSrc[indexPhoto]
                        lightboxContainerImg.style.display = 'block'
                        lightboxContainerVideo.style.display = 'none'
                        lightboxContainerVideo.setAttribute('aria-hidden', 'true')
                        lightboxContainerImg.setAttribute('aria-hidden', 'false')
                        lightboxContainerImg.setAttribute('src', sourcePhoto)
                        lightboxContainerImg.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                        titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                    }
                }
            }
        })
    // navigations photos de droite au clic sur la flèche 'suivant'
        const flecheSuivant = document.querySelector('.lightbox__next')
        flecheSuivant.addEventListener('click', () => {
            if (indexPhoto == nombrePhotos - 1) {
                // cas : passer d'une vidéo à une image suivante                    
                indexPhoto = 0
                //cas : passer d'une image à une vidéo suivante en fin de liste
                if (photosAffichees[indexPhoto].classList.contains('videoAffichee')) {
                    let sourceVideo = arrayRefSrc[indexPhoto]
                    lightboxContainerImg.style.display = 'none'
                    lightboxContainerVideo.style.display = 'block'
                    lightboxContainerImg.setAttribute('aria-hidden', 'true')
                    lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                    lightboxContainerVideo.setAttribute('class', 'htmlVideo')
                    lightboxContainerVideo.setAttribute('controls', '')
                    lightboxContainerVideo.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                    lightboxContainerVideoSource.setAttribute('src', sourceVideo)
                    lightboxContainerVideoSource.setAttribute('type', 'video/mp4')
                    lightboxContainer.insertBefore(lightboxContainerVideo, titreDeLaPhoto)
                    lightboxContainerVideo.appendChild(lightboxContainerVideoSource)
                    titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                    croixDeFermeture.addEventListener('click', () => {
                        LAlightbox.style.display = 'none'
                        lightboxContainerVideo.style.display = 'none'
                        lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                    })
                } else {
                    // cas : passer d'une image à une image suivante en fin de liste
                    let sourcePhoto = arrayRefSrc[indexPhoto]
                    lightboxContainerImg.style.display = 'block'
                    lightboxContainerVideo.style.display = 'none'
                    lightboxContainerImg.setAttribute('aria-hidden', 'false')
                    lightboxContainerVideo.setAttribute('aria-hidden', 'true')
                    lightboxContainerImg.setAttribute('src', sourcePhoto)
                    lightboxContainerImg.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                    titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                }
            } else {
                // cas : passer d'une vidéo à une image suivante en toute autre indice de la liste
                if (uneSeulePhoto.classList.contains('videoAffichee')) {
                    lightboxContainerVideo.style.display = 'none'
                    lightboxContainerImg.style.display = 'block'                        
                    }
                indexPhoto = indexPhoto + 1
                //cas : passer d'une image à une vidéo suivante quel que soit indice non final de la liste
                if (photosAffichees[indexPhoto].classList.contains('videoAffichee')) {
                    let sourceVideo = arrayRefSrc[indexPhoto]
                    lightboxContainerImg.style.display = 'none'
                    lightboxContainerVideo.style.display = 'block'
                    lightboxContainerImg.setAttribute('aria-hidden', 'true')
                    lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                    lightboxContainerVideo.setAttribute('class', 'htmlVideo')
                    lightboxContainerVideo.setAttribute('controls', '')
                    lightboxContainerVideo.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                    lightboxContainerVideoSource.setAttribute('src', sourceVideo)
                    lightboxContainerVideoSource.setAttribute('type', 'video/mp4')
                    lightboxContainer.insertBefore(lightboxContainerVideo, titreDeLaPhoto)
                    lightboxContainerVideo.appendChild(lightboxContainerVideoSource)
                    titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                    croixDeFermeture.addEventListener('click', () => {
                        LAlightbox.style.display = 'none'
                        lightboxContainerVideo.style.display = 'none'
                        lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                    })
                //cas : passer d'une image à une image suivante quel que soit indice non final de la liste 
                } else {
                    let sourcePhoto = arrayRefSrc[indexPhoto]
                    lightboxContainerImg.style.display = 'block'
                    lightboxContainerVideo.style.display = 'none'
                    lightboxContainerImg.setAttribute('aria-hidden', 'false')
                    lightboxContainerVideo.setAttribute('aria-hidden', 'true')
                    lightboxContainerImg.setAttribute('src', sourcePhoto)
                    lightboxContainerImg.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                    titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                }
            }})
    // navigations photos de droite en appuyant sur la flèche de droite du clavier
        LAlightbox.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                console.log('entréeDroite entendue');
                if (indexPhoto == nombrePhotos - 1) {
                    // cas : passer d'une vidéo à une image suivante                    
                    indexPhoto = 0
                    //cas : passer d'une image à une vidéo suivante en fin de liste
                    if (photosAffichees[indexPhoto].classList.contains('videoAffichee')) {
                        let sourceVideo = arrayRefSrc[indexPhoto]
                        lightboxContainerImg.style.display = 'none'
                        lightboxContainerVideo.style.display = 'block'
                        lightboxContainerImg.setAttribute('aria-hidden', 'true')
                        lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                        lightboxContainerVideo.setAttribute('class', 'htmlVideo')
                        lightboxContainerVideo.setAttribute('controls', '')
                        lightboxContainerVideo.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                        lightboxContainerVideoSource.setAttribute('src', sourceVideo)
                        lightboxContainerVideoSource.setAttribute('type', 'video/mp4')
                        lightboxContainer.insertBefore(lightboxContainerVideo, titreDeLaPhoto)
                        lightboxContainerVideo.appendChild(lightboxContainerVideoSource)
                        titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                        croixDeFermeture.addEventListener('click', () => {
                            LAlightbox.style.display = 'none'
                            lightboxContainerVideo.style.display = 'none'
                            lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                        })
                    } else {
                        // cas : passer d'une image à une image suivante en fin de liste
                        let sourcePhoto = arrayRefSrc[indexPhoto]
                        lightboxContainerImg.style.display = 'block'
                        lightboxContainerVideo.style.display = 'none'
                        lightboxContainerImg.setAttribute('aria-hidden', 'false')
                        lightboxContainerVideo.setAttribute('aria-hidden', 'true')
                        lightboxContainerImg.setAttribute('src', sourcePhoto)
                        lightboxContainerImg.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                        titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                    }
                } else {
                    // cas : passer d'une vidéo à une image suivante en toute autre indice de la liste
                    if (uneSeulePhoto.classList.contains('videoAffichee')) {
                        lightboxContainerVideo.style.display = 'none'
                        lightboxContainerImg.style.display = 'block'                        
                        }
                    indexPhoto = indexPhoto + 1
                    //cas : passer d'une image à une vidéo suivante quel que soit indice non final de la liste
                    if (photosAffichees[indexPhoto].classList.contains('videoAffichee')) {
                        let sourceVideo = arrayRefSrc[indexPhoto]
                        lightboxContainerImg.style.display = 'none'
                        lightboxContainerVideo.style.display = 'block'
                        lightboxContainerImg.setAttribute('aria-hidden', 'true')
                        lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                        lightboxContainerVideo.setAttribute('class', 'htmlVideo')
                        lightboxContainerVideo.setAttribute('controls', '')
                        lightboxContainerVideo.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                        lightboxContainerVideoSource.setAttribute('src', sourceVideo)
                        lightboxContainerVideoSource.setAttribute('type', 'video/mp4')
                        lightboxContainer.insertBefore(lightboxContainerVideo, titreDeLaPhoto)
                        lightboxContainerVideo.appendChild(lightboxContainerVideoSource)
                        titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                        croixDeFermeture.addEventListener('click', () => {
                            LAlightbox.style.display = 'none'
                            lightboxContainerVideo.style.display = 'none'
                            lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                        })
                    //cas : passer d'une image à une image suivante quel que soit indice non final de la liste 
                    } else {
                        let sourcePhoto = arrayRefSrc[indexPhoto]
                        lightboxContainerImg.style.display = 'block'
                        lightboxContainerVideo.style.display = 'none'
                        lightboxContainerImg.setAttribute('aria-hidden', 'false')
                        lightboxContainerVideo.setAttribute('aria-hidden', 'true')
                        lightboxContainerImg.setAttribute('src', sourcePhoto)
                        lightboxContainerImg.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                        titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                    }
                }
            }
        })
        })
        uneSeulePhoto.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                // affichage du titre pour image et pour vidéo 
            let titreDeLaPhoto = document.querySelector('div.lightbox__title')
            let indexPhoto = indexUneSeulePhoto
            titreDeLaPhoto.textContent = arrayTitle[indexPhoto]

    // affichage photo et vidéo                
            const LAlightbox = document.querySelector('#lightbox')
            LAlightbox.style.display = 'block'
            const lightboxContainer = document.querySelector('.lightbox__container')
            const lightboxContainerImg = document.querySelector('div.lightbox__container img')
            const croixDeFermeture = document.querySelector(".lightbox__close")
            LAlightbox.setAttribute('tabindex','0')
            LAlightbox.focus()

            
            if (uneSeulePhoto.classList.contains('videoAffichee')) {
                console.log('on se trouve dans la partie Entree vers video et celleci est reconnue par sa classe');
                let sourceVideo = arrayRefSrc[indexPhoto]
                lightboxContainerImg.style.display = 'none'
                lightboxContainerImg.setAttribute('aria-hidden', 'true')
                lightboxContainerVideo.style.display = 'block'
                lightboxContainerVideo.setAttribute('aria-hidden', 'false')
        // Création de l'élément complet de lecture vidéo - en cas de premier clic sur vidéo
                lightboxContainerVideo.setAttribute('class', 'htmlVideo')
                lightboxContainerVideo.setAttribute('controls', '')
                lightboxContainerVideoSource.setAttribute('src', sourceVideo)
                lightboxContainerVideoSource.setAttribute('type', 'video/mp4')
                lightboxContainerVideoSource.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                lightboxContainer.insertBefore(lightboxContainerVideo, titreDeLaPhoto)
                lightboxContainerVideo.appendChild(lightboxContainerVideoSource)
        // fermeture de la lightbox au clic pour empêcher l'empilement de vidéos consécutives
                croixDeFermeture.addEventListener('click', () => {
                    LAlightbox.style.display = 'none'
                    lightboxContainerVideo.style.display = 'none'
                    lightboxContainerVideo.setAttribute('aria-hidden', 'true')
                })
                            
            } else {
                console.log('onsetrouve en entree vers image');
        // changement attributs de l'élément img HTML - en cas de premier clic sur image
                lightboxContainerImg.style.display = 'block'
                let sourcePhoto = uneSeulePhoto.getAttribute('src')
                lightboxContainerImg.setAttribute('src', sourcePhoto)
                lightboxContainerImg.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                lightboxContainerVideo.setAttribute('aria-hidden', 'true')
                lightboxContainerImg.setAttribute('aria-hidden', 'false')

            }            

                    // navigations photos de gauche au clic sur la flèche 'précédent'
            const flechePrecedent = document.querySelector('.lightbox__prev')        
            const nombrePhotos = photosAffichees.length
            flechePrecedent.addEventListener("click", () => {
                if (indexPhoto == 0) {
                    // lightboxContainerVideo.style.display = 'none'
                    indexPhoto = nombrePhotos - 1
            // cas : passer d'une image à une vidéo précédente en début de liste
                    if (photosAffichees[indexPhoto].classList.contains('videoAffichee')) {
                        lightboxContainerVideo.style.display = 'block'
                        lightboxContainerImg.setAttribute('aria-hidden', 'true')
                        lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                        lightboxContainerImg.style.display = 'none'
                        let sourceVideo = arrayRefSrc[indexPhoto]
                        lightboxContainerVideo.setAttribute('class', 'htmlVideo')
                        lightboxContainerVideo.setAttribute('controls', '')
                        lightboxContainerVideoSource.setAttribute('src', sourceVideo)
                        lightboxContainerVideoSource.setAttribute('type', 'video/mp4')
                        lightboxContainerVideoSource.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                        lightboxContainer.insertBefore(lightboxContainerVideo, titreDeLaPhoto)
                        lightboxContainerVideo.appendChild(lightboxContainerVideoSource)
                // fermeture de la lightbox au clic pour empêcher l'empilement consécutif de vidéos 
                        croixDeFermeture.addEventListener('click', () => {
                            LAlightbox.style.display = 'none'
                            lightboxContainerVideo.style.display = 'none'
                            lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                        })
                        titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
        // cas : passer d'une image à une image précente en début de liste
                    } else {
                        let sourcePhoto = arrayRefSrc[indexPhoto]
                        lightboxContainerImg.style.display = 'block'
                        lightboxContainerVideo.setAttribute('aria-hidden', 'true')
                        lightboxContainerImg.setAttribute('aria-hidden', 'false')

                        lightboxContainerVideo.style.display = 'none'
                        lightboxContainerImg.setAttribute('src', sourcePhoto)
                        lightboxContainerImg.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                        titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                    }

                } else { 
                    // cas : passer d'une vidéo à une image 
                    if (uneSeulePhoto.classList.contains('videoAffichee')) {
                        lightboxContainerVideo.style.display = 'none'
                        lightboxContainerImg.style.display = 'block' 
                        lightboxContainerImg.setAttribute('aria-hidden', 'false')
                        lightboxContainerVideo.setAttribute('aria-hidden', 'true')


                        }
                    indexPhoto = indexPhoto - 1 
                    // cas : passer d'une image à une vidéo précédente qqs indice non nul
                    if (photosAffichees[indexPhoto].classList.contains('videoAffichee')) {
                        let sourceVideo = arrayRefSrc[indexPhoto]
                        lightboxContainerImg.style.display = 'none'
                        lightboxContainerImg.setAttribute('aria-hidden', 'true')
                        lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                        lightboxContainerVideo.style.display = 'block'
                        lightboxContainerVideo.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                        lightboxContainerVideoSource.setAttribute('src', sourceVideo)
                        lightboxContainerVideoSource.setAttribute('type', 'video/mp4')                        
                        lightboxContainerVideo.setAttribute('class', 'htmlVideo')
                        lightboxContainerVideo.setAttribute('controls', '')
                        lightboxContainer.insertBefore(lightboxContainerVideo, titreDeLaPhoto)
                        lightboxContainerVideo.appendChild(lightboxContainerVideoSource)
                // fermeture de la lightbox au clic pour empêcher l'empilement consécutif de vidéos 
                        croixDeFermeture.addEventListener('click', () => {
                            LAlightbox.style.display = 'none'
                            lightboxContainerVideo.style.display = 'none'
                            lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                        })
                        titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                    //cas : passer d'une image à une image précédente qqs indice non nul
                    } else {
                        let sourcePhoto = arrayRefSrc[indexPhoto]
                        lightboxContainerImg.style.display = 'block'
                        lightboxContainerVideo.style.display = 'none'
                        lightboxContainerVideo.setAttribute('aria-hidden', 'true')
                        lightboxContainerImg.setAttribute('aria-hidden', 'false')
                        lightboxContainerImg.setAttribute('src', sourcePhoto)
                        lightboxContainerImg.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                        titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                    }
            }})
            // navigation photos de gauche en appuyant sur la flèche de gauche du clavier
            LAlightbox.addEventListener('keyup', (e) => {
                if (e.key === 'ArrowLeft') {
                    console.log('entrée entendue');
                    if (indexPhoto == 0) {
                        // lightboxContainerVideo.style.display = 'none'
                        indexPhoto = nombrePhotos - 1
                // cas : passer d'une image à une vidéo précédente en début de liste
                        if (photosAffichees[indexPhoto].classList.contains('videoAffichee')) {
                            lightboxContainerVideo.style.display = 'block'
                            lightboxContainerImg.setAttribute('aria-hidden', 'true')
                            lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                            lightboxContainerImg.style.display = 'none'
                            let sourceVideo = arrayRefSrc[indexPhoto]
                            lightboxContainerVideo.setAttribute('class', 'htmlVideo')
                            lightboxContainerVideo.setAttribute('controls', '')
                            lightboxContainerVideoSource.setAttribute('src', sourceVideo)
                            lightboxContainerVideoSource.setAttribute('type', 'video/mp4')
                            lightboxContainerVideoSource.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée' + ', vue rapprochée')
                            lightboxContainer.insertBefore(lightboxContainerVideo, titreDeLaPhoto)
                            lightboxContainerVideo.appendChild(lightboxContainerVideoSource)
                    // fermeture de la lightbox au clic pour empêcher l'empilement consécutif de vidéos 
                            croixDeFermeture.addEventListener('click', () => {
                                LAlightbox.style.display = 'none'
                                lightboxContainerVideo.style.display = 'none'
                                lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                            })
                            titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
            // cas : passer d'une image à une image précente en début de liste
                        } else {
                            let sourcePhoto = arrayRefSrc[indexPhoto]
                            lightboxContainerImg.style.display = 'block'
                            lightboxContainerVideo.setAttribute('aria-hidden', 'true')
                            lightboxContainerImg.setAttribute('aria-hidden', 'false')

                            lightboxContainerVideo.style.display = 'none'
                            lightboxContainerImg.setAttribute('src', sourcePhoto)
                            lightboxContainerImg.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                            titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                        }

                    } else { 
                        // cas : passer d'une vidéo à une image 
                        if (uneSeulePhoto.classList.contains('videoAffichee')) {
                            lightboxContainerVideo.style.display = 'none'
                            lightboxContainerImg.style.display = 'block' 
                            lightboxContainerImg.setAttribute('aria-hidden', 'false')
                            lightboxContainerVideo.setAttribute('aria-hidden', 'true')


                            }
                        indexPhoto = indexPhoto - 1 
                        // cas : passer d'une image à une vidéo précédente qqs indice non nul
                        if (photosAffichees[indexPhoto].classList.contains('videoAffichee')) {
                            let sourceVideo = arrayRefSrc[indexPhoto]
                            lightboxContainerImg.style.display = 'none'
                            lightboxContainerImg.setAttribute('aria-hidden', 'true')
                            lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                            lightboxContainerVideo.style.display = 'block'
                            lightboxContainerVideo.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                            lightboxContainerVideoSource.setAttribute('src', sourceVideo)
                            lightboxContainerVideoSource.setAttribute('type', 'video/mp4')                        
                            lightboxContainerVideo.setAttribute('class', 'htmlVideo')
                            lightboxContainerVideo.setAttribute('controls', '')
                            lightboxContainer.insertBefore(lightboxContainerVideo, titreDeLaPhoto)
                            lightboxContainerVideo.appendChild(lightboxContainerVideoSource)
                    // fermeture de la lightbox au clic pour empêcher l'empilement consécutif de vidéos 
                            croixDeFermeture.addEventListener('click', () => {
                                LAlightbox.style.display = 'none'
                                lightboxContainerVideo.style.display = 'none'
                                lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                            })
                            titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                        //cas : passer d'une image à une image précédente qqs indice non nul
                        } else {
                            let sourcePhoto = arrayRefSrc[indexPhoto]
                            lightboxContainerImg.style.display = 'block'
                            lightboxContainerVideo.style.display = 'none'
                            lightboxContainerVideo.setAttribute('aria-hidden', 'true')
                            lightboxContainerImg.setAttribute('aria-hidden', 'false')
                            lightboxContainerImg.setAttribute('src', sourcePhoto)
                            lightboxContainerImg.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                            titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                        }
                    }
            }
        })
    // navigations photos de droite au clic sur la flèche 'suivant'
        const flecheSuivant = document.querySelector('.lightbox__next')
        flecheSuivant.addEventListener('click', () => {
            if (indexPhoto == nombrePhotos - 1) {
                // cas : passer d'une vidéo à une image suivante                    
                indexPhoto = 0
                //cas : passer d'une image à une vidéo suivante en fin de liste
                if (photosAffichees[indexPhoto].classList.contains('videoAffichee')) {
                    let sourceVideo = arrayRefSrc[indexPhoto]
                    lightboxContainerImg.style.display = 'none'
                    lightboxContainerVideo.style.display = 'block'
                    lightboxContainerImg.setAttribute('aria-hidden', 'true')
                    lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                    lightboxContainerVideo.setAttribute('class', 'htmlVideo')
                    lightboxContainerVideo.setAttribute('controls', '')
                    lightboxContainerVideo.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                    lightboxContainerVideoSource.setAttribute('src', sourceVideo)
                    lightboxContainerVideoSource.setAttribute('type', 'video/mp4')
                    lightboxContainer.insertBefore(lightboxContainerVideo, titreDeLaPhoto)
                    lightboxContainerVideo.appendChild(lightboxContainerVideoSource)
                    titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                    croixDeFermeture.addEventListener('click', () => {
                        LAlightbox.style.display = 'none'
                        lightboxContainerVideo.style.display = 'none'
                        lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                    })
                } else {
                    // cas : passer d'une image à une image suivante en fin de liste
                    let sourcePhoto = arrayRefSrc[indexPhoto]
                    lightboxContainerImg.style.display = 'block'
                    lightboxContainerVideo.style.display = 'none'
                    lightboxContainerImg.setAttribute('aria-hidden', 'false')
                    lightboxContainerVideo.setAttribute('aria-hidden', 'true')
                    lightboxContainerImg.setAttribute('src', sourcePhoto)
                    lightboxContainerImg.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                    titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                }
            } else {
                // cas : passer d'une vidéo à une image suivante en toute autre indice de la liste
                if (uneSeulePhoto.classList.contains('videoAffichee')) {
                    lightboxContainerVideo.style.display = 'none'
                    lightboxContainerImg.style.display = 'block'                        
                    }
                indexPhoto = indexPhoto + 1
                //cas : passer d'une image à une vidéo suivante quel que soit indice non final de la liste
                if (photosAffichees[indexPhoto].classList.contains('videoAffichee')) {
                    let sourceVideo = arrayRefSrc[indexPhoto]
                    lightboxContainerImg.style.display = 'none'
                    lightboxContainerVideo.style.display = 'block'
                    lightboxContainerImg.setAttribute('aria-hidden', 'true')
                    lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                    lightboxContainerVideo.setAttribute('class', 'htmlVideo')
                    lightboxContainerVideo.setAttribute('controls', '')
                    lightboxContainerVideo.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                    lightboxContainerVideoSource.setAttribute('src', sourceVideo)
                    lightboxContainerVideoSource.setAttribute('type', 'video/mp4')
                    lightboxContainer.insertBefore(lightboxContainerVideo, titreDeLaPhoto)
                    lightboxContainerVideo.appendChild(lightboxContainerVideoSource)
                    titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                    croixDeFermeture.addEventListener('click', () => {
                        LAlightbox.style.display = 'none'
                        lightboxContainerVideo.style.display = 'none'
                        lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                    })
                //cas : passer d'une image à une image suivante quel que soit indice non final de la liste 
                } else {
                    let sourcePhoto = arrayRefSrc[indexPhoto]
                    lightboxContainerImg.style.display = 'block'
                    lightboxContainerVideo.style.display = 'none'
                    lightboxContainerImg.setAttribute('aria-hidden', 'false')
                    lightboxContainerVideo.setAttribute('aria-hidden', 'true')
                    lightboxContainerImg.setAttribute('src', sourcePhoto)
                    lightboxContainerImg.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                    titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                }
            }})
    // navigations photos de droite en appuyant sur la flèche de droite du clavier
        LAlightbox.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                console.log('entréeDroite entendue');
                if (indexPhoto == nombrePhotos - 1) {
                    // cas : passer d'une vidéo à une image suivante                    
                    indexPhoto = 0
                    //cas : passer d'une image à une vidéo suivante en fin de liste
                    if (photosAffichees[indexPhoto].classList.contains('videoAffichee')) {
                        let sourceVideo = arrayRefSrc[indexPhoto]
                        lightboxContainerImg.style.display = 'none'
                        lightboxContainerVideo.style.display = 'block'
                        lightboxContainerImg.setAttribute('aria-hidden', 'true')
                        lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                        lightboxContainerVideo.setAttribute('class', 'htmlVideo')
                        lightboxContainerVideo.setAttribute('controls', '')
                        lightboxContainerVideo.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                        lightboxContainerVideoSource.setAttribute('src', sourceVideo)
                        lightboxContainerVideoSource.setAttribute('type', 'video/mp4')
                        lightboxContainer.insertBefore(lightboxContainerVideo, titreDeLaPhoto)
                        lightboxContainerVideo.appendChild(lightboxContainerVideoSource)
                        titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                        croixDeFermeture.addEventListener('click', () => {
                            LAlightbox.style.display = 'none'
                            lightboxContainerVideo.style.display = 'none'
                            lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                        })
                    } else {
                        // cas : passer d'une image à une image suivante en fin de liste
                        let sourcePhoto = arrayRefSrc[indexPhoto]
                        lightboxContainerImg.style.display = 'block'
                        lightboxContainerVideo.style.display = 'none'
                        lightboxContainerImg.setAttribute('aria-hidden', 'false')
                        lightboxContainerVideo.setAttribute('aria-hidden', 'true')
                        lightboxContainerImg.setAttribute('src', sourcePhoto)
                        lightboxContainerImg.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                        titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                    }
                } else {
                    // cas : passer d'une vidéo à une image suivante en toute autre indice de la liste
                    if (uneSeulePhoto.classList.contains('videoAffichee')) {
                        lightboxContainerVideo.style.display = 'none'
                        lightboxContainerImg.style.display = 'block'                        
                        }
                    indexPhoto = indexPhoto + 1
                    //cas : passer d'une image à une vidéo suivante quel que soit indice non final de la liste
                    if (photosAffichees[indexPhoto].classList.contains('videoAffichee')) {
                        let sourceVideo = arrayRefSrc[indexPhoto]
                        lightboxContainerImg.style.display = 'none'
                        lightboxContainerVideo.style.display = 'block'
                        lightboxContainerImg.setAttribute('aria-hidden', 'true')
                        lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                        lightboxContainerVideo.setAttribute('class', 'htmlVideo')
                        lightboxContainerVideo.setAttribute('controls', '')
                        lightboxContainerVideo.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                        lightboxContainerVideoSource.setAttribute('src', sourceVideo)
                        lightboxContainerVideoSource.setAttribute('type', 'video/mp4')
                        lightboxContainer.insertBefore(lightboxContainerVideo, titreDeLaPhoto)
                        lightboxContainerVideo.appendChild(lightboxContainerVideoSource)
                        titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                        croixDeFermeture.addEventListener('click', () => {
                            LAlightbox.style.display = 'none'
                            lightboxContainerVideo.style.display = 'none'
                            lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                        })
                    //cas : passer d'une image à une image suivante quel que soit indice non final de la liste 
                    } else {
                        let sourcePhoto = arrayRefSrc[indexPhoto]
                        lightboxContainerImg.style.display = 'block'
                        lightboxContainerVideo.style.display = 'none'
                        lightboxContainerImg.setAttribute('aria-hidden', 'false')
                        lightboxContainerVideo.setAttribute('aria-hidden', 'true')
                        lightboxContainerImg.setAttribute('src', sourcePhoto)
                        lightboxContainerImg.setAttribute('alt', arrayTitle[indexPhoto] + ', vue rapprochée')
                        titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                    }
                }
            }
        })
        }
        })
    })
}

async function headerFunction(allMediaOnePhotographer, allData) {
    // Créer la lightbox - récupérer src, implémenter un indice, récupérer le titre
    let arrayRefSrc = []
    let arrayIndex = []
    let arrayTitle = []
    let refSrc = ''
    let index = 0
    // alt vaut title, pas besoin de le déclarer 
    allMediaOnePhotographer.forEach((dataOneArtwork) => {
        const {photographerId, title, image, video} = dataOneArtwork
        // distinction entre image et vidéo        
        if (dataOneArtwork.image) {
            refSrc = `assets/images/${photographerId}/${image}`
            arrayRefSrc.push(refSrc)
            arrayIndex.push(index)
            arrayTitle.push(title)
            index ++
        } else {
            refSrc = `assets/images/${photographerId}/${video}`
            arrayRefSrc.push(refSrc)
            arrayIndex.push(index)
            arrayTitle.push(title)
            index ++
        }
    })
    const photographerData = allData.photographers.filter(e=>e.id==idOnePhotographer)[0]
    // Affiche l'entête 
    const photographHeader = document.querySelector('.photograph-header')    
    const photographerNameAndCity = document.createElement('div')
    photographerNameAndCity.setAttribute('class','photographerNameAndCity')
    const photographerName = document.createElement('h1')
    photographerName.setAttribute('class','photographerName')
    photographerName.textContent = `${photographerData.name}`
    const photographerCity = document.createElement('p')
    photographerCity.setAttribute('class', 'photographerCity')    
    photographerCity.textContent = `${photographerData.city}, ${photographerData.country.toUpperCase()}`
    const photographerQuote = document.createElement('p')
    photographerQuote.setAttribute('class','quoting')
    photographerQuote.textContent = `${photographerData.tagline}`
    const photographerPictureDiv = document.createElement('div')
    photographerPictureDiv.setAttribute('id','photographerPicture')
    const photographerPicture = document.createElement('img')
    photographerPicture.setAttribute('class','photographerPicture')
    photographerPicture.setAttribute('src',`assets/photographers/${photographerData.portrait}`)
    photographerPicture.setAttribute('alt',`${photographerData.name}`)
    photographHeader.appendChild(photographerNameAndCity)
    photographerNameAndCity.appendChild(photographerName)
    photographerNameAndCity.appendChild(photographerCity)
    photographerNameAndCity.appendChild(photographerQuote)
    photographHeader.appendChild(photographerPictureDiv)
    photographerPictureDiv.appendChild(photographerPicture)   
}

async function likesFunction(allMediaOnePhotographer, allData) {
    // Créer la lightbox - récupérer src, implémenter un indice, récupérer le titre
    let arrayRefSrc = []
    let arrayIndex = []
    let arrayTitle = []
    let refSrc = ''
    let index = 0
    // alt vaut title, pas besoin de le déclarer 
    allMediaOnePhotographer.forEach((dataOneArtwork) => {
        const {photographerId, title, image, video} = dataOneArtwork
        // distinction entre image et vidéo        
        if (dataOneArtwork.image) {
            refSrc = `assets/images/${photographerId}/${image}`
            arrayRefSrc.push(refSrc)
            arrayIndex.push(index)
            arrayTitle.push(title)
            index ++
        } else {
            refSrc = `assets/images/${photographerId}/${video}`
            arrayRefSrc.push(refSrc)
            arrayIndex.push(index)
            arrayTitle.push(title)
            index ++
        }
    })
    
    // Affiche la bannière fixe avec les prix et les likes
    const fixedBanner = document.createElement('div')
    const likesFixedBanner = document.createElement('div')
    const priceFixedBanner = document.createElement('div')
    fixedBanner.setAttribute('class','likesAndPriceBanner')
    console.log('alldata',allData);
    const photographerData = allData.photographers.filter(e=>e.id==idOnePhotographer)[0]
    const photographerPrice = photographerData.price
    // initialisation du nombre de likes puis calcul du nombre de likes par itération des oeuvres du photographe
    let photographerLikes = 0
    allMediaOnePhotographer.forEach( (e) => {
        photographerLikes += e.likes
    })
    likesFixedBanner.textContent = `${photographerLikes} \u2665`
    priceFixedBanner.textContent = `${photographerPrice}€/jour`
    document.querySelector('#main').appendChild(fixedBanner)
    fixedBanner.appendChild(likesFixedBanner)
    fixedBanner.appendChild(priceFixedBanner)
// création d'une écoute d'événements pour chaque clic sur les likes de chaque card et màj du total local et global
    // Ajout d'un tableau de booléen pour consulter la valeur cliquée ou non de l'élément .likes
    // de chaque card individuelle
    let arrayLikesOneCard = []  
    let arrayBool = []
    allMediaOnePhotographer.forEach( (e) => {
        arrayLikesOneCard.push(e.likes)
        arrayBool.push('true')
    })
    let arrayLikesAllCard = document.querySelectorAll('article .likes')
    arrayLikesAllCard.forEach((e,i) => {
        arrayLikesAllCard[i].addEventListener('click', () => {
            if (arrayBool[i]) {
                arrayLikesOneCard[i] ++
                e.textContent = `${arrayLikesOneCard[i]} \u2665`
                arrayBool[i] = false
                photographerLikes ++
                likesFixedBanner.textContent = `${photographerLikes} \u2665`
            } else {
                arrayLikesOneCard[i] --
                e.textContent = `${arrayLikesOneCard[i]} \u2665`
                arrayBool[i] = true
                photographerLikes --
                likesFixedBanner.textContent = `${photographerLikes} \u2665`
            }
        })
    })
}

function deleteArticles() {
    const parentSection = document.querySelector('.photograph-photos')
    const allArticles = document.querySelectorAll('article')
    allArticles.forEach(e => parentSection.removeChild(e))
}

async function sortsFunction(allMediaOnePhotographer) {
    // Tri par titre (title), popularité (likes), date(date)
    // création de 3 tableaux reprenant ces jeux de données
    let arrayCompareTitle = []
    let arrayCompareLikes = []
    let arrayCompareDate = []
    

    allMediaOnePhotographer.forEach((e) => {
        arrayCompareTitle.push(e.title)
        arrayCompareLikes.push(e.likes)
        arrayCompareDate.push(e.date)
        // tableauLikesApresTri.push('')
    })
        
    // Tri des titres par ordre alphabétique, tri des likes par ordre croissant, tri des dates par ancienneté
    arrayCompareTitle.sort()
    arrayCompareLikes.sort(function(a, b) {
        return a - b;
        })
    arrayCompareDate.sort()
    // Création d'une nouvelle fonction pour trier directement par likes croissant
    //  un tableau duplicata de allMediaOnePhotographer
    // attention reference type donc duplicata de chaque valeur et non de chaque pointeur
    let sortedByLikesAllMediaOnePhotographer = []
    let sortedByTitlesAllMediaOnePhotographer = []
    allMediaOnePhotographer.forEach(element => {
        sortedByLikesAllMediaOnePhotographer.push(element)
        sortedByTitlesAllMediaOnePhotographer.push(element)
    });

    // écoute d'événement pour tri par popularité
    const declencheurTriLikes = document.querySelector('#tri-likes')
    sortedByLikesAllMediaOnePhotographer.sort(function(a, b) {
        return b.likes - a.likes;
        })
    
    declencheurTriLikes.addEventListener('click', () => {
        deleteArticles()
        displayPhotos(sortedByLikesAllMediaOnePhotographer)
        lightboxFunction(sortedByLikesAllMediaOnePhotographer)
        likesFunction(sortedByLikesAllMediaOnePhotographer, alld)
    })

    declencheurTriLikes.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            deleteArticles()
            displayPhotos(sortedByLikesAllMediaOnePhotographer)
            lightboxFunction(sortedByLikesAllMediaOnePhotographer)
            likesFunction(sortedByLikesAllMediaOnePhotographer, alld)
        }
    })

    // écoute d'événement pour tri par titre
    const declencheurTriTitre = document.querySelector('#tri-titre')
    sortedByTitlesAllMediaOnePhotographer.sort(function(a, b) {
            if (a.title < b.title) {return -1}
            if (a.title > b.title) {return 1}
            return 0
        }
    )
    
    declencheurTriTitre.addEventListener('click', () => {
        deleteArticles()
        displayPhotos(sortedByTitlesAllMediaOnePhotographer)
        lightboxFunction(sortedByTitlesAllMediaOnePhotographer)
        likesFunction(sortedByTitlesAllMediaOnePhotographer, alld)
    })

    declencheurTriTitre.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            deleteArticles()
            displayPhotos(sortedByTitlesAllMediaOnePhotographer)
            lightboxFunction(sortedByTitlesAllMediaOnePhotographer)
            likesFunction(sortedByTitlesAllMediaOnePhotographer, alld)
        }
    })

    // affichage des possibilités de tri 
    //              au clic sur le bouton 'popularité'

    const menuDeroul = document.querySelector('#menu-deroulant')

    menuDeroul.addEventListener('mouseover', () => {
        declencheurTriTitre.style.display = 'block'
    })
    
    declencheurTriLikes.addEventListener('focus', () => {
        declencheurTriTitre.style.display = 'block'
    })

    // repli du bandeau déroulant aux actions contraires 

    declencheurTriTitre.addEventListener('blur', () => {
        declencheurTriTitre.style.display = 'none'
    })

    menuDeroul.addEventListener('mouseleave', () => {
        declencheurTriTitre.style.display = 'none'
    })

}

let alld =''
let nomDuPhotographe = ''
async function init() {
    let donnees = await allMediaOnePhotographerFunction()
    alld = donnees[0]
    const allm = donnees[1]
    const phoData = alld.photographers.filter(e=>e.id==idOnePhotographer)[0]
    nomDuPhotographe = phoData.name
    // eslint-disable-next-line no-undef
    constructionHeaderModal(nomDuPhotographe)
    headerFunction(allm,alld)
    displayPhotos(allm)
    lightboxFunction(allm)
    likesFunction(allm,alld)
    sortsFunction(allm)
}

init()



// fermeture de la lightbox au clic sur la croix et réinitialisation image et vidéo
const croixDeFermeture = document.querySelector(".lightbox__close")
croixDeFermeture.addEventListener('click', () => {
    document.querySelector('#lightbox').style.display = 'none'
    })

const lightboo = document.querySelector('#lightbox')
lightboo.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
        document.querySelector('#lightbox').style.display = 'none'
    }
})
