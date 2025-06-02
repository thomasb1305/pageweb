// Récupération de l'image de fond depuis le body
const element = document.body;
const style = window.getComputedStyle(element);
const backgroundImage = style.backgroundImage;

// Extraction de l'URL de l'image de fond
const urlMatch = backgroundImage.match(/url\(["']?(.*?)["']?\)/);
const imageUrl = urlMatch ? urlMatch[1] : null;

// Variables pour stocker les dimensions réelles de l'image
let imgWidth = null;
let imgHeight = null;

if (imageUrl) {
    const img = new Image();
    img.onload = function() {
        imgWidth = img.naturalWidth;
        imgHeight = img.naturalHeight;
        console.log(`Dimensions de l'image : ${imgWidth}px x ${imgHeight}px`);
        updateZones();
    };
    img.src = imageUrl;
} else {
    console.log("Aucune image de fond trouvée.");
}

function updateZones() {
    // Utiliser les dimensions détectées, sinon des valeurs par défaut (à ajuster si besoin)
    let imageWidth, imageHeight;
    if (imgWidth === null || imgHeight === null) {
        imageWidth = 1614;
        imageHeight = 1462;
    } else {
        imageWidth = imgWidth;
        imageHeight = imgHeight;
    }
    
    // Dimensions du conteneur (la fenêtre)
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    
    // Calcul du facteur d'échelle pour "contain"
    const scale = Math.min(containerWidth / imageWidth, containerHeight / imageHeight);
    
    // Dimensions redimensionnées de l'image
    const displayWidth = imageWidth * scale;
    const displayHeight = imageHeight * scale;
    
    // Offsets pour centrer l'image dans la fenêtre
    const offsetX = (containerWidth - displayWidth) / 2;
    const offsetY = (containerHeight - displayHeight) / 2;
    
//PREMIERE ZONE (ROUGE)
    // Définition des coordonnées de base de la zone (en pixels dans l'image d'origine)
    const zone1BordGauche = 5;   // px depuis le bord gauche de l'image
    const zone1BordHaut = 595;    // px depuis le haut de l'image
    const zone1BordDroite = 950;  // Largeur de la zone en pixels
    const zone1BordBas = 660; // Hauteur de la zone en pixels
    // Calcul des coordonnées et dimensions de la zone dans l'affichage redimensionné
    const zone1Left = offsetX + zone1BordGauche * scale;
    const zone1Top = offsetY + zone1BordHaut * scale;
    const zone1Width = zone1BordDroite * scale;
    const zone1Height = zone1BordBas * scale;
    // Mise à jour du style de l'overlay pour qu'il recouvre exactement la zone souhaitée
    let zone1 = document.querySelector(".zone1");
    if (zone1) {
        zone1.style.left = zone1Left + 'px';
        zone1.style.top = zone1Top + 'px';
        zone1.style.width = zone1Width + 'px';
        zone1.style.height = zone1Height + 'px';
    }
        //sous zone 1.1 (chapiteau de gauche)
            // Définition des coordonnées de base de la zone (en pixels dans l'image d'origine)
            const zone11BordGauche = 0;   // px depuis le bord gauche de l'image
            const zone11BordHaut = 0;    // px depuis le haut de l'image
            const zone11BordDroite = 210;  // Largeur de la zone en pixels
            const zone11BordBas = 650; // Hauteur de la zone en pixels
            // Calcul des coordonnées et dimensions de la zone dans l'affichage redimensionné
            const zone11Left = zone11BordGauche * scale;
            const zone11Top = zone11BordHaut * scale;
            const zone11Width = zone11BordDroite * scale;
            const zone11Height = zone11BordBas * scale;
            // Mise à jour du style de l'overlay pour qu'il recouvre exactement la zone souhaitée
            let zone11 = document.querySelector(".zone11");
            if (zone11) {
                zone11.style.left = zone11Left + 'px';
                zone11.style.top = zone11Top + 'px';
                zone11.style.width = zone11Width + 'px';
                zone11.style.height = zone11Height + 'px';
            }
            zone11 = document.querySelector(".zone11");
                    if (zone11) {
                        zone11.style.left = zone11Left + 'px';
                        zone11.style.top = zone11Top + 'px';
                        zone11.style.width = zone11Width + 'px';
                        zone11.style.height = zone11Height + 'px';
                    }
                //sous zone 1.1.1 (chapiteau de gauche)
                    // Définition des coordonnées de base de la zone (en pixels dans l'image d'origine)
                    const zone111BordGauche = 95;   // px depuis le bord gauche de l'image
                    const zone111BordHaut = 275;    // px depuis le haut de l'image
                    const zone111BordDroite = 95;  // Largeur de la zone en pixels
                    const zone111BordBas = 353; // Hauteur de la zone en pixels
                    // Calcul des coordonnées et dimensions de la zone dans l'affichage redimensionné
                    const zone111Left = zone111BordGauche * scale;
                    const zone111Top = zone111BordHaut * scale;
                    const zone111Width = zone111BordDroite * scale;
                    const zone111Height = zone111BordBas * scale;
                    // Mise à jour du style de l'overlay pour qu'il recouvre exactement la zone souhaitée
                    let zone111 = document.querySelector(".zone111");
                    if (zone111) {
                        zone111.style.left = zone111Left + 'px';
                        zone111.style.top = zone111Top + 'px';
                        zone111.style.width = zone111Width + 'px';
                        zone111.style.height = zone111Height + 'px';
                    }
                    zone111 = document.querySelector(".zone111");
                            if (zone111) {
                                zone111BordDroite.style.left = zone111Left + 'px';
                                zone111.style.top = zone111Top + 'px';
                                zone111.style.width = zone111Width + 'px';
                                zone111.style.height = zone111Height + 'px';
                            }

}
// print pour s'assurer que le fichier est chargé
console.log("resizeZones.js chargé");




// Mise à jour lors du chargement et redimensionnement
window.addEventListener('load', updateZones);
window.addEventListener('resize', updateZones);



//vers la page precedente avec la flèche gauche
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
      // Redirection vers une autre page (modifie l'URL selon ton besoin)
      window.location.href = 'https://pageweb-ten.vercel.app/Scene1.html';
    }
  });

  //vers la page suivante avec la flèche droite
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
      // Redirection vers une autre page (modifie l'URL selon ton besoin)
      window.location.href = 'https://pageweb-ten.vercel.app/Scene3.html';
    }
  });

// Affichage des coordonnées de la souris pour le debug
document.addEventListener('mousemove', function(event) {
    console.log('Position de la souris : X = ' + event.clientX + ', Y = ' + event.clientY +
        " avec une fenêtre de " + window.innerWidth + "x" + window.innerHeight);
});
