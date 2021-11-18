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
                td.appendChild(document.createTextNode(this.cavs[1][this.nCav - 1]));
            }    
            for (let j = 0; j < this.nCav - 1; j++) {
                const td = tr.insertCell();
                td.style.border = "20px solid burlywood";
                td.style.backgroundColor = "chocolate";
                td.style.height = "200px";
                td.style.width = "100px";
                if (i == 1)
                    td.appendChild(document.createTextNode(this.cavs[i][this.nCav - 2 - j]));
                else
                    td.appendChild(document.createTextNode(this.cavs[i][j]));
                td.onclick = function() {
                    if (i == 0)
                        tab.sowing(i, j);
                    else    
                        tab.sowing(i, tab.nCav - 2 - j);
                }
            }
            if (i == 1) {
                const td = tr.insertCell();
                td.setAttribute("rowSpan", 2);
                td.style.border = "20px solid burlywood";
                td.style.backgroundColor = "chocolate";
                td.style.height = "200px";
                td.style.width = "100px";
                td.appendChild(document.createTextNode(this.cavs[0][this.nCav-1]));
            }   
        }

        body.appendChild(board);
    }

    sowing(side, cell) {
        side = parseInt(side);
        let oSide = side;
        cell = parseInt(cell);
        var nSeeds = parseInt(this.cavs[side][cell]);
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
            alert("Congrats player " + (res + 1) + " on your victory");

        this.showTable();
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
        for (let i = 0; i < this.nCav - 1; i++)
            this.cavs[side][this.nCav-1] += this.cavs[side][i];

        if (this.cavs[0][this.nCav-1] > this.cavs[1][this.nCav-1])
            return 0;
        else
            return 1;
    }
}

var tab;

function createTable() {
    var select = document.getElementById("nCav");
    var nCav = select.value;
    var select2 = document.getElementById("nSeeds");
    var nSeeds = select2.value;

    tab = new Tabuleiro(nSeeds, nCav);
    tab.showTable();
}

function myPopup() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}