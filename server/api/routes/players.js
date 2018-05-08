module.exports = function() {
    
    const express = require('express');
    const fupaParser = require('../logic/fupa-parser')();
    
    const players = {};
    players.routes = express.Router();

    players.routes.route('/:team').get((req, res) => {
        const teamId = req.params.team;
        fupaParser.getPlayersOfTeam(teamId)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(406).send({'status': 'nok', 'error': error});
            });
    });

    return players;
}