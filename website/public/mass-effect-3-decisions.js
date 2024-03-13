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

const submitButton = document.getElementById('mass-effect3')

const baseURLCharacterCreation = "http://localhost:4005/"

// Menu
const menuIcon = document.getElementById('openNav')
const charactersLink = document.getElementById('charactersLink')
const sideNav = document.getElementById('mySidenav')
const closeBtn = sideNav.querySelector('.closebtn')

const displayGameData = (data) => {
    if (Array.isArray(data) && data.length > 0) {
        const gameThreeData = data[0]

        const punchAlJilani = document.getElementById('punch-al-jilani-checkbox')
        const recruitDoctorRadios = document.querySelectorAll('input[name="doctor"]') // Radio Button
        const pardonedDanielsDonnelly = document.getElementById('pardoned-daniels-donnelly')
        const eveSurvived = document.getElementById('eve-survived')
        const genophageCured = document.getElementById('genophage-cured')
        const mordinDied = document.getElementById('mordin-died')
        const kissedAria = document.getElementById('kissed-aria')
        const savedOmegaCivilians = document.getElementById('saved-omega-civilians')
        const annBrysonUnharmed = document.getElementById('ann-bryson=unharmed')
        const paragonAshleyKaidan = document.getElementById('paragon-ashley-kaidan')
        const garrusMatch = document.getElementById('garrus-match')
        const ediJokerRelationship = document.getElementById('edi-joker-relationship')
        const savedBau = document.getElementById('saved-bau')
        const savedKahje = document.getElementById('saved-kahje')
        const grissomAcademy = document.getElementById('grissom-academy')
        const grissomStudents = document.getElementById('grissom-students')
        const rachniQueenSurvived = document.getElementById('rachni-queen-survived')
        const gruntSurvived = document.getElementById('grunt-died')
        const ashleyKaidanSurvived = document.getElementById('ashley-kaidan-survived')
        const samaraSurvived = document.getElementById('samara-survived')
        const falereSpared = document.getElementById('falere-spared')
        const gavinArcherDied = document.getElementById('gavin-archer')
        const savedRiley = document.getElementById('saved-riley')
        const balakSpared = document.getElementById('balak-spared')
        const conradVernerRadios = document.querySelectorAll('input[name="conrad"]') // Radio button
        const rescuedLegion = document.getElementById('rescued-legion')
        const destroyedReaperCode = document.getElementById('destroyed-reaper-code')
        const gethJammingTower = document.getElementById('geth-jamming-tower')
        const memoryShard = document.getElementById('memory-shard')
        const savedAdmiralKoris = document.getElementById('saved-admiral-koris')
        const quariansSurvived = document.getElementById('quarians-survived')
        const taliDied = document.getElementById('taliDeath')
        const gethIntelligent = document.getElementById('geth-intelligent')
        const javikLiaraArgument = document.getElementById('javik-liara-argument')
        const brooksIncarcerated = document.getElementById('brooks-incarcerated')
        const mirandaSurvived = document.getElementById('miranda-survived')
        const cortezSurvived = document.getElementById('cortez-survived')
        const endingRadios = document.querySelectorAll('input[name="ending"]') // radio button
        
        punchAlJilani.checked = gameThreeData.al_jilani_punched;
        pardonedDanielsDonnelly.checked = gameThreeData.pardoned_daniels_donnelly;
        eveSurvived.checked = gameThreeData.eve_saved;
        genophageCured.checked = gameThreeData.genophage_cured;
        mordinDied.checked = gameThreeData.mordin_survived;
        kissedAria.checked = gameThreeData.kissed_aria;
        savedOmegaCivilians.checked = gameThreeData.saved_omega_civilians;
        annBrysonUnharmed.checked = gameThreeData.ann_bryson_unharmed;
        paragonAshleyKaidan.checked = gameThreeData.paragon_action_kaidan_ashley;
        garrusMatch.checked = gameThreeData.garrus_wins_match;
        ediJokerRelationship.checked = gameThreeData.edi_joker_relationship;
        savedAdmiralKoris.checked = gameThreeData.saved_admiral_koris
        savedBau.checked = gameThreeData.saved_bau;
        savedKahje.checked = gameThreeData.saved_kahji;
        grissomAcademy.checked = gameThreeData.saved_grissom_academy;
        grissomStudents.checked = gameThreeData.grissom_students;
        rachniQueenSurvived.checked = gameThreeData.rachni_queen_survived;
        gruntSurvived.checked = gameThreeData.grunt_survived;
        ashleyKaidanSurvived.checked = gameThreeData.ashley_kaiden_coup_survive;
        samaraSurvived.checked = gameThreeData.samara_survived;
        falereSpared.checked = gameThreeData.falere_spared;
        gavinArcherDied.checked = gameThreeData.gavin_archer_killed;
        savedRiley.checked = gameThreeData.saved_riley;
        balakSpared.checked = gameThreeData.balak_spared;
        rescuedLegion.checked = gameThreeData.rescued_legion;
        destroyedReaperCode.checked = gameThreeData.destroyed_reaper_code_inf;
        gethJammingTower.checked = gameThreeData.took_down_jamming_tower;
        memoryShard.checked = gameThreeData.memory_shard;
        quariansSurvived.checked = gameThreeData.quarians_survived;
        taliDied.checked = gameThreeData.tali_survived;
        gethIntelligent.checked = gameThreeData.geth_intelligent;
        javikLiaraArgument.checked = gameThreeData.javik_liara_resolved;
        brooksIncarcerated.checked = gameThreeData.brooks_incarcerated;
        mirandaSurvived.checked = gameThreeData.miranda_survived;
        cortezSurvived.checked = gameThreeData.cortez_survives_landing;


        const fate = gameThreeData.conrad_fate
        conradVernerRadios.forEach(conradFate => {
            if (conradFate.value === fate) {
                conradFate.checked = true
            }
        })

        const doctorTaken = gameThreeData.npc_name
        recruitDoctorRadios.forEach(doctor => {
            if (doctor.value === doctorTaken) {
                doctor.checked = true
            }
        })

        const endingPicked = gameThreeData.ending
        endingRadios.forEach(ending => {
            if (ending.value === endingPicked) {
                ending.checked = true
            }
        })


        
    } else {
        console.error("No data received from the backend or the data is empty.");
    }
}

const getGameDecisions = (body) => {
    const { gameId, charId } = body;
    console.log('gameID: ', gameId);
    console.log('charId: ', charId);
    axios.get(`${baseURLCharacterCreation}mass-effect-three/${charId}`, {
        params: {
            gameId: gameId
        }
    })
        .then(res => {
            const gameThreeData = res.data;
            console.log("Received game three data:", gameThreeData);
            if (gameThreeData) {
                console.log(gameThreeData);
                displayGameData(gameThreeData);
            } else {
                console.error("gameThreeData data is undefined or null");
            }
        })
        .catch(error => {
            console.error("Error fetching gameThreeData data:", error);
        });
    console.log('getGameDecisions done working');
}

const addMassEffectThreeDecisions = async (data) => axios.post(`${baseURLCharacterCreation}mass-effect-three/`, data)

const updateMassEffectThreDecisions = (characterId, body) => {
    axios.put(`${baseURLCharacterCreation}mass-effect-three-edit/${characterId}`, body)
    .then(response => {
        console.log('Decisons updated successfully:', response.data);
        // Optionally, perform additional actions upon successful update
    })
    .catch(error => {
        console.error('Error updating decisions:', error);
        // Optionally, handle errors and display an error message to the user.
    });
}

const checkGameThreeExists = (body) => {
    console.log('checkGameThreeExists id: ' + body);

    const { gameId, charId } = body;
    console.log(`gameId and charId for checkGameThreeExists: ${gameId} & ${charId}`)
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

const disappearSubmitButton = () => {
    
    console.log('Submit button removed.');

    const parentElement = submitButton.parentNode;
    parentElement.removeChild(submitButton);

    const allInputsInForm = document.querySelectorAll('#mass-effect-3 input')
    for(let i = 0; i < allInputsInForm.length; i++) {
        allInputsInForm[i].addEventListener('change', editDecisions)
        console.log('added Event Listner for ' + allInputsInForm[i].id)
    }


    console.log('Event listeners added to inputs.');
}

const editDecisions = (event) => {
    event.preventDefault()
    const gameHiddenId = document.getElementById('game_id').value;
    const hiddenID = document.getElementById('character_id_decisions').value;
    const punchAlJilani = document.getElementById('punch-al-jilani-checkbox').checked;
    const recruitDoctor = document.querySelector('input[name="doctor"]:checked').value;
    const pardonedDanielsDonnelly = document.getElementById('pardoned-daniels-donnelly').checked;
    const eveSurvived = document.getElementById('eve-survived').checked;
    const genophageCured = document.getElementById('genophage-cured').checked;
    const mordinDied = document.getElementById('mordin-died').checked;
    const kissedAria = document.getElementById('kissed-aria').checked;
    const savedOmegaCivilians = document.getElementById('saved-omega-civilians').checked;
    const annBrysonUnharmed = document.getElementById('ann-bryson=unharmed').checked;
    const paragonAshleyKaidan = document.getElementById('paragon-ashley-kaidan').checked;
    const garrusMatch = document.getElementById('garrus-match').checked;
    const ediJokerRelationship = document.getElementById('edi-joker-relationship').checked;
    const savedBau = document.getElementById('saved-bau').checked;
    const savedKahje = document.getElementById('saved-kahje').checked;
    const grissomAcademy = document.getElementById('grissom-academy').checked;
    const grissomStudents = document.getElementById('grissom-students').checked;
    const rachniQueenSurvived = document.getElementById('rachni-queen-survived').checked;
    const gruntSurvived = document.getElementById('grunt-died').checked;
    const ashleyKaidanSurvived = document.getElementById('ashley-kaidan-survived').checked;
    const samaraSurvived = document.getElementById('samara-survived').checked;
    const falereSpared = document.getElementById('falere-spared').checked;
    const gavinArcherDied = document.getElementById('gavin-archer').checked;
    const savedRiley = document.getElementById('saved-riley').checked;
    const balakSpared = document.getElementById('balak-spared').checked;
    const conradVerner = document.querySelector('input[name="conrad"]:checked').value;
    const rescuedLegion = document.getElementById('rescued-legion').checked;
    const destroyedReaperCode = document.getElementById('destroyed-reaper-code').checked;
    const gethJammingTower = document.getElementById('geth-jamming-tower').checked;
    const memoryShard = document.getElementById('memory-shard').checked;
    const savedAdmiralKoris = document.getElementById('saved-admiral-koris').checked;
    const quariansSurvived = document.getElementById('quarians-survived').checked;
    const taliDied = document.getElementById('taliDeath').checked;
    const gethIntelligent = document.getElementById('geth-intelligent').checked;
    const javikLiaraArgument = document.getElementById('javik-liara-argument').checked;
    const brooksIncarcerated = document.getElementById('brooks-incarcerated').checked;
    const mirandaSurvived = document.getElementById('miranda-survived').checked;
    const cortezSurvived = document.getElementById('cortez-survived').checked;
    const ending = document.querySelector('input[name="ending"]:checked').value;

    console.log(`
        gameHiddenId: ${gameHiddenId},
        hiddenID: ${characterIdCharacter},
        punchAlJilani: ${punchAlJilani},
        recruitDoctor: ${recruitDoctor},
        pardonedDanielsDonnelly: ${pardonedDanielsDonnelly},
        eveSurvived: ${eveSurvived},
        genophageCured: ${genophageCured},
        mordinDied3: ${mordinDied},
        kissedAria: ${kissedAria},
        savedOmegaCivilians: ${savedOmegaCivilians},
        annBrysonUnharmed: ${annBrysonUnharmed},
        paragonAshleyKaidan: ${paragonAshleyKaidan},
        garrusMatch: ${garrusMatch},
        ediJokerRelationship: ${ediJokerRelationship},
        savedBau: ${savedBau},
        savedKahje: ${savedKahje},
        grissomAcademy: ${grissomAcademy},
        grissomStudents: ${grissomStudents},
        rachniQueenSurvived: ${rachniQueenSurvived},
        gruntSurvived: ${gruntSurvived},
        ashleyKaidanSurvived: ${ashleyKaidanSurvived},
        samaraSurvived: ${samaraSurvived},
        falereSpared: ${falereSpared},
        gavinArcherDied: ${gavinArcherDied},
        savedRiley: ${savedRiley},
        balakSpared: ${balakSpared},
        conradVerner3: ${conradVerner},
        rescuedLegion: ${rescuedLegion},
        destroyedReaperCode: ${destroyedReaperCode},
        gethJammingTower: ${gethJammingTower},
        memoryShard: ${memoryShard},
        savedAdmiralKoris: ${savedAdmiralKoris},
        quariansSurvived: ${quariansSurvived},
        taliDied3: ${taliDied},
        gethIntelligent: ${gethIntelligent},
        javikLiaraArgument: ${javikLiaraArgument},
        brooksIncarcerated: ${brooksIncarcerated},
        mirandaSurvived: ${mirandaSurvived},
        cortezSurvived: ${cortezSurvived},
        ending: ${ending}
    `)

    const bodyObj = {
        gameId: gameHiddenId,
        characterCreationId: characterIdCharacter,
        punchAlJilani: punchAlJilani,
        recruitDoctor: recruitDoctor,
        pardonedDanielsDonnelly: pardonedDanielsDonnelly,
        eveSurvived: eveSurvived,
        genophageCured: genophageCured,
        mordinDied: mordinDied,
        kissedAria: kissedAria,
        savedOmegaCivilians: savedOmegaCivilians,
        annBrysonUnharmed: annBrysonUnharmed,
        paragonAshleyKaidan: paragonAshleyKaidan,
        garrusMatch: garrusMatch,
        ediJokerRelationship: ediJokerRelationship,
        savedBau: savedBau,
        savedKahje: savedKahje,
        grissomAcademy: grissomAcademy,
        grissomStudents: grissomStudents,
        rachniQueen: rachniQueenSurvived,
        gruntDied: gruntSurvived,
        ashelyKaidanSurvived: ashleyKaidanSurvived,
        samaraSurvived: samaraSurvived,
        falereSpared: falereSpared,
        gavinArcher: gavinArcherDied,
        savedRiley: savedRiley,
        balakSpared: balakSpared,
        conradVerner: conradVerner,
        rescuedLegion: rescuedLegion,
        destroyedReaperCode: destroyedReaperCode,
        gethJammingTower: gethJammingTower,
        memoryShard: memoryShard,
        savedAdmiralKoris: savedAdmiralKoris,
        quariansSurvived: quariansSurvived,
        taliDeath: taliDied,
        gethIntelligent: gethIntelligent,
        javikLiaraArgument: javikLiaraArgument,
        brooksIncarcerated: brooksIncarcerated,
        mirandaSurvived: mirandaSurvived,
        cortezSurvived: cortezSurvived,
        ending: ending
    };

    updateMassEffectThreDecisions(hiddenID, bodyObj)
}

const createMassEffectThreeDecisions = (event) => {
    event.preventDefault()
    const gameHiddenId = document.getElementById('game_id').value;
    const hiddenID = document.getElementById('character_id_decisions').value;
    const punchAlJilani = document.getElementById('punch-al-jilani-checkbox').checked;
    const recruitDoctor = document.querySelector('input[name="doctor"]:checked').value;
    const pardonedDanielsDonnelly = document.getElementById('pardoned-daniels-donnelly').checked;
    const eveSurvived = document.getElementById('eve-survived').checked;
    const genophageCured = document.getElementById('genophage-cured').checked;
    const mordinDied = document.getElementById('mordin-died').checked;
    const kissedAria = document.getElementById('kissed-aria').checked;
    const savedOmegaCivilians = document.getElementById('saved-omega-civilians').checked;
    const annBrysonUnharmed = document.getElementById('ann-bryson=unharmed').checked;
    const paragonAshleyKaidan = document.getElementById('paragon-ashley-kaidan').checked;
    const garrusMatch = document.getElementById('garrus-match').checked;
    const ediJokerRelationship = document.getElementById('edi-joker-relationship').checked;
    const savedBau = document.getElementById('saved-bau').checked;
    const savedKahje = document.getElementById('saved-kahje').checked;
    const grissomAcademy = document.getElementById('grissom-academy').checked;
    const grissomStudents = document.getElementById('grissom-students').checked;
    const rachniQueenSurvived = document.getElementById('rachni-queen-survived').checked;
    const gruntSurvived = document.getElementById('grunt-died').checked;
    const ashleyKaidanSurvived = document.getElementById('ashley-kaidan-survived').checked;
    const samaraSurvived = document.getElementById('samara-survived').checked;
    const falereSpared = document.getElementById('falere-spared').checked;
    const gavinArcherDied = document.getElementById('gavin-archer').checked;
    const savedRiley = document.getElementById('saved-riley').checked;
    const balakSpared = document.getElementById('balak-spared').checked;
    const conradVerner = document.querySelector('input[name="conrad"]:checked').value;
    const rescuedLegion = document.getElementById('rescued-legion').checked;
    const destroyedReaperCode = document.getElementById('destroyed-reaper-code').checked;
    const gethJammingTower = document.getElementById('geth-jamming-tower').checked;
    const memoryShard = document.getElementById('memory-shard').checked;
    const savedAdmiralKoris = document.getElementById('saved-admiral-koris').checked;
    const quariansSurvived = document.getElementById('quarians-survived').checked;
    const taliDied = document.getElementById('taliDeath').checked;
    const gethIntelligent = document.getElementById('geth-intelligent').checked;
    const javikLiaraArgument = document.getElementById('javik-liara-argument').checked;
    const brooksIncarcerated = document.getElementById('brooks-incarcerated').checked;
    const mirandaSurvived = document.getElementById('miranda-survived').checked;
    const cortezSurvived = document.getElementById('cortez-survived').checked;
    const ending = document.querySelector('input[name="ending"]:checked').value;

    console.log(`
        gameHiddenId: ${gameHiddenId},
        hiddenID: ${characterIdCharacter},
        punchAlJilani: ${punchAlJilani},
        recruitDoctor: ${recruitDoctor},
        pardonedDanielsDonnelly: ${pardonedDanielsDonnelly},
        eveSurvived: ${eveSurvived},
        genophageCured: ${genophageCured},
        mordinDied3: ${mordinDied},
        kissedAria: ${kissedAria},
        savedOmegaCivilians: ${savedOmegaCivilians},
        annBrysonUnharmed: ${annBrysonUnharmed},
        paragonAshleyKaidan: ${paragonAshleyKaidan},
        garrusMatch: ${garrusMatch},
        ediJokerRelationship: ${ediJokerRelationship},
        savedBau: ${savedBau},
        savedKahje: ${savedKahje},
        grissomAcademy: ${grissomAcademy},
        grissomStudents: ${grissomStudents},
        rachniQueenSurvived: ${rachniQueenSurvived},
        gruntSurvived: ${gruntSurvived},
        ashleyKaidanSurvived: ${ashleyKaidanSurvived},
        samaraSurvived: ${samaraSurvived},
        falereSpared: ${falereSpared},
        gavinArcherDied: ${gavinArcherDied},
        savedRiley: ${savedRiley},
        balakSpared: ${balakSpared},
        conradVerner3: ${conradVerner},
        rescuedLegion: ${rescuedLegion},
        destroyedReaperCode: ${destroyedReaperCode},
        gethJammingTower: ${gethJammingTower},
        memoryShard: ${memoryShard},
        savedAdmiralKoris: ${savedAdmiralKoris},
        quariansSurvived: ${quariansSurvived},
        taliDied3: ${taliDied},
        gethIntelligent: ${gethIntelligent},
        javikLiaraArgument: ${javikLiaraArgument},
        brooksIncarcerated: ${brooksIncarcerated},
        mirandaSurvived: ${mirandaSurvived},
        cortezSurvived: ${cortezSurvived},
        ending: ${ending}
    `)

    const bodyObj = {
        characterCreationId: characterIdCharacter,
        gameId: gameHiddenId, //gameHiddenId
        punchAlJilani: punchAlJilani,
        recruitDoctor: recruitDoctor,
        pardonedDanielsDonnelly: pardonedDanielsDonnelly,
        eveSurvived: eveSurvived,
        genophageCured: genophageCured,
        mordinDied: mordinDied,
        kissedAria: kissedAria,
        savedOmegaCivilians: savedOmegaCivilians,
        annBrysonUnharmed: annBrysonUnharmed,
        paragonAshleyKaidan: paragonAshleyKaidan,
        garrusMatch: garrusMatch,
        ediJokerRelationship: ediJokerRelationship,
        savedBau: savedBau,
        savedKahje: savedKahje,
        grissomAcademy: grissomAcademy,
        grissomStudents: grissomStudents,
        rachniQueen: rachniQueenSurvived,
        gruntDied: gruntSurvived,
        ashelyKaidanSurvived: ashleyKaidanSurvived,
        samaraSurvived: samaraSurvived,
        falereSpared: falereSpared,
        gavinArcher: gavinArcherDied, //gavinArcherDied
        savedRiley: savedRiley,
        balakSpared: balakSpared,
        conradVerner: conradVerner,
        rescuedLegion: rescuedLegion,
        destroyedReaperCode: destroyedReaperCode,
        gethJammingTower: gethJammingTower,
        memoryShard: memoryShard,
        savedAdmiralKoris: savedAdmiralKoris,
        quariansSurvived: quariansSurvived,
        taliDeath: taliDied,
        gethIntelligent: gethIntelligent,
        javikLiaraArgument: javikLiaraArgument,
        brooksIncarcerated: brooksIncarcerated,
        mirandaSurvived: mirandaSurvived,
        cortezSurvived: cortezSurvived,
        ending: ending
    };

    addMassEffectThreeDecisions(bodyObj)


    disappearSubmitButton()
}

const checkGameThree = async () => {
    const gameHiddenId = 3
    const charId = document.getElementById('character_id_decisions').value;

    const bodyObj = {
        gameId: gameHiddenId,
        charId: charId
    };


    try {
        const gameThreeDecisions = await checkGameThreeExists(bodyObj);
        console.log('gameHiddenId: ', gameHiddenId)
        console.log('charId: ', charId)
        console.log("checkGameOne's gameOneDecisions: ", gameThreeDecisions);
        console.log(typeof gameThreeDecisions)

        if (gameThreeDecisions === true) {
            console.log('if statement is being hit');
            getGameDecisions(bodyObj);
            disappearSubmitButton()

            console.log('it exists!')

        }

    } catch (error) {
        console.error("Error in checkGameOThree:", error);
    }
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

const giveHiddenIdData = () =>{
    document.getElementById('character_id_decisions').value = characterIdCharacter
}

submitButton.addEventListener('click', createMassEffectThreeDecisions)

giveHiddenIdData()

checkGameThree()