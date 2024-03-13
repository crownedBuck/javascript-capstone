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

const submitButton = document.getElementById('mass-effect2')

const baseURLCharacterCreation = "http://localhost:4005/"

// Menu
const menuIcon = document.getElementById('openNav')
const charactersLink = document.getElementById('charactersLink')
const sideNav = document.getElementById('mySidenav')
const closeBtn = sideNav.querySelector('.closebtn')

const displayGameData = (data) => {
    if (Array.isArray(data) && data.length > 0) {
        const gameTwoData = data[0]
        
        const punchAlJilani = document.getElementById('punch-al-jilani-checkbox')
        const keptGraybox = document.getElementById('graybox-kept')
        const niftuAlive = document.getElementById('niftu-cal-survived')
        const kalReegarSurvive = document.getElementById('kal-reegar-survived')
        const kasumiLoyalty = document.getElementById('kasumi-loyalty')
        const zaeedLoyalty = document.getElementById('zaeed-loyalty')
        const mirandaLoyalty = document.getElementById('miranda-loyalty')
        const jacobLoyalty = document.getElementById('jacob-loyalty')
        const ronaldTaylorRadios = document.querySelectorAll('input[name="ronald-taylor"]'); // Radio Button
        const conradVenerRadios = document.querySelectorAll('input[name="conrad"]') // Radio Button
        const samaraLoyalty = document.getElementById('samara-loyalty')
        const mordinLoyalty = document.getElementById('mordin-loyalty')
        const maelon = document.getElementById('moridin-killed-maelon')
        const maelonData = document.getElementById('maelon-data-survived')
        const gruntLoaylty = document.getElementById('grunt-loyalty')
        const thresherMawKilled = document.getElementById('thresher_maw-killed')
        const jackLoyalty = document.getElementById('jack-loyalty')
        const mirandaJackResolved = document.getElementById('miranda-jack-resolved')
        const taliLoyalty = document.getElementById('tali-loyalty')
        const raelZorahTreason = document.getElementById('rael-zorah-treason')
        const taliExile = document.getElementById('tali-exile')
        const garrusLoyalty = document.getElementById('garrus-loyalty')
        const sidonisSpared = document.getElementById('sidonis-spared')
        const thaneLoyalty = document.getElementById('thane-loyalty')
        const cerberusLegion = document.getElementById('gave-cerberus-legion')
        const legionLoyalty = document.getElementById('legion-loyalty')
        const gethHeretics = document.getElementById('geth-heretics-destroyed')
        const taliLegionResolution = document.getElementById('tali-legion-resolution')
        const kellyFish = document.getElementById('kelly-fish')
        const garrusDeath = document.getElementById('garrus-died')
        const gruntDied = document.getElementById('grunt-died')
        const jackDeath = document.getElementById('jack-died')
        const jacobDeath = document.getElementById('jacob-died')
        const kasumiDied = document.getElementById('kasumi-died')
        const legionDeath = document.getElementById('legion-died')
        const mirandaDeath = document.getElementById('miranda-died')
        const mordinDeath = document.getElementById('mordin-died')
        const samaraDeath = document.getElementById('samara-died')
        const taliDeath = document.getElementById('tali-died')
        const thaneDeath = document.getElementById('thane-died')
        const zaeedDeath = document.getElementById('zaeed-died')
        const normandyCrew = document.getElementById('normandy-survied')
        const collectorStation = document.getElementById('collector-staion')
        const prejeckPaddlefish = document.getElementById('prejek-paddlefish')
        
        punchAlJilani.checked = gameTwoData.al_jilani_punched;
        keptGraybox.checked = gameTwoData.kept_graybox;
        niftuAlive.checked = gameTwoData.niftu_cal_survived
        kalReegarSurvive.checked = gameTwoData.kal_reegar_survive
        kasumiLoyalty.checked = gameTwoData.kasumi_loyalty;
        zaeedLoyalty.checked = gameTwoData.zaeed_loyalty;
        mirandaLoyalty.checked = gameTwoData.miranda_loyalty;
        jacobLoyalty.checked = gameTwoData.jacob_loyalty;
        samaraLoyalty.checked = gameTwoData.samara_loyalty;
        mordinLoyalty.checked = gameTwoData.mordin_loyalty;
        maelon.checked = gameTwoData.kill_maelon;
        maelonData.checked = gameTwoData.maelon_data_survived
        gruntLoaylty.checked = gameTwoData.grunt_loyalty;
        thresherMawKilled.checked = gameTwoData.thresher_maw_killed;
        jackLoyalty.checked = gameTwoData.jack_loyalty;
        mirandaJackResolved.checked = gameTwoData.miranda_jack_resolve;
        taliLoyalty.checked = gameTwoData.tali_loyalty;
        raelZorahTreason.checked = gameTwoData.rael_zorah_treason_concealed;
        taliExile.checked = gameTwoData.tali_exiles;
        garrusLoyalty.checked = gameTwoData.garrus_loyalty;
        sidonisSpared.checked = gameTwoData.sidonis_spared;
        thaneLoyalty.checked = gameTwoData.thane_loyalty;
        cerberusLegion.checked = gameTwoData.gave_cerberus_legion;
        legionLoyalty.checked = gameTwoData.legion_loyalty;
        gethHeretics.checked = gameTwoData.destroyed_geth_heritics;
        taliLegionResolution.checked = gameTwoData.tali_legion_resolution;
        kellyFish.checked = gameTwoData.kelly_feeds_fish;
        garrusDeath.checked = gameTwoData.garrus_survived;
        gruntDied.checked = gameTwoData.grunt_survived;
        jackDeath.checked = gameTwoData.jack_survived;
        jacobDeath.checked = gameTwoData.jacob_survived;
        kasumiDied.checked = gameTwoData.kasumi_survived;
        legionDeath.checked = gameTwoData.legion_survived;
        mirandaDeath.checked = gameTwoData.miranda_survived;
        mordinDeath.checked = gameTwoData.mordin_survived;
        samaraDeath.checked = gameTwoData.samara_survived;
        taliDeath.checked = gameTwoData.tali_survived;
        thaneDeath.checked = gameTwoData.thane_survived;
        zaeedDeath.checked = gameTwoData.zaeed_survived;
        normandyCrew.checked = gameTwoData.normandy_crew_survived;
        collectorStation.checked = gameTwoData.collector_station_destroyed;
        prejeckPaddlefish.checked = gameTwoData.prejeck_paddlefish_survived;
        
        // radio buttons
        const taylorFate = gameTwoData.taylor_options
        ronaldTaylorRadios.forEach(ronaldTaylorRadio => {
            if (ronaldTaylorRadio.value === taylorFate) {
                ronaldTaylorRadio.checked = true
            }
        })

        const conradFate = gameTwoData.conrad_fate
        conradVenerRadios.forEach(conradVernerRadio => {
            console.log(`${conradFate}|${conradVernerRadio}`)
            if (conradVernerRadio.value === conradFate) {
                conradVernerRadio.checked = true
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
    axios.get(`${baseURLCharacterCreation}mass-effect-two/${charId}`, {
        params: {
            gameId: gameId
        }
    })
        .then(res => {
            const gameTwoData = res.data;
            console.log("Received game two data:", gameTwoData);
            if (gameTwoData) {
                console.log(gameTwoData);
                displayGameData(gameTwoData);
            } else {
                console.error("gameTwoData data is undefined or null");
            }
        })
        .catch(error => {
            console.error("Error fetching gameTwoData data:", error);
        });
    console.log('getGameDecisions done working');
}

const updateMassEffectTwoDecisions = (characterId, body) => {
    axios.put(`${baseURLCharacterCreation}mass-effect-two-edit/${characterId}`, body)
    .then(response => {
        console.log('Decisons updated successfully:', response.data);
        // Optionally, perform additional actions upon successful update
    })
    .catch(error => {
        console.error('Error updating decisions:', error);
        // Optionally, handle errors and display an error message to the user.
    });
}

const addMassEffectTwoDecisions = async (data) => axios.post(`${baseURLCharacterCreation}mass-effect-two/`, data)

const checkGameTwoExists = (body) => {
    console.log('checkGameOneExists id: ' + body);

    const { gameId, charId } = body;
    console.log(`gameId and charId for checkGameTwoExists: ${gameId} & ${charId}`)
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
    // submitOne.removeEventListener('click', createMassEffectOneDecisons)
    
    console.log('Submit button removed.');

    const parentElement = submitButton.parentNode;
    parentElement.removeChild(submitButton);

    const allInputsInForm = document.querySelectorAll('#mass-effect-2 input')
    for(let i = 0; i < allInputsInForm.length; i++) {
        allInputsInForm[i].addEventListener('change', editDecisions)
        console.log('added Event Listner for ' + allInputsInForm[i].id)
    }


    console.log('Event listeners added to inputs.');
}

const editDecisions = (event) => {
    event.preventDefault()

    setTimeout(() => {
        // Your code to be executed after a quarter of a second
    }, 250);

    const gameHiddenId = document.getElementById('game_id').value
    const hiddenID = document.getElementById('character_id_decisions').value
    const punchAlJilani = document.getElementById('punch-al-jilani-checkbox').checked;
    const keptGraybox = document.getElementById('graybox-kept').checked
    const niftuAlive = document.getElementById('niftu-cal-survived').checked
    const kalReegarSurvive = document.getElementById('kal-reegar-survived').checked
    const kasumiLoyalty = document.getElementById('kasumi-loyalty').checked
    const zaeedLoyalty = document.getElementById('zaeed-loyalty').checked
    const mirandaLoyalty = document.getElementById('miranda-loyalty').checked
    const jacobLoyalty = document.getElementById('jacob-loyalty').checked
    const ronaldTaylor = document.querySelector('input[name="ronald-taylor"]:checked').value;
    const conradVener = document.querySelector('input[name="conrad"]:checked').value
    const samaraLoyalty = document.getElementById('samara-loyalty').checked
    const mordinLoyalty = document.getElementById('mordin-loyalty').checked
    const maelon = document.getElementById('moridin-killed-maelon').checked
    const maelonData = document.getElementById('maelon-data-survived').checked
    const gruntLoaylty = document.getElementById('grunt-loyalty').checked
    const thresherMawKilled = document.getElementById('thresher_maw-killed').checked
    const jackLoyalty = document.getElementById('jack-loyalty').checked
    const mirandaJackResolved = document.getElementById('miranda-jack-resolved').checked
    const taliLoyalty = document.getElementById('tali-loyalty').checked
    const raelZorahTreason = document.getElementById('rael-zorah-treason').checked
    const taliExile = document.getElementById('tali-exile').checked
    const garrusLoyalty = document.getElementById('garrus-loyalty').checked
    const sidonisSpared = document.getElementById('sidonis-spared').checked
    const thaneLoyalty = document.getElementById('thane-loyalty').checked
    const cerberusLegion = document.getElementById('gave-cerberus-legion').checked
    const legionLoyalty = document.getElementById('legion-loyalty').checked
    const gethHeretics = document.getElementById('geth-heretics-destroyed').checked
    const taliLegionResolution = document.getElementById('tali-legion-resolution').checked
    const kellyFish = document.getElementById('kelly-fish').checked
    const garrusDeath = document.getElementById('garrus-died').checked
    const gruntDied = document.getElementById('grunt-died').checked
    const jackDeath = document.getElementById('jack-died').checked
    const jacobDeath = document.getElementById('jacob-died').checked
    const kasumiDied = document.getElementById('kasumi-died').checked
    const legionDeath = document.getElementById('legion-died').checked
    const mirandaDeath = document.getElementById('miranda-died').checked
    const mordinDeath = document.getElementById('mordin-died').checked
    const samaraDeath = document.getElementById('samara-died').checked
    const taliDeath = document.getElementById('tali-died').checked
    const thaneDeath = document.getElementById('thane-died').checked
    const zaeedDeath = document.getElementById('zaeed-died').checked
    const normandyCrew = document.getElementById('normandy-survied').checked
    const collectorStation = document.getElementById('collector-staion').checked
    const prejeckPaddlefish = document.getElementById('prejek-paddlefish').checked

    console.log(`
        gameHiddenId: ${gameHiddenId},
        hiddenID: ${characterIdCharacter},
        punchAlJilani: ${punchAlJilani},
        keptGraybox: ${keptGraybox},
        niftuAlive: ${niftuAlive},
        kalReegarSurvive: ${kalReegarSurvive},
        kasumiLoyalty: ${kasumiLoyalty},
        zaeedLoyalty: ${zaeedLoyalty},
        mirandaLoyalty: ${mirandaLoyalty},
        jacobLoyalty: ${jacobLoyalty},
        ronaldTaylor: ${ronaldTaylor},
        conradVener: ${conradVener},
        samaraLoyalty: ${samaraLoyalty},
        mordinLoyalty: ${mordinLoyalty},
        maelon: ${maelon},
        maelonData: ${maelonData},
        gruntLoaylty: ${gruntLoaylty},
        thresherMawKilled: ${thresherMawKilled},
        jackLoyalty: ${jackLoyalty},
        mirandaJackResolved: ${mirandaJackResolved},
        taliLoyalty: ${taliLoyalty},
        raelZorahTreason: ${raelZorahTreason},
        taliExile: ${taliExile},
        garrusLoyalty: ${garrusLoyalty},
        sidonisSpared: ${sidonisSpared},
        thaneLoyalty: ${thaneLoyalty},
        cerberusLegion: ${cerberusLegion},
        legionLoyalty: ${legionLoyalty},
        gethHeretics: ${gethHeretics},
        taliLegionResolution: ${taliLegionResolution},
        kellyFish: ${kellyFish},
        garrusDeath: ${garrusDeath},
        gruntDied: ${gruntDied},
        jackDeath: ${jackDeath},
        jacobDeath: ${jacobDeath},
        kasumiDied: ${kasumiDied},
        legionDeath: ${legionDeath},
        mirandaDeath: ${mirandaDeath},
        mordinDeath: ${mordinDeath},
        samaraDeath: ${samaraDeath},
        taliDeath: ${taliDeath},
        thaneDeath: ${thaneDeath},
        zaeedDeath: ${zaeedDeath},
        normandyCrew: ${normandyCrew},
        collectorStation: ${collectorStation},
        prejeckPaddlefish: ${prejeckPaddlefish}
    `)

    const bodyObj = {
        gameId: gameHiddenId,
        characterCreationId: characterIdCharacter,
        punchAlJilani: punchAlJilani,
        grayboxKept: keptGraybox,
        niftuAlive: niftuAlive,
        kalReegarSurvive: kalReegarSurvive,
        kasumiLoyalty: kasumiLoyalty,
        zaeedLoyalty: zaeedLoyalty,
        mirandaLoyalty: mirandaLoyalty,
        jacobLoyalty: jacobLoyalty,
        ronaldTaylor: ronaldTaylor,
        conradVerner: conradVener,
        samaraLoyalty: samaraLoyalty,
        mordinLoyalty: mordinLoyalty,
        maelonFate: maelon,
        maelonDataSurvived: maelonData,
        gruntLoaylty: gruntLoaylty,
        thresherMawKilled: thresherMawKilled, 
        jackLoyalty: jackLoyalty, 
        mirandaJackResolved: mirandaJackResolved, 
        taliLoyalty: taliLoyalty, 
        raelZorahTreason: raelZorahTreason,
        taliExile: taliExile,
        garrusLoyalty: garrusLoyalty,
        sidonisSpared: sidonisSpared, 
        thaneLoyalty: thaneLoyalty,
        legionToCerberus: cerberusLegion,
        legionLoyalty: legionLoyalty,
        gethHeretics: gethHeretics,
        taliLegionResolution: taliLegionResolution,
        kellyFish: kellyFish,
        garrusDeath: garrusDeath,
        gruntDeath: gruntDied,
        jackDeath: jackDeath,
        jacobDeath: jacobDeath,
        kasumiDeath: kasumiDied,
        legionDeath: legionDeath,
        marandaDeath: mirandaDeath,
        mordinDeath: mordinDeath,
        samaraDeath: samaraDeath,
        taliDeath: taliDeath,
        thaneDeath: thaneDeath,
        zaeedDeath: zaeedDeath,
        normandyCrew: normandyCrew,
        collectorStation: collectorStation,
        prejekPaddlefish: prejeckPaddlefish
    }

    updateMassEffectTwoDecisions(characterIdCharacter, bodyObj)
}

const giveHiddenIdData = () =>{
    document.getElementById('character_id_decisions').value = characterIdCharacter
}

giveHiddenIdData()

const createMassEffectTwoDecisions = (event) => {
    event.preventDefault()
    const gameHiddenId = document.getElementById('game_id').value
    const hiddenID = document.getElementById('character_id_decisions').value
    const punchAlJilani = document.getElementById('punch-al-jilani-checkbox').checked;
    const keptGraybox = document.getElementById('graybox-kept').checked
    const niftuAlive = document.getElementById('niftu-cal-survived').checked
    const kalReegarSurvive = document.getElementById('kal-reegar-survived').checked
    const kasumiLoyalty = document.getElementById('kasumi-loyalty').checked
    const zaeedLoyalty = document.getElementById('zaeed-loyalty').checked
    const mirandaLoyalty = document.getElementById('miranda-loyalty').checked
    const jacobLoyalty = document.getElementById('jacob-loyalty').checked
    const ronaldTaylor = document.querySelector('input[name="ronald-taylor"]:checked').value;
    const conradVener = document.querySelector('input[name="conrad"]:checked').value
    const samaraLoyalty = document.getElementById('samara-loyalty').checked
    const mordinLoyalty = document.getElementById('mordin-loyalty').checked
    const maelon = document.getElementById('moridin-killed-maelon').checked
    const maelonData = document.getElementById('maelon-data-survived').checked
    const gruntLoaylty = document.getElementById('grunt-loyalty').checked
    const thresherMawKilled = document.getElementById('thresher_maw-killed').checked
    const jackLoyalty = document.getElementById('jack-loyalty').checked
    const mirandaJackResolved = document.getElementById('miranda-jack-resolved').checked
    const taliLoyalty = document.getElementById('tali-loyalty').checked
    const raelZorahTreason = document.getElementById('rael-zorah-treason').checked
    const taliExile = document.getElementById('tali-exile').checked
    const garrusLoyalty = document.getElementById('garrus-loyalty').checked
    const sidonisSpared = document.getElementById('sidonis-spared').checked
    const thaneLoyalty = document.getElementById('thane-loyalty').checked
    const cerberusLegion = document.getElementById('gave-cerberus-legion').checked
    const legionLoyalty = document.getElementById('legion-loyalty').checked
    const gethHeretics = document.getElementById('geth-heretics-destroyed').checked
    const taliLegionResolution = document.getElementById('tali-legion-resolution').checked
    const kellyFish = document.getElementById('kelly-fish').checked
    const garrusDeath = document.getElementById('garrus-died').checked
    const gruntDied = document.getElementById('grunt-died').checked
    const jackDeath = document.getElementById('jack-died').checked
    const jacobDeath = document.getElementById('jacob-died').checked
    const kasumiDied = document.getElementById('kasumi-died').checked
    const legionDeath = document.getElementById('legion-died').checked
    const mirandaDeath = document.getElementById('miranda-died').checked
    const mordinDeath = document.getElementById('mordin-died').checked
    const samaraDeath = document.getElementById('samara-died').checked
    const taliDeath = document.getElementById('tali-died').checked
    const thaneDeath = document.getElementById('thane-died').checked
    const zaeedDeath = document.getElementById('zaeed-died').checked
    const normandyCrew = document.getElementById('normandy-survied').checked
    const collectorStation = document.getElementById('collector-staion').checked
    const prejeckPaddlefish = document.getElementById('prejek-paddlefish').checked

    console.log(`
        gameHiddenId: ${gameHiddenId},
        hiddenID: ${characterIdCharacter},
        punchAlJilani: ${punchAlJilani},
        keptGraybox: ${keptGraybox},
        niftuAlive: ${niftuAlive},
        kalReegarSurvive: ${kalReegarSurvive},
        kasumiLoyalty: ${kasumiLoyalty},
        zaeedLoyalty: ${zaeedLoyalty},
        mirandaLoyalty: ${mirandaLoyalty},
        jacobLoyalty: ${jacobLoyalty},
        ronaldTaylor: ${ronaldTaylor},
        conradVener: ${conradVener},
        samaraLoyalty: ${samaraLoyalty},
        mordinLoyalty: ${mordinLoyalty},
        maelon: ${maelon},
        maelonData: ${maelonData},
        gruntLoaylty: ${gruntLoaylty},
        thresherMawKilled: ${thresherMawKilled},
        jackLoyalty: ${jackLoyalty},
        mirandaJackResolved: ${mirandaJackResolved},
        taliLoyalty: ${taliLoyalty},
        raelZorahTreason: ${raelZorahTreason},
        taliExile: ${taliExile},
        garrusLoyalty: ${garrusLoyalty},
        sidonisSpared: ${sidonisSpared},
        thaneLoyalty: ${thaneLoyalty},
        cerberusLegion: ${cerberusLegion},
        legionLoyalty: ${legionLoyalty},
        gethHeretics: ${gethHeretics},
        taliLegionResolution: ${taliLegionResolution},
        kellyFish: ${kellyFish},
        garrusDeath: ${garrusDeath},
        gruntDied: ${gruntDied},
        jackDeath: ${jackDeath},
        jacobDeath: ${jacobDeath},
        kasumiDied: ${kasumiDied},
        legionDeath: ${legionDeath},
        mirandaDeath: ${mirandaDeath},
        mordinDeath: ${mordinDeath},
        samaraDeath: ${samaraDeath},
        taliDeath: ${taliDeath},
        thaneDeath: ${thaneDeath},
        zaeedDeath: ${zaeedDeath},
        normandyCrew: ${normandyCrew},
        collectorStation: ${collectorStation},
        prejeckPaddlefish: ${prejeckPaddlefish}
    `)

    const bodyObj = {
        gameId: gameHiddenId,
        characterCreationId: characterIdCharacter,
        punchAlJilani: punchAlJilani,
        grayboxKept: keptGraybox,
        niftuAlive: niftuAlive,
        kalReegarSurvive: kalReegarSurvive,
        kasumiLoyalty: kasumiLoyalty,
        zaeedLoyalty: zaeedLoyalty,
        mirandaLoyalty: mirandaLoyalty,
        jacobLoyalty: jacobLoyalty,
        ronaldTaylor: ronaldTaylor,
        conradVerner: conradVener,
        samaraLoyalty: samaraLoyalty,
        mordinLoyalty: mordinLoyalty,
        maelonFate: maelon,
        maelonDataSurvived: maelonData,
        gruntLoaylty: gruntLoaylty,
        thresherMawKilled: thresherMawKilled, 
        jackLoyalty: jackLoyalty, 
        mirandaJackResolved: mirandaJackResolved, 
        taliLoyalty: taliLoyalty, 
        raelZorahTreason: raelZorahTreason,
        taliExile: taliExile,
        garrusLoyalty: garrusLoyalty,
        sidonisSpared: sidonisSpared, 
        thaneLoyalty: thaneLoyalty,
        legionToCerberus: cerberusLegion,
        legionLoyalty: legionLoyalty,
        gethHeretics: gethHeretics,
        taliLegionResolution: taliLegionResolution,
        kellyFish: kellyFish,
        garrusDeath: garrusDeath,
        gruntDeath: gruntDied,
        jackDeath: jackDeath,
        jacobDeath: jacobDeath,
        kasumiDeath: kasumiDied,
        legionDeath: legionDeath,
        mirandaDeath: mirandaDeath,
        mordinDeath: mordinDeath,
        samaraDeath: samaraDeath,
        taliDeath: taliDeath,
        thaneDeath: thaneDeath,
        zaeedDeath: zaeedDeath,
        normandyCrew: normandyCrew,
        collectorStation: collectorStation,
        prejekPaddlefish: prejeckPaddlefish
    }

    console.log(bodyObj)

    addMassEffectTwoDecisions(bodyObj)

    setTimeout(() => {
        // Your code to be executed after a quarter of a second
    }, 250);

    disappearSubmitButton()
}

const checkGameTwo = async () => {
    const gameHiddenId = 2
    const charId = document.getElementById('character_id_decisions').value;

    const bodyObj = {
        gameId: gameHiddenId,
        charId: charId
    };


    try {
        const gameOneDecisions = await checkGameTwoExists(bodyObj);
        console.log('gameHiddenId: ', gameHiddenId)
        console.log('charId: ', charId)
        console.log("checkGameOne's gameOneDecisions: ", gameOneDecisions);
        console.log(typeof gameOneDecisions)

        if (gameOneDecisions === true) {
            console.log('if statement is being hit');
            getGameDecisions(bodyObj);
            disappearSubmitButton()

            console.log('it exists!')

        }

    } catch (error) {
        console.error("Error in checkGameOTwo:", error);
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

submitButton.addEventListener('click', createMassEffectTwoDecisions)



checkGameTwo()