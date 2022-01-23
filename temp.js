class Tabuleiro2 {

    constructor(nSeeds, nCav, nick) {
        this.nCav = parseInt(nCav) + 1;

        this.cavs = new Array(2);

        this.player = nick;
        this.opponent;

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

    showTable(turn) {
        const body = document.body;
        const board = document.createElement("table");
        board.id = "board";
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
                    if (turn == this.player) {
                        td.onclick = function() {
                            notify(j);
                        }
                    }    
                }      
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

    updateBoard(data) {
        if (data["winner"] != null){
            if (data["winner"] == this.player) {
                
            }
        }
        let board = data["board"];
        let turn = board["turn"];
        let sides = board["sides"];
        if (this.opponent == null) {
            for (var side in sides) {
                if (side != this.player) {
                    this.opponent = side;
                }
            }
        }
        let player_side = sides[this.player];
        let player_store = player_side["store"];
        let player_pits = player_side["pits"];
        let opponent_side = sides[this.opponent];
        let opponent_store = opponent_side["store"];
        let opponent_pits = opponent_side["pits"];

        for (let i = 0; i < this.nCav; i++) {
            if (i == this.nCav - 1) {
                this.cavs[0][i] = player_store;
                this.cavs[1][i] = opponent_store;
            }
            this.cavs[0][i] = player_pits[i];
            this.cavs[1][i] = opponent_pits[i];
        }

        this.showTable(turn);
    }
}