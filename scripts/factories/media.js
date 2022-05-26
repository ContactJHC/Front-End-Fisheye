//factory pour traitement de data.media
//     extraire données unitaires dans un objet
//     renvoyer le HTML d'une card photo/vidéo

function media (dataOneArtwork) {

    const { id, photographerId, title, image, video, likes, date, price } = dataOneArtwork
    const srcImage = `assets/images/${photographerId}/${image}`
    const srcVideo = `assets/images/${photographerId}/${video}`

    function htmlArtwork() {
        // affichage de l'image ou de la vidéo        
        if (dataOneArtwork.image) {
            const image = document.createElement('img')
            image.setAttribute('src', srcImage)
            image.setAttribute('alt', `Photographie intitulée ${title}`)
            return image
        } else {
            const videoPlayer = document.createElement('video')
            videoPlayer.setAttribute('id','video')
            videoPlayer.setAttribute('controls', '')
            const source = document.createElement('source')
            source.setAttribute('src', srcVideo)
            source.setAttribute('alt', `vidéo intitulée ${title}`)
            source.setAttribute('type', 'video/mp4')
            videoPlayer.appendChild(source)
            return videoPlayer
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
        const nbLikes = document.createElement('p')
        nbLikes.setAttribute('class', 'likes')
        nbLikes.textContent = `${likes} \u2665`
        card.appendChild(artwork)
        card.appendChild(titleAndLikes)
        titleAndLikes.appendChild(entitled)
        titleAndLikes.appendChild(nbLikes)
        return card
    }

    return cardOneArtwork

}