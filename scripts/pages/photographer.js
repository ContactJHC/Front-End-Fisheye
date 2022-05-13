//Mettre le code JavaScript lié à la page photographer.html

async function getPhotos() {
    // Récupération des productions des artistes
    let photos = []
    await fetch('data/photographers.json').then(async (response) => {
        data = await response.json()
        console.log(data.media)
        photos = data.media
    }).catch((err) => {
        console.log('rejected', err)
        })

    // et bien retourner le tableau photographers seulement une fois
    return ({
        photos},
        console.log(photos))
    
}

getPhotos()

async function displayData(photos) {
    const photosSection = document.querySelector(".photograph-photos");

    photos.forEach((photo) => {
        const photoModel = photoFactory(photos);
        const photoCardDOM = photoModel.getPhotoCardDOM();
        photosSection.appendChild(photoCardDOM);
    });
};

function photoFactory(photos) {
    // photos est le tableau contenant la partie .media de data.json ET triée selon ID de photograph de la page HTML
    let imageType = false;
    let videoType = false;
    if (photos.image) {
        const { date, id, image, likes, photographerId, price, title } = photos;
        imageType = true;
    } else {
        const { date, id, likes, photographerId, price, title, video } = photos;
        videoType = true;
    };

    console.log(imageType,videoType)
    
    function getPhotoCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", `/assets/images/${id})`);
        img.setAttribute("alt", `artwork entitled ${title}`);
        const h3 = document.createElement('h3');
        h3.textContent = title;
        const link = document.createElement('a');
        link.setAttribute("href", `#`);
        link.setAttribute("alt", `${title}, close-up view`);
        const h4 = document.createElement( 'h4' );
        h4.textContent = `${likes}` 
        article.appendChild(link);
        link.appendChild(img);
        article.appendChild(h3);
        article.appendChild(h4);
        return (article);
    }
    return {getPhotoCardDOM }
}