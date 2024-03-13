const cookies = document.cookie.split('; ');
let characterIdCharacter;
let selectedGameCharacter;
let characterCreatedCharacter;
let characterCreatedForGameCharacter;

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
            characterCreatedCharacter = value;
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

let number = 0;

const baseURLCharacterCreation = "http://localhost:4005/"

const submitOne = document.getElementById('mass-effect1')

const menuIcon = document.getElementById('openNav')
const charactersLink = document.getElementById('charactersLink')
const sideNav = document.getElementById('mySidenav')
const closeBtn = sideNav.querySelector('.closebtn')

const displayGameData = (data) => {
    if (Array.isArray(data) && data.length > 0) {
        const gameOneData = data[0]

        const fistCheck = document.getElementById('fist-check')
        const helpedJenna = document.getElementById('helped-jenna-check')
        const conradVenerRadios = document.querySelectorAll('input[name="conrad"]')
        const rescuedBurns = document.getElementById('rescued-burns-checkbox')
        const kyleSurrendered = document.getElementById('kyle-surrendered-checkbox')
        const helenaSurvived = document.getElementById('helena-survived-checkbox')
        const punchAlJilani = document.getElementById('punch-al-jilani-checkbox')
        const recoveredOSD = document.getElementById('recovered-OSD-feros-checkbox')
        const shialaSurvived = document.getElementById('shiala-survived-checkbox')
        const saveZhusHopeColonists = document.getElementById('save-zhus-hope-colonists')
        const giannaExposed = document.getElementById('gianna-not-exposed')
        const rachniQueen = document.getElementById('rachni-queen-survived')
        const wrexArmor = document.getElementById('wrex-family-armor')
        const taliData = document.getElementById('tali-geth-data')
        const jacobLife = document.getElementById('jacob-life')
        const savedX57 = document.getElementById('saved-x57-hostages')
        const wrexSurvived = document.getElementById('wrex-survived')
        const ranaSurvived = document.getElementById('rana-survived')
        const kirraheSurvived = document.getElementById('kirrahe-survived')
        const ashleyOrKaidenRadios = document.querySelectorAll('input[name="survived-virmire-companion"]')
        const savedDestinyAscension = document.getElementById('saved-destiny-ascension')
        const councilRadios = document.querySelectorAll('input[name="council"]')
        const assariWritings = document.getElementById('asari-writings')
        const elkossCombine = document.getElementById('elkoss-combine-armory')


        if (gameOneData) {
            // Set checkboxes
            fistCheck.checked = gameOneData.fist_spared;
            helpedJenna.checked = gameOneData.jianna_helped;
            rescuedBurns.checked = gameOneData.rescued_burns;
            kyleSurrendered.checked = gameOneData.kyle_surrender;
            helenaSurvived.checked = gameOneData.helena_blae_survived;
            punchAlJilani.checked = gameOneData.punched;
            recoveredOSD.checked = gameOneData.recovered_osd;
            shialaSurvived.checked = gameOneData.shiala_survived;
            saveZhusHopeColonists.checked = gameOneData.saved_zhu_colonist;
            giannaExposed.checked = gameOneData.gianna_not_exposed;
            rachniQueen.checked = gameOneData.rachni_queen_survived;
            wrexArmor.checked = gameOneData.retrieved_wrex_armor;
            taliData.checked = gameOneData.gave_tali_geth_data;
            jacobLife.checked = gameOneData.jacob_died;
            savedX57.checked = gameOneData.saved_x57_hostages;
            wrexSurvived.checked = gameOneData.wrex_survived;
            ranaSurvived.checked = gameOneData.rana_survived;
            kirraheSurvived.checked = gameOneData.kirrahe_survived;
            savedDestinyAscension.checked = gameOneData.saved_destiny_ascension;
            // council.checked = gameOneData.anderson_or_udina;
            assariWritings.checked = gameOneData.aquired_10_assari_writings;
            elkossCombine.checked = gameOneData.elkoss_conbine_license;
        
            // Set radio buttons
            const conradFate = gameOneData.fate;
            console.log(conradFate)
            conradVenerRadios.forEach(conradVerner => {
                if (conradVerner.value === conradFate) {
                    conradVerner.checked = true;
                }
            });

            const survivedVirmire = gameOneData.ak_npc_name
            console.log(`ashleyOrKaidan: ${survivedVirmire}`)
            ashleyOrKaidenRadios.forEach(ashleyOrKaiden => {
                console.log('WEEEEEE')
                console.log(ashleyOrKaiden.value)
                if (ashleyOrKaiden.value === survivedVirmire) {
                    ashleyOrKaiden.checked = true;
                } else {
                    console.log(`${ashleyOrKaiden.value}|${survivedVirmire}`)
                }
            })

            const concilSeat = gameOneData.au_npc_name;

            councilRadios.forEach(council => {
                if (council.value === concilSeat) {
                    council.checked = true
                }
            })
        }
    } else {
        console.error("No data received from the backend or the data is empty.");
    }
}

const getGameDecisions = (body) => {
    const { gameId, charId } = body;
    console.log('gameID: ', gameId);
    console.log('charId: ', charId);
    axios.get(`${baseURLCharacterCreation}mass-effect-one/${charId}`, {
        params: {
            gameId: gameId
        }
    })
        .then(res => {
            const gameOneData = res.data;
            console.log("Received game one data:", gameOneData);
            if (gameOneData) {
                console.log(gameOneData);
                displayGameData(gameOneData);
            } else {
                console.error("gameOneData data is undefined or null");
            }
        })
        .catch(error => {
            console.error("Error fetching gameOneData data:", error);
        });
    console.log('getGameDecisions done working');
}

const updateMassEffectOneDecisions = (characterId, body) => {
    axios.put(`${baseURLCharacterCreation}mass-effect-one-edit/${characterId}`, body)
    .then(response => {
        console.log('Decisons updated successfully:', response.data);
        // Optionally, perform additional actions upon successful update
    })
    .catch(error => {
        console.error('Error updating decisions:', error);
        // Optionally, handle errors and display an error message to the user.
    });
}

const addMassEffectOneDecisions = async (data) => axios.post(`${baseURLCharacterCreation}mass-effect-one/`, data)

const checkGameOneExists = (body) => {
    console.log('checkGameOneExists id: ' + body);

    const { gameId, charId } = body;
    console.log(`gameId and charId for checkGameOneExists: ${gameId} & ${charId}`)
    return axios.get(`${baseURLCharacterCreation}check-game-exists/${charId}`, {
        params: {
            gameId: gameId 
        }
    }).then(response => {
        const isAssociated = response.data.associated; // Extract the associated boolean value from the response data
        console.log(isAssociated);
        return isAssociated; // Return the value inside the Promise chain
    }).catch(error => {
        console.error("Error checking game:", error);
        throw error; // Re-throw the error to propagate it down the Promise chain
    });
}


const editDecisions = (event) => {
    event.preventDefault()

    setTimeout(() => {
        // Your code to be executed after a quarter of a second
    }, 250);

    // Log to check if the function is triggered
    console.log('Edit Decisions function called')

    const gameHiddenId = document.getElementById('game_id_1').value
    const fistCheck = document.getElementById('fist-check').checked
    const helpedJenna = document.getElementById('helped-jenna-check').checked
    const conradVener = document.querySelector('input[name="conrad"]:checked').value
    const rescuedBurns = document.getElementById('rescued-burns-checkbox').checked
    const kyleSurrendered = document.getElementById('kyle-surrendered-checkbox').checked
    const helenaSurvived = document.getElementById('helena-survived-checkbox').checked
    const punchAlJilani = document.getElementById('punch-al-jilani-checkbox').checked
    const recoveredOSD = document.getElementById('recovered-OSD-feros-checkbox').checked
    const shialaSurvived = document.getElementById('shiala-survived-checkbox').checked
    const saveZhusHopeColonists = document.getElementById('save-zhus-hope-colonists').checked
    const giannaExposed = document.getElementById('gianna-not-exposed').checked
    const rachniQueen = document.getElementById('rachni-queen-survived').checked
    const wrexArmor = document.getElementById('wrex-family-armor').checked
    const taliData = document.getElementById('tali-geth-data').checked
    const jacobLife = document.getElementById('jacob-life').checked
    const savedX57 = document.getElementById('saved-x57-hostages').checked
    const wrexSurvived = document.getElementById('wrex-survived').checked
    const ranaSurvived = document.getElementById('rana-survived').checked
    const kirraheSurvived = document.getElementById('kirrahe-survived').checked
    const ashleyOrKaiden = document.querySelector('input[name="survived-virmire-companion"]:checked').value
    const savedDestinyAscension = document.getElementById('saved-destiny-ascension').checked
    const council = document.querySelector('input[name="council"]:checked').value
    const assariWritings = document.getElementById('asari-writings').checked
    const elkossCombine = document.getElementById('elkoss-combine-armory').checked

    console.log(`
        gameHiddenId: ${gameHiddenId}
        hiddenID: ${characterIdCharacter},
        fistCheck: ${fistCheck},
        helpedJenna: ${helpedJenna},
        conradVener: ${conradVener},
        rescuedBurns: ${rescuedBurns},
        kyleSurrendered: ${kyleSurrendered},
        helenaSurvived: ${helenaSurvived},
        punchAlJilani: ${punchAlJilani},
        recoveredOSD: ${recoveredOSD},
        shialaSurvived: ${shialaSurvived},
        saveZhusHopeColonists: ${saveZhusHopeColonists},
        giannaExposed: ${giannaExposed},
        rachniQueen: ${rachniQueen},
        wrexArmor: ${wrexArmor},
        taliData: ${taliData},
        jacobLife: ${jacobLife},
        savedX57: ${savedX57},
        wrexSurvived: ${wrexSurvived},
        ranaSurvived: ${ranaSurvived},
        kirraheSurvived: ${kirraheSurvived},
        ashleyOrKaiden: ${ashleyOrKaiden},
        savedDestinyAscension: ${savedDestinyAscension},
        council: ${council}
        assariWritings: ${assariWritings}
        elkossCombine: ${elkossCombine}
    `)

    const bodyObj = {
        gameId: gameHiddenId,
        characterCreationId: characterIdCharacter,
        fistAlive: fistCheck,
        jinnaHelped: helpedJenna,
        conrad: conradVener,
        rescuedBurns: rescuedBurns,
        kyleSurrendered: kyleSurrendered,
        helenaSurvived: helenaSurvived,
        punchAlJilani: punchAlJilani,
        recoveredOSD: recoveredOSD,
        shialaSurvived: shialaSurvived,
        zhusHope: saveZhusHopeColonists,
        giannaNotExposed: giannaExposed,
        rachniQueen: rachniQueen,
        wrexArmor: wrexArmor,
        taliGethData: taliData,
        jacobLife: jacobLife,
        savedHostages: savedX57,
        wrexSurvived: wrexSurvived,
        ranaSurvived: ranaSurvived,
        kirraheSurvived: kirraheSurvived,
        ashleyOrKaiden: ashleyOrKaiden,
        savedDestinyAscension: savedDestinyAscension,
        andersonOrUdina: council,
        asariWriting: assariWritings,
        elkossCombineArmory: elkossCombine
    }

    updateMassEffectOneDecisions( characterIdCharacter, bodyObj)

    console.log('Edit Decisions function execution completed');

}

const disappearSubmitButton = () => {
    // submitOne.removeEventListener('click', createMassEffectOneDecisons)
    
    console.log('Submit button removed.');

    const parentElement = submitOne.parentNode;
    parentElement.removeChild(submitOne);

    const allInputsInForm = document.querySelectorAll('#mass-effect-1 input')
    for(let i = 0; i < allInputsInForm.length; i++) {
        allInputsInForm[i].addEventListener('change', editDecisions)
        console.log('added Event Listner for ' + allInputsInForm[i].id)
    }


    console.log('Event listeners added to inputs.');
}

const createMassEffectOneDecisons = (event) => {
    event.preventDefault()
    const gameHiddenId = document.getElementById('game_id_1').value
    const fistCheck = document.getElementById('fist-check').checked
    const helpedJenna = document.getElementById('helped-jenna-check').checked
    const conradVener = document.querySelector('input[name="conrad"]:checked').value
    const rescuedBurns = document.getElementById('rescued-burns-checkbox').checked
    const kyleSurrendered = document.getElementById('kyle-surrendered-checkbox').checked
    const helenaSurvived = document.getElementById('helena-survived-checkbox').checked
    const punchAlJilani = document.getElementById('punch-al-jilani-checkbox').checked
    const recoveredOSD = document.getElementById('recovered-OSD-feros-checkbox').checked
    const shialaSurvived = document.getElementById('shiala-survived-checkbox').checked
    const saveZhusHopeColonists = document.getElementById('save-zhus-hope-colonists').checked
    const giannaExposed = document.getElementById('gianna-not-exposed').checked
    const rachniQueen = document.getElementById('rachni-queen-survived').checked
    const wrexArmor = document.getElementById('wrex-family-armor').checked
    const taliData = document.getElementById('tali-geth-data').checked
    const jacobLife = document.getElementById('jacob-life').checked
    const savedX57 = document.getElementById('saved-x57-hostages').checked
    const wrexSurvived = document.getElementById('wrex-survived').checked
    const ranaSurvived = document.getElementById('rana-survived').checked
    const kirraheSurvived = document.getElementById('kirrahe-survived').checked
    const ashleyOrKaiden = document.querySelector('input[name="survived-virmire-companion"]:checked').value
    const savedDestinyAscension = document.getElementById('saved-destiny-ascension').checked
    const council = document.querySelector('input[name="council"]:checked').value
    const assariWritings = document.getElementById('asari-writings').checked
    const elkossCombine = document.getElementById('elkoss-combine-armory').checked

    console.log(`
        gameHiddenId: ${gameHiddenId}
        hiddenID: ${characterIdCharacter},
        fistCheck: ${fistCheck},
        helpedJenna: ${helpedJenna},
        conradVener: ${conradVener},
        rescuedBurns: ${rescuedBurns},
        kyleSurrendered: ${kyleSurrendered},
        helenaSurvived: ${helenaSurvived},
        punchAlJilani: ${punchAlJilani},
        recoveredOSD: ${recoveredOSD},
        shialaSurvived: ${shialaSurvived},
        saveZhusHopeColonists: ${saveZhusHopeColonists},
        giannaExposed: ${giannaExposed},
        rachniQueen: ${rachniQueen},
        wrexArmor: ${wrexArmor},
        taliData: ${taliData},
        jacobLife: ${jacobLife},
        savedX57: ${savedX57},
        wrexSurvived: ${wrexSurvived},
        ranaSurvived: ${ranaSurvived},
        kirraheSurvived: ${kirraheSurvived},
        ashleyOrKaiden: ${ashleyOrKaiden},
        savedDestinyAscension: ${savedDestinyAscension},
        council: ${council}
        assariWritings: ${assariWritings}
        elkossCombine: ${elkossCombine}
    `)

    const bodyObj = {
        gameId: gameHiddenId,
        characterCreationId: characterIdCharacter,
        fistAlive: fistCheck,
        jinnaHelped: helpedJenna,
        conrad: conradVener,
        rescuedBurns: rescuedBurns,
        kyleSurrendered: kyleSurrendered,
        helenaSurvived: helenaSurvived,
        punchAlJilani: punchAlJilani,
        recoveredOSD: recoveredOSD,
        shialaSurvived: shialaSurvived,
        zhusHope: saveZhusHopeColonists,
        giannaNotExposed: giannaExposed,
        rachniQueen: rachniQueen,
        wrexArmor: wrexArmor,
        taliGethData: taliData,
        jacobLife: jacobLife,
        savedHostages: savedX57,
        wrexSurvived: wrexSurvived,
        ranaSurvived: ranaSurvived,
        kirraheSurvived: kirraheSurvived,
        ashleyOrKaiden: ashleyOrKaiden,
        savedDestinyAscension: savedDestinyAscension,
        andersonOrUdina: council,
        asariWriting: assariWritings,
        elkossCombineArmory: elkossCombine
    }

    addMassEffectOneDecisions(bodyObj)

    setTimeout(() => {
        // Your code to be executed after a quarter of a second
    }, 250);

    disappearSubmitButton()

}

const checkGameOne = async () => {
    const gameHiddenId = document.getElementById('game_id_1').value;
    const charId = document.getElementById('character_id_decisions').value;

    const bodyObj = {
        gameId: gameHiddenId,
        charId: charId
    };

    number++

    try {
        const gameOneDecisions = await checkGameOneExists(bodyObj);
        console.log('gameHiddenId: ', gameHiddenId)
        console.log('charId: ', charId)
        console.log("checkGameOne's gameOneDecisions: ", gameOneDecisions);
        console.log(typeof gameOneDecisions)

        if (gameOneDecisions === true) {
            console.log('if statement is being hit');
            getGameDecisions(bodyObj);
            disappearSubmitButton()

            console.log('it exists!')
            console.log(number)
        }

    } catch (error) {
        console.error("Error in checkGameOne:", error);
    }
}

const giveHiddenIdData = () =>{
    document.getElementById('character_id_decisions').value = characterIdCharacter
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

menuIcon.addEventListener('click', menuClicked);
closeBtn.addEventListener('click', closeButton)
if (charactersLink) {
    charactersLink.addEventListener('click', charactersClicked())
}

submitOne.addEventListener('click', createMassEffectOneDecisons)


giveHiddenIdData()

checkGameOne()