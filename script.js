
/* =====================================
   1. LISTA DE MÚSICAS
===================================== */

const musicas = [
    {
        titulo: "Musica Boa",
        artista: "SESI Beats",
        arquivo: "musicas/musica.mp3",
        capa: "imagens/capa.jpg"
    },
    {
        titulo: "Minha Segunda Música",
        artista: "Meu Artista",
        arquivo: "musicas/musica2.mp3",
        capa: "imagens/capa2.jpg"
    },
    {
        titulo: "Minha Terceira Música",
        artista: "Meu Artista",
        arquivo: "musicas/musica3.mp3",
        capa: "imagens/capa3.jpg"
    }
];


/* =====================================
   2. SELECIONAR OS ELEMENTOS DO HTML
===================================== */

const audioPlayer = document.getElementById("audioPlayer");

const playButton = document.getElementById("playButton");

const previousButton = document.getElementById("previousButton");

const nextButton = document.getElementById("nextButton");

const progressBar = document.getElementById("progressBar");

const currentTime = document.getElementById("currentTime");

const duration = document.getElementById("duration");

const musicTitle = document.getElementById("musicTitle");

const artistName = document.getElementById("artistName");

const albumCover = document.getElementById("albumCover");

const status = document.getElementById("status");


/* =====================================
   3. VARIÁVEL DA MÚSICA ATUAL
===================================== */

let musicaAtual = 0;


/* =====================================
   4. CARREGAR UMA MÚSICA
===================================== */

function carregarMusica(indice) {

    const musica = musicas[indice];

    // Atualiza o nome da música
    musicTitle.textContent = musica.titulo;

    // Atualiza o nome do artista
    artistName.textContent = musica.artista;

    // Atualiza a capa do álbum
    albumCover.src = musica.capa;

    // Carrega o arquivo de áudio
    audioPlayer.src = musica.arquivo;

    // Reinicia a barra de progresso
    progressBar.value = 0;

    currentTime.textContent = "0:00";

    duration.textContent = "0:00";

    // Atualiza os controles
    atualizarBotao();

    status.textContent = "Pausado";
}


/* =====================================
   5. REPRODUZIR OU PAUSAR
===================================== */

function reproduzirMusica() {

    if (audioPlayer.paused) {

        audioPlayer.play()
            .then(() => {
                atualizarBotao();
            })
            .catch(() => {
                status.textContent = "Erro ao carregar";
                alert(
                    "Não foi possível reproduzir a música. " +
                    "Verifique se o arquivo existe na pasta musicas."
                );
            });

    } else {

        audioPlayer.pause();

        atualizarBotao();
    }
}


/* =====================================
   6. ATUALIZAR O BOTÃO PLAY/PAUSE
===================================== */

function atualizarBotao() {

    if (audioPlayer.paused) {

        playButton.textContent = "▶";

        playButton.setAttribute(
            "aria-label",
            "Reproduzir música"
        );

        status.textContent = "Pausado";

    } else {

        playButton.textContent = "Ⅱ";

        playButton.setAttribute(
            "aria-label",
            "Pausar música"
        );

        status.textContent = "Tocando";
    }
}


/* =====================================
   7. AVANÇAR PARA A PRÓXIMA MÚSICA
===================================== */

function proximaMusica() {

    musicaAtual++;

    // Volta para a primeira música ao chegar ao fim
    if (musicaAtual >= musicas.length) {
        musicaAtual = 0;
    }

    carregarMusica(musicaAtual);

    reproduzirMusica();
}


/* =====================================
   8. VOLTAR PARA A MÚSICA ANTERIOR
===================================== */

function musicaAnterior() {

    musicaAtual--;

    // Vai para a última música se estiver na primeira
    if (musicaAtual < 0) {
        musicaAtual = musicas.length - 1;
    }

    carregarMusica(musicaAtual);

    reproduzirMusica();
}


/* =====================================
   9. FORMATAR O TEMPO
===================================== */

function formatarTempo(tempo) {

    if (!Number.isFinite(tempo)) {
        return "0:00";
    }

    const minutos = Math.floor(tempo / 60);

    const segundos = Math.floor(tempo % 60);

    return minutos + ":" + String(segundos).padStart(2, "0");
}


/* =====================================
   10. ATUALIZAR A BARRA DE PROGRESSO
===================================== */

audioPlayer.addEventListener("timeupdate", () => {

    if (audioPlayer.duration) {

        const progresso =
            (audioPlayer.currentTime / audioPlayer.duration) * 100;

        progressBar.value = progresso;

        currentTime.textContent =
            formatarTempo(audioPlayer.currentTime);
    }

});


/* =====================================
   11. MOSTRAR A DURAÇÃO DA MÚSICA
===================================== */

audioPlayer.addEventListener("loadedmetadata", () => {

    duration.textContent =
        formatarTempo(audioPlayer.duration);

});


/* =====================================
   12. AVANÇAR OU RETROCEDER NA BARRA
===================================== */

progressBar.addEventListener("input", () => {

    if (Number.isFinite(audioPlayer.duration)) {

        const novoTempo =
            (Number(progressBar.value) / 100) * audioPlayer.duration;

        audioPlayer.currentTime = novoTempo;
    }

});


/* =====================================
   13. ATUALIZAR QUANDO PAUSAR OU TOCAR
===================================== */

audioPlayer.addEventListener("play", atualizarBotao);

audioPlayer.addEventListener("pause", atualizarBotao);


/* =====================================
   14. PASSAR PARA A PRÓXIMA AO TERMINAR
===================================== */

audioPlayer.addEventListener("ended", proximaMusica);


/* =====================================
   15. CONECTAR OS BOTÕES
===================================== */

playButton.addEventListener("click", reproduzirMusica);

nextButton.addEventListener("click", proximaMusica);

previousButton.addEventListener("click", musicaAnterior);


/* =====================================
   16. INICIAR O PLAYER
===================================== */

carregarMusica(musicaAtual);
