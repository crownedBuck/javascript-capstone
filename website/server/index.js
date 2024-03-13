console.log("beginning of index.js")
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env

// console.log("Database connection string:", process.env.CONNECTION_STRING);

const {
    getCharacters,
    getCharacter,
    getGameOne,
    getGameTwo,
    getGameThree,
    addNewCharacter,
    updateCharacter,
    addMassEffectOneDecisions,
    addMassEffectTwoDecisions,
    addMassEffectThreeDecisions,
    editMassEffectOneDecisions,
    editMassEffectTwoDecisions,
    editMassEffectThreeDecisions,
    checkCharacterGame,
    checkCharacter,
    addNewGameToCharacter,
    checkGameExists

} = require('./controller.js')

app.use(express.json())
app.use(cors());

app.get('/characters/', getCharacters)

app.get('/check-character-game/:id', checkCharacterGame)
app.get('/check-character/:id', checkCharacter)

app.get('/character/:id', getCharacter)
app.get('/mass-effect-one/:id', getGameOne)
app.get('/mass-effect-two/:id', getGameTwo)
app.get('/mass-effect-three/:id', getGameThree)

app.get('/check-game-exists/:id', checkGameExists)

app.post('/new_character', addNewCharacter)
app.put('/update-character/:id', updateCharacter)
app.post('/add-game-character/:id', addNewGameToCharacter)

app.post('/mass-effect-one/', addMassEffectOneDecisions)
app.post('/mass-effect-two/', addMassEffectTwoDecisions)
app.post('/mass-effect-three/', addMassEffectThreeDecisions)
app.put('/mass-effect-one-edit/:id', editMassEffectOneDecisions)
app.put('/mass-effect-two-edit/:id', editMassEffectTwoDecisions)
app.put('/mass-effect-three-edit/:id', editMassEffectThreeDecisions
)
console.log("end of index.js")

app.listen(4005, () => {
    console.log(`Listening on 4005`);
  });