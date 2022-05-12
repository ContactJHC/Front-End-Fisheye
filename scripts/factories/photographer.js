function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;
    const altPicture = `photo de profil de ${portrait}`;
    
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", altPicture);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const link = document.createElement('a');
        link.setAttribute("href", "#");
        link.setAttribute("alt", name);
        const h3 = document.createElement( 'h3' );
        h3.textContent = `${city}, ${country}`
        const h4 = document.createElement( 'h4' );
        h4.textContent = tagline;
        const h5 = document.createElement( 'h5' );
        h5.textContent = `${price}€/jour`;
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(h5);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}

// function photographerFactory(data) {
//     const { name, portrait } = data;

//     const picture = `assets/photographers/${portrait}`;

//     function getUserCardDOM() {
//         const article = document.createElement( 'article' );
//         const img = document.createElement( 'img' );
//         img.setAttribute("src", picture)
//         const h2 = document.createElement( 'h2' );
//         h2.textContent = name;
//         article.appendChild(img);
//         article.appendChild(h2);
//         return (article);
//     }
//     return { name, picture, getUserCardDOM }
// }