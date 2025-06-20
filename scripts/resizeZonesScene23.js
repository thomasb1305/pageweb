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


function updateZones() {
    // Utiliser les dimensions détectées, sinon des valeurs par défaut (à ajuster si besoin)
    let imageWidth, imageHeight;
    if (imgWidth === null || imgHeight === null) {
        imageWidth = 1050;
        imageHeight = 826;
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
    const zone1BordGauche = 8;   // px depuis le bord gauche de l'image
    const zone1BordHaut =310;    // px depuis le haut de l'image
    const zone1BordDroite = 280;  // Largeur de la zone en pixels
    const zone1BordBas = 385; // Hauteur de la zone en pixels
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
        fetch('Scene23_contours/zone1/coordonnees/zone1_coords.txt')
        .       then(response => response.text())
        .       then(text => {
                    console.log("pts z1 ok");
                    pointsZ1 = text.trim().split('\n').map(line => {
                        const [x, y] = line.split(' ').map(Number);
                        //console.log(`→ ligne: "${line}" → x=${x}, y=${y}`);
                        return { x, y };
                    });
                });
        //Maintenant, nous allons ajouter un écouteur d'événement pour afficher les points un par un lorsque l'utilisateur clique sur la zone1.
        document.querySelector('.zone1').addEventListener('click', () => {
            const zone = document.querySelector('.zone1');
          
            let i = 0;
            const interval = setInterval(() => {
              if (i >= pointsZ1.length) {
                clearInterval(interval);
                return;
              }
          
              const local = getScaledPosition((pointsZ1[i].x), (pointsZ1[i].y),277,385); // coordonnées locales à .zone1 (encore -30 a cause de euuuuh et les dimensions de l'image du chateau ahhahahahahah j'en ai marrrrreeee
              showPoint(local.x, local.y, zone); // pas de rect.left à soustraire ici
          
              i++;
            }, 10);
          });

//DEUXIEME ZONE (BLEU)  
    // Définition des coordonnées de base de la zone (en pixels dans l'image d'origine)
    const zone2BordGauche = 289;   // px depuis le bord gauche de l'image
    const zone2BordHaut =395;    // px depuis le haut de l'image
    const zone2BordDroite = 531;  // Largeur de la zone en pixels
    const zone2BordBas = 300; // Hauteur de la zone en pixels
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

    //recupération des coordonnées du contour de l'objet principal de la zone1 (le chateau):
        // Charger les points depuis un fichier .txt
        fetch('Scene23_contours/zone2/coordonnees/zone2_coords.txt')
        .       then(response => response.text())
        .       then(text => {
                    console.log("pts z2 ok");
                    pointsZ2 = text.trim().split('\n').map(line => {
                        const [x, y] = line.split(' ').map(Number);
                        //console.log(`→ ligne: "${line}" → x=${x}, y=${y}`);
                        return { x, y };
                    });
                });
        //Maintenant, nous allons ajouter un écouteur d'événement pour afficher les points un par un lorsque l'utilisateur clique sur la zone 2.
        document.querySelector('.zone2').addEventListener('click', () => {
            const zone = document.querySelector('.zone2');
          
            let i = 0;
            const interval = setInterval(() => {
              if (i >= pointsZ2.length) {
                clearInterval(interval);
                return;
              }
          
              const local = getScaledPosition((pointsZ2[i].x)-10, (pointsZ2[i].y)+20,531,300);
              showPoint(local.x, local.y, zone); // pas de rect.left à soustraire ici
          
              i++;
            }, 10);
          });

//troisIEME ZONE (verte)  
    // Définition des coordonnées de base de la zone (en pixels dans l'image d'origine)
    const zone3BordGauche = 820;   // px depuis le bord gauche de l'image
    const zone3BordHaut = 310;    // px depuis le haut de l'image
    const zone3BordDroite = 225;  // Largeur de la zone en pixels
    const zone3BordBas = 390; // Hauteur de la zone en pixels
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
      window.location.href = 'https://pageweb-ten.vercel.app/Scene8.html';
    }
  });


  //vers la page suivante avec la flèche droite
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
      // Redirection vers une autre page (modifie l'URL selon ton besoin)
      window.location.href = 'https://pageweb-ten.vercel.app/Scene38.html';
    }
  });

// Affichage des coordonnées de la souris pour le debug
document.addEventListener('mousemove', function(event) {
    console.log('Position de la souris : X = ' + event.clientX + ', Y = ' + event.clientY +
        " avec une fenêtre de " + window.innerWidth + "x" + window.innerHeight);
});
