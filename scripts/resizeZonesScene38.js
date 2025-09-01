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
        imageWidth = 1317;
        imageHeight = 461;
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
    const zone1BordGauche = 6;   // px depuis le bord gauche de l'image
    const zone1BordHaut = 120;    // px depuis le haut de l'image
    const zone1BordDroite = 495;  // Largeur de la zone en pixels
    const zone1BordBas = 260; // Hauteur de la zone en pixels
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
        


//DEUXIEME ZONE 
    // Définition des coordonnées de base de la zone (en pixels dans l'image d'origine)
    const zone2BordGauche = 502;   // px depuis le bord gauche de l'image
    const zone2BordHaut = 125;    // px depuis le haut de l'image
    const zone2BordDroite = 807;  // Largeur de la zone en pixels
    const zone2BordBas = 260; // Hauteur de la zone en pixels
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
    //sous zone 2.1 (le petit bateau)
            const zone21BordGauche =0;
            const zone21BordHaut = 17;
            const zone21BordDroite = 90;
            const zone21BordBas = 118;
            const zone21Left = zone21BordGauche * scale;
            const zone21Top = zone21BordHaut * scale;
            const zone21Width = zone21BordDroite * scale;
            const zone21Height = zone21BordBas * scale;
            
            let zone21 = document.querySelector(".zone21");
            if (zone21) {
                zone21.style.left = zone21Left + 'px';
                zone21.style.top = zone21Top + 'px';
                zone21.style.width = zone21Width + 'px';
                zone21.style.height = zone21Height + 'px';
            }
    //sous zone 2.2
            const zone22BordGauche =0;
            const zone22BordHaut = 0;
            const zone22BordDroite = 380;
            const zone22BordBas = 250;
            const zone22Left = zone22BordGauche * scale;
            const zone22Top = zone22BordHaut * scale;
            const zone22Width = zone22BordDroite * scale;
            const zone22Height = zone22BordBas * scale;
            
            let zone22 = document.querySelector(".zone22");
            if (zone22) {
                zone22.style.left = zone22Left + 'px';
                zone22.style.top = zone22Top + 'px';
                zone22.style.width = zone22Width + 'px';
                zone22.style.height = zone22Height + 'px';
            }

            //sous zone 2.2.1
                const zone221BordGauche = 0;
                const zone221BordHaut = 17;
                const zone221BordDroite = 113;
                const zone221BordBas = 90;
                const zone221Left = zone221BordGauche * scale;
                const zone221Top = zone221BordHaut * scale;
                const zone221Width = zone221BordDroite * scale;
                const zone221Height = zone221BordBas * scale;
                let zone221 = document.querySelector(".zone221");
                if (zone221) {
                    zone221.style.left = zone221Left + 'px';
                    zone221.style.top = zone221Top + 'px';
                    zone221.style.width = zone221Width + 'px';
                    zone221.style.height = zone221Height + 'px';
                }
            //sous zone 2.2.1
                const zone222BordGauche = 184;
                const zone222BordHaut = 0;
                const zone222BordDroite = 33;
                const zone222BordBas = 42;
                const zone222Left = zone222BordGauche * scale;
                const zone222Top = zone222BordHaut * scale;
                const zone222Width = zone222BordDroite * scale;
                const zone222Height = zone222BordBas * scale;
                let zone222 = document.querySelector(".zone222");
                if (zone222) {
                    zone222.style.left = zone222Left + 'px';
                    zone222.style.top = zone222Top + 'px';
                    zone222.style.width = zone222Width + 'px';
                    zone222.style.height = zone222Height + 'px';
                }
    //sous zone 2.3
            const zone23BordGauche =382;
            const zone23BordHaut = 0;
            const zone23BordDroite = 426;
            const zone23BordBas = 250;
            const zone23Left = zone23BordGauche * scale;
            const zone23Top = zone23BordHaut * scale;
            const zone23Width = zone23BordDroite * scale;
            const zone23Height = zone23BordBas * scale;
            
            let zone23 = document.querySelector(".zone23");
            if (zone23) {
                zone23.style.left = zone23Left + 'px';
                zone23.style.top = zone23Top + 'px';
                zone23.style.width = zone23Width + 'px';
                zone23.style.height = zone23Height + 'px';
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
      window.location.href = 'https://pageweb-ten.vercel.app/Scene23.html';
    }
  });


//  //vers la page suivante avec la flèche droite
//document.addEventListener('keydown', function(event) {
//    if (event.key === 'ArrowRight') {
//      // Redirection vers une autre page (modifie l'URL selon ton besoin)
//      window.location.href = 'https://pageweb-ten.vercel.app/Scene38.html';
//    }
//  });

// Affichage des coordonnées de la souris pour le debug
document.addEventListener('mousemove', function(event) {
    console.log('Position de la souris : X = ' + event.clientX + ', Y = ' + event.clientY +
        " avec une fenêtre de " + window.innerWidth + "x" + window.innerHeight);
});
