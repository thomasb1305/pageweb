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
    const point = document.createElement('div');
    point.className = 'point';
    point.style.left = `${x}px`;
    point.style.top = `${y}px`;
    parent.appendChild(point);
    // Fade in
    requestAnimationFrame(() => {
      point.style.opacity = '1';
    });
    // Supprimer après 1s
    setTimeout(() => {
      point.style.opacity = '0';
      setTimeout(() => point.remove(), 300);
    }, 1000);
  }

  /*
  getScaledPosition prend les coordonnées x et y d'un point dans l'image d'origine
    et les convertit en coordonnées dans l'image redimensionnée pour l'affichage.
  */
  function getScaledPosition(x, y) {
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const imgWidth = 774;   // largeur réelle de l'image
    const imgHeight = 755;  // hauteur réelle de l'image
  
    const scale = Math.min(containerWidth / imgWidth, containerHeight / imgHeight);
    const displayWidth = imgWidth * scale;
    const displayHeight = imgHeight * scale;
    const offsetX = (containerWidth - displayWidth) / 2;
    const offsetY = (containerHeight - displayHeight) / 2;
  
    return {
      x: x * scale + offsetX,
      y: y * scale + offsetY
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
    

/*
Dans la suite du code, nous allons définir les zones d'interaction en fonction de leur coordonnées dans l'image, en brute.
Ces coordonnées sont basées sur l'image d'origine, et nous allons les adapter à l'échelle actuelle de l'image affichée.
Ensuite, pour chaque image, nous allons récupérer les points des contours de l'objet, puis nous ajoutons une fonction qui permettra de cliquer
 sur la zone et d'afficher un par un les points du bord.
*/ 


/*
Première zone : le chateau
*/
    //Placement de la zone en brut par rapport à l'image de fond
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

    //recupération des coordonnées du contour de l'objet principal de la zone1 (le chateau):
        // Charger les points depuis un fichier .txt
            fetch('./Scene1_contours/chateau/chateau_contours.txt')
    .       then(response => response.text())
    .       then(text => {
                console.log("pts z1 ok");
                points = text.trim().split('\n').map(line => {
                    const [x, y] = line.split(',').map(Number);
                    return { x, y };
                });
            });
    //Maintenant, nous allons ajouter un écouteur d'événement pour afficher les points un par un lorsque l'utilisateur clique sur la zone1.
            document.querySelector('.zone1').addEventListener('click', () => {
                const zone = document.querySelector('.zone1');
            
                let i = 0;
                const interval = setInterval(() => {
                if (i >= points.length) {
                    clearInterval(interval);
                    return;
                }
            
                const scaled = getScaledPosition(points[i].x, points[i].y);
                showPoint(scaled.x, scaled.y, zone);
            
                i++;
                }, 500);
            });
    
        //sous zone 1.1 (chapiteau de gauche)
            // Définition des coordonnées de base de la zone (en pixels dans l'image d'origine)
            const zone11BordGauche = 0;   // px depuis le bord gauche de l'image
            const zone11BordHaut = 5;    // px depuis le haut de l'image
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
            //sous zone 1.4 (mur du chateau)
            // Définition des coordonnées de base de la zone (en pixels dans l'image d'origine)
            const zone14BordGauche = 53;   // px depuis le bord gauche de l'image
            const zone14BordHaut = 85;    // px depuis le haut de l'image
            const zone14BordDroite = 115;  // Largeur de la zone en pixels
            const zone14BordBas = 278; // Hauteur de la zone en pixels
            // Calcul des coordonnées et dimensions de la zone dans l'affichage redimensionné
            const zone14Left = zone14BordGauche * scale;
            const zone14Top = zone14BordHaut * scale;
            const zone14Width = zone14BordDroite * scale;
            const zone14Height = zone14BordBas * scale;
            // Mise à jour du style de l'overlay pour qu'il recouvre exactement la zone souhaitée
            let zone14 = document.querySelector(".zone14");
            if (zone14) {
                zone14.style.left = zone14Left + 'px';
                zone14.style.top = zone14Top + 'px';
                zone14.style.width = zone14Width + 'px';
                zone14.style.height = zone14Height + 'px';
            }
                    //sous zone 1.4 (fenetre)
                    // Définition des coordonnées de base de la zone (en pixels dans l'image d'origine)
                    const zone141BordGauche = 0;   // px depuis le bord gauche de l'image
                    const zone141BordHaut = 110;    // px depuis le haut de l'image
                    const zone141BordDroite = 115;  // Largeur de la zone en pixels
                    const zone141BordBas = 140; // Hauteur de la zone en pixels
                    // Calcul des coordonnées et dimensions de la zone dans l'affichage redimensionné
                    const zone141Left = zone141BordGauche * scale;
                    const zone141Top = zone141BordHaut * scale;
                    const zone141Width = zone141BordDroite * scale;
                    const zone141Height = zone141BordBas * scale;
                    // Mise à jour du style de l'overlay pour qu'il recouvre exactement la zone souhaitée
                    let zone141 = document.querySelector(".zone141");
                    if (zone141) {
                        zone141.style.left = zone141Left + 'px';
                        zone141.style.top = zone141Top + 'px';
                        zone141.style.width = zone141Width + 'px';
                        zone141.style.height = zone141Height + 'px';
                    }
                        //sous zone 1.4 (fenetre)
                    // Définition des coordonnées de base de la zone (en pixels dans l'image d'origine)
                    const zone142BordGauche = 0;   // px depuis le bord gauche de l'image
                    const zone142BordHaut = 0;    // px depuis le haut de l'image
                    const zone142BordDroite = 105;  // Largeur de la zone en pixels
                    const zone142BordBas = 50; // Hauteur de la zone en pixels
                    // Calcul des coordonnées et dimensions de la zone dans l'affichage redimensionné
                    const zone142Left = zone142BordGauche * scale;
                    const zone142Top = zone142BordHaut * scale;
                    const zone142Width = zone142BordDroite * scale;
                    const zone142Height = zone142BordBas * scale;
                    // Mise à jour du style de l'overlay pour qu'il recouvre exactement la zone souhaitée
                    let zone142 = document.querySelector(".zone142");
                    if (zone142) {
                        zone142.style.left = zone142Left + 'px';
                        zone142.style.top = zone142Top + 'px';
                        zone142.style.width = zone142Width + 'px';
                        zone142.style.height = zone142Height + 'px';
                    }

//DEUXIEME ZONE 
    // Définition des coordonnées de base de la zone (en pixels dans l'image d'origine)
    const zone2BordGauche = 385;   // px depuis le bord gauche de l'image
    const zone2BordHaut = 330;    // px depuis le haut de l'image
    const zone2BordDroite = 345;  // Largeur de la zone en pixels
    const zone2BordBas = 315; // Hauteur de la zone en pixels
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
    //sous zone 2.1 (le roi)
            const zone21BordGauche = 120;
            const zone21BordHaut = 0;
            const zone21BordDroite = 165;
            const zone21BordBas = 313;
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
            //sous zone 2.1.1 (la couronne du roi)
                const zone211BordGauche = 0;
                const zone211BordHaut = 0;
                const zone211BordDroite = 70;
                const zone211BordBas = 40;
                const zone211Left = zone211BordGauche * scale;
                const zone211Top = zone211BordHaut * scale;
                const zone211Width = zone211BordDroite * scale;
                const zone211Height = zone211BordBas * scale;
                let zone211 = document.querySelector(".zone211");
                if (zone211) {
                    zone211.style.left = zone211Left + 'px';
                    zone211.style.top = zone211Top + 'px';
                    zone211.style.width = zone211Width + 'px';
                    zone211.style.height = zone211Height + 'px';
                }
            //sous zone 2.1.2 (le septre du roi)
                const zone212BordGauche = 75;
                const zone212BordHaut = 33;
                const zone212BordDroite = 70;
                const zone212BordBas = 120;
                const zone212Left = zone212BordGauche * scale;
                const zone212Top = zone212BordHaut * scale;
                const zone212Width = zone212BordDroite * scale;
                const zone212Height = zone212BordBas * scale;
                let zone212 = document.querySelector(".zone212");
                if (zone212) {
                    zone212.style.left = zone212Left + 'px';
                    zone212.style.top = zone212Top + 'px';
                    zone212.style.width = zone212Width + 'px';
                    zone212.style.height = zone212Height + 'px';
                }
            //sous zone 2.1.2 (le septre du roi)
                const zone213BordGauche = 25;
                const zone213BordHaut = 280;
                const zone213BordDroite = 88;
                const zone213BordBas = 30;
                const zone213Left = zone213BordGauche * scale;
                const zone213Top = zone213BordHaut * scale;
                const zone213Width = zone213BordDroite * scale;
                const zone213Height = zone213BordBas * scale;
                let zone213 = document.querySelector(".zone213");
                if (zone213) {
                    zone213.style.left = zone213Left + 'px';
                    zone213.style.top = zone213Top + 'px';
                    zone213.style.width = zone213Width + 'px';
                    zone213.style.height = zone213Height + 'px';
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
      // Redirection vers une autre page (modifie l'URL selon ton besoin)
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
