// Boutons et éléments DOM
let btnStartGame = document.getElementById("btn-in-game");
let afficheTime = document.getElementById("time-left");
let afficheMot = document.getElementById("word-to-type");
let inputMot = document.getElementById("user-input");
let score = document.getElementById("score");

// score 
let scoreG = 0;
let t; // timer
let currentLevel; // bich n7ot fiha fonction mta3 level actuel
let compteur;

//hattit nom mta3 function bich niviter if else 
const LEVELS = {
    easy: { time: 180, length: 5 },
    medium: { time: 120, length: 7 },
    difficult: { time: 60, length: 10 },
};

//hathi function bich traja3 li choix mta3 level ki wa9t yofa
function initialisation() {
    document.getElementById("foll1").hidden = true;
    document.getElementById("word-to-type").hidden = true;
    document.getElementById("user-input").hidden = true;
    document.getElementById("foll2").hidden = false;
    document.getElementById("level-select").hidden = false;
    document.getElementById("btn-in-game").hidden = false;
    //hathi affichage mta3 mot yvidiha 
    afficheMot.textContent = "";
    //hathi bich yvide input 
    inputMot.value = "";
    scoreG = 0;
    //hathi bich y7abiss timer 
    clearInterval(t);
}

//hathi function bich ta3tini mot random bi length ili n7aba ana
function strRandom(length) {
    //hatho caractere kol bich kol marra ya5o caracter
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    //yab9a y3awid hatta yosil li length ili hajti bih
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

//hathi bich tgere les trois niveau easy , medium et difficult demarche kol nafso yitbadil kan temps de jeu w length mta3 mot fi kol niveau
//3malt fuction wahda bich nagiss fi code
function Levelchoix(levelConfig) {
    //affiche temps ili mazal fi le3b
    afficheTime.textContent = `${compteur} s`;
    //hathi taffiche score
    score.textContent = scoreG;

    //bich nafficher awil mot rondom awil matabda la3ba 
    if (compteur === levelConfig.time) {
        afficheMot.textContent = strRandom(levelConfig.length);
    }

    if (compteur > 0) {
         //nchof egalitie mta3 mot taper et afficher
        if (afficheMot.textContent === inputMot.value) {
            //affiche mta3 mot random jdida hasib length mta3 level choisie
            afficheMot.textContent = strRandom(levelConfig.length);
            //vider input
            inputMot.value = "";
            //nzid fi score 1 w affichih
            scoreG++;
            score.textContent = scoreG;
        }
    } else {
        //kif yoffa temps n7abiss wnarja3 li choix mta3 level 
        initialisation();
    }
     //comteur yongoss
    compteur--; 
}

//hathi ki yi5tar level w yiclick play
function Startgame() {
    //hatho bich yaffichit mot random w input ili bich yiktib fih utilisateur w yraja3 choix level w button play non visible
    document.getElementById("foll1").hidden = false;
    document.getElementById("word-to-type").hidden = false;
    document.getElementById("user-input").hidden = false;
    document.getElementById("foll2").hidden = true;
    document.getElementById("level-select").hidden = true;
    document.getElementById("btn-in-game").hidden = true;

    // lahnabich na5o choix selectionner mi liste roulent wnista3mlo bich recupere temps w length mta3 mot aleatoire mta3 niveau
    const levelValue = document.getElementById("level-select").value;
    const levelConfig = LEVELS[levelValue];

    // bich n7adir fonction fi varaible bi function reflechir 5ater manajimch n3adiha direct bi parametre 5ater yista3milha marra bark
    compteur = levelConfig.time;
    currentLevel = () => Levelchoix(levelConfig);

    // lahna bich lancer timer
    t = setInterval(currentLevel, 1000);
}

//bich nabda mi choix mta3 level 
initialisation();
// lahna bich Lancer jeu ki utilisateur bich yiclick 3la play
btnStartGame.addEventListener("click", Startgame);


