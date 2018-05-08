module.exports = function() {
    
    const express = require('express');
    const clubCrawler = require('../logic/club-crawler')();
    
    const clubs = {};
    clubs.routes = express.Router();

    clubs.routes.route('/:searchTerm').get((req, res) => {
        const searchTerm = req.params.searchTerm;

        clubCrawler.findClub(searchTerm)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(406).send({'status': 'nok', 'error': error});
            });
    });

    return clubs;
}