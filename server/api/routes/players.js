module.exports = function() {
    
    const express = require('express');
    const fupaParser = require('../logic/fupa-parser')();
    
    const players = {};
    players.routes = express.Router();

    players.routes.route('/:club/:team').get((req, res) => {
        const club = req.params.club;
        const team = req.params.team;

        fupaParser.getPlayersOfTeam(club, team)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(406).send({'status': 'nok', 'error': error});
            });
    });

    return players;
}