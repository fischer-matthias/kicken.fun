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
     * Returns the players of a specific team
     * @param {string} teamID fupa team id
     * @returns {*} Array of team members 
     */
    fupaParser.getPlayersOfTeam = (teamId) => {
        return new Promise((resolve, reject) => {

            // create http request
            https.get('https://www.fupa.net/fupa/widget.php?val=' + teamId + '&p=start&act=team&fupa_widget_header=0&fupa_widget_navi=0&fupa_widget_div=widget_5af16fa242655&url=www.fupa.net', (resp) => {
                let data = '';
               
                resp.on('data', chunk => data += chunk);
               
                resp.on('end', () => {

                    const htmlString = parseJavaScript(data);

                    if(htmlString === '') {
                        reject('Unable to find players for team' + teamId + '.');
                    } else {
                        parseHTML(data)
                            .then((result) => resolve(result))
                            .catch((error) => reject(error));
                    }
                });
               
              }).on("error", (err) => {
                    reject(err);
              });
        });

    }

    /**
     * Converts the fupa javascript response to a html-string
     * @param {string} javaScriptString
     * @returns HTML-String
     */
    function parseJavaScript(javaScriptString) {

        var esprimaObject = esprima.parseScript(javaScriptString);
        var htmlString = '';

        if(esprimaObject 
            && esprimaObject.body 
            && esprimaObject.body[1] 
            && esprimaObject.body[1].expression 
            && esprimaObject.body[1].expression.right
            && esprimaObject.body[1].expression.right.value) {

            htmlString = esprimaObject.body[1].expression.right.value;
        }

        return htmlString;
    }

    /**
     * Parse the html string to an array of team members
     * @param {string} rawHTML raw html string
     * @returns Array of team members
     */
    function parseHTML(rawHTML) {
        return new Promise((resolve, reject) => {
            const htmlObj = parse5.parse(rawHTML);
            var players = [];

            const tableContainerNode = findChildNode.byClass(htmlObj.childNodes, 'content_table_std spielerkader');
            if(tableContainerNode == null) {
                reject('Team wurde nicht gefunden.');
            }

            const tableBodyContainerNode = tableContainerNode.childNodes[0];
            if(tableBodyContainerNode == null) {
                reject('Team wurde nicht gefunden.');
            }

            tableBodyContainerNode.childNodes.forEach((node) => {
                if(node.nodeName == 'tr' && node.childNodes.length > 0 && node.childNodes[0].nodeName != 'tr' && node.childNodes[0].attrs[0].name != 'colspan') {
                    var player = parsePlayerInfo(node);
                    players.push(player);
                }
            });

            resolve(players);
        });
    }

    /**
     * Converts an PlayerInfoObject-HTML Objekt to a player object
     * @param {JSON} playerInfoObject
     * @return {Object} player
     */
    function parsePlayerInfo(playerInfoObject) {  

        var player = {};
        
        player.nachname = playerInfoObject.childNodes[2].childNodes[0].childNodes[0].childNodes[0].value;
        player.vorname = playerInfoObject.childNodes[2].childNodes[0].childNodes[2].childNodes[0].value;

        var alterTD = findChildNode.byClass(playerInfoObject.childNodes, 'alter_mobil');
        if(alterTD) {
            player.alter = ((alterTD.childNodes[0].value).replace('(', '')).replace(')', '');
        } else {
            player.alter = '';
        }

        player.einsaetze = playerInfoObject.childNodes[5].childNodes[0].value;
        player.tore = playerInfoObject.childNodes[7].childNodes[0].value;
        player.vorlagen = playerInfoObject.childNodes[9].childNodes[0].value;
        player.gelbeKarten = playerInfoObject.childNodes[10].childNodes[0].value;
        player.gelbroteKarten = playerInfoObject.childNodes[12].childNodes[0].value;
        player.roteKarten = playerInfoObject.childNodes[14].childNodes[0].value;

        return player;
    }

    return fupaParser;
}