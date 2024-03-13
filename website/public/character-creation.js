const cookies = document.cookie.split('; ');
let characterIdCharacter;
let selectedGameCharacter;
let characterCreatedCharacter;
let characterCreatedForGameCharacter;

const hiddenInput = document.getElementById('the_game_id');


const firstCharId = document.getElementById('character_class_game_id')
console.log('id="character_class_game_id" at top of page', firstCharId)

cookies.forEach(cookie => {
    const [name, value] = cookie.split('=');
    switch (name.trim()) {
        case 'characterId':
            characterIdCharacter = value;
            console.log('characterId: ' + characterIdCharacter);
            break;
        case 'selectedGame':
            selectedGameCharacter = value;
            console.log('gameId: ' + selectedGameCharacter);
            break;
        case 'characterCreated':
            characterCreatedCharacter = value
            console.log('characterCreated: ' + characterCreatedCharacter);
            break;
        case 'characterCreatedForGame':
            characterCreatedForGameCharacter = value;
            console.log('characterCreatedForGame' + characterCreatedForGameCharacter)
            break;
        default:
            break;
    }
});

// firstCharId = characterIdCharacter

// const axios = require('axios')
console.log("beginning of character-creation.js")

const form = document.querySelector('form')
const gameRadio = document.getElementsByClassName('game')
const romance = document.getElementById('romance')
const editButton = document.getElementById('editButton')
const createButton = document.getElementById('createButton')
const levelSlider = document.getElementById("level")
const numberFromSlider = document.getElementById("number_from_slider")
const paragonSlider = document.getElementById("paragon")
const paragonValue = document.getElementById("number_from_paragon_slider")
const renegadeSlider = document.getElementById("renegade")
const renegadeValue = document.getElementById("number_from_renegade_slider")

// Menu
const menuIcon = document.getElementById('openNav')
const charactersLink = document.getElementById('charactersLink')
const sideNav = document.getElementById('mySidenav')
const closeBtn = sideNav.querySelector('.closebtn')

let firstTimeLoading = 0

// DEBUG

// const radioButtons = document.querySelectorAll('input[name="gameType"]');
// console.log("Number of radio buttons:", radioButtons.length);

// const checkedRadioButton = document.querySelector('input[name="gameType"]:checked');
// if (checkedRadioButton) {
//     console.log("Value of checked radio button:", checkedRadioButton.value);
// } else {
//     console.log("No radio button is checked.");
// }

// hiddenInput.addEventListener('change', function() {
//     console.log('Value changed:', hiddenInput.value);
//   });

// DEBUG END



const baseURLCharacterCreation = "http://localhost:4005/"

const checkCreateEditButtonExistence = () => {
    const createButton = document.getElementById('createButton');
    const editButton = document.getElementById('editButton');
    const submitButton = document.getElementById('submitButton')

    if (createButton && editButton) {
        // Both buttons exist
        return 'bothExist';
    } else if (createButton) {
        // Only createButton exists
        console.log('The Submit button exists')
        return 'createButton';
    } else if (editButton) {
        // Only editButton exists
        console.log('The Edit button exists')
        return 'editButton';
    } else if (submitButton) {
        return 'submitButton'
    } {
        // Neither button exists
        return 'none';
    }
};

const isDecisionButtonExist = () => {
    const decisionButton = document.getElementById('send_decisions_button');
    // console.log('The Decision button exists')
    return !!decisionButton; // Returns true if decisionButton exists, false otherwise
};

const isIdClassSelect = () => {
    const selectClass = document.querySelector('select[id="class"]')
    return !!selectClass
}


const displayCharacter = (characters) => {
    const hiddenCharId = document.getElementById('character_class_game_id')//document.getElementById('the_game_id')
    console.log('id="character_class_game_id" in displayCharacter', hiddenCharId)
    const hiddenGameId = document.getElementById('the_game_id')
    console.log('id="the_game_id"" in displayChracter', hiddenGameId)
    const nameParagraph = document.createElement('label')
    const originParagraph = document.createElement('label')
    const reputationParagraph = document.createElement('label')
    const classParagraph = document.createElement('label')
    const raidoButtonsVersion = document.getElementsByName('gameType')
    const paragonSlider = document.getElementById('paragon')
    const paragonLabel = document.getElementById('number_from_paragon_slider')
    const renegadeSlider = document.getElementById('renegade')
    const renegadeLabel = document.getElementById('number_from_renegade_slider')
    const levelSlider = document.getElementById('level')
    const levelLabel = document.getElementById('number_from_slider')
    const faceCode = document.getElementById('face_code')
    const romanceRadios = document.getElementsByName('romance')


    const character = characters[0]

    console.log(character)

    console.log(character.romanced)

    const legendaryOrClassic = character.game_type


    nameParagraph.id = "char_name"
    originParagraph.id = "origin"
    reputationParagraph.id = "reputation"
    classParagraph.id = "class"

    const oldCharName = document.getElementById('char_name')
    const oldOrigin = document.getElementById('origin')
    const oldReputation = document.getElementById('reputation')
    const oldClass = document.getElementById('class')

    nameParagraph.innerText = character.char_name
    originParagraph.innerText = character.origin + ' |'
    reputationParagraph.innerText = character.reputation + ' |'
    classParagraph.innerHTML = character.c_class 
    faceCode.value = character.face_code

    console.log(hiddenCharId)
    console.log(hiddenGameId)

    hiddenCharId.value = character.char_id
    hiddenGameId.value = character.gameId

    console.log('hiddenCharId: ', hiddenCharId.value)
    console.log('hiddenGameId ', hiddenGameId.value)


    console.log('id="character_class_game_id" in diplayCharacter (it seems to be changed here for some reason)', document.getElementById('character_class_game_id').value)

    for (const radioButton of raidoButtonsVersion) {
        if (radioButton.value === legendaryOrClassic) {
            radioButton.checked = true
            break
        }
    }
    const romance = character.romanced
    for (const radioRomance of romanceRadios) {
        if (radioRomance.value === romance) {
            radioRomance.checked = true
        }
    }

    console.log('dolphin: ', character)

    oldCharName.parentNode.replaceChild(nameParagraph, oldCharName)
    oldOrigin.parentNode.replaceChild(originParagraph, oldOrigin)
    oldReputation.parentNode.replaceChild(reputationParagraph, oldReputation)
    oldClass.parentNode.replaceChild(classParagraph, oldClass)
    paragonSlider.value = character.paragon
    paragonLabel.innerHTML = character.paragon
    console.log("paragon: ", character.paragon)
    renegadeSlider.value = character.renegade
    console.log("renegade: ", character.renegade)
    renegadeLabel.innerHTML = character.renegade
    levelSlider.value = character.char_level
    console.log('level: ', character.char_level)
    levelLabel.innerText = character.char_level

    console.log('charcter level: ', character.level)


    const romancedSelect = document.querySelector('select[name="romance"]');
    if (romancedSelect) {
        const options = romancedSelect.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === character.npc_name) {
                options[i].selected = true;
                break; // Stop looping once the option is found
            }
        }
    } else {
        console.error('Select element with name "romance" not found.');
    }


    document.getElementById('decision-button').innerHTML = `
        <button type="button" id="send_decisions_button">Decisions</button>
    `
    const sendDecisionsButton = document.getElementById('send_decisions_button')

    if (sendDecisionsButton) {
        console.log("sendDecisionsButton exists")
        sendDecisionsButton.addEventListener('click', sendDataAndNavigate);
    }
}

const getCharacter = (body) => {
    console.trace()

    const { charId, game } = body
    console.log(`Fetching character with id from character-creation.js: ${charId}`);
    axios.get(`${baseURLCharacterCreation}character/${charId}`, {
        params: {
            game: game 
        }
    })
        .then(res => {
            const char = res.data;
            console.log("Received character data:", char);
            if (char) {
                console.log(char)
                displayCharacter(char);
            } else {
                console.error("Character data is undefined or null");
            }
        })
        .catch(error => {
            console.error("Error fetching character data:", error);
        });
};

const createCharacter = body => {
    console.trace()
    // console.log('Request Body: ', body);
    
    return axios.post(`${baseURLCharacterCreation}new_character`, body)
        .then(response => {
            const characterId = response.data.characterId;
            console.log(`characterID in character-creation.js: ${characterId}`);
            document.getElementById('character_class_game_id').value = characterId;
            console.log('id="character_class_game_id" in chreateCharacter. This makes sense to change here though', character_class_game_id)
            const games = document.getElementsByName('game')

            let selectedGame;
            for (let i = 0; i < games.length; i++) {
                if (games[i].checked) {
                    // If the radio button is checked, set selectedGame to the value of the checked radio button
                    selectedGame = games[i].value;
                    break; // Exit the loop once a checked radio button is found
                }
            }

            const bodyObj = {
                game: selectedGame,
                charId: characterId
            }

            getCharacter(bodyObj); // Pass characterId directly
        })
        .catch(error => {
            console.error('Error creating character:', error);
            console.error('Detailed error information:', error); 
        });
};

const createNewGameForCharacter = (characterId, body) => {
    console.trace()
    console.log('createNewGameForCharacter')
    const {char_id, version, level, romance, paragon, renegade, game, game_class, face_code} = body
    console.log('char_id: ', char_id)
    return axios.post(`${baseURLCharacterCreation}add-game-character/${characterId}`, body)
        .then(response => {
            const characterId = response.data.characterId;
            console.log(`characterID in character-creation.js: ${characterId}`);
            const games = document.getElementsByName('game')

            let selectedGame;
            for (let i = 0; i < games.length; i++) {
                if (games[i].checked) {
                    // If the radio button is checked, set selectedGame to the value of the checked radio button
                    selectedGame = games[i].value;
                    break; // Exit the loop once a checked radio button is found
                }
            }

            console.log('selectedGame: ', selectedGame)

            const bodyObj = {
                game: selectedGame,
                charId: characterId
            }


            getCharacter(bodyObj); // Pass characterId directly
        })
        .catch(error => {
            console.error('Error creating character:', error);
            console.error('Detailed error information:', error); 
        });
}

const updateCharacter = (characterId, body) => {
    axios.put(`${baseURLCharacterCreation}update-character/${characterId}`, body)
    .then(response => {
        console.log('Character updated successfully:', response.data);
        
        // Optionally, perform additional actions upon successful update
    })
    .catch(error => {
        console.error('Error updating character:', error);
        // Optionally, handle errors and display an error message to the user.
    });
}

const checkCharacterForGame = (body) => { 
    console.trace()
    console.log(body);
    const { charId, game } = body;
    return axios.get(`${baseURLCharacterCreation}check-character-game/${charId}?game=${game}`).then(response => {
        const isAssociated = response.data.associated; // Extract the associated boolean value from the response data
        console.log(isAssociated)
        return isAssociated; // Return the value inside the Promise chain
    }).catch(error => {
        console.error("Error checking character:", error);
        return false
        throw error; // Re-throw the error to propagate it down the Promise chain
    });
}

const checkCharacter = (body) => {
    console.log('checkCharacter id: ' + body)
    return axios.get(`${baseURLCharacterCreation}check-character/${body}`).then(response => {
        const isAssociated = response.data.associated; // Extract the associated boolean value from the response data
        console.log(isAssociated)
        return isAssociated; // Return the value inside the Promise chain
    }).catch(error => {
        console.error("Error checking character:", error);
        throw error; // Re-throw the error to propagate it down the Promise chain
    });
}

const romancedCharacter = (game) => {

    // console.log(game)

    romance.innerHTML = ``
    if (Number(game) === 3) {

        romance.innerHTML = `
        <option value="no one" id="no_one" name="romance">No One</option>
        <option value="Ashley" id="Ashley" name="romance">Ashley</option>
        <option value="Diana" id="Diana" name="romance">Diana</option>
        <option value="Garrus" id="Garrus" name="romance">Garrus</option>
        <option value="Jack" id="Jack" name="romance">Jack</option>
        <option value="Jacob" id="Jacob" name="romance">Jacob</option>
        <option values="James" id="James" name="romance">James</option>
        <option values="Javik" id="Javik" name="romance">Javik</option>
        <option values="Kaidan" id="Kaidan" name="romance">Kaidan</option>
        <option values="Kelly" id="Kelly" name="romance">Kelly</option>
        <option values="Liara" id="Liara" name="romance">Liara</option>
        <option values="Maranda" id="Maranda" name="romance">Maranda</option>
        <option values="Samantha" id="Samantha" name="romance">Samantha</option>
        <option values="Samara" id="Samara" name="romance">Samara</option>
        <option values="Tali" id="Tali" name="romance">Tali</option>
        <option values="Thane" id="Thane" name="romance">Thane</option>
        `
    } else if (Number(game) === 2) {
        romance.innerHTML = `
        <option value="no one" id="no_one" name="romance">No One</option>
        <option value="Ashley" id="Ashley" name="romance">Ashley</option>
        <option value="Garrus" id="Garrus" name="romance">Garrus</option>
        <option value="Jack" id="Jack" name="romance">Jack</option>
        <option value="Jacob" id="Jacob" name="romance">Jacob</option>
        <option value="Kaidan" id="Kaidan" name="romance">Kaidan</option>
        <option value="Kelly" id="Kelly" name="romance">Kelly</option>
        <option value="Liara" id="Liara" name="romance">Liara</option>
        <option values="Maranda" id="Maranda" name="romance">Maranda</option>
        <option value="Morinth" id="Morinth" name="romance">Morinth</option>
        <option value="Samara" id="Samara" name="romance">Samara</option>
        <option value="Tali" id="Tali" name="romance">Tali</option>
        <option value="Thane" id="Thane" name="romance">Thane</option>
        `
    } else {
        romance.innerHTML = ` 
        <option value="no one" id="no_one" name="romance">No One</option>
        <option value="Ashley" id="Ashley" name="romance">Ashley</option>
        <option value="Kaidan" id="Kaidan"  name="romance">Kaidan</option>
        <option value="Liara" id="Liara" name="romance">Liara</option>
        `
    }
}

const addNewCharacter = (event) => {
    // console.trace()
    event.preventDefault()
    const name = document.getElementById('char_name').value;
    const origin = document.querySelector('select[name="origin"]').value
    const reputation = document.querySelector('select[name="reputation"]').value
    const game = document.querySelector('input[name="game"]:checked').value;
    const charClass = document.querySelector('select[name="class"]').value
    const level = document.getElementById('level').value;
    const selectedRomance = document.querySelector('select[name="romance"]')
    const romance = selectedRomance ? selectedRomance.value : null
    const version = document.querySelector('input[name="gameType"]:checked').value;
    const paragon = document.getElementById('paragon').value;
    const renegade = document.getElementById('renegade').value;
    const faceCode = document.getElementById('face_code').value;

    let bodyObj = {
        game: game,
        name: name,
        origin: origin,
        reputation: reputation,
        charClass: charClass,
        version: version,
        level: level,
        romance: romance,
        paragon: paragon,
        renegade: renegade,
        faceCode: faceCode
    }

    // console.log('Body Object:', JSON.stringify(bodyObj));
    createCharacter(bodyObj);

    const buttonExistence = checkCreateEditButtonExistence();

    console.log('checking button in addNewCharacter and changing')
    if (buttonExistence === "createButton") {
        // Create edit button logic
        const editButtonCreation = document.createElement('button');
        editButtonCreation.type = "button";
        editButtonCreation.id = "editButton";
        editButtonCreation.innerText = "Save Edits";

        const buttonCreationExists = document.getElementById('createButton')
        buttonCreationExists.removeEventListener('click', addNewCharacter)
        buttonCreationExists.parentNode.replaceChild(editButtonCreation, buttonCreationExists);

        editButtonCreation.addEventListener('click', editCurrentCharacter)


        console.log('Creating edit button');
    } else if (buttonExistence === "submitButton") {
        
        const editButtonCreation = document.createElement('button');
        editButtonCreation.type = "button";
        editButtonCreation.id = "editButton";
        editButtonCreation.innerText = "Save Edits";

        const buttonCreationExists = document.getElementById('submitButton')
        buttonCreationExists.parentNode.replaceChild(editButtonCreation, buttonCreationExists);

        editButtonCreation.addEventListener('click', editCurrentCharacter)
    }

}

const addDifferentGameToCharacter = (event) => {
    event.preventDefault()
    console.log("editCurrentCharacter has been click")
    const charId = document.getElementById('character_class_game_id').value
    const level = document.getElementById('level').value;
    const romancedOption = document.querySelector(`select[name="romance"]`).value
    const version = document.querySelector('input[name="gameType"]:checked').value
    const paragon = document.getElementById('paragon').value;
    const renegade = document.getElementById('renegade').value;
    const game = document.querySelector('input[name="game"]:checked').value;
    const charClass = document.querySelector('select[name="class"]').value
    const faceCode = document.getElementById('face_code').value;

    let bodyObj = {
        char_id: charId,
        version: version,
        level: level,
        romance: romancedOption,
        paragon: paragon,
        renegade: renegade,
        game: game,
        game_class: charClass,
        face_code: faceCode

    }

    createNewGameForCharacter(charId, bodyObj)

    // edit Button
    const buttonExistence = checkCreateEditButtonExistence();

    console.log('Add Different game to character before checking button')
    if (buttonExistence === "createButton") {
        // Create edit button logic
        const editButtonCreation = document.createElement('button');
        editButtonCreation.type = "button";
        editButtonCreation.id = "editButton";
        editButtonCreation.innerText = "Save Edits";

        const buttonCreationExists = document.getElementById('createButton')
        buttonCreationExists.parentNode.replaceChild(editButtonCreation, buttonCreationExists);

        editButtonCreation.addEventListener('click', editCurrentCharacter)


        console.log('Creating edit button');
    } else if (buttonExistence === "submitButton") {
        
        const editButtonCreation = document.createElement('button');
        editButtonCreation.type = "button";
        editButtonCreation.id = "editButton";
        editButtonCreation.innerText = "Save Edits";

        const buttonCreationExists = document.getElementById('submitButton')
        buttonCreationExists.parentNode.replaceChild(editButtonCreation, buttonCreationExists);

        editButtonCreation.addEventListener('click', editCurrentCharacter)
    }

    // Create Decisions Button

    const decisionArea = document.getElementById('decision-button')
    const decisionButton = document.createElement('button')
    decisionButton.id = 'send_decisions_button'
    decisionButton.type = 'button'
    decisionButton.innerText = "Decisions"
    decisionButton.addEventListener('click', sendDataAndNavigate)

    decisionArea.appendChild(decisionButton)

    console.log('Creating decisions button');
    getCharacter()
    
}

const editCurrentCharacter = async (event) => {
    event.preventDefault()
    console.log("editCurrentCharacter has been click")
    const charId = document.getElementById('character_class_game_id').value
    const level = document.getElementById('level').value;
    const romancedOption = document.querySelector(`select[name="romance"]`).value
    const version = document.querySelector('input[name="gameType"]:checked').value
    const paragon = document.getElementById('paragon').value;
    const renegade = document.getElementById('renegade').value;
    const faceCode = document.getElementById('face_code').value
    const game = document.querySelector('input[name="game"]:checked').value;

    console.log(`face_code in editCurrentChracter: ${faceCode}`)

    let bodyObj = {
        char_id: charId,
        version: version,
        level: level,
        romance: romancedOption,
        paragon: paragon,
        renegade: renegade,
        face_code: faceCode,
        game: game

    }

    await updateCharacter(charId, bodyObj);

    getCharacter(charId)

}



const gameChanged = async () => {
    console.log("gameChanged clicked")

    
    const characterId = document.getElementById('character_class_game_id').value
    console.log('id="character_class_game_id" in gameChanged ', characterId)

    const selectedGame = document.querySelector('input[name="game"]:checked').value

    const paragonSlider = document.getElementById('paragon')
    const paragonLabel = document.getElementById('number_from_paragon_slider')
    const renegadeSlider = document.getElementById('renegade')
    const renegadeLabel = document.getElementById('number_from_renegade_slider')
    const levelSlider = document.getElementById('level')
    const levelLabel = document.getElementById('number_from_slider')
    const faceCode = document.getElementById('face_code')
    const raidoButtonsVersion = document.getElementsByName('gameType')
    

    console.log('selectedGame: ', selectedGame)
    console.log('selectedGame: ', document.querySelector)

    const bodyObj = {
        game: selectedGame,
        charId: characterId
    }

    console.log(bodyObj)

    const sendDecisionsButton = isDecisionButtonExist()
    const buttonExistence = checkCreateEditButtonExistence();
    const selectClass = isIdClassSelect()

    console.log('sendDecisiosnButton')
    console.log(sendDecisionsButton)
    console.log('buttonExistence')
    console.log(buttonExistence)
    
    try {

        let charExist = false;
        let exist = false;

        console.log('before checkCharacter id in gameChanged' + characterId.value)
        if ((characterId) !== -1 && selectedGame !== undefined) {
            charExist = await checkCharacter(characterIdCharacter)
            exist = await checkCharacterForGame(bodyObj)
            console.log(`exist: ${exist}, charExist: ${charExist}`)
        } else if (characterId === undefined) {
            console.log('id="character_class_game_id" is undefined')
        }
        // console.log('before checkCharacter id: ' + charId.value)


        console.log('exist: ' + exist);
        console.log('charExist: ' + charExist)
        console.log('sendDecisionsButton: ' + sendDecisionsButton)
        console.log('buttonExistence: ' + buttonExistence)

        console.log('---')
        console.log('charExist:', charExist);
        console.log('exist:', exist);
        console.log('sendDecisionsButton:', sendDecisionsButton);
        console.log('---')
        if ((characterId) === -1) {
            // New character logic
            console.log('New character');
        } else {
            if (!exist) {
                // Character exists but doesn't exist for this game
                paragonSlider.value = 0
                paragonLabel.innerHTML = 0
                renegadeLabel.innerHTML = 0
                renegadeSlider.value = 0
                levelSlider.value = 0
                levelLabel.innerHTML = 0
                faceCode.value = ""
                if (sendDecisionsButton) {
                    // Destroy decision button logic
                    console.log('destorying decisions button')
                    const decisionButton = document.getElementById('send_decisions_button')
                    decisionButton.removeEventListener('click', sendDataAndNavigate)
                    decisionButton.remove()

                    console.log('Destroying decisions button');
                }

                if (!selectClass) {
                    const classSelection = document.createElement('select')
                    classSelection.id = "class"
                    classSelection.name = "class"
                    classSelection.required = true

                    classSelection.innerHTML = `
                        <option value="Soldier" name="class">Soldier</option>
                        <option value="Engineer" name="class">Engineer</option>
                        <option value="Adept" name="class">Adept</option>
                        <option value="Infiltrator" name="class">Infiltrator</option>
                        <option value="Sentinel" name="class">Sentinel</option>
                        <option value="Vanguard" name="class">Vanguard</option>
                    
                    `

                    const currentClass = document.getElementById('class')
                    currentClass.parentNode.replaceChild(classSelection, currentClass)
                }

                if (buttonExistence === "editButton") {
                    // Create submit button logic
                    console.log('editButton exists submit button to be created')
                    
                    const buttonCreation = document.createElement('input')
                    buttonCreation.type = 'submit'
                    buttonCreation.id = 'submitButton'

                    const editButtonExists = document.getElementById('editButton')
                    editButtonExists.parentNode.replaceChild(buttonCreation, editButtonExists)
                    buttonCreation.addEventListener('click', addDifferentGameToCharacter)


                    console.log('Creating submit button');
                } else if (buttonExistence === "createButton" || buttonExistence === "submitButton") {
                    console.log("the button is what it should be")
                } else {
                    console.log('something is wrong with the edit/submit button')
                    // console.log(createOrEditButton)
                }
                
            } else {
                // Character exists for this game
                getCharacter(bodyObj)
                if (!sendDecisionsButton) {
                    // Create decision button logic
                    const decisionArea = document.getElementById('decision-button')
                    const decisionButton = document.createElement('button')
                    decisionButton.id = 'send_decisions_button'
                    decisionButton.type = 'button'
                    decisionButton.innerText = "Decisions"
                    decisionButton.addEventListener('click', sendDataAndNavigate)

                    decisionArea.appendChild(decisionButton)

                    console.log('Creating decisions button');
                }

                if (buttonExistence === "createButton") {
                    // Create edit button logic
                    const editButtonCreation = document.createElement('button');
                    editButtonCreation.type = "button";
                    editButtonCreation.id = "editButton";
                    editButtonCreation.innerText = "Save Edits";

                    const buttonCreationExists = document.getElementById('createButton')
                    buttonCreationExists.removeEventListener('click', addNewCharacter)
                    buttonCreationExists.parentNode.replaceChild(editButtonCreation, buttonCreationExists);

                    editButtonCreation.addEventListener('click', editCurrentCharacter)


                    console.log('Creating edit button');
                } else if (buttonExistence === "submitButton") {
                    
                    const editButtonCreation = document.createElement('button');
                    editButtonCreation.type = "button";
                    editButtonCreation.id = "editButton";
                    editButtonCreation.innerText = "Save Edits";

                    const buttonCreationExists = document.getElementById('submitButton')
                    buttonCreationExists.removeEventListener('click', addNewCharacter)
                    buttonCreationExists.parentNode.replaceChild(editButtonCreation, buttonCreationExists);

                    editButtonCreation.addEventListener('click', editCurrentCharacter)
                } else {
                    console.log('something is wrong with the edit/submit button')
                    // console.log(createOrEditButton)
                }


                console.log('charId: ', characterIdCharacter)
            }
        }

    } catch (error) {
        console.error("Error:", error);
    }
    

    // console.log(selectedGame)
    romancedCharacter(selectedGame)

}

const silderMoving = () =>{
    numberFromSlider.innerHTML = levelSlider.value
}

const paragonSilderMoving = () =>{
    paragonValue.innerHTML = paragonSlider.value
}

const renegadeSilderMoving = () =>{
    renegadeValue.innerHTML = renegadeSlider.value
}

const menuClicked = (event) => {
    event.preventDefault()
    sideNav.style.width = "250px"
}

const charactersClicked = () => {
    sideNav.style.width = "0"
}

const closeButton = () => {
    sideNav.style.width = "0"
}

const sendDataAndNavigate = () => {
    // Get the selected game value
    console.log("sending decisions")
    const selectedGame = document.querySelector('input[name="game"]:checked').value;
    console.log('name="game" in sendDataAndNavigate', selectedGame)

    
    
    // Get the character ID
    const characterId = document.getElementById('character_class_game_id').value

    const bodyObj = {
        charId: characterId,
        game: selectedGame
    }

    console.log('Horse! charId: ', characterId)

    const characterCreatedForGame = checkCharacterForGame(bodyObj)

    console.log(`pony! charId = ${characterId} & game = ${selectedGame}`)

    const characterCreated = true

    document.cookie = `characterId=${characterId}`;
    document.cookie = `selectedGame=${selectedGame}`
    document.cookie = `characterCreated=${characterCreated}`
    document.cookie = `characterCreatedForGame=${characterCreatedForGame}`
    
    // Redirect to the next HTML page with the encoded URL parameters

    if (Number(selectedGame) === 1) {
        console.log("1 was hit")
        window.location.href = 'mass-effect-1-decisions.html'
    } else if (Number(selectedGame) === 2) {
        window.location.href = 'mass-effect-2-decisions.html'
    } else if (Number(selectedGame) === 3) {
        window.location.href = 'mass-effect-3-decisions.html'
    }
}

const openingPage = () => {
    if (characterCreatedCharacter === 'true') {
        const currentClass = document.getElementById('class');
    
    
        console.log('characterCreatedCharacter: ', characterCreatedCharacter)
    
        console.log(`currentClass: ${currentClass.innerText}`);
    
        // Create a new select element
        const classSelection = document.createElement('select');
        classSelection.id = "class";
        classSelection.name = "class";
        classSelection.required = true;
    
        // Create options for the select element
        const options = ["Soldier", "Engineer", "Adept", "Infiltrator", "Sentinel", "Vanguard"];
        options.forEach(optionValue => {
            const option = document.createElement('option');
            option.value = option.innerText = optionValue;
            classSelection.appendChild(option);
        });
    
        // Replace the current paragraph element with the new one
        currentClass.parentNode.replaceChild(classSelection, currentClass);
        console.log('This character exists! ID: ' + characterIdCharacter);
    
        (async () => {
            const number = document.getElementById('character_class_game_id').value
            console.log('id="character_class_game_id" in openingPage ', number)


            for (let i = 0; i < 3; i++) {
                const iPlusOne = i + 1;
                const bodyObj = {
                    charId: number,
                    game: iPlusOne
                };
        
                try {
                    const characterInGame = await checkCharacterForGame(bodyObj);
                    console.log(typeof characterInGame);
                    console.log(i);
                    if (characterInGame === true) {
                        console.log('this is true');
                        console.log(characterIdCharacter);
                        await getCharacter(bodyObj);
                        // Whatever logic you want to execute after getting the character
                    } else {
                        // Logic when character is not in the game
                    }
                } catch (error) {
                    // Handle errors if any
                }
            }
        })();
        
    
        const editButtonCreation = document.createElement('button');
        editButtonCreation.type = "button";
        editButtonCreation.id = "editButton";
        editButtonCreation.innerText = "Save Edits";
    
        const buttonCreationExists = document.getElementById('createButton')
        buttonCreationExists.removeEventListener('click', addNewCharacter)
        buttonCreationExists.parentNode.replaceChild(editButtonCreation, buttonCreationExists);
    
        editButtonCreation.addEventListener('click', editCurrentCharacter)
    
    
    }
}

if (createButton) {
    // console.log("this exists")
    createButton.addEventListener('click', addNewCharacter)
}
if (editButton) {
    editButton.addEventListener('click', editCurrentCharacter)
}

document.getElementById("game1").addEventListener('click', gameChanged)
document.getElementById("game2").addEventListener('click', gameChanged)
document.getElementById('game3').addEventListener('click', gameChanged)
levelSlider.addEventListener('input', silderMoving)
paragonSlider.addEventListener('input', paragonSilderMoving)
renegadeSlider.addEventListener('input', renegadeSilderMoving)

// Menu
menuIcon.addEventListener('click', menuClicked);
if (charactersLink) {
    charactersLink.addEventListener('click', charactersClicked())
}


closeBtn.addEventListener('click', closeButton)

// gameChanged()
if (firstTimeLoading === 0) {
    romancedCharacter()
    firstTimeLoading++
}

const bobby = document.getElementById('character_class_game_id').value = characterIdCharacter

console.log('bobby. id="character_class_game_id at bottom of page', bobby)

console.log('characterCreatedCharacter = ' + characterCreatedCharacter);
console.log('Type of characterCreatedCharacter:', typeof characterCreatedCharacter);

openingPage()

console.log("end of controller.js")