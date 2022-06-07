


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
        const mediaOneId = media(e)
        const oneArtworksDOM = mediaOneId()        
        sectionPhotographPhotos.appendChild(oneArtworksDOM)
    // l'affichage HTML d'une Card de photo/vidéo se fait par l'appel de la méthode cardOneArtwork

    })
    
        
    
}

const params = (new URL(document.location)).searchParams
const idOnePhotographer = params.get('id')


async function init() {
    // Récupère les datas des photographes, photographer et media
    const allData = await getData();
    //  Récupère les photos du photographe dont la page est affichée
    const allMediaOnePhotographer = 
        allData.media.filter(e => e.photographerId == idOnePhotographer)
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
    // seuls les tris par popularité (likes) et date (dates) sont exigés - cf notes de réunion : maquette pas à jour
    // Création d'une nouvelle fonction pour trier directement par likes croissant
    //  un tableau duplicata de allMediaOnePhotographer
    // attention reference type donc duplicata de chaque valeur et non de chaque pointeur
    let sortedByLikesAllMediaOnePhotographer = []
    let sortedByDatesAllMediaOnePhotographer = []
    allMediaOnePhotographer.forEach(element => {
        sortedByLikesAllMediaOnePhotographer.push(element)
        sortedByDatesAllMediaOnePhotographer.push(element)
    });

    const declencheurTriLikes = document.querySelector('#tri-likes')
    sortedByLikesAllMediaOnePhotographer.sort(function(a, b) {
        return b.likes - a.likes;
      })
    
    declencheurTriLikes.addEventListener('click', () => {
        const allArticles = document.querySelectorAll('article')
        allArticles.forEach(e => e.style.display = 'none')
        displayPhotos(sortedByLikesAllMediaOnePhotographer)
    })

    const declencheurTriDate = document.querySelector('#tri-dates')
    sortedByDatesAllMediaOnePhotographer.sort(function(a,b) {
        return b.date < a.date ? 1 : -1 ;
    }) 
 
    declencheurTriDate.addEventListener('click', () => {
        const allArticles = document.querySelectorAll('article')
        allArticles.forEach(e => e.style.display = 'none')
        displayPhotos(sortedByDatesAllMediaOnePhotographer)
    })

    // affichage des possibilités de tri au clic sur le bouton 'popularité'

    declencheurTriLikes.addEventListener('mouseover', () => {
        declencheurTriDate.style.display = 'block'
    })
    
    // CETTE VERSION NE PERMET PAS DE GERER LES EXCEPTIONS DEGALITE ET DONC RENVOIE UN TABLEAU TROP GRAND
    // declencheurTriLikes.addEventListener('click', () => {
    //     for (let indi = 0; indi < arrayCompareLikes.length; indi ++) {
    //         console.log(indi);
    //         allMediaOnePhotographer.forEach( (e) => {
    //             if (e.likes == arrayCompareLikes[indi]) {
    //                 tableauLikesApresTri.push(e)
    //                 console.log(e.likes)
    //                 console.log(arrayCompareLikes[indi])
    //                 console.log(tableauLikesApresTri);
    //             } else {
    //                 console.log(e.likes)
    //                 console.log(arrayCompareLikes[indi])
    //                 console.log(tableauLikesApresTri);
    //             }
    //         })
    //     }
    // })
    // CETTE VERSION NE PERMET PAS DE GERER LES EXCEPTIONS DEGALITE ET DONC RENVOIE UN TABLEAU TROP GRAND
  
    // Affiche les photos
    displayPhotos(allMediaOnePhotographer)
    // Créer la lightbox - récupérer src, implémenter un indice, récupérer le titre
    
    let arrayRefSrc = []
    let arrayIndex = []
    let arrayTitle = []
    let refSrc = ''
    let index = 0
    let title = ''
    // alt vaut title, pas besoin de le déclarer 
    allMediaOnePhotographer.forEach((dataOneArtwork) => {
        const { id, photographerId, title, image, video, likes, date, price } = dataOneArtwork
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

    // affichage des boutons de tri

    
    
    // affichage d'une image cliquée dans la lightbox
    const photosAffichees = document.querySelectorAll(".photoAffichee, .videoAffichee")
    const lightboxContainerVideo = document.createElement('video')
    const lightboxContainerVideoSource = document.createElement('source')
    // tentative résolution bug affichage vidéo
    // let sourceVideo = ''
    // photosAffichees.forEach( 
    //     (uneSeulePhoto,indexUneSeulePhoto) => {
    //         if (uneSeulePhoto.classList.contains('videoAffichee')) {
    //             sourceVideo = arrayRefSrc[indexUneSeulePhoto]
    //         } } 
    //     )
    // lightboxContainerVideoSource.setAttribute('src',sourceVideo)
    // lightboxContainerVideo.appendChild(lightboxContainerVideoSource)

    photosAffichees.forEach( 
        (uneSeulePhoto,indexUneSeulePhoto) => {
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
                lightboxContainerVideoSource.setAttribute('alt', arrayTitle[indexPhoto])
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
                lightboxContainerImg.setAttribute('alt', arrayTitle[indexPhoto])
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
                        sourceVideo = arrayRefSrc[indexPhoto]
                        lightboxContainerVideo.setAttribute('class', 'htmlVideo')
                        lightboxContainerVideo.setAttribute('controls', '')
                        lightboxContainerVideoSource.setAttribute('src', sourceVideo)
                        lightboxContainerVideoSource.setAttribute('type', 'video/mp4')
                        lightboxContainerVideoSource.setAttribute('alt', arrayTitle[indexPhoto])
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
                        sourcePhoto = arrayRefSrc[indexPhoto]
                        lightboxContainerImg.style.display = 'block'
                        lightboxContainerVideo.setAttribute('aria-hidden', 'true')
                        lightboxContainerImg.setAttribute('aria-hidden', 'false')

                        lightboxContainerVideo.style.display = 'none'
                        lightboxContainerImg.setAttribute('src', sourcePhoto)
                        lightboxContainerImg.setAttribute('alt', arrayTitle[indexPhoto])
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
                        sourceVideo = arrayRefSrc[indexPhoto]
                        lightboxContainerImg.style.display = 'none'
                        lightboxContainerImg.setAttribute('aria-hidden', 'true')
                        lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                        lightboxContainerVideo.style.display = 'block'
                        lightboxContainerVideo.setAttribute('alt', arrayTitle[indexPhoto])
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
                        sourcePhoto = arrayRefSrc[indexPhoto]
                        lightboxContainerImg.style.display = 'block'
                        lightboxContainerVideo.style.display = 'none'
                        lightboxContainerVideo.setAttribute('aria-hidden', 'true')
                        lightboxContainerImg.setAttribute('aria-hidden', 'false')
                        lightboxContainerImg.setAttribute('src', sourcePhoto)
                        lightboxContainerImg.setAttribute('alt', arrayTitle[indexPhoto])
                        titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                    }
            }})
        // navigations photos de droite au clic sur la flèche 'suivant'
            const flecheSuivant = document.querySelector('.lightbox__next')
            flecheSuivant.addEventListener('click', () => {
                if (indexPhoto == nombrePhotos - 1) {
                    // cas : passer d'une vidéo à une image suivante
                    // if (uneSeulePhoto.classList.contains('videoAffichee')) {
                    //     lightboxContainerVideo.style.display = 'none'
                    //     lightboxContainerImg.style.display = 'block'                        
                    //     }
                    indexPhoto = 0
                    //cas : passer d'une image à une vidéo suivante en fin de liste
                    if (photosAffichees[indexPhoto].classList.contains('videoAffichee')) {
                        sourceVideo = arrayRefSrc[indexPhoto]
                        lightboxContainerImg.style.display = 'none'
                        lightboxContainerVideo.style.display = 'block'
                        lightboxContainerImg.setAttribute('aria-hidden', 'true')
                        lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                        lightboxContainerVideo.setAttribute('class', 'htmlVideo')
                        lightboxContainerVideo.setAttribute('controls', '')
                        lightboxContainerVideo.setAttribute('alt', arrayTitle[indexPhoto])
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
                        sourcePhoto = arrayRefSrc[indexPhoto]
                        lightboxContainerImg.style.display = 'block'
                        lightboxContainerVideo.style.display = 'none'
                        lightboxContainerImg.setAttribute('aria-hidden', 'false')
                        lightboxContainerVideo.setAttribute('aria-hidden', 'true')
                        lightboxContainerImg.setAttribute('src', sourcePhoto)
                        lightboxContainerImg.setAttribute('alt', arrayTitle[indexPhoto])
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
                        sourceVideo = arrayRefSrc[indexPhoto]
                        lightboxContainerImg.style.display = 'none'
                        lightboxContainerVideo.style.display = 'block'
                        lightboxContainerImg.setAttribute('aria-hidden', 'true')
                        lightboxContainerVideo.setAttribute('aria-hidden', 'false')
                        lightboxContainerVideo.setAttribute('class', 'htmlVideo')
                        lightboxContainerVideo.setAttribute('controls', '')
                        lightboxContainerVideo.setAttribute('alt', arrayTitle[indexPhoto])
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
                        sourcePhoto = arrayRefSrc[indexPhoto]
                        lightboxContainerImg.style.display = 'block'
                        lightboxContainerVideo.style.display = 'none'
                        lightboxContainerImg.setAttribute('aria-hidden', 'false')
                        lightboxContainerVideo.setAttribute('aria-hidden', 'true')
                        lightboxContainerImg.setAttribute('src', sourcePhoto)
                        lightboxContainerImg.setAttribute('alt', arrayTitle[indexPhoto])
                        titreDeLaPhoto.textContent = arrayTitle[indexPhoto]
                    }
                }})
            })
        }
    )


    // document.querySelector("div.photograph-photos article img").addEventListener(
    //     "onclick", (e) => 
    // )

    // allMediaOnePhotographer.forEach((element,index) => {
    //     const { id, photographerId, title, image, video, likes, date, price } = dataOneArtwork
    //     const srcImage = `assets/images/${photographerId}/${image}`
    //     const srcVideo = `assets/images/${photographerId}/${video}`
    //     arrayIndexSrcTitle.push(allMediaOnePhotographer)

    // })
    // Affiche la bannière fixe avec les prix et les likes
    const fixedBanner = document.createElement('div')
    const likesFixedBanner = document.createElement('div')
    const priceFixedBanner = document.createElement('div')
    fixedBanner.setAttribute('class','likesAndPriceBanner')
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
    arrayLikesOneCard = []  
    arrayBool = []
    allMediaOnePhotographer.forEach( (e) => {
        arrayLikesOneCard.push(e.likes)
        arrayBool.push('true')
    })
    arrayLikesAllCard = document.querySelectorAll('article .likes')
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
    // 

};

init();

// fermeture de la lightbox au clic sur la croix et réinitialisation image et vidéo

const croixDeFermeture = document.querySelector(".lightbox__close")
croixDeFermeture.addEventListener('click', () => {
    document.querySelector('#lightbox').style.display = 'none'
    })

// async function displayData(photos) {
//     const photosSection = document.querySelector(".photograph-photos");

//     photos.forEach((photo) => {
//         const photoModel = photoFactory(photos);
//         const photoCardDOM = photoModel.getPhotoCardDOM();
//         photosSection.appendChild(photoCardDOM);
//     });
// };

// function photoFactory(photos) {
//     // photos est le tableau contenant la partie .media de data.json ET triée selon ID de photograph de la page HTML
//     let imageType = false;
//     let videoType = false;
//     if (photos.image) {
//         const { date, id, image, likes, photographerId, price, title } = photos;
//         imageType = true;
//     } else {
//         const { date, id, likes, photographerId, price, title, video } = photos;
//         videoType = true;
//     };

//     console.log(imageType,videoType)
    
//     function getPhotoCardDOM() {
//         const article = document.createElement( 'article' );
//         const img = document.createElement( 'img' );
//         img.setAttribute("src", `/assets/images/${id})`);
//         img.setAttribute("alt", `artwork entitled ${title}`);
//         const h3 = document.createElement('h3');
//         h3.textContent = title;
//         const link = document.createElement('a');
//         link.setAttribute("href", `#`);
//         link.setAttribute("alt", `${title}, close-up view`);
//         const h4 = document.createElement( 'h4' );
//         h4.textContent = `${likes}` 
//         article.appendChild(link);
//         link.appendChild(img);
//         article.appendChild(h3);
//         article.appendChild(h4);
//         return (article);
//     }
//     return {getPhotoCardDOM }
// }