//Mettre le code JavaScript lié à la page photographer.html
// function media (dataOneArtwork) {

//     const { id, photographerId, title, image, likes, date, price } = dataOneArtwork
    
//     const srcArtWork = `assets/images/${photographerId}/${image}`

//     function htmlArtwork() {
//         // affichage de l'image ou de la vidéo
//         console.log(dataOneArtwork.image)
//         if (dataOneArtwork.image) {
//             const image = document.createElement('img')
//             image.setAttribute('src', srcArtWork)
//             image.setAttribute('alt', `Photographie intitulée ${title}`)
//             return image
//         } else {
//             const videoPlayer = document.createElement('video')
//             videoPlayer.setAttribute('id','video')
//             videoPlayer.setAttribute('controls', '')
//             const source = document.createElement('source')
//             source.setAttribute('src', srcArtWork)
//             source.setAttribute('alt', `vidéo intitulée ${title}`)
//             source.setAttribute('type', 'video/mp4')
//             videoPlayer.appendChild(source)
//             return videoPlayer
//         }
//     }
    
//     function cardOneArtwork() {
//         const card = document.createElement('article')
//         const artwork = htmlArtwork()
//         const titleAndLikes = document.createElement('div')
//         titleAndLikes.setAttribute('class','titleAndLikes')
//         const entitled = document.createElement('h3')
//         entitled.setAttribute('class', 'title')
//         entitled.textContent = title
//         const likes = document.createElement('p')
//         likes.setAttribute('class', 'likes')
//         likes.textContent = `${likes} \u2665`
//         card.appendChild(artwork)
//         card.appendChild(titleAndLikes)
//         titleAndLikes.appendChild(entitled)
//         titleAndLikes.appendChild(likes)
//         return card
//     }

//     return cardOneArtwork

// }


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
        console.log(e)
        const oneArtworksDOM = mediaOneId()
        console.log(oneArtworksDOM)
        sectionPhotographPhotos.appendChild(oneArtworksDOM)
    // l'affichage HTML d'une Card de photo/vidéo se fait par l'appel de la méthode cardOneArtwork
    })
    
        
    
}

const params = (new URL(document.location)).searchParams
const idOnePhotographer = params.get('id')
console.log(idOnePhotographer)

async function init() {
    // Récupère les datas des photographes
    const allData = await getData();
    //  Récupère les photos de photographe dont la page est affichée
    const allMediaOnePhotographer = 
        allData.media.filter(e => e.photographerId == idOnePhotographer)
    // Affiche les photos
    displayPhotos(allMediaOnePhotographer)
    // Affiche la bannière fixe avec les prix
    const fixedBanner = document.createElement('div')
    fixedBanner.setAttribute('class','likesAndPriceBanner')
    const photographerData = allData.photographers.filter(e=>e.id==idOnePhotographer)[0]
    const photographerPrice = photographerData.price
    fixedBanner.textContent = `${photographerPrice}€/jour`
    document.querySelector('#main').appendChild(fixedBanner)
    // Affiche l'entête 
    const photographHeader = document.querySelector('.photograph-header')
    console.log(photographHeader)
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

};

init();

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