


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

    // exemple comme quoi un addeventlistener dans init() permet d'être 
    // actif en dehors du scope de la fonction 
    // const bout = document.querySelector('.toutsimpl')
    
    // bout.addEventListener('click',()=>{
    //     console.log(allMediaOnePhotographer)
    // })
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

    

    // affichage d'une image cliquée dans la lightbox
    const photosAffichees = document.querySelectorAll(" div.photograph-photos article img")
    photosAffichees.forEach( 
        (uneSeulePhoto,indexUneSeulePhoto) => {
            uneSeulePhoto.addEventListener("click", () => {
                const sourcePhoto = uneSeulePhoto.getAttribute('src')
                const indexPhoto = indexUneSeulePhoto
                const LAlightbox = document.querySelector('#lightbox')
                LAlightbox.style.display = 'block'
                const lightboxContainerImg = document.querySelector('div.lightbox__container img')
                lightboxContainerImg.setAttribute('src', sourcePhoto)
                lightboxContainerImg.setAttribute('alt', arrayTitle[indexPhoto])
                
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
    // Affiche la bannière fixe avec les prix
    const fixedBanner = document.createElement('div')
    fixedBanner.setAttribute('class','likesAndPriceBanner')
    const photographerData = allData.photographers.filter(e=>e.id==idOnePhotographer)[0]
    const photographerPrice = photographerData.price
    fixedBanner.textContent = `${photographerPrice}€/jour`
    document.querySelector('#main').appendChild(fixedBanner)
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

// fermeture de la lightbox au clic sur la croix
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