/**
 * This module is able to parse an specific fupa.net
 * team and returns a list of players.
 */
module.exports = () => {

    // imports
    const https = require('https');
    const esprima = require('esprima');
    const parse5 = require('parse5');
    const findChildNode = require('find-child-node')();

    const fupaParser = {};

    /**
     * Parse the html string to an array of team members
     * @param {string} rawHTML raw html string
     * @returns Array of team members
     */
    function parseHTML(rawHTML) {
        return new Promise((resolve, reject) => {
            const htmlObj = parse5.parse(rawHTML);
            var players = [];

            resolve(htmlObj);

            // const teamKaderContainerNode = findChildNode.byClass(htmlObj.childNodes, 'team_kader_container');
            // if(teamKaderContainerNode == null) {
            //     reject('Team wurde nicht gefunden.');
            // }

            // teamKaderContainerNode.childNodes.forEach((node) => {
            //     if(node.nodeName == 'a') {
            //         var playerInfo = findChildNode.byClass(node.childNodes, 'team_kader_info');
            //         var player = parsePlayerInfo(playerInfo);
            //         players.push(player);
            //     }
            // });

            // resolve(players);
        });
    }

    /**
     * Converts an PlayerInfoObject-HTML Objekt to a player object
     * @param {JSON} playerInfoObject
     * @return {Object} player
     */
    function parsePlayerInfo(playerInfoObject) {  
        var player = {};
        
        playerInfoObject.childNodes.forEach((node) => {
            if(node.attrs && node.attrs[0]) {
                switch(node.attrs[0].value) {
                    case 'name':
                        player.name = node.childNodes[0].value;
                        break;
                    case 'vorname':
                        player.vorname = node.childNodes[0].value;
                        break;
                    case 'alter':
                        player.alter = node.childNodes[0].value;
                        break;
                    case 'team_kader_seit':
                        player.kader_seit = node.childNodes[0].value;
                        break;
                    case 'team_verletzt':
                        if(node.childNodes[1]) {
                            player.verletzt = true;
                        } else {
                            player.verletzt = false;
                        }
                        break;
                    case 'team_sperre':
                        if(node.childNodes[1]) {
                            player.sperre = true;
                        } else {
                            player.sperre = false;
                        }
                        break;
                    case '':
                }
            }
        });

        return player;
    }

    /**
     * Returns the players of a specific team
     * @param {string} teamID fupa team id
     * @returns {*} Array of team members 
     */
    fupaParser.getPlayersOfTeam = (teamID) => {
        return new Promise((resolve, reject) => {

            // create http request
            https.get('https://www.fupa.net/fupa/widget.php?val=' + teamID + '&p=start&act=team&fupa_widget_header=0&fupa_widget_navi=0&fupa_widget_div=widget_5af16fa242655&url=www.fupa.net', (resp) => {
                let data = '';
               
                // A chunk of data has been recieved.
                resp.on('data', chunk => data += chunk);
               
                // The whole response has been received. Print out the result.
                resp.on('end', () => {

                    var parsedData = esprima.parseScript(data);
                    if(parsedData && parsedData.body 
                        && parsedData.body[1] && parsedData.body[1].expression 
                        && parsedData.body[1].expression.right
                        && parsedData.body[1].expression.right.value) {

                        var htmlString = parsedData.body[1].expression.right.value;
                        resolve(htmlString);
                    } else {
                        reject('No html found.');
                    }

                    // parseHTML(data)
                    //     .then((result) => resolve(result))
                    //     .catch((error) => reject(error));
                });
               
              }).on("error", (err) => {
                    reject(err);
              });
        });

    }

    return fupaParser;
}