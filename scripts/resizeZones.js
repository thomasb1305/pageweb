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
        imageWidth = 774;
        imageHeight = 755;
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
    const zone1BordGauche = 165;   // px depuis le bord gauche de l'image
    const zone1BordHaut = 280;    // px depuis le haut de l'image
    const zone1BordDroite = 220;  // Largeur de la zone en pixels
    const zone1BordBas = 365; // Hauteur de la zone en pixels
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
            const zone11BordHaut = 10;    // px depuis le haut de l'image
            const zone11BordDroite = 50;  // Largeur de la zone en pixels
            const zone11BordBas = 45; // Hauteur de la zone en pixels
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
            //sous zone 1.2 (chapiteau central)
            // Définition des coordonnées de base de la zone (en pixels dans l'image d'origine)
            const zone12BordGauche = 51;   // px depuis le bord gauche de l'image
            const zone12BordHaut = 0;    // px depuis le haut de l'image
            const zone12BordDroite = 95;  // Largeur de la zone en pixels
            const zone12BordBas = 90; // Hauteur de la zone en pixels
            // Calcul des coordonnées et dimensions de la zone dans l'affichage redimensionné
            const zone12Left = zone12BordGauche * scale;
            const zone12Top = zone12BordHaut * scale;
            const zone12Width = zone12BordDroite * scale;
            const zone12Height = zone12BordBas * scale;
            // Mise à jour du style de l'overlay pour qu'il recouvre exactement la zone souhaitée
            let zone12 = document.querySelector(".zone12");
            if (zone12) {
                zone12.style.left = zone12Left + 'px';
                zone12.style.top = zone12Top + 'px';
                zone12.style.width = zone12Width + 'px';
                zone12.style.height = zone12Height + 'px';
            }
            //sous zone 1.3 (chapiteau de droite)
            // Définition des coordonnées de base de la zone (en pixels dans l'image d'origine)
            const zone13BordGauche = 147;   // px depuis le bord gauche de l'image
            const zone13BordHaut = 20;    // px depuis le haut de l'image
            const zone13BordDroite = 50;  // Largeur de la zone en pixels
            const zone13BordBas = 38; // Hauteur de la zone en pixels
            // Calcul des coordonnées et dimensions de la zone dans l'affichage redimensionné
            const zone13Left = zone13BordGauche * scale;
            const zone13Top = zone13BordHaut * scale;
            const zone13Width = zone13BordDroite * scale;
            const zone13Height = zone13BordBas * scale;
            // Mise à jour du style de l'overlay pour qu'il recouvre exactement la zone souhaitée
            let zone13 = document.querySelector(".zone13");
            if (zone13) {
                zone13.style.left = zone13Left + 'px';
                zone13.style.top = zone13Top + 'px';
                zone13.style.width = zone13Width + 'px';
                zone13.style.height = zone13Height + 'px';
            }


//DEUXIEME ZONE (bleu)
    // Définition des coordonnées de base de la zone (en pixels dans l'image d'origine)
    const zone2BordGauche = 385;   // px depuis le bord gauche de l'image
    const zone2BordHaut = 333;    // px depuis le haut de l'image
    const zone2BordDroite = 345;  // Largeur de la zone en pixels
    const zone2BordBas = 312; // Hauteur de la zone en pixels
    // Calcul des coordonnées et dimensions de la zone dans l'affichage redimensionné
    const zone2Left = offsetX + zone2BordGauche * scale;
    const zone2Top = offsetY + zone2BordHaut * scale;
    const zone2Width = zone2BordDroite * scale;
    const zone2Height = zone2BordBas * scale;
    // Mise à jour du style de l'overlay pour qu'il recouvre exactement la zone souhaitée
    let zone2 = document.querySelector(".zone2");
    if (zone2) {
        zone2.style.left = zone2Left + 'px';
        zone2.style.top = zone2Top + 'px';
        zone2.style.width = zone2Width + 'px';
        zone2.style.height = zone2Height + 'px';
    }

}
// print pour s'assurer que le fichier est chargé
console.log("resizeZones.js chargé");


// Mise à jour lors du chargement et redimensionnement
window.addEventListener('load', updateZones);
window.addEventListener('resize', updateZones);

// Affichage des coordonnées de la souris pour le debug
document.addEventListener('mousemove', function(event) {
    console.log('Position de la souris : X = ' + event.clientX + ', Y = ' + event.clientY +
        " avec une fenêtre de " + window.innerWidth + "x" + window.innerHeight);
});
