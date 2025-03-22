let placarplayer1 = document.getElementById("placarplayer1");
let placarplayer2 = document.getElementById("placarplayer2");
let nameplayer1 = document.getElementById("nameplayer1");
let nameplayer2 = document.getElementById("nameplayer2");
let ordemJogada = "nameplayer1";
let dificultGame = document.getElementById("dificultGame");
let insertNamePlayer1 = document.getElementById("insertNamePlayer1");
let insertNamePlayer2 = document.getElementById("insertNamePlayer2");
let estiloJogo;
let tabela = ["", "", "", "", "", "", "", "", ""];
let contadorplayer1 = 0;
let contadorplayer2 = 0;
let actualStyle = 'block';

nameplayer1.classList.add("selectionPlayer");

function reiniciarJogo(reset) {

    for (let i = 0; i < tabela.length; i++) {

        let tb = document.getElementById("tb" + i);

        tb.style.pointerEvents = "all";
        tb.innerHTML = "";
        tb.classList.remove("marcarO");
        tb.classList.remove("marcarX");
        tb.classList.remove("ganhou");

        ordemJogada = "nameplayer1";

        nameplayer1.classList.replace("noselectionPlayer", "selectionPlayer");
        nameplayer2.classList.replace("selectionPlayer", "noselectionPlayer");

    }
    if (reset == 1) {
        dificultGame.value = "";

        twoPlayers.checked = false;
        modopc.checked = false;

        contadorplayer1 = 0;
        contadorplayer2 = 0;

        placarplayer1.innerHTML = contadorplayer1;
        placarplayer2.innerHTML = contadorplayer2;

        nameplayer1.innerHTML = "Jogador 1";
        nameplayer2.innerHTML = "Jogador 2";
        ordemJogada = "nameplayer1";

        insertNamePlayer1.classList.replace("habilitado", "desabilitado");
        insertNamePlayer2.classList.replace("habilitado", "desabilitado");
        dificultGame.classList.replace("habilitado", "desabilitado");

        modal();
    }

    tabela.length = 0;
    tabela = ["", "", "", "", "", "", "", "", ""];
}

function marcar(vlr) {

    if (tabela[vlr] == "") {
        if (ordemJogada === "nameplayer1") {

            let campo = document.getElementById("tb" + vlr);
            campo.classList.add("marcarX");
            campo.innerHTML = "X";

            nameplayer1.classList.replace("selectionPlayer", "noselectionPlayer");
            nameplayer2.classList.add("selectionPlayer");

            tabela[vlr] = "X";
            verificar();
            if (estiloJogo == "two") {

                ordemJogada = "nameplayer2";

            } else {

                ordemJogada = "pc";

                setTimeout(function () {
                    jogadaPC(dificultGame.value);
                    nameplayer2.classList.replace("selectionPlayer", "noselectionPlayer");
                    nameplayer1.classList.add("selectionPlayer");
                    ordemJogada = "nameplayer1";
                }, 1000);
            }

        } else if (ordemJogada === "nameplayer2") {

            let campo = document.getElementById("tb" + vlr);
            campo.classList.add("marcarO");
            campo.innerHTML = "O";

            nameplayer2.classList.replace("selectionPlayer", "noselectionPlayer");
            nameplayer1.classList.add("selectionPlayer");

            tabela[vlr] = "O";

            ordemJogada = "nameplayer1";
            verificar();
        }

    }
}

function jogadaPC(vlrDificult) {
    if (vlrDificult == "Facil") {

        let casas = tabela;
        let casasVazias = [];

        // Filtrar apenas as casas que ainda estão vazias
        for (let i = 0; i < casas.length; i++) {
            if (casas[i] === "") {
                casasVazias.push(i);
            }
        }

        // Se ainda houver casas vazias, escolher uma aleatoriamente
        if (casasVazias.length > 0) {

            let escolha = casasVazias[Math.floor(Math.random() * casasVazias.length)];

            let campo = document.getElementById("tb" + escolha);
            campo.classList.add("marcarO");
            campo.innerHTML = "O";
            tabela[escolha] = "O";

        }

    } else if (vlrDificult == "Medio") {

        let casas = tabela;
        let casasVazias = [];

        // Filtrar apenas as casas que ainda estão vazias
        for (let i = 0; i < casas.length; i++) {
            if (casas[i] === "") {
                casasVazias.push(i);
            }
        }

        // Verificar se o jogador pode ganhar na próxima jogada
        let bloqueou = false;
        let combinacoesVitoria = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
            [0, 4, 8], [2, 4, 6] // Diagonais
        ];

        combinacoesVitoria.forEach(combinacao => {
            let [a, b, c] = combinacao;
            let valores = [casas[a], casas[b], casas[c]];

            // Se o jogador tem duas casas preenchidas e a outra está vazia, bloquear
            if (valores.filter(v => v === "X").length === 2 && valores.includes("") && bloqueou === false) {
                let indice = combinacao[valores.indexOf("")];
                bloqueou = true;

                let campo = document.getElementById("tb" + indice);
                campo.classList.add("marcarO");
                campo.innerHTML = "O";
                tabela[indice] = "O";
            }
        });


        // Se não bloqueou, jogar aleatório
        if (bloqueou === false && casasVazias.length > 0) {
            let escolha = casasVazias[Math.floor(Math.random() * casasVazias.length)];

            let campo = document.getElementById("tb" + escolha);
            campo.classList.add("marcarO");
            campo.innerHTML = "O";
            tabela[escolha] = "O";
        }

    } else if (vlrDificult == "Dificil") {
        let casas = tabela;
        let casasVazias = [];

        // Filtrar apenas as casas que ainda estão vazias
        for (let i = 0; i < casas.length; i++) {
            if (casas[i] === "") {
                casasVazias.push(i);
            }
        }

        // Verificar se o jogador pode ganhar na próxima jogada
        let bloqueou = false;
        let combinacoesVitoria = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
            [0, 4, 8], [2, 4, 6] // Diagonais
        ];

        combinacoesVitoria.forEach(combinacao => {
            let [a, b, c] = combinacao;
            let valores = [casas[a], casas[b], casas[c]];

            // Se o jogador tem duas casas preenchidas e a outra está vazia, bloquear
            if (valores.filter(v => v === "O").length === 2 && valores.includes("") && bloqueou === false) {
                let indice = combinacao[valores.indexOf("")];
                bloqueou = true;

                let campo = document.getElementById("tb" + indice);
                campo.classList.add("marcarO");
                campo.innerHTML = "O";
                tabela[indice] = "O";
            }
        });


        if (bloqueou === false) {

            combinacoesVitoria.forEach(combinacao => {
                let [a, b, c] = combinacao;
                let valores = [casas[a], casas[b], casas[c]];

                // Se o jogador tem duas casas preenchidas e a outra está vazia, bloquear
                if (valores.filter(v => v === "X").length === 2 && valores.includes("") && bloqueou === false) {
                    let indice = combinacao[valores.indexOf("")];
                    bloqueou = true;

                    let campo = document.getElementById("tb" + indice);
                    campo.classList.add("marcarO");
                    campo.innerHTML = "O";
                    tabela[indice] = "O";
                }
            });

        }

        // Se não bloqueou, jogar aleatório
        if (bloqueou === false && casasVazias.length > 0) {
            let escolha = casasVazias[Math.floor(Math.random() * casasVazias.length)];

            let campo = document.getElementById("tb" + escolha);
            campo.classList.add("marcarO");
            campo.innerHTML = "O";
            tabela[escolha] = "O";
        }
    }
    verificar();
}


function verificar() {
    let pos1, pos2, pos3;
    let finalizou = false;

    if (tabela[0] === tabela[1] && tabela[0] === tabela[2]) {

        if (tabela[0] == "X") {
            pos1 = 0; pos2 = 1; pos3 = 2; finalizou = true;
        } else if (tabela[0] == "O") {
            pos1 = 0; pos2 = 1; pos3 = 2; finalizou = true;
        }
    }
    if (tabela[0] === tabela[3] && tabela[0] === tabela[6]) {

        if (tabela[0] == "X") {
            pos1 = 0; pos2 = 3; pos3 = 6; finalizou = true;
        } else if (tabela[0] == "O") {
            pos1 = 0; pos2 = 3; pos3 = 6; finalizou = true;
        }

    }
    if (tabela[0] === tabela[4] && tabela[0] === tabela[8]) {

        if (tabela[0] == "X") {
            pos1 = 0; pos2 = 4; pos3 = 8; finalizou = true;
        } else if (tabela[0] == "O") {
            pos1 = 0; pos2 = 4; pos3 = 8; finalizou = true;
        }

    }
    if (tabela[0] === tabela[1] && tabela[0] === tabela[2]) {

        if (tabela[0] == "X") {
            pos1 = 0; pos2 = 1; pos3 = 2; finalizou = true;
        } else if (tabela[0] == "O") {
            pos1 = 0; pos2 = 1; pos3 = 2; finalizou = true;
        }

    }
    if (tabela[1] === tabela[4] && tabela[1] === tabela[7]) {

        if (tabela[1] == "X") {
            pos1 = 1; pos2 = 4; pos3 = 7; finalizou = true;
        } else if (tabela[1] == "O") {
            pos1 = 1; pos2 = 4; pos3 = 7; finalizou = true;
        }

    }
    if (tabela[2] === tabela[5] && tabela[2] === tabela[8]) {

        if (tabela[2] == "X") {
            pos1 = 2; pos2 = 5; pos3 = 8; finalizou = true;
        } else if (tabela[2] == "O") {
            pos1 = 2; pos2 = 5; pos3 = 8; finalizou = true;
        }

    }
    if (tabela[2] === tabela[4] && tabela[2] === tabela[6]) {

        if (tabela[2] == "X") {
            pos1 = 2; pos2 = 4; pos3 = 6; finalizou = true;
        } else if (tabela[2] == "O") {
            pos1 = 2; pos2 = 4; pos3 = 6; finalizou = true;
        }

    }
    if (tabela[3] === tabela[4] && tabela[3] === tabela[5]) {

        if (tabela[3] == "X") {
            pos1 = 3; pos2 = 4; pos3 = 5; finalizou = true;
        } else if (tabela[3] == "O") {
            pos1 = 3; pos2 = 4; pos3 = 5; finalizou = true;
        }

    }
    if (tabela[6] === tabela[7] && tabela[6] === tabela[8]) {

        if (tabela[6] == "X") {
            pos1 = 6; pos2 = 7; pos3 = 8; finalizou = true;
        } else if (tabela[6] == "O") {
            pos1 = 6; pos2 = 7; pos3 = 8; finalizou = true;
        }

    }

    if (finalizou === true) {

        if (tabela[pos1] == "X") {
            contadorplayer1++;
            placarplayer1.innerHTML = contadorplayer1;
        } else if (tabela[pos1] == "O") {
            contadorplayer2++;
            placarplayer2.innerHTML = contadorplayer2;
        }
        vencedor(pos1, pos2, pos3);
    }
    if (finalizou === false) {
        let deuVelha = true;
        for (let j = 0; j < tabela.length; j++) {
            if (tabela[j] == "") {
                deuVelha = false;
                return;
            }
        }
        if (deuVelha == true) {
            alert("Deu velha!");
            reiniciarJogo();
        }
    }

}

function vencedor(vlr1, vlr2, vlr3) {
    for (let i = 0; i < tabela.length; i++) {
        let tb = document.getElementById("tb" + i);
        tb.style.pointerEvents = "none";

        if (i == vlr1 || i == vlr2 || i == vlr3) {
            tb.classList.remove("marcarO");
            tb.classList.remove("marcarX");
            tb.classList.add("ganhou");
        }
    }

    setTimeout(function () {
        reiniciarJogo();
    }, 1000);

}

function modoGame(modo) {
    let twoPlayers = document.getElementById("twoPlayers");
    let modopc = document.getElementById("modopc");

    insertNamePlayer1.value = "";
    insertNamePlayer2.value = "";

    if (modo === "pc") {

        estiloJogo = "pc";
        insertNamePlayer1.classList.replace("desabilitado", "habilitado");
        insertNamePlayer2.classList.replace("habilitado", "desabilitado");
        dificultGame.classList.replace("desabilitado", "habilitado");
        return;
    }

    if (modo === "two") {

        estiloJogo = "two";
        insertNamePlayer1.focus();
        insertNamePlayer1.classList.replace("desabilitado", "habilitado");
        insertNamePlayer2.classList.replace("desabilitado", "habilitado");
        dificultGame.classList.replace("habilitado", "desabilitado");
        return;
    }
}

function jogar() {


    if (insertNamePlayer1.value != "" && insertNamePlayer2.value != "" && twoPlayers.checked == true) {

        nameplayer1.innerHTML = insertNamePlayer1.value;
        nameplayer2.innerHTML = insertNamePlayer2.value;
        insertNamePlayer1.value = "";
        insertNamePlayer2.value = "";
        modal();
    }

    if (insertNamePlayer1.value != "" && modopc.checked == true && dificultGame.value != "") {

        nameplayer1.innerHTML = insertNamePlayer1.value;
        nameplayer2.innerHTML = "PC (" + dificultGame.value + ")";
        insertNamePlayer1.value = "";
        insertNamePlayer2.value = "";
        modal();
    }
}


function modal() {
    const modal = document.querySelector(".modal");

    if (actualStyle === 'block') {
        modal.style.display = "none";
        actualStyle = modal.style.display;
    } else {
        modal.style.display = "block";
        actualStyle = modal.style.display;
    }
}