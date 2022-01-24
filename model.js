const fs = require('fs');

module.exports.data;

module.exports.ranking = function () {
    fs.readFile('ranking.json', function(err, data) {
        if (!err) {
            //dados = JSON.parse(data.toString);
            //return JSON.stringify(dados);
            module.exports.data = data.toString();
        }
    });
};

module.exports.register = function (login) {
    console.log(login);
    fs.readFile('register.json', function(err, data) {
        if (!err) {
            dados = JSON.parse(data.toString());
            regs = dados["register"];
            let i = 0;
            while(regs[i] != null) {
                if (login["nick"] == regs[i]["nick"] && login["password"] == regs[i]["password"]) {
                    module.exports.data = {};
                    return;
                }
                if (login["nick"] == regs[i]["nick"] && login["password"] != regs[i]["password"]) {
                    module.exports.data = {"error":"User registered with a different password"}
                    return;
                }
                i++;
            }
        }
    });
};