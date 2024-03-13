require('dotenv').config({path: '../.env'})
const { CONNECTION_STRING } = process.env

const Sequelize = require('sequelize')
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    // logging: console.log
})

sequelize.authenticate()
    .then(() => {
        // console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// console.log("Database connection string:", process.env.CONNECTION_STRING);


module.exports = {
    getCharacters: (req, res) => {

        console.log('getCharcters is being hit')
        sequelize.query(`
        SELECT char_name, id FROM character_creation;
        `).then(dbRes => {
            console.log("Query result:", dbRes); 
            // Send the queried data back in the response
            res.status(200).json(dbRes); // Assuming dbRes is an array
        })
        .catch(error => {
            console.error("Error executing query:", error);
            res.sendStatus(500);
        });
    },

    getCharacter: (req, res) => {
        // const characterId = req.params.id; // Access characterId directly from req.body
        // console.log(`characterID: ${characterId}`);
        const characterId = req.params.id; // Access characterId from req.params
        const game = req.query.game; // Access game from req.query

        console.log(`characterId in controller.js: ${characterId}`);
        console.log(`game in controller.js: ${game}`);


        sequelize.query(`
            SELECT c.char_name, o.origin, r.reputation, g.game AS gameId, gc.c_class, ro.npc_name, gt.game_type, ccg.paragon, ccg.renegade, c.id AS char_id, ccg.face_code, ccg.char_level
                FROM character_class_game AS ccg 
                JOIN character_creation AS c ON ccg.character_id = c.id
                JOIN game AS g ON ccg.game = g.id
                JOIN game_class AS gc ON gc.id = ccg.game_class
                JOIN origin AS o ON o.id = c.origin
                JOIN reputation AS r ON r.id = c.reputation
                JOIN romanced AS ro ON ro.id = ccg.romanced
                JOIN game_type AS gt ON gt.id = ccg.game_type
            WHERE c.id =${characterId} AND g.game = ${game};
        `)
        .then(dbRes => {
            console.log("Query result:", dbRes); 
            if (dbRes.length > 0) {
                // Extract the character data from the first element of dbRes
                const characterData = dbRes[0];
                // Send the character data back in the response
                res.status(200).json(characterData);
            } else {
                console.error("No character data found for characterId:", characterId);
                res.sendStatus(404); // Character not found
            }
        })
        .catch(error => {
            console.error("Error executing query:", error);
            res.sendStatus(500);
        });
    },

    checkGameExists: (req, res) => {
        const gameId = req.query.gameId
        const charId = req.params.id

        // const {gameId, charId} = req.body

        console.log('req.query: ', req.query);

        console.log('checkGameOne was hit')

        console.log(`game in controller.js: ${gameId}`)
        console.log(`char in controller.js: ${charId}`)

        if (Number(gameId) === 1) {
            sequelize.query(`
                SELECT EXISTS (
                    SELECT 1
                    FROM character_class_game AS ccg
                    JOIN character_creation AS cc ON ccg.character_id = cc.id
                    JOIN game_one_decisions AS god ON ccg.id = god.character_class_game_id
                    JOIN game AS g ON ccg.game = g.id
                    WHERE ccg.id = (SELECT id FROM character_class_game WHERE game = ${Number(gameId)} AND character_id = ${Number(charId)})
                ) AS associated;`).then(result => { // AS associated checks if it exists
                const isAssociated = result[0][0].associated; // Extract the boolean value from the result
                console.log('result', result)
                console.log(isAssociated)
                res.status(200).json({ associated: isAssociated });
            }).catch(error => {
                console.error("Error checking character:", error);
                res.sendStatus(500);
            });
        } else if (Number(gameId) === 2) {
            sequelize.query(`
                SELECT EXISTS (
                    SELECT 1
                    FROM character_class_game AS ccg
                    JOIN character_creation AS cc ON ccg.character_id = cc.id
                    JOIN game_two_decisions AS god ON ccg.id = god.character_class_game_id
                    JOIN game AS g ON ccg.game = g.id
                    WHERE ccg.id = (SELECT id FROM character_class_game WHERE game = ${Number(gameId)} AND character_id = ${Number(charId)})
                ) AS associated;
            `).then(result => { // AS associated checks if it exists
                const isAssociated = result[0][0].associated; // Extract the boolean value from the result
                console.log('result', result)
                console.log(isAssociated)
                res.status(200).json({ associated: isAssociated });
            }).catch(error => {
                console.error("Error checking character:", error);
                res.sendStatus(500);
            });
        } else if (Number(gameId) === 3) {
            sequelize.query(`
                SELECT EXISTS (
                    SELECT 1
                    FROM character_class_game AS ccg
                    JOIN character_creation AS cc ON ccg.character_id = cc.id
                    JOIN game_three_decisions AS god ON ccg.id = god.character_class_game_id
                    JOIN game AS g ON ccg.game = g.id
                    WHERE ccg.id = (SELECT id FROM character_class_game WHERE game = ${Number(gameId)} AND character_id = ${Number(charId)})
                ) AS associated;
            `).then(result => { // AS associated checks if it exists
                const isAssociated = result[0][0].associated; // Extract the boolean value from the result
                console.log('result', result)
                console.log(isAssociated)
                res.status(200).json({ associated: isAssociated });
            }).catch(error => {
                console.error("Error checking character:", error);
                res.sendStatus(500);
            });
        }

    },

    getGameOne: (req, res) => {
        const gameId = req.query.gameId;
        const charId = req.params.id; // Use charId instead of id
    
        console.log('gameID: ', gameId);
        console.log('charId: ', charId);
    
        sequelize.query(`
            SELECT cv.fate, aj.punched, rq.rachni_queen_survived, god.fist_spared, god.rescued_burns, god.kyle_surrender, 
            god.helena_blae_survived, god.recovered_osd, god.shiala_survived, god.saved_zhu_colonist, 
            god.gianna_not_exposed, god.retrieved_wrex_armor, god.gave_tali_geth_data, god.jacob_died, 
            god.saved_x57_hostages, god.wrex_survived, god.saved_destiny_ascension, god.aquired_10_assari_writings, 
            god.elkoss_conbine_license, god.jianna_helped, god.rana_survived, god.kirrahe_survived, ak.npc_name AS ak_npc_name, au.npc_name AS au_npc_name
            FROM character_class_game AS ccg
            JOIN game_one_decisions AS god ON ccg.id = god.character_class_game_id
            JOIN conrad_verner AS cv ON cv.id = god.conrad_verner_set_streight
            JOIN al_jilani AS aj ON aj.id = god.al_jilani_punched
            JOIN ashley_or_kaiden AS ak ON ak.id = god.ashley_or_kaidan
            JOIN rachni_queen AS rq ON rq.id = god.rachni_queen_survived
            JOIN anderson_or_udina AS au ON au.id = god.anderson_or_udina
            WHERE ccg.id = (SELECT id FROM character_class_game WHERE game = ${Number(gameId)} AND character_id = ${Number(charId)});
        `).then(dbRes => {
            console.log("Query result:", dbRes); 
            if (dbRes.length > 0) {
                // Extract the character data from the first element of dbRes
                const characterData = dbRes[0];
                // Send the character data back in the response
                res.status(200).json(characterData);
            } else {
                console.error("No game data found for characterId:", charId);
                res.sendStatus(404); // Character not found
            }
        })
        .catch(error => {
            console.error("Error executing query:", error);
            res.sendStatus(500);
        });
    },

    getGameTwo: (req, res) => {
        const gameId = req.query.gameId;
        const charId = req.params.id; // Use charId instead of id

        sequelize.query(`
        SELECT 
        cv.fate AS conrad_fate, 
        aj.punched AS al_jilani_punched, 
        rt.taylor_options AS taylor_options, 
        gl.loyal AS garrus_loyalty, 
        grl.loyal AS grunt_loyalty, 
        jl.loyal AS jack_loyalty, 
        jbl.loyal AS jacob_loyalty, 
        kl.loyal AS kasumi_loyalty, 
        ll.loyal AS legion_loyalty, 
        ml.loyal AS miranda_loyalty, 
        mol.loyal AS mordin_loyalty, 
        sl.loyal AS samara_loyalty, 
        tl.loyal AS tali_loyalty, 
        thl.loyal AS thane_loyalty, 
        zl.loyal AS zaeed_loyalty, 
        gs.survived AS garrus_survived, 
        grs.survived AS grunt_survived, 
        js.survived AS jack_survived, 
        jbs.survived AS jacob_survived, 
        ks.survived AS kasumi_survived, 
        ls.survived AS legion_survived, 
        ms.survived AS miranda_survived, 
        mos.survived AS mordin_survived, 
        ss.survived AS samara_survived, 
        ts.survived AS tali_survived, 
        ths.survived AS thane_survived, 
        zs.survived AS zaeed_survived, 
        gtd.kept_graybox AS kept_graybox, 
        gtd.niftu_cal_survived AS niftu_cal_survived, 
        gtd.thresher_maw_killed AS thresher_maw_killed, 
        gtd.miranda_jack_resolve AS miranda_jack_resolve, 
        gtd.rael_zorah_treason_concealed AS rael_zorah_treason_concealed, 
        gtd.tali_exiles AS tali_exiles,
        gtd.tali_legion_resolution AS tali_legion_resolution,
        gtd.sidonis_spared AS sidonis_spared, 
        gtd.gave_cerberus_legion AS gave_cerberus_legion, 
        gtd.destroyed_geth_heritics AS destroyed_geth_heritics, 
        gtd.kelly_feeds_fish AS kelly_feeds_fish, 
        gtd.normandy_crew_survived AS normandy_crew_survived, 
        gtd.collecter_station_destroyed AS collector_station_destroyed, 
        gtd.prejek_paddlefish_survived AS prejeck_paddlefish_survived, 
        gtd.kill_maelon AS kill_maelon, 
        gtd.kal_reegar_survive AS kal_reegar_survive, 
        gtd.maelon_data_survived AS maelon_data_survived
    FROM 
        character_class_game AS ccg
    JOIN 
        game_two_decisions AS gtd ON ccg.id = gtd.character_class_game_id
    JOIN 
        conrad_verner AS cv ON cv.id = gtd.conrad_verner_set_streight
    JOIN 
        al_jilani AS aj ON aj.id = gtd.al_jilani_punched
    JOIN 
        ronald_taylor AS rt ON rt.id = gtd.ronald_taylor_fate
    JOIN 
        companion_loyalty AS cl ON cl.game_two_decisions = gtd.id
    JOIN 
        garrus_loyalty AS gl ON cl.garrus_loyalty = gl.id
    JOIN 
        grunt_loyalty AS grl ON cl.grunt_loyalty = grl.id
    JOIN 
        jack_loyalty AS jl ON cl.jack_loyalty = jl.id
    JOIN 
        jacob_loyalty AS jbl ON cl.jacob_loyalty = jbl.id
    JOIN 
        kasumi_loyalty AS kl ON cl.kasumi_loyalty = kl.id
    JOIN 
        leigon_loyalty AS ll ON cl.leigon_loyalty = ll.id
    JOIN 
        miranda_loyalty AS ml ON cl.miranda_loyalty = ml.id
    JOIN 
        mordin_loyalty AS mol ON cl.mordin_loyalty = mol.id
    JOIN 
        samara_loyalty AS sl ON cl.samara_loyalty = sl.id
    JOIN 
        tali_loyalty AS tl ON cl.tali_loyalty = tl.id
    JOIN 
        thane_loyalty AS thl ON cl.thane_loyalty = thl.id
    JOIN 
        zaeed_loyalty AS zl ON cl.zaeed_loyalty = zl.id
    JOIN 
        companion_death_or_survived_game_2 AS cd ON gtd.id = cd.game_two_decisions
    JOIN 
        garrus_survived AS gs ON cd.garrus_survived = gs.id
    JOIN 
        grunt_survived AS grs ON cd.grunt_survived = grs.id
    JOIN 
        jack_survived AS js ON cd.jack_survived = js.id
    JOIN 
        jacob_survived AS jbs ON cd.jacob_survived = jbs.id
    JOIN 
        kasumi_survived AS ks ON cd.kasumi_survived = ks.id
    JOIN 
        leigon_survived AS ls ON cd.legion_survived = ls.id
    JOIN 
        miranda_survived AS ms ON cd.miranda_survived = ms.id
    JOIN 
        mordin_survived AS mos ON cd.mordin_survived = mos.id
    JOIN 
        samara_survived AS ss ON cd.samara_survived = ss.id
    JOIN 
        tali_survived AS ts ON cd.tali_survived = ts.id
    JOIN 
        thane_survived AS ths ON cd.thane_survived = ths.id
    JOIN 
        zaeed_survived AS zs ON cd.zaeed_survived = zs.id
    WHERE 
        ccg.id = (SELECT id FROM character_class_game WHERE game = ${Number(gameId)} AND character_id = ${Number(charId)});

        `).then(dbRes => {
            console.log("Query result:", dbRes); 
            if (dbRes.length > 0) {
                // Extract the character data from the first element of dbRes
                const characterData = dbRes[0];
                // Send the character data back in the response
                res.status(200).json(characterData);
            } else {
                console.error("No game data found for characterId:", charId);
                res.sendStatus(404); // Character not found
            }
        })
        .catch(error => {
            console.error("Error executing query:", error);
            res.sendStatus(500);
        });
    },

    getGameThree: (req, res) => {
        const gameId = req.query.gameId;
        const charId = req.params.id; // Use charId instead of id

        sequelize.query(`
        
        SELECT 
        cv.fate AS conrad_fate, 
        aj.punched AS al_jilani_punched, 
        dr.npc_name, 
        gtd.pardoned_daniels_donnelly, 
        gtd.eve_saved, 
        gtd.genophage_cured, 
        gtd.kissed_aria, 
        gtd.saved_omega_civilians, 
        gtd.ann_bryson_unharmed, 
        gtd.paragon_action_kaidan_ashley, 
        gtd.garrus_wins_match, 
        gtd.edi_joker_relationship, 
        gtd.saved_bau, 
        gtd.saved_kahji, 
        gtd.ashley_kaiden_coup_survive, 
        gtd.gavin_archer_killed,
        gtd.falere_spared, 
        gtd.gavin_archer_killed, 
        gtd.saved_riley, 
        gtd.balak_spared, 
        gtd.rescued_legion, 
        gtd.destroyed_reaper_code_inf, 
        gtd.took_down_jamming_tower, 
        gtd.saved_admiral_koris, 
        gtd.quarians_survived, 
        gtd.javik_liara_resolved, 
        gtd.brooks_incarcerated, 
        gtd.cortez_survives_landing, 
        gtd.saved_kahji,
        gtd.doctor_recruited,
        gtd.saved_grissom_academy,
        e.ending, 
        gtd.grissom_students, 
        rq.rachni_queen_survived, 
        gtd.memory_shard, 
        gtd.geth_intelligent,
        gs.survived AS grunt_survived,
        ts.survived AS tali_survived,
        ms.survived AS miranda_survived,
        ss.survived AS samara_survived,
        mos.survived AS mordin_survived
    FROM 
        character_class_game AS ccg
    JOIN 
        game_three_decisions AS gtd ON ccg.id = gtd.character_class_game_id
    JOIN 
        conrad_verner AS cv ON cv.id = gtd.conrad_verner_set_streight
    JOIN 
        al_jilani AS aj ON aj.id = gtd.al_jilani_punched
    JOIN 
        doctor_recruited AS dr ON gtd.doctor_recruited = dr.id
    JOIN 
        rachni_queen AS rq ON rq.id = gtd.rachni_queen_id
    JOIN 
        companion_death_or_survived_game_3 AS cd ON gtd.id = cd.game_three_decisions
    JOIN 
        ending AS e ON gtd.ending = e.id
    JOIN 
        grunt_survived AS gs ON cd.grunt_survived = gs.id
    JOIN 
        miranda_survived AS ms ON cd.miranda_survived = ms.id
    JOIN 
        mordin_survived AS mos ON cd.mordin_survived = mos.id
    JOIN 
        samara_survived AS ss ON cd.samara_survived = ss.id
    JOIN 
        tali_survived AS ts ON cd.tali_survived = ts.id
    WHERE 
            ccg.id = (SELECT id FROM character_class_game WHERE game = ${Number(gameId)} AND character_id = ${Number(charId)});

        `).then(dbRes => {
            console.log("Query result:", dbRes); 
            if (dbRes.length > 0) {
                // Extract the character data from the first element of dbRes
                const characterData = dbRes[0];
                // Send the character data back in the response
                res.status(200).json(characterData);
            } else {
                console.error("No game data found for characterId:", charId);
                res.sendStatus(404); // Character not found
            }
        })
        .catch(error => {
            console.error("Error executing query:", error);
            res.sendStatus(500);
        });
    },

    checkCharacter: (req, res) => {
        const charId = req.params.id;
        sequelize.query(`
            SELECT EXISTS (
                SELECT 1
                FROM character_creation WHERE id = ${Number(charId)}
            ) AS associated 
        `).then(result => { // AS associated checks if it exists
            const isAssociated = result[0][0].associated; // Extract the boolean value from the result
            res.status(200).json({ associated: isAssociated });
        }).catch(error => {
            console.error("Error checking character:", error);
            res.sendStatus(500);
        });
    },

    checkCharacterGame: (req, res) => {
        const charId = req.params.id; // Assuming the character ID is in the URL path
        const game = req.query.game;

        console.log(req.query);

        console.log(`game in controller.js: ${game}`)
        console.log(`checkCharacterGame called`)
    
        sequelize.query(`
            SELECT EXISTS (
                SELECT 1
                FROM character_class_game AS ccg
                JOIN game AS g ON ccg.game = g.id
                WHERE ccg.character_id = ${Number(charId)} 
                AND g.game = ${Number(game)}
            ) AS associated 
        `).then(result => { // AS associated checks if it exists
            const isAssociated = result[0][0].associated; // Extract the boolean value from the result
            res.status(200).json({ associated: isAssociated });
        }).catch(error => {
            console.error("Error checking character:", error);
            res.sendStatus(500);
        });
    },

    addNewCharacter: (req, res) => {
        const { game, name, origin, reputation, charClass, version, level, romance, paragon, renegade, faceCode} = req.body;
    
        sequelize.transaction(async (t) => {
            try {
                // Insert into character_creation table
                const [characterCreationResult] = await sequelize.query(
                    `INSERT INTO character_creation (char_name, origin, reputation)
                    VALUES (
                        '${name}', 
                        (SELECT id FROM origin WHERE origin = '${origin}'), 
                        (SELECT id FROM reputation WHERE reputation = '${reputation}')
                    );`,
                    { transaction: t }
                );
    
                // Retrieve characterId using a separate query
                const [characterIdResult] = await sequelize.query(`
                    SELECT id FROM character_creation ORDER BY id DESC LIMIT 1
                `, { transaction: t });

                // Extract characterId from the result
                const characterId = characterIdResult[0]?.id;

                console.log(`characterID in controller.js: ${characterId}`)
                
                // Insert into character_class_game table
                await sequelize.query(`
                    INSERT INTO character_class_game (game, character_id, game_class, char_level, romanced, game_type, paragon, renegade, face_code)
                    VALUES (
                        (SELECT id FROM game WHERE game = ${Number(game)}),
                        ${characterId},
                        (SELECT id FROM game_class WHERE c_class = '${charClass}'),
                        ${Number(level)},
                        (SELECT id FROM romanced WHERE npc_name = '${romance}'),
                        (SELECT id FROM game_type WHERE game_type = '${version}'),
                        ${Number(paragon)},
                        ${Number(renegade)},
                        '${faceCode}'
                    );
                `,
                    { transaction: t }
                );
    
                return characterId;
            } catch (error) {
                throw error;
            }
        })
        .then((characterId) => {
            res.status(200).send({ characterId });
        })
        .catch(err => {
            console.error("There's an error in addNewCharacter", err);
            res.status(500).send("Error creating character");
        });
    },

    updateCharacter: (req, res) => {
        const { char_id, version, level, romance, paragon, renegade, face_code, game } = req.body

        console.log(`
        char_id: ${char_id},
        version: ${version},
        level: ${level},
        romance: ${romance}
        paragon: ${paragon}
        renegade: ${renegade}
        face_code: ${face_code}
        `)
        
        sequelize.query(`
        UPDATE character_class_game
        SET
            romanced = (SELECT id FROM romanced WHERE npc_name = '${romance}'),
            game_type = (SELECT id FROM game_type WHERE game_type = '${version}'),
            char_level = ${Number(level)},
            paragon = ${Number(paragon)},
            renegade = ${Number(renegade)},
            face_code = '${face_code}'
        WHERE character_id = ${Number(char_id)} AND game = ${Number(game)};
        `).then(result => {
            console.log("Character updated successfully");
            res.sendStatus(200);
        })
        .catch(error => {
            console.error("Error updating character:", error);
            res.sendStatus(500);
        });
    
    },

    addMassEffectOneDecisions: (req, res) => {
        const { gameId, characterCreationId, fistAlive, jinnaHelped, conrad, rescuedBurns, kyleSurrendered, helenaSurvived, punchAlJilani, recoveredOSD, shialaSurvived, zhusHope, giannaNotExposed, rachniQueen, wrexArmor, taliGethData, jacobLife, savedHostages, wrexSurvived, ranaSurvived, kirraheSurvived, ashleyOrKaiden, savedDestinyAscension, andersonOrUdina, asariWriting, elkossCombineArmory } = req.body

        console.log(req.body)

        console.log('gameId from controller.js: ' + gameId)

        sequelize.query(`
        INSERT INTO game_one_decisions (
            conrad_verner_set_streight, 
            al_jilani_punched, 
            rachni_queen_survived, 
            fist_spared, 
            rescued_burns, 
            kyle_surrender, 
            helena_blae_survived, 
            recovered_osd, 
            shiala_survived, 
            saved_zhu_colonist, 
            gianna_not_exposed, 
            retrieved_wrex_armor, 
            gave_tali_geth_data, 
            jacob_died, 
            saved_x57_hostages, 
            wrex_survived, 
            saved_destiny_ascension, 
            aquired_10_assari_writings, 
            elkoss_conbine_license, 
            ashley_or_kaidan, 
            anderson_or_udina, 
            jianna_helped, 
            rana_survived, 
            kirrahe_survived,
            character_class_game_id
        )
        VALUES (
            (SELECT id FROM conrad_verner WHERE fate = '${conrad}'),
            (SELECT id FROM al_jilani WHERE punched = '${punchAlJilani}'),
            (SELECT id FROM rachni_queen WHERE rachni_queen_survived = ${rachniQueen}),
            ${fistAlive},
            ${rescuedBurns},
            ${kyleSurrendered},
            ${helenaSurvived},
            ${recoveredOSD},
            ${shialaSurvived},
            ${zhusHope},
            ${giannaNotExposed},
            ${wrexArmor},
            ${taliGethData},
            ${jacobLife},
            ${savedHostages},
            ${wrexSurvived},
            ${savedDestinyAscension},
            ${asariWriting},
            ${elkossCombineArmory},
            (SELECT id FROM ashley_or_kaiden WHERE npc_name='${ashleyOrKaiden}'),
            (SELECT id FROM anderson_or_udina WHERE npc_name = '${andersonOrUdina}'),
            ${jinnaHelped},
            ${ranaSurvived},
            ${kirraheSurvived},
            (SELECT id FROM character_class_game WHERE game = ${Number(gameId)} AND character_id = ${Number(characterCreationId)})
        );

        `).then(() => {
            res.sendStatus(200)
        })
        .catch(err => console.log("there's an error in addMassEffectOneDecisions", err))
    },

    addMassEffectTwoDecisions: (req, res) => {
        const {
            gameId,
            characterCreationId,
            punchAlJilani,
            grayboxKept,
            niftuAlive,
            kalReegarSurvive,
            kasumiLoyalty,
            zaeedLoyalty,
            mirandaLoyalty,
            jacobLoyalty,
            ronaldTaylor,
            conradVerner,
            samaraLoyalty,
            mordinLoyalty,
            maelonFate,
            maelonDataSurvived,
            gruntLoaylty,
            thresherMawKilled,
            jackLoyalty,
            mirandaJackResolved,
            taliLoyalty,
            raelZorahTreason,
            taliExile,
            garrusLoyalty,
            sidonisSpared,
            thaneLoyalty,
            legionToCerberus,
            legionLoyalty,
            gethHeretics,
            taliLegionResolution,
            kellyFish,
            garrusDeath,
            gruntDeath,
            jackDeath,
            jacobDeath,
            kasumiDeath,
            legionDeath,
            mirandaDeath,
            mordinDeath,
            samaraDeath,
            taliDeath,
            thaneDeath,
            zaeedDeath,
            normandyCrew,
            collectorStation,
            prejekPaddlefish
        } = req.body;
    
        sequelize.transaction(async (t) => {
            try {
                // Insert into game_two_decisions table
                const [gameTwoDecisionsResult] = await sequelize.query(
                    `INSERT INTO game_two_decisions (
                        conrad_verner_set_streight, 
                        al_jilani_punched, 
                        ronald_taylor_fate, 
                        kept_graybox, 
                        niftu_cal_survived, 
                        thresher_maw_killed, 
                        miranda_jack_resolve, 
                        rael_zorah_treason_concealed, 
                        tali_exiles, 
                        sidonis_spared, 
                        gave_cerberus_legion, 
                        destroyed_geth_heritics, 
                        tali_legion_resolution, 
                        kelly_feeds_fish, 
                        normandy_crew_survived, 
                        collecter_station_destroyed, 
                        prejek_paddlefish_survived, 
                        kill_maelon, 
                        kal_reegar_survive, 
                        maelon_data_survived, 
                        character_class_game_id
                    )
                    VALUES (
                        (SELECT id FROM conrad_verner WHERE fate='${conradVerner}'),
                        (SELECT id FROM al_jilani WHERE punched='${punchAlJilani}'),
                        (SELECT id FROM ronald_taylor WHERE taylor_options = '${ronaldTaylor}'),
                        ${grayboxKept},
                        ${niftuAlive},
                        ${thresherMawKilled},
                        ${mirandaJackResolved},
                        ${raelZorahTreason},
                        ${taliExile},
                        ${sidonisSpared},
                        ${legionToCerberus},
                        ${gethHeretics},
                        ${taliLegionResolution},
                        ${kellyFish},
                        ${normandyCrew},
                        ${collectorStation},
                        ${prejekPaddlefish},
                        ${maelonFate},
                        ${kalReegarSurvive},
                        ${maelonDataSurvived},
                        (SELECT id FROM character_class_game WHERE game = ${Number(gameId)} AND character_id = ${Number(characterCreationId)})
                    )
                    RETURNING id;
                `, { transaction: t }
                );
    
                // Retrieve gameTwoDecisionsId using a separate query
                const [gameTwoDecisionsIdResult] = await sequelize.query(`
                    SELECT id FROM game_two_decisions ORDER BY id DESC LIMIT 1
                `, { transaction: t });
    
                // Extract gameTwoDecisionsId from the result
                const gameTwoDecisionsId = gameTwoDecisionsIdResult[0]?.id;
    
                // Insert into companion_death_or_survived_game_2 table
                await sequelize.query(`
                    INSERT INTO companion_death_or_survived_game_2 (
                        game_two_decisions, 
                        garrus_survived, 
                        grunt_survived, 
                        jack_survived, 
                        jacob_survived, 
                        kasumi_survived, 
                        legion_survived, 
                        miranda_survived, 
                        mordin_survived, 
                        samara_survived, 
                        tali_survived, 
                        thane_survived, 
                        zaeed_survived
                    )
                    VALUES (
                        ${gameTwoDecisionsId},
                        (SELECT id FROM garrus_survived WHERE survived = ${garrusDeath}),
                        (SELECT id FROM grunt_survived WHERE survived = ${gruntDeath}),
                        (SELECT id FROM jack_survived WHERE survived = ${jackDeath}),
                        (SELECT id FROM jacob_survived WHERE survived = ${jacobDeath}),
                        (SELECT id FROM kasumi_survived WHERE survived = ${kasumiDeath}),
                        (SELECT id FROM leigon_survived WHERE survived = ${legionDeath}),
                        (SELECT id FROM miranda_survived WHERE survived = ${mirandaDeath}),
                        (SELECT id FROM mordin_survived WHERE survived = ${mordinDeath}),
                        (SELECT id FROM samara_survived WHERE survived = ${samaraDeath}),
                        (SELECT id FROM tali_survived WHERE survived = ${taliDeath}),
                        (SELECT id FROM thane_survived WHERE survived = ${thaneDeath}),
                        (SELECT id FROM zaeed_survived WHERE survived = ${zaeedDeath})
                    );
                `, { transaction: t });
    
                // Insert into companion_loyalty table
                await sequelize.query(`
                    INSERT INTO companion_loyalty (
                        game_two_decisions, 
                        garrus_loyalty, 
                        grunt_loyalty, 
                        jack_loyalty, 
                        jacob_loyalty, 
                        kasumi_loyalty, 
                        leigon_loyalty, 
                        miranda_loyalty, 
                        mordin_loyalty, 
                        samara_loyalty, 
                        tali_loyalty, 
                        thane_loyalty, 
                        zaeed_loyalty
                    )
                    VALUES (
                        ${gameTwoDecisionsId},
                        (SELECT id FROM garrus_loyalty WHERE loyal = ${garrusLoyalty}),
                        (SELECT id FROM grunt_loyalty WHERE loyal = ${gruntLoaylty}),
                        (SELECT id FROM jack_loyalty WHERE loyal = ${jackLoyalty}),
                        (SELECT id FROM jacob_loyalty WHERE loyal = ${jacobLoyalty}),
                        (SELECT id FROM kasumi_loyalty WHERE loyal = ${kasumiLoyalty}),
                        (SELECT id FROM leigon_loyalty WHERE loyal = ${legionLoyalty}),
                        (SELECT id FROM miranda_loyalty WHERE loyal = ${mirandaLoyalty}),
                        (SELECT id FROM mordin_loyalty WHERE loyal = ${mordinLoyalty}),
                        (SELECT id FROM samara_loyalty WHERE loyal = ${samaraLoyalty}),
                        (SELECT id FROM tali_loyalty WHERE loyal = ${taliLoyalty}),
                        (SELECT id FROM thane_loyalty WHERE loyal = ${thaneLoyalty}),
                        (SELECT id FROM zaeed_loyalty WHERE loyal = ${zaeedLoyalty})
                    );
                `, { transaction: t });
    
                return gameTwoDecisionsId;
            } catch (error) {
                throw error;
            }
        })
        .then((gameTwoDecisionsId) => {
            res.status(200).send({ gameTwoDecisionsId });
        })
        .catch(err => {
            console.error("There's an error in addMassEffectTwoDecisions", err);
            res.status(500).send("Error adding Mass Effect two decisions");
        });
    },
    

    addMassEffectThreeDecisions: (req, res) => {
        const {
            characterCreationId,
            gameId,
            punchAlJilani,
            recruitDoctor,
            pardonedDanielsDonnelly,
            eveSurvived,
            genophageCured,
            mordinDied,
            kissedAria,
            savedOmegaCivilians,
            annBrysonUnharmed,
            paragonAshleyKaidan,
            garrusMatch,
            ediJokerRelationship,
            savedBau,
            savedKahje,
            grissomAcademy,
            grissomStudents,
            rachniQueen,
            gruntDied,
            ashelyKaidanSurvived,
            samaraSurvived,
            falereSpared,
            gavinArcher,
            savedRiley,
            balakSpared,
            conradVerner,
            rescuedLegion,
            destroyedReaperCode,
            gethJammingTower,
            memoryShard,
            savedAdmiralKoris,
            quariansSurvived,
            taliDeath,
            gethIntelligent,
            javikLiaraArgument,
            brooksIncarcerated,
            mirandaSurvived,
            cortezSurvived,
            ending
        } = req.body;
    
        sequelize.transaction(async (t) => {
            try {
                // Insert into game_three_decisions table
                const [gameThreeDecisionsResult] = await sequelize.query(`
                    INSERT INTO game_three_decisions (
                        conrad_verner_set_streight, 
                        al_jilani_punched, 
                        doctor_recruited, 
                        pardoned_daniels_donnelly, 
                        eve_saved, 
                        genophage_cured, 
                        kissed_aria, 
                        saved_omega_civilians, 
                        ann_bryson_unharmed, 
                        paragon_action_kaidan_ashley, 
                        garrus_wins_match, 
                        edi_joker_relationship, 
                        saved_bau, 
                        saved_kahji, 
                        saved_grissom_academy, 
                        grissom_students, 
                        rachni_queen_id, 
                        ashley_kaiden_coup_survive, 
                        falere_spared, 
                        gavin_archer_killed, 
                        saved_riley, 
                        balak_spared, 
                        rescued_legion, 
                        destroyed_reaper_code_inf, 
                        took_down_jamming_tower, 
                        saved_admiral_koris, 
                        quarians_survived, 
                        geth_intelligent, 
                        javik_liara_resolved, 
                        brooks_incarcerated, 
                        cortez_survives_landing, 
                        ending,
                        memory_shard,
                        character_class_game_id
                    )
                    VALUES (
                        (SELECT id FROM conrad_verner WHERE fate='${conradVerner}'),
                        (SELECT id FROM al_jilani WHERE punched='${punchAlJilani}'),
                        (SELECT id FROM doctor_recruited WHERE npc_name = '${recruitDoctor}'),
                        ${pardonedDanielsDonnelly},
                        ${eveSurvived},
                        ${genophageCured},
                        ${kissedAria},
                        ${savedOmegaCivilians},
                        ${annBrysonUnharmed},
                        ${paragonAshleyKaidan},
                        ${garrusMatch},
                        ${ediJokerRelationship},
                        ${savedBau},
                        ${savedKahje},
                        ${grissomAcademy},
                        ${grissomStudents},
                        (SELECT id FROM rachni_queen WHERE rachni_queen_survived='${rachniQueen}'),
                        ${ashelyKaidanSurvived},
                        ${falereSpared},
                        ${gavinArcher},
                        ${savedRiley},
                        ${balakSpared},
                        ${rescuedLegion},
                        ${destroyedReaperCode},
                        ${gethJammingTower},
                        ${savedAdmiralKoris},
                        ${quariansSurvived},
                        ${gethIntelligent},
                        ${javikLiaraArgument},
                        ${brooksIncarcerated},
                        ${cortezSurvived},
                        (SELECT id FROM ending WHERE ending ='${ending}'),
                        ${memoryShard},
                        (SELECT id FROM character_class_game WHERE game = ${Number(gameId)} AND character_id = ${Number(characterCreationId)})
                    )
                    RETURNING id;
                `, { transaction: t });
    
                // Retrieve gameThreeDecisionsId using a separate query
                const gameThreeDecisionsId = gameThreeDecisionsResult[0]?.id;
    
                // Insert into companion_death_or_survived_game_3 table
                await sequelize.query(`
                    INSERT INTO companion_death_or_survived_game_3 (
                        game_three_decisions, 
                        grunt_survived, 
                        miranda_survived, 
                        mordin_survived, 
                        samara_survived, 
                        tali_survived
                    )
                    VALUES (
                        ${gameThreeDecisionsId},
                        (SELECT id FROM grunt_survived WHERE survived = ${gruntDied}),
                        (SELECT id FROM miranda_survived WHERE survived = ${mirandaSurvived}),
                        (SELECT id FROM mordin_survived WHERE survived = ${mordinDied}),
                        (SELECT id FROM samara_survived WHERE survived = ${samaraSurvived}),
                        (SELECT id FROM tali_loyalty WHERE loyal = ${taliDeath})
                    );
                `, { transaction: t });
    
                return gameThreeDecisionsId;
            } catch (error) {
                throw error;
            }
        })
        .then((gameThreeDecisionsId) => {
            res.sendStatus(200);
        })
        .catch(err => {
            console.error("There's an error in addMassEffectThreeDecisions", err);
            res.status(500).send("Error adding Mass Effect three decisions");
        });
    },
    


    editMassEffectOneDecisions: (req, res) => {
        const { gameId, characterCreationId, fistAlive, jinnaHelped, conrad, rescuedBurns, kyleSurrendered, helenaSurvived, punchAlJilani, recoveredOSD, shialaSurvived, zhusHope, giannaNotExposed, rachniQueen, wrexArmor, taliGethData, jacobLife, savedHostages, wrexSurvived, ranaSurvived, kirraheSurvived, ashleyOrKaiden, savedDestinyAscension, andersonOrUdina, asariWriting, elkossCombineArmory } = req.body

        console.log('just before query')

        sequelize.query(`
        UPDATE game_one_decisions 
            SET conrad_verner_set_streight = (SELECT id FROM conrad_verner WHERE fate='${conrad}'), 
            al_jilani_punched = (SELECT id FROM al_jilani WHERE punched='${punchAlJilani}'), 
            rachni_queen_survived = (SELECT id FROM rachni_queen WHERE rachni_queen_survived='${rachniQueen}'),
            fist_spared = ${fistAlive}, 
            rescued_burns = ${rescuedBurns}, 
            kyle_surrender = ${kyleSurrendered}, 
            helena_blae_survived = ${helenaSurvived}, 
            recovered_osd = ${recoveredOSD}, 
            shiala_survived =  ${shialaSurvived}, 
            saved_zhu_colonist = ${zhusHope}, 
            gianna_not_exposed = ${giannaNotExposed}, 
            retrieved_wrex_armor = ${wrexArmor}, 
            gave_tali_geth_data = ${taliGethData}, 
            jacob_died = ${jacobLife}, 
            saved_x57_hostages = ${savedHostages}, 
            wrex_survived = ${wrexSurvived}, 
            saved_destiny_ascension = ${savedDestinyAscension}, 
            aquired_10_assari_writings = ${asariWriting}, 
            elkoss_conbine_license = ${elkossCombineArmory}, 
            ashley_or_kaidan = (SELECT id FROM ashley_or_kaiden WHERE npc_name='${ashleyOrKaiden}'),
            anderson_or_udina = (SELECT id FROM anderson_or_udina WHERE npc_name = '${andersonOrUdina}'),
            jianna_helped = ${jinnaHelped}, 
            rana_survived = ${ranaSurvived}, 
            kirrahe_survived = ${kirraheSurvived}
            WHERE character_class_game_id = (SELECT id FROM character_class_game WHERE game = ${Number(gameId)} AND character_id = ${Number(characterCreationId)})
        `).then(result => {
            console.log("Mass Effect 1 decisions updated successfully");
            res.sendStatus(200);
        })
        .catch(error => {
            console.error("Error updating Mass Effect 1 decisions:", error);
            res.sendStatus(500);
        });
        
    },

    editMassEffectTwoDecisions: (req, res) => {
        const { gameId, characterCreationId, punchAlJilani, grayboxKept, niftuAlive, kalReegarSurvive, kasumiLoyalty, zaeedLoyalty, mirandaLoyalty, jacobLoyalty, ronaldTaylor, conradVerner, samaraLoyalty, mordinLoyalty, maelonFate, maelonDataSurvived, gruntLoaylty, thresherMawKilled, jackLoyalty, mirandaJackResolved, taliLoyalty, raelZorahTreason, taliExile, garrusLoyalty, sidonisSpared, thaneLoyalty, legionToCerberus, legionLoyalty, gethHeretics, taliLegionResolution, kellyFish, garrusDeath, gruntDeath, jackDeath, jacobDeath, kasumiDeath, legionDeath, marandaDeath, mordinDeath, samaraDeath, taliDeath, thaneDeath, zaeedDeath, normandyCrew, collectorStation, prejekPaddlefish } = req.body;
    
        sequelize.transaction(async (t) => {
            try {
                // Update game_two_decisions table and fetch the gameId
                const [gameTwoDecisionsResult] = await sequelize.query(`
                    UPDATE game_two_decisions
                    SET 
                        conrad_verner_set_streight = (SELECT id FROM conrad_verner WHERE fate='${conradVerner}'),
                        al_jilani_punched = (SELECT id FROM al_jilani WHERE punched='${punchAlJilani}'),
                        ronald_taylor_fate = (SELECT id FROM ronald_taylor WHERE taylor_options = '${ronaldTaylor}'),
                        kept_graybox = ${grayboxKept},
                        niftu_cal_survived = ${niftuAlive},
                        thresher_maw_killed = ${thresherMawKilled},
                        miranda_jack_resolve = ${mirandaJackResolved},
                        rael_zorah_treason_concealed = ${raelZorahTreason},
                        tali_exiles = ${taliExile},
                        sidonis_spared = ${sidonisSpared},
                        gave_cerberus_legion = ${legionToCerberus},
                        destroyed_geth_heritics = ${gethHeretics},
                        tali_legion_resolution = ${taliLegionResolution},
                        kelly_feeds_fish = ${kellyFish},
                        normandy_crew_survived = ${normandyCrew},
                        collecter_station_destroyed = ${collectorStation},
                        prejek_paddlefish_survived = ${prejekPaddlefish},
                        kill_maelon = ${maelonFate},
                        kal_reegar_survive = ${kalReegarSurvive},
                        maelon_data_survived = ${maelonDataSurvived} 
                    WHERE 
                        character_class_game_id = (SELECT id FROM character_class_game WHERE game = ${Number(gameId)} AND character_id = ${Number(characterCreationId)})
                    RETURNING id;
                `, { transaction: t });
        
                // Retrieve gameId
                const gameTwoDecisions = gameTwoDecisionsResult[0]?.id;

                console.log(gameTwoDecisions)
        
                // Update companion_death_or_survived_game_2 table
                await sequelize.query(`
                    UPDATE companion_death_or_survived_game_2
                    SET 
                        garrus_survived = (SELECT id FROM garrus_survived WHERE survived = ${garrusDeath}),
                        grunt_survived = (SELECT id FROM grunt_survived WHERE survived = ${gruntDeath}),
                        jack_survived = (SELECT id FROM jack_survived WHERE survived = ${jackDeath}),
                        jacob_survived = (SELECT id FROM jacob_survived WHERE survived = ${jacobDeath}),
                        kasumi_survived = (SELECT id FROM kasumi_survived WHERE survived = ${kasumiDeath}),
                        legion_survived =  (SELECT id FROM leigon_survived WHERE survived = ${legionDeath}),
                        miranda_survived = (SELECT id FROM miranda_survived WHERE survived = ${marandaDeath}),
                        mordin_survived = (SELECT id FROM mordin_survived WHERE survived = ${mordinDeath}),
                        samara_survived =  (SELECT id FROM samara_survived WHERE survived = ${samaraDeath}),
                        tali_survived = (SELECT id FROM tali_survived WHERE survived = ${taliDeath}),
                        thane_survived =  (SELECT id FROM thane_survived WHERE survived = ${thaneDeath}),
                        zaeed_survived = (SELECT id FROM zaeed_survived WHERE survived = ${zaeedDeath})
                    WHERE 
                        game_two_decisions = ${gameTwoDecisions};
                `, { transaction: t });
        
                // Update companion_loyalty table
                await sequelize.query(`
                    UPDATE companion_loyalty
                    SET 
                        garrus_loyalty = (SELECT id FROM garrus_loyalty WHERE loyal = ${garrusLoyalty}),
                        grunt_loyalty =  (SELECT id FROM grunt_loyalty WHERE loyal = ${gruntLoaylty}),
                        jack_loyalty = (SELECT id FROM jack_loyalty WHERE loyal = ${jackLoyalty}),
                        jacob_loyalty = (SELECT id FROM jacob_loyalty WHERE loyal = ${jacobLoyalty}),
                        kasumi_loyalty = (SELECT id FROM kasumi_loyalty WHERE loyal = ${kasumiLoyalty}),
                        leigon_loyalty = (SELECT id FROM leigon_loyalty WHERE loyal = ${legionLoyalty}),
                        miranda_loyalty =  (SELECT id FROM miranda_loyalty WHERE loyal = ${mirandaLoyalty}),
                        mordin_loyalty =  (SELECT id FROM mordin_loyalty WHERE loyal = ${mordinLoyalty}),
                        samara_loyalty =  (SELECT id FROM samara_loyalty WHERE loyal = ${samaraLoyalty}),
                        tali_loyalty =  (SELECT id FROM tali_loyalty WHERE loyal = ${taliLoyalty}),
                        thane_loyalty = (SELECT id FROM thane_loyalty WHERE loyal = ${thaneLoyalty}),
                        zaeed_loyalty = (SELECT id FROM zaeed_loyalty WHERE loyal = ${zaeedLoyalty})

                    WHERE 
                        game_two_decisions = ${gameTwoDecisions};
                `, { transaction: t });
        
                return gameId;
            } catch (error) {
                throw error;
            }
        })
        .then((gameId) => {
            res.sendStatus(200);
        })
        .catch(err => {
            console.error("There's an error in updating game two decisions", err);
            res.status(500).send("Error updating game two decisions");
        });
        

    },

    editMassEffectThreeDecisions: (req, res) => {
        const {
            gameId,
            characterCreationId,
            punchAlJilani,
            recruitDoctor,
            pardonedDanielsDonnelly,
            eveSurvived,
            genophageCured,
            mordinDied,
            kissedAria,
            savedOmegaCivilians,
            annBrysonUnharmed,
            paragonAshleyKaidan,
            garrusMatch,
            ediJokerRelationship,
            savedBau,
            savedKahje,
            grissomAcademy,
            grissomStudents,
            rachniQueen,
            gruntDied,
            ashelyKaidanSurvived,
            samaraSurvived,
            falereSpared,
            gavinArcher,
            savedRiley,
            balakSpared,
            conradVerner,
            rescuedLegion,
            destroyedReaperCode,
            gethJammingTower,
            memoryShard,
            savedAdmiralKoris,
            quariansSurvived,
            taliDeath,
            gethIntelligent,
            javikLiaraArgument,
            brooksIncarcerated,
            mirandaSurvived,
            cortezSurvived,
            ending
        } = req.body;
    
        sequelize.transaction(async (t) => {
            try {
                // Update game_three_decisions table and fetch the gameId
                const [gameThreeDecisionResult] = await sequelize.query(`
                    UPDATE game_three_decisions
                    SET 
                        conrad_verner_set_streight = (SELECT id FROM conrad_verner WHERE fate='${conradVerner}'),
                        al_jilani_punched = (SELECT id FROM al_jilani WHERE punched='${punchAlJilani}'),
                        doctor_recruited = (SELECT id FROM doctor_recruited WHERE npc_name = '${recruitDoctor}'),
                        pardoned_daniels_donnelly = ${pardonedDanielsDonnelly},
                        eve_saved = ${eveSurvived},
                        genophage_cured = ${genophageCured},
                        kissed_aria = ${kissedAria},
                        saved_omega_civilians = ${savedOmegaCivilians},
                        ann_bryson_unharmed = ${annBrysonUnharmed},
                        paragon_action_kaidan_ashley = ${paragonAshleyKaidan},
                        garrus_wins_match = ${garrusMatch},
                        edi_joker_relationship = ${ediJokerRelationship},
                        saved_bau = ${savedBau},
                        saved_kahji = ${savedKahje},
                        saved_grissom_academy = ${grissomAcademy},
                        ashley_kaiden_coup_survive = ${ashelyKaidanSurvived},
                        falere_spared = ${falereSpared},
                        gavin_archer_killed = ${gavinArcher},
                        saved_riley = ${savedRiley},
                        balak_spared = ${balakSpared},
                        rescued_legion = ${rescuedLegion},
                        destroyed_reaper_code_inf = ${destroyedReaperCode},
                        took_down_jamming_tower = ${gethJammingTower},
                        saved_admiral_koris = ${savedAdmiralKoris},
                        quarians_survived = ${quariansSurvived},
                        javik_liara_resolved = ${javikLiaraArgument},
                        brooks_incarcerated = ${brooksIncarcerated},
                        cortez_survives_landing = ${cortezSurvived},
                        ending = (SELECT id FROM ending WHERE ending = '${ending}'),
                        grissom_students = ${grissomStudents},
                        rachni_queen_id = (SELECT id FROM rachni_queen WHERE rachni_queen_survived = ${rachniQueen}),
                        memory_shard = ${memoryShard},
                        geth_intelligent = ${gethIntelligent}
                    WHERE 
                        character_class_game_id = (SELECT id FROM character_class_game WHERE game = ${Number(gameId)} AND character_id = ${Number(characterCreationId)})
                    RETURNING id;
                `, { transaction: t });
    
                // Retrieve gameId
                const gameThreeDecision = gameThreeDecisionResult[0]?.id;
    
                // Update companion_death_or_survived_game_3 table
                await sequelize.query(`
                    UPDATE companion_death_or_survived_game_3
                    SET
                        grunt_survived = (SELECT id FROM grunt_survived WHERE survived = ${gruntDied}),
                        miranda_survived = (SELECT id FROM miranda_survived WHERE survived = ${mirandaSurvived}),
                        mordin_survived = (SELECT id FROM mordin_survived WHERE survived = ${mordinDied}),
                        samara_survived =  (SELECT id FROM samara_survived WHERE survived = ${samaraSurvived}),
                        tali_survived = (SELECT id FROM tali_survived WHERE survived = ${taliDeath})
                    WHERE 
                        game_three_decisions = ${gameThreeDecision};
                `, { transaction: t });
    
                return gameId;
            } catch (error) {
                throw error;
            }
        })
        .then((gameId) => {
            res.sendStatus(200);
        })
        .catch(err => {
            console.error("There's an error in updating game three decisions", err);
            res.status(500).send("Error updating game three decisions");
        });
    },

    addNewGameToCharacter: (req, res) => {
        const { char_id, version, level, romance, paragon, renegade, game, game_class, face_code } = req.body;
    
        return new Promise((resolve, reject) => {
            sequelize.transaction(async (t) => {
                try {
                    // Update game_three_decisions table and fetch the gameId
                    const [newGameToCharacterId] = await sequelize.query(`
                        INSERT INTO character_class_game (game, character_id, game_class, char_level, romanced, game_type, paragon, renegade, face_code)
                        VALUES (
                            (SELECT id FROM game WHERE game = ${Number(game)}),
                            ${char_id},
                            (SELECT id FROM game_class WHERE c_class = '${game_class}'),
                            ${Number(level)},
                            (SELECT id FROM romanced WHERE npc_name = '${romance}'),
                            (SELECT id FROM game_type WHERE game_type = '${version}'),
                            ${Number(paragon)},
                            ${Number(renegade)},
                            '${face_code}'
                        );`, { transaction: t });
    
                    const gameToCharId = newGameToCharacterId[0]?.id;
    
                    console.log("New game added to character successfully");
                    resolve(gameToCharId);
                } catch (error) {
                    console.error("Error adding new game to character:", error);
                    reject(error);
                }
            });
        });
    }
    
}    