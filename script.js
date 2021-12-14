class Tabuleiro {

    constructor(nSeeds, nCav) {
        this.nCav = parseInt(nCav) + 1;

        this.cavs = new Array(2);

        var first = new Array(this.nCav);
        var second = new Array(this.nCav);

        for (let i = 0; i < this.nCav; i++){
            if (i == this.nCav - 1) {
                first[i] = 0;
                second[i] = 0;
            }
            else {
                first[i] = nSeeds;
                second[i] = nSeeds;
            }    
        }

        this.cavs[0] = first;
        this.cavs[1] = second; 

    }

    setAI(tabu) {
        this.nCav = tabu.nCav;
        var first = new Array(this.nCav);
        var second = new Array(this.nCav);

        for (let i = 0; i < this.nCav; i++) {
            first[i] = tabu.cavs[0][i];
            second[i] = tabu.cavs[1][i];
        }

        this.cavs[0] = first;
        this.cavs[1] = second;
    }

    moveAI() {
        var select = document.getElementById("levelAI");
        var dificulty = select.value;
        var move;

        if (dificulty == 0)
            move = minimax(this, 3);

        if (dificulty == 1)
            move = minimax(this, 5);
            
        if (dificulty == 2)
            move = minimax(this, 7);

        tab.sowing(1, move, 1);
    }

    sowingAI(side, cell) {
        side = parseInt(side);
        let oSide = side;
        cell = parseInt(cell);
        var nSeeds = parseInt(this.cavs[side][cell]);
        if (nSeeds == 0) return;
        this.cavs[side][cell] = 0;

        while (nSeeds > 0) {
            cell++;

            if (cell == this.nCav) {
                cell %= this.nCav;
                side = (side + 1) % 2;
            }

            if (side != oSide && cell == this.nCav - 1) {
                cell = 0;
                side = (side + 1) % 2;
            }
            this.cavs[side][cell]++;
            nSeeds--;
        }

        if (oSide == side && cell == this.nCav) {
            this.moveAI();
        }

        if (oSide == side && this.cavs[side][cell] == 1 && cell != this.nCav - 1) {
            this.collect(side, cell);
        }

        this.checkSides();
    }

    showTable() {
        const body = document.body;
        const board = document.createElement("table");

        body.removeChild(body.lastChild);
        board.style.borderCollapse = "collapse";
        
        for (let i = 1; i > -1; i--) {
            const tr = board.insertRow();
            if (i == 1) {
                const td = tr.insertCell();
                td.setAttribute("rowSpan", 2);
                td.style.border = "20px solid burlywood";
                td.style.backgroundColor = "chocolate";
                td.style.height = "200px";
                td.style.width = "100px";
                td.appendChild(makeSeeds(this.cavs[1][this.nCav-1]));
            }    
            for (let j = 0; j < this.nCav - 1; j++) {
                const td = tr.insertCell();
                td.style.border = "20px solid burlywood";
                td.style.backgroundColor = "chocolate";
                td.style.height = "200px";
                td.style.width = "100px";
                td.className = "td";
                if (i == 1)
                    td.appendChild(makeSeeds(this.cavs[i][this.nCav - 2 - j]));
                else {
                    td.appendChild(makeSeeds(this.cavs[i][j]));  
                    td.onclick = function() {
                        tab.sowing(i, j, 0);
                    }
                }      
                /*td.onclick = function() {
                    if (i == 0)
                        tab.sowing(i, j);
                    else    
                        tab.sowing(i, tab.nCav - 2 - j);
                }*/
            }
            if (i == 1) {
                const td = tr.insertCell();
                td.setAttribute("rowSpan", 2);
                td.style.border = "20px solid burlywood";
                td.style.backgroundColor = "chocolate";
                td.style.height = "200px";
                td.style.width = "100px";
                td.appendChild(makeSeeds(this.cavs[0][this.nCav - 1]));
            }   
        }

        body.appendChild(board);
    }

    sowing(side, cell, AI) {
        side = parseInt(side);
        let oSide = side;
        cell = parseInt(cell);
        var nSeeds = parseInt(this.cavs[side][cell]);
        if (nSeeds == 0) return;
        this.cavs[side][cell] = 0;

        while (nSeeds > 0) {
            cell++;

            if (cell == this.nCav) {
                cell %= this.nCav;
                side = (side + 1) % 2;
            }

            if (side != oSide && cell == this.nCav - 1) {
                cell = 0;
                side = (side + 1) % 2;
            }
            this.cavs[side][cell]++;
            nSeeds--;
        }

        if (oSide == side && this.cavs[side][cell] == 1 && cell != this.nCav - 1) {
            this.collect(side, cell);
        }

        let res = this.checkSides();

        if (res != -1)
            winMessage(res + 1);

        this.showTable();    
        if (res == -1) {
            if (!(oSide == side && cell == this.nCav - 1) && AI == 0) {
                const body = document.body;
                body.style.pointerEvents = "none";
                deleteMessage();
                setTimeout(function() {
                    tab.moveAI();
                    body.style.pointerEvents = "auto";
                    playAgainMessage();
                }, 1000);
            }

            if (oSide == side && cell == this.nCav && AI == 1) {
                const body = document.body;
                body.style.pointerEvents = "none";
                deleteMessage();
                setTimeout(function() {
                    tab.moveAI();
                    body.style.pointerEvents = "auto";
                    playAgainMessage();
                }, 1000);
            }
        }    
    }


    collect(side, cell) {
        let otherS = (side + 1) % 2;
        let otherC = this.nCav - 2 - cell;

        this.cavs[side][cell] = 0;
        this.cavs[side][this.nCav - 1] += 1 + parseInt(this.cavs[otherS][otherC]);
        this.cavs[otherS][otherC] = 0;
    }

    checkSides() {
        let sum = 0;
        for (let i = 0; i < this.nCav - 1; i++)
            sum += this.cavs[0][i];
        if (sum == 0)
            return this.finish(1);
        
        sum = 0;
        for (let i = 0; i < this.nCav - 1; i++)
            sum += this.cavs[1][i];
        if (sum == 0)
            return this.finish(0);

        return -1;
    }

    finish(side) {
        for (let i = 0; i < this.nCav - 1; i++) {
            this.cavs[side][this.nCav-1] += this.cavs[side][i];
            this.cavs[side][i] = 0;
        }    

        if (this.cavs[0][this.nCav-1] > this.cavs[1][this.nCav-1])
            return 0;
        else
            return 1;
    }
}

var tab;

function createTable() {

    deleteMessage();

    var select = document.getElementById("nCav");
    var nCav = select.value;
    var select2 = document.getElementById("nSeeds");
    var nSeeds = select2.value;
    var select3 = document.querySelector('.playerFirst').checked;

    tab = new Tabuleiro(nSeeds, nCav);
    tab.showTable();
    if (!select3) {
        setTimeout (function() {
            tab.moveAI();
            playAgainMessage();
        }, 1000);
    }
}

function myPopup() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

function displayScore(){
    var x = document.getElementById("scoreboard");
    x.style.display = x.style.display === "none" ? "block" : "none";
}

function makeSeeds(nSeeds){

    var element = document.createElement("div");
    for (let i = 0; i < nSeeds; i++) {
        var seed = document.createElement("div");
        var rand = Math.floor(Math.random() * 9) + 1;
        seed.style.width = "35px";
        seed.style.height = "15px";
        seed.style.borderRadius = "50%";
        seed.style.margin = rand.toString() + "px";
        seed.style.backgroundColor = "red";
        seed.style.display = "inline-block";
        element.appendChild(seed);
    }

    return element;
}

function heuristic(tabu) {
    let p1 = 0;
    let p2 = 0;

    for (let i = 0; i < tabu.nCav; i++) {
        p1 += tabu.cavs[0][i];
        p2 += tabu.cavs[1][i];
    }

    return p2 - p1;
}

function maxValue(tabu, depth) {
    let score = -1000000000;

    if (depth == 0) {
        return heuristic(tabu);
    }

    for (let i = 0; i < tabu.nCav - 1; i++) {
        var nt = new Tabuleiro(0, 0);
        nt.setAI(tabu);
        nt.sowingAI(1, nt.nCav - 2 - i);

        var s = minValue(nt, depth - 1);

        if (s > score) {
            score = s;
        }
    }

    return score;
}

function minValue(tabu, depth) {
    let score = 10000000000;

    if (depth == 0) {
        return heuristic(tabu);
    }

    for (let i = 0; i < tabu.nCav - 1; i++) {
        var nt = new Tabuleiro(0, 0);
        nt.setAI(tabu);
        nt.sowingAI(0, i);

        var s = maxValue(nt, depth - 1);

        if (s < score) {
            score = s;
        }
    }

    return score;
}

function minimax(tabu, depth) {
    let score = -1000000000;
    var move = -1;

    for (let i = 0; i < tabu.nCav - 1; i++) {
        var nt = new Tabuleiro(0, 0);
        nt.setAI(tabu);
        if (nt.cavs[1][i] == 0)
            continue;
        nt.sowingAI(1, nt.nCav - 2 - i);

        var s = minValue(nt, depth - 1);

        if (s > score || (s == score && nt.cavs[1][i] > nt.cavs[1][move])) {
            move = i;
            score = s;
        }
    }

    return move;
}
// ---------------------
// Pop-Ups
// ---------------------

//Config
var modalConfig = document.getElementById("my_modal_config");
var btnConfig = document.getElementById("my_btn_config");
var spanConfig = document.getElementsByClassName("close")[0];
btnConfig.onclick = function() {
    modalConfig.style.display = "block";
}
spanConfig.onclick = function() {
    modalConfig.style.display = "none";
}

//Login
var modalLogin = document.getElementById("my_modal_login");
var btnLogin = document.getElementById("my_btn_login");
var spanLogin = document.getElementsByClassName("close")[1];
btnLogin.onclick = function() {
    modalLogin.style.display = "block";
}
spanLogin.onclick = function() {
    modalLogin.style.display = "none";
}

//Rules
var modalRules = document.getElementById("my_modal_rules");
var btnRules = document.getElementById("my_btn_rules");
var spanRules = document.getElementsByClassName("close")[2];
btnRules.onclick = function() {
    modalRules.style.display = "block";
}
spanRules.onclick = function() {
    modalRules.style.display = "none";
}

//Score
var modalScore = document.getElementById("my_modal_score");
var btnScore = document.getElementById("my_btn_score");
var spanScore = document.getElementsByClassName("close")[3];
btnScore.onclick = function() {
    modalScore.style.display = "block";
}
spanScore.onclick = function() {
    modalScore.style.display = "none";
}

//Press anywhere to close popup
window.onclick = function(event) {
    if (event.target == modalConfig) {
        modalConfig.style.display = "none";
    }
    if (event.target == modalLogin) {
        modalLogin.style.display = "none";
    }
    if (event.target == modalRules) {
        modalRules.style.display = "none";
    }
    if (event.target == modalScore) {
        modalScore.style.display = "none";
    }
}

function playAgainMessage() {
    const last = document.body.lastChild;
    const mes = document.createElement("div");
    const phrase = document.createTextNode("YOUR TURN");
    mes.appendChild(phrase);
    mes.style.width = "100px";
    mes.style.height = "100px";
    mes.style.paddingTop = "55px";
    mes.style.textAlign = "center"
    mes.style.backgroundColor = "black";
    mes.style.border = "10px solid purple";
    mes.style.color = "white";
    mes.style.position = "relative";
    mes.style.float = "right";
    mes.style.top = "275px";
    mes.style.fontSize = "20px";
    mes.id = "mes";
    document.body.insertBefore(mes, last);
}

function deleteMessage() {
    const mes = document.getElementById("mes");
    if (mes != null)
        document.body.removeChild(mes);
}

function winMessage(player) {

    deleteMessage();

    const last = document.body.lastChild;
    const win = document.createElement("div");
    const phrase = document.createTextNode("Congratulations player " + player + " on your victory.")
    win.appendChild(phrase);
    win.style.cursor = "pointer";
    win.style.position = "absolute";
    win.style.width = "800px";
    win.style.height = "300px";
    win.style.backgroundColor = "gold";
    win.style.top = "400px";
    win.style.left = "175px";
    win.style.border = "10px solid goldenrod";
    win.style.fontSize = "100px";
    win.style.textAlign = "center";
    win.style.padding = "155px";
    win.id = "winner"
    win.onclick = function() {
       const winner = document.getElementById("winner");
       document.body.removeChild(winner);

    }
    document.body.insertBefore(win, last);

}
