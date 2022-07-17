let player = true
var size = 0;
var step = 0;
var player1, player2
var gameHistory = new Array(OVuong), tomPlay = [], jerryPlay = []
function OVuong(x, y) {
    this.x = x;
    this.y = y
}

function renderGame(size) {
    var rend = "<table id = 'table_caro'>"
    for (let i = 0; i < size; i++) {
        rend += "<tr>" // them hamg
        for (let j = 0; j < size; j++) {
            rend += "<td  id = 'but" + i + "_" + j + "'><img src='.\\images\\square30x30.png' class='square' onclick = \"select(" + i + "," + j + ")\" style='display:block'></td>"
        }
        rend += "</tr>"
    }
    rend += "</table>"
    return rend
}
function playgame() {
    size = document.getElementById('size').value
    player1 = document.getElementById("player1").value
    player2 = document.getElementById('player2').value

    if (size < 10 || size > 24) {
        alert('Độ rộng bàn cờ từ 10*10 đến 24*24')
    } else {
        if (!player1 || !player2) {
            alert("Nhập đủ tên của player")
        }
        else {
            size = (parseInt(size) >= 10 && parseInt(size) <= 24) ? parseInt(size) : (parseInt(size) < 10 ? 10 : 24)
            document.getElementById('main').innerHTML = renderGame(size)
            document.body.style.cursor = './images/jerry30x30.png'
            document.getElementById('WELCOME').style.display = 'none'
            document.getElementById('on-game').style.display = 'block'
            document.getElementById('name1').innerHTML = player1
            document.getElementById('name2').innerHTML = player2
        }
    }
    setTimeout(() => {
        const squares = document.querySelectorAll(".square")
        let height = (window.innerHeight - 50)/size
        squares.forEach(square => {
            console.log(height)
            square.style.height = height + "px"
            square.style.width = height + "px"
        })
    }, 0);
}

function index2D(i, j) { /// dung mang 1 chieu nen dung ham nay de tinh ra toa do
    return i * size + j;
}
function countTic(player, arrow_i, arrow_j, i, j) {
    var result = 0
    if (player == true) {
        while (jerryPlay[index2D(i + arrow_i, j + arrow_j)] === true) {
            i += arrow_i;
            j += arrow_j;
            result++;
        }
    } else {
        while (tomPlay[index2D(i + arrow_i, j + arrow_j)] === true) {
            i += arrow_i;
            j += arrow_j;
            result++;
        }
    }
    return result
}
function highlight(player, arrow_i, arrow_j, i, j) {
    if (player == true) {
        while (jerryPlay[index2D(i + arrow_i, j + arrow_j)] === true) {
            i += arrow_i;
            j += arrow_j;
            document.getElementById('but' + i + '_' + j).innerHTML = "<td><img src='.\\images\\Highlightjerry30x30.png' class='square' style='display:block'></td>"
        }
        while (jerryPlay[index2D(i - arrow_i, j - arrow_j)] === true) {
            i -= arrow_i;
            j -= arrow_j;
            document.getElementById('but' + i + '_' + j).innerHTML = "<td><img src='.\\images\\Highlightjerry30x30.png' class='square' style='display:block'></td>"
        }
    } else {
        while (tomPlay[index2D(i + arrow_i, j + arrow_j)] === true) {
            i += arrow_i;
            j += arrow_j;
            document.getElementById('but' + i + '_' + j).innerHTML = "<td><img src='.\\images\\HighlightTom30x30.png' class='square' style='display:block'></td>"
        }
        while (tomPlay[index2D(i - arrow_i, j - arrow_j)] === true) {
            i -= arrow_i;
            j -= arrow_j;
            document.getElementById('but' + i + '_' + j).innerHTML = "<td><img src='.\\images\\HighlightTom30x30.png' class='square' style='display:block'></td>"
        }
    }
}
function checkWin(player, index_i, index_j) {
    if (countTic(player, -1, 0, index_i, index_j) + countTic(player, 1, 0, index_i, index_j) >= 4) {
        highlight(player, -1, 0, index_i, index_j)
        return true
    }
    if (countTic(player, -1, 1, index_i, index_j) + countTic(player, 1, -1, index_i, index_j) >= 4) {
        highlight(player, -1, 1, index_i, index_j)
        return true
    }
    if (countTic(player, 0, 1, index_i, index_j) + countTic(player, 0, -1, index_i, index_j) >= 4) {
        highlight(player, 0, 1, index_i, index_j)
        return true
    }
    if (countTic(player, 1, 1, index_i, index_j) + countTic(player, -1, -1, index_i, index_j) >= 4) {
        highlight(player, 1, 1, index_i, index_j)
        return true
    }
}

function select(selectRow, selectCol) {
    if (player == true) {
        document.getElementById('but' + selectRow + '_' + selectCol).innerHTML = "<td><img src='.\\images\\Highlightjerry30x30.png' class='square' style='display:block'></td>"
        document.getElementById('info-player2').innerHTML = '<h2 id="name2">' + player2 + '</h2> <img src=".\\images\\HighlightTom30x30.png" alt="" style="max-height: 30px">'
        document.getElementById('info-player1').innerHTML = '<h2 id="name1">' + player1 + '</h2> <img src=".\\images\\jerry30x30.png" alt=""  style="max-height: 30px">'
        if (gameHistory.length > 1)
            document.getElementById('but' + gameHistory[gameHistory.length - 1].x + '_' + gameHistory[gameHistory.length - 1].y).innerHTML = "<td><img src='.\\images\\Tom30x30.png'  class='square' style='display:block'></td>"

        jerryPlay[selectRow * size + selectCol] = true

        if (checkWin(player, selectRow, selectCol) == true) {
            document.getElementById('info-player1').innerHTML = '<h2 id="name1">' + player1 + '</h2> <img src=".\\images\\cup.png" alt=""  style="max-height: 30px">'
            document.getElementById('table_caro').style.pointerEvents = 'none';
            document.getElementById('btn_undo').style.pointerEvents = 'none';

        }
    }
    else {
        document.getElementById('but' + selectRow + '_' + selectCol).innerHTML = "<td><img src='.\\images\\HighlightTom30x30.png'  class='square'  style='display:block'></td>"
        document.getElementById('info-player2').innerHTML = '<h2 id="name2">' + player2 + '</h2> <img src=".\\images\\Tom30x30.png" alt=""  style="max-height: 30px">'
        document.getElementById('info-player1').innerHTML = '<h2 id="name1">' + player1 + '</h2> <img src=".\\images\\Highlightjerry30x30.png" alt=""  style="max-height: 30px">'
        document.getElementById('but' + gameHistory[gameHistory.length - 1].x + '_' + gameHistory[gameHistory.length - 1].y).innerHTML = "<td><img src='.\\images\\jerry30x30.png'  class='square' style='display:block'></td>"

        tomPlay[selectRow * size + selectCol] = true

        if (checkWin(player, selectRow, selectCol) == true) {
            document.getElementById('info-player2').innerHTML = '<h2 id="name2">' + player2 + '</h2> <img src=".\\images\\cup.png" alt=""  style="max-height: 30px">'
            document.getElementById('table_caro').style.pointerEvents = 'none';
            document.getElementById('btn_undo').style.pointerEvents = 'none';
        }
    }
    step++;
    setTimeout(() => {
        const squares = document.querySelectorAll(".square")
        let height =  (window.innerHeight - 50)/size
        squares.forEach(square => {
            square.style.height = height + "px"
            square.style.width = height + "px"
        })
    }, 0);

    if (step == size * size)
        alert("Hoà cờ")
    gameHistory.push(new OVuong(selectRow, selectCol))
    console.log(selectRow, selectCol, step)
    player = !player
}
function undo() {
    if (gameHistory.length > 1) {
        step--
        player = !player
        var oVuong = gameHistory[gameHistory.length - 1];
        gameHistory.pop()
        tomPlay[index2D(oVuong.x, oVuong.y)] = false
        jerryPlay[index2D(oVuong.x, oVuong.y)] = false
        document.getElementById('but' + oVuong.x + '_' + oVuong.y).innerHTML = "<td id = 'but" + oVuong.x + "_" + oVuong.y + "'><img src='.\\images\\square30x30.png'  class='square'  style='display:block' onclick = \"select(" + oVuong.x + "," + oVuong.y + ")\"></td>"

        if (player == true) {
            document.getElementById('info-player2').innerHTML = '<h2 id="name2">' + player2 + '</h2> <img src=".\\images\\Tom30x30.png" alt=""  style="max-height: 30px">'
            document.getElementById('info-player1').innerHTML = '<h2 id="name1">' + player1 + '</h2> <img src=".\\images\\Highlightjerry30x30.png" alt=""  style="max-height: 30px">'
        } else {
            document.getElementById('info-player2').innerHTML = '<h2 id="name2">' + player2 + '</h2> <img src=".\\images\\HighlightTom30x30.png" alt=""  style="max-height: 30px">'
            document.getElementById('info-player1').innerHTML = '<h2 id="name1">' + player1 + '</h2> <img src=".\\images\\jerry30x30.png" alt=""  style="max-height: 30px">'
        }

    }
}