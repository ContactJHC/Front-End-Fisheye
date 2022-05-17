//factory pour traitement de data.media
//     extraire données unitaires dans un objet
//     renvoyer le HTML d'une card photo/vidéo

function media (dataOneArtwork) {

    const { id, photographerId, title, artWork, likes, date, price } = dataOneArtwork
    
    const srcArtWork = `assets/images/${photographerId}/${artWork}`

    function htmlArtwork() {
        // affichage de l'image ou de la vidéo
        console.log(data.image)
        if (dataOneArtwork.image) {
            const image = document.createElement('img')
            image.setAttribute('src', srcArtWork)
            image.setAttribute('alt', `Photographie intitulée ${title}`)
            return img
        } else {
            const videoPlayer = document.createElement('video')
            video.setAttribute('id','video')
            video.setAttribute('controls', '')
            const source = document.createElement('source')
            source.setAttribute('src', srcArtWork)
            source.setAttribute('alt', `vidéo intitulée ${title}`)
            source.setAttribute('type', 'video/mp4')
            video.appendChild(source)
            return video
        }
    }
    
    function cardOneArtwork() {
        const card = document.createElement('article')
        const artwork = htmlArtwork()
        const titleAndLikes = document.createElement('div')
        titleAndLikes.setAttribute('class','titleAndLikes')
        const entitled = document.createElement('h3')
        entitled.setAttribute('class', 'title')
        entitled.textContent = title
        const likes = document.createElement('p')
        likes.setAttribute('class', 'likes')
        likes.textContent = `${likes} \u2665`
        card.appendChild(artwork)
        card.appendChild(titleAndLikes)
        titleAndLikes.appendChild(entitled)
        titleAndLikes.appendChild(likes)
        return card
    }

    return cardOneArtwork

}