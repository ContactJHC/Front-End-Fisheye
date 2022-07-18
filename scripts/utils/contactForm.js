const modal = document.getElementById("contact_modal")
const mainHTML = document.getElementById('main')
const modalCloseBtn = document.querySelector('#modalCloseBtn')
const boutonEnvoi = document.querySelector('#boutonFin')
const boutonContact = document.querySelector('#boutonContact')

// eslint-disable-next-line no-unused-vars
function constructionHeaderModal(nomPhotographe) {
  const parentNode = document.querySelector('.modal')
  const formModal = document.querySelector('#formulaire')
  const underHeader = document.createElement('div')
  underHeader.setAttribute('id','underHeader')
  underHeader.textContent = nomPhotographe
  parentNode.insertBefore(underHeader,formModal)
}

function displayModal() {
  // affichage de la modale
  modal.style.display = "block"
  // masquage de la page html en terme d'accessibilité lorsque la modale est ouverte
  // affichage de la modale - accessibilité
  mainHTML.setAttribute('aria-hidden', 'true')
  modal.setAttribute('aria-hidden','false')
  modal.setAttribute('role','dialog')
  // focus sur le bouton de fermeture de la modale
  modalCloseBtn.focus()
  modalCloseBtn.setAttribute('tabindex','0')
  mainHTML.classList.add('no-scroll')
  mainHTML.style.opacity = '0.6'
 
}

// écoute d'événement : ouverture de la modale avec nom photographe
const boutonModale = document.querySelector('#boutonContact')
boutonModale.addEventListener('click', displayModal)

// ouverture de la modale à l'appui sur 'Entrée'
boutonContact.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    console.log('touche entrée entendue');
    displayModal()
  }
})

function closeModal() {
    mainHTML.classList.remove('no-scroll')
    modal.style.display = "none";
    // réinitisaliser le formulaire à la fermeture et à l'envoi
    document.querySelector("#formulaire").reset();
    // masquage modale et affichage html - accessibilité
    modal.setAttribute('aria-hidden','true');
    mainHTML.setAttribute('aria-hidden','false')
    // focus sur le bouton d'ouverture de la modale
    boutonEnvoi.focus()
    mainHTML.style.opacity = '1'

}

// fermeture de la modale :
//      à l'appui sur la touche Echap
modal.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    closeModal()
  }
})
//      au clic sur la croix de fermeture 
modalCloseBtn.addEventListener('click', closeModal)
//      en appuyant sur entrée lorsque la sélection au clavier est sur la croix de fermeture
modalCloseBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    closeModal()
  }
})

// // // Vérification de la validité du prénom renseigné 

const prenom = document.querySelector('#first');
const testPrenom = /^[a-z ,.'-]{2,30}$/i;
const spanPrenom = document.querySelector(".aidesFirst");

function verifPrenom () {
  if(testPrenom.test(prenom.value)){
    spanPrenom.style.display = "none";
    return true;
  } else {
    spanPrenom.style.display = "block";
    return false;
}
}
prenom.addEventListener("keyup", verifPrenom);


// // // Vérification de la validité du nom renseigné

const nom = document.querySelector('#last');
const testnom = /^[a-z ,.'-]{2,30}$/i;
const spanNom = document.querySelector(".aidesLast");

function verifNom() {
  if(testnom.test(nom.value)){
    spanNom.style.display = "none";
    return true; 
  } else {
    spanNom.style.display = "block";
    return false;
  }
}

nom.addEventListener("keyup", verifNom);


// // // Vérification de la validité de l'email renseigné 

const email = document.querySelector('#email');
const spanEmail = document.querySelector(".aidesEmail");

function verifEmail() {
  // eslint-disable-next-line no-useless-escape
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))
    {
      spanEmail.style.display = "none";
      return true; 
    } else {
      spanEmail.style.display = "block";
      return false;
    }
  
  
}

email.addEventListener("keyup", verifEmail);

// // // Vérification de la validité du message renseigné

const message = document.querySelector('#messenger');
const testMessage = /^[a-z ,.'-]{2,500}$/i;
const spanMessage = document.querySelector(".aidesMessenger");

function verifMessage() {
    if(testMessage.test(message.value)){
        spanMessage.style.display = "none";
        return true;
    } else {
        spanMessage.style.display = "block";
        return false;
    }
}

message.addEventListener("keyup", verifMessage);

// Définition de la fonction d'envoi  
// Récupération des informations du formulaire


function validate() {
    
    let resultat = verifPrenom() && verifNom() && verifEmail() && verifMessage()  
    if (resultat) {
        let outputData = {
          'prénom': prenom.value,
          'nom': nom.value,
          'email': email.value,
          'message': message.value,
      }
        console.log(outputData)
        closeModal()
        
    } else {
      spanPrenom.style.display = "block";
      spanNom.style.display = "block";
      spanEmail.style.display = "block";
      spanMessage.style.display = "block";
      return false
    }
    return false
}

const boutonEnvoiFormulaire = document.querySelector('#formulaire > button')
boutonEnvoiFormulaire.addEventListener('click', validate)




