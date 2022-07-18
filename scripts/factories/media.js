//factory pour traitement de data.media
//     extraire données unitaires dans un objet
//     renvoyer le HTML d'une card photo/vidéo

// eslint-disable-next-line no-unused-vars
function media (dataOneArtwork) {

    const { photographerId, title, image, video, likes } = dataOneArtwork
    const srcImage = `assets/images/${photographerId}/${image}`
    const srcVideo = `assets/images/${photographerId}/${video}`

    function htmlArtwork() {
        // affichage de l'image ou de la vidéo        
        if (dataOneArtwork.image) {
            const image = document.createElement('img')
            image.setAttribute('src', srcImage)
            image.setAttribute('alt', `Photographie intitulée ${title}`)
            image.setAttribute('class', 'photoAffichee');
            image.setAttribute('tabindex', '0')
            return image
        } else {
            const encartVideo = document.createElement('div')
            encartVideo.setAttribute('class','divArticleVideo')
            const videoPlayer = document.createElement('video')
            videoPlayer.setAttribute('id','video')
            videoPlayer.setAttribute('tabindex','0')
            videoPlayer.setAttribute('class', 'videoAffichee');
            // videoPlayer.setAttribute('controls', '')
            const iconePlayVideo = document.createElement('img')
            iconePlayVideo.setAttribute('class', 'iconeLectureVideo')
            iconePlayVideo.setAttribute('src', './assets/icons/player.svg')
            const source = document.createElement('source')
            source.setAttribute('src', srcVideo)
            // source.setAttribute('alt', `vidéo intitulée ${title}`)
            // source.setAttribute('type', 'video/mp4')
            encartVideo.appendChild(iconePlayVideo)
            encartVideo.appendChild(videoPlayer)
            videoPlayer.appendChild(source)
            // encartVideo.setAttribute('tabindex', '0')
            return encartVideo
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