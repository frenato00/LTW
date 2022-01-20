const fs = require('fs');

module.exports.ranking = function () {
    fs.readFile('ranking.txt', 'utf8', function(err, data) {
        if (!err) {
            dados = JSON.parse(data.toString);
            return dados;
        }
    });
}