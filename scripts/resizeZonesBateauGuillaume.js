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

function showPoint(x, y, parent) {
    console.log(`→ Affichage point à ${x}px, ${y}px`);
    const point = document.createElement('div');
    point.className = 'point';
    point.style.left = `${x}px`;
    point.style.top = `${y}px`;
    parent.appendChild(point);
  
    // Apparition
    requestAnimationFrame(() => point.style.opacity = '1');
  
    // Disparition après 1 seconde
    setTimeout(() => {
      point.style.opacity = '0';
      setTimeout(() => point.remove(), 300);
    }, 1000);
  }

  /*
  getScaledPosition prend les coordonnées x et y d'un point dans l'image d'origine
    et les convertit en coordonnées dans l'image redimensionnée pour l'affichage.
  */
    function getScaledPosition(x, y,imgWidth, imgHeight) {      
        const zone = document.querySelector('.zone1');
      
        const zoneRect = zone.getBoundingClientRect(); // position et taille réelles affichées
        const zoneWidth = zoneRect.width;
        const zoneHeight = zoneRect.height;
      
        const scaleX = zoneWidth / imgWidth;
        const scaleY = zoneHeight / imgHeight;
      
        return {
          x: x * scaleX,
          y: y * scaleY
        };
      }

  /*
    updateZones est la fonction principale qui redimensionne les zones
    et les positionne correctement en fonction de la taille de la fenêtre.
  */
function updateZones() {
    // Utiliser les dimensions détectées, sinon des valeurs par défaut (à ajuster si besoin)
    let imageWidth, imageHeight;
    if (imgWidth === null || imgHeight === null) {
        imageWidth = 700;
        imageHeight = 486;
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
    

/*
Dans la suite du code, nous allons définir les zones d'interaction en fonction de leur coordonnées dans l'image, en brute.
Ces coordonnées sont basées sur l'image d'origine, et nous allons les adapter à l'échelle actuelle de l'image affichée.
Ensuite, pour chaque image, nous allons récupérer les points des contours de l'objet, puis nous ajoutons une fonction qui permettra de cliquer
 sur la zone et d'afficher un par un les points du bord.
*/ 


/*
Première zone : le bateau
*/
    //Placement de la zone en brut par rapport à l'image de fond
        // Définition des coordonnées de base de la zone (en pixels dans l'image d'origine)
        const zone1BordGauche = 10;   // px depuis le bord gauche de l'image
        const zone1BordHaut = 324;    // px depuis le haut de l'image
        const zone1BordDroite = 670;  // Largeur de la zone en pixels
        const zone1BordBas = 150; // Hauteur de la zone en pixels
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

            //sous zone 1.1(le mat)
                const zone11BordGauche = 30;
                const zone11BordHaut = 5;
                const zone11BordDroite = 80;
                const zone11BordBas = 142;
                const zone11Left = zone11BordGauche * scale;
                const zone11Top = zone11BordHaut * scale;
                const zone11Width = zone11BordDroite * scale;
                const zone11Height = zone11BordBas * scale;
                
                let zone11 = document.querySelector(".zone11");
                if (zone11) {
                    zone11.style.left = zone11Left + 'px';
                    zone11.style.top = zone11Top + 'px';
                    zone11.style.width = zone11Width + 'px';
                    zone11.style.height = zone11Height + 'px';
                }


//DEUXIEME ZONE 
    // Définition des coordonnées de base de la zone (en pixels dans l'image d'origine)
    const zone2BordGauche = 50;   // px depuis le bord gauche de l'image
    const zone2BordHaut = 265;    // px depuis le haut de l'image
    const zone2BordDroite = 600;  // Largeur de la zone en pixels
    const zone2BordBas = 60; // Hauteur de la zone en pixels
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
    //sous zone 2.1 (le conducteur du bateau)
            const zone21BordGauche = 4;
            const zone21BordHaut = 0;
            const zone21BordDroite = 93;
            const zone21BordBas = 57;
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
    //sous zone 2.2 (les passagers)
        const zone22BordGauche = 98;
        const zone22BordHaut = 0;
        const zone22BordDroite = 450;
        const zone22BordBas = 57;
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

        //sous zone 2.3 (le guide)
        const zone23BordGauche = 549;
        const zone23BordHaut = 0;
        const zone23BordDroite = 43;
        const zone23BordBas = 57;
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
            
//troisieme ZONE 
// Définition des coordonnées de base de la zone (en pixels dans l'image d'origine)
const zone3BordGauche = 146  // px depuis le bord gauche de l'image
const zone3BordHaut = 16;    // px depuis le haut de l'image
const zone3BordDroite = 395;  // Largeur de la zone en pixels
const zone3BordBas = 248; // Hauteur de la zone en pixels
// Calcul des coordonnées et dimensions de la zone dans l'affichage redimensionné
const zone3Left = offsetX + zone3BordGauche * scale;
const zone3Top = offsetY + zone3BordHaut * scale;
const zone3Width = zone3BordDroite * scale;
const zone3Height = zone3BordBas * scale;
// Mise à jour du style de l'overlay pour qu'il recouvre exactement la zone souhaitée
let zone3 = document.querySelector(".zone3");
if (zone3) {
    zone3.style.left = zone3Left + 'px';
    zone3.style.top = zone3Top + 'px';
    zone3.style.width = zone3Width + 'px';
    zone3.style.height = zone3Height + 'px';
}
    //sous zone 3.1 (la lanterne)
    const zone31BordGauche = 180;
    const zone31BordHaut = 0;
    const zone31BordDroite = 57;
    const zone31BordBas = 80;
    const zone31Left = zone31BordGauche * scale;
    const zone31Top = zone31BordHaut * scale;
    const zone31Width = zone31BordDroite * scale;
    const zone31Height = zone31BordBas * scale;
    
    let zone31 = document.querySelector(".zone31");
    if (zone31) {
        zone31.style.left = zone31Left + 'px';
        zone31.style.top = zone31Top + 'px';
        zone31.style.width = zone31Width + 'px';
        zone31.style.height = zone31Height + 'px';
    }
    //sous zone 3.2 (la voile du bateau)
    const zone32BordGauche = 1;
    const zone32BordHaut = 83;
    const zone32BordDroite = 390;
    const zone32BordBas = 163;
    const zone32Left = zone32BordGauche * scale;
    const zone32Top = zone32BordHaut * scale;
    const zone32Width = zone32BordDroite * scale;
    const zone32Height = zone32BordBas * scale;
    
    let zone32 = document.querySelector(".zone32");
    if (zone32) {
        zone32.style.left = zone32Left + 'px';
        zone32.style.top = zone32Top + 'px';
        zone32.style.width = zone32Width + 'px';
        zone32.style.height = zone32Height + 'px';
    }



//afficher les boutons en gros à droite et à gauch de l'image
    //bouton de gauche pour aller voir la scene suivante
    let nextSceneButton = document.querySelector(".nextScene");
    if (nextSceneButton) {//si le bouton a été trouvé
        nextSceneButton.style.left = (offsetX + displayWidth) + 'px'; // Juste après l'image
        nextSceneButton.style.top = '0px'; // En haut de la fenêtre
        nextSceneButton.style.width = (window.innerWidth - (offsetX + displayWidth)) + 'px'; // Toute la place restante
        nextSceneButton.style.height = window.innerHeight + 'px'; // Toute la hauteur de la fenêtre
    }

}
// print pour s'assurer que le fichier est chargé
console.log("resizeZonesScene1.js chargé");

//vers la page suivante avec la flèche droite
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
      //Redirection vers une autre page (modifie l'URL selon ton besoin)
      window.location.href = 'https://pageweb-ten.vercel.app/Scene2.html';
    }
  });


// Mise à jour lors du chargement et redimensionnement
window.addEventListener('load', updateZones);
window.addEventListener('resize', updateZones);



// Affichage des coordonnées de la souris pour le debug
//document.addEventListener('mousemove', function(event) {
//    console.log('Position de la souris : X = ' + event.clientX + ', Y = ' + event.clientY +
//        " avec une fenêtre de " + window.innerWidth + "x" + window.innerHeight);
//});