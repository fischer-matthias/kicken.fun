/**
 * This module is able to parse an specific fupa.net
 * team and returns a list of players.
 */
module.exports = () => {

    // imports
    const https = require('https');
    const parse5 = require('parse5');

    const fupaParser = {};

    /**
     * Parse the html string to an array of team members
     * @param {string} rawHTML raw html string
     * @returns Array of team members
     */
    function parseHTML(rawHTML) {
        return new Promise((resolve, reject) => {
            const htmlObj = parse5.parse(rawHTML);
            resolve(htmlObj);
        });
    }

    /**
     * 
     * @param {string} club clubname
     * @param {string} team first, second, third ... team (m1, m2, m3 ...)
     * @returns {*} Array of team members 
     */
    fupaParser.getPlayersOfTeam = (club, team) => {
        return new Promise((resolve, reject) => {
            // create http request
            https.get('https://www.fupa.net/club/' + club + '/team/' + team, (resp) => {
                let data = '';
               
                // A chunk of data has been recieved.
                resp.on('data', chunk => data += chunk);
               
                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    parseHTML(data)
                        .then((result) => resolve(result))
                        .catch((error) => reject(error));
                });
               
              }).on("error", (err) => {
                    reject(err);
              });
        });

    }

    return fupaParser;
}