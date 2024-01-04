//global variables
let visualAssetsLocations = {
    pixel: [{modImage: "./assets/mod-assets/pixelmon-mod.jpg", modIcon: "./assets/icons-assets/pixel-icon.jpg"}],
    car: [{modImage: "./assets/mod-assets/car-mod.jpg", modIcon: "./assets/icons-assets/car-icon.jfif"}],
    gun: [{modImage: "./assets/mod-assets/gun-mod.webp", modIcon: "./assets/icons-assets/gun-icon.jpg"}],
    shaders:[{modImage: "./assets/mod-assets/shader-mod.jpg", modIcon: "./assets/icons-assets/shaders-icon.jfif"}],
    furniture:[{modImage: "./assets/mod-assets/furniture-mod.jpg", modIcon: "./assets/icons-assets/furniture-icon.jpg"}],
    dragon:[{modImage: "./assets/mod-assets/dragon-mod.jpg", modIcon: "./assets/icons-assets/dragon-icon.jpg"}],
    dungeon: [{modImage: "./assets/mod-assets/dungeons-mod.jfif", modIcon: "./assets/icons-assets/dungeon-icon.jpg"}],
    aphmauBackground: "./assets/mod-assets/aphmau-background.jfif"
}
let modNames = ["pixel", "car", "gun", "shaders", "furniture", "dragon", "dungeon"];
var currentModIndex = 0;
var headerMessage = (currentModIndex == 0) ? "Look at the picture and guess mod":"Choose the right option";


// function to show user the tutorial
function showTutorial(){
    console.log(`running showTutorial()`);
    setTimeout(addModToGuess, 2000);
}

// function to add mod to guess
function addModToGuess() {
        
    let textDiv = document.getElementById("text-div");
    let h2 = document.createElement("h2");
    h2.id = "title";
    h2.textContent = headerMessage;
    textDiv.appendChild(h2);

    //adding mod image .
    let modImage = document.createElement('img');
    let modName = modNames[currentModIndex];
    let modImageLocatioin = visualAssetsLocations[modName][0].modImage;
    modImage.src = modImageLocatioin; // adding image location to img element
    modImage.id = modName + "-mod"; // adding element id
    modImage.alt = "Image for Mod to be guessed ."; //adding image element alt text

    let modImageContainer = document.getElementById("image-div"); // getting mod image container
    modImageContainer.appendChild(modImage); //appeding mod-image into document throught its container

    //adding icons
    switch (modName) {
        case "shaders":
            let shadersIconSources = new Array();
            shadersIconSources.push(visualAssetsLocations["car"][0].modIcon);
            shadersIconSources.push(visualAssetsLocations["pixel"][0].modIcon);
            shadersIconSources.push(visualAssetsLocations["shaders"][0].modIcon);
            addIcon(shadersIconSources, "shaders");
            break;
        case "furniture":
            let furnitureIconSources = new Array();
            furnitureIconSources.push(visualAssetsLocations["gun"][0].modIcon);
            furnitureIconSources.push(visualAssetsLocations["furniture"][0].modIcon);
            furnitureIconSources.push(visualAssetsLocations["shaders"][0].modIcon);
            addIcon(furnitureIconSources, "furniture");
            break;        
        case "pixel":
            let pixelIconSources = new Array();
            pixelIconSources.push(visualAssetsLocations["pixel"][0].modIcon);
            pixelIconSources.push(visualAssetsLocations["dragon"][0].modIcon);
            pixelIconSources.push(visualAssetsLocations["dungeon"][0].modIcon);
            addIcon(pixelIconSources, "pixel");
            break;        
        case "dungeon":
            let dungeonIconSources = new Array();
            dungeonIconSources.push(visualAssetsLocations["dungeon"][0].modIcon);
            dungeonIconSources.push(visualAssetsLocations["car"][0].modIcon);
            dungeonIconSources.push(visualAssetsLocations["gun"][0].modIcon);
            addIcon(dungeonIconSources, "dungeon");
            break;        
        case "car":
            let carIconSources = new Array();
            carIconSources.push(visualAssetsLocations["dungeon"][0].modIcon);
            carIconSources.push(visualAssetsLocations["pixel"][0].modIcon);
            carIconSources.push(visualAssetsLocations["car"][0].modIcon);
            addIcon(carIconSources, "car");
            break;
        case "dragon":
            let dragonIconSources = new Array();
            dragonIconSources.push(visualAssetsLocations["dragon"][0].modIcon);
            dragonIconSources.push(visualAssetsLocations["furniture"][0].modIcon);
            dragonIconSources.push(visualAssetsLocations["gun"][0].modIcon);
            addIcon(dragonIconSources, "dragon");
            break;
        case "gun":
            let gunIconSources = new Array();
            gunIconSources.push(visualAssetsLocations["gun"][0].modIcon);
            gunIconSources.push(visualAssetsLocations["furniture"][0].modIcon);
            gunIconSources.push(visualAssetsLocations["shaders"][0].modIcon);
            addIcon(gunIconSources, "gun");
            break;
        default: 
            console.log("no mod name found");
    }

    //icon adder
    function addIcon(iconSource, modName) {

        let iconContainer = document.getElementById("icons-div");
        let iconDivs = iconContainer.childNodes;
        let index = 0;

        iconDivs.forEach(iconDiv => {
            if(iconDiv.className == "icons") {
                let icon = document.createElement("img");
                icon.src = iconSource[index];
                icon.alt = "icon for mod";
                icon.id = iconSource[index].split('/')[3].split('.')[0];
                index++;
                iconDiv.appendChild(icon);
            }
        })
    }

    currentModIndex++;
    
}

//answer validity checker
function checkAnswer(answer) {

    let correctAnswer = modNames[currentModIndex-1];
    let userAnswer = answer.childNodes[0].id.split('-')[0];
    let iconDiv = document.getElementsByClassName("icons");

    if(correctAnswer == userAnswer) {

        //removing title .
        document.getElementById("title").textContent = "That's Right !";

        setTimeout(() => {

            // removing previous icons .
            for(let i = 0; i < iconDiv.length; i++) {
                iconDiv[i].childNodes[0].remove();
            }

            // removing previous mod image .
            document.getElementById(`${modNames[currentModIndex-1]}-mod`).remove();
            document.getElementById("title").remove();

            headerMessage = "Choose the right option";

            if(currentModIndex == modNames.length-1) {
                showFinalCard();
            }else {
                addModToGuess();
            }

        }, 1000);

    }else {

        //removing title .
        document.getElementById("title").textContent = `Incorrect. It's ${correctAnswer}`;

        setTimeout(() => {

            // removing previous icons .
            for(let i = 0; i < iconDiv.length; i++) {
                iconDiv[i].childNodes[0].remove();
            }

            // removing previous mod image .
            document.getElementById(`${modNames[currentModIndex-1]}-mod`).remove();
            document.getElementById("title").remove();

            headerMessage = "Choose the right option";

            if(currentModIndex == modNames.length-1) {
                showFinalCard();
            }else {
                addModToGuess();
            }

        }, 1000);
    }
}

//how final card .
function showFinalCard() {
    document.getElementById("add-container").style.display = "none";
    document.getElementById("final-card-container").style.display = "block";
}