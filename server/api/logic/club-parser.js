/**
 * This module returns filtered clubs by a search term from fupa.net. 
 */
module.exports = () => {

    // includes
    const https = require('https');

    const clubParser = {};

    /**
     * Returns a list of clubs found by a specific search term.
     * @param {string} searchTerm 
     * @returns Promise<Array> of clubs
     */
    clubParser.findClub = (searchTerm) => {

        return new Promise((resolve, reject) => {
            // create http request
            https.get('https://www.fupa.net/fupa/api.php?q=' + searchTerm + '&p=json_team_liste&saison=&liga_id=', (resp) => {
                let data = '';
                
                // A chunk of data has been recieved.
                resp.on('data', chunk => data += chunk);
                
                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    resolve(data);
                });
            
            }).on("error", (err) => {
                reject(err);
            });
        });
    }

    return clubParser;
}