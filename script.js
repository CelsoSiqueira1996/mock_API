const containerVideos = document.querySelector('.videos__container');
const btnCategorias = document.querySelectorAll('.superior__item');
const barraDePesquisa = document.querySelector('.pesquisar__input');
let liVideos = [];

async function buscarEMostrarVideos() {
    try {
        const busca = await fetch('http://localhost:3000/videos');
        const videos = await busca.json();
        videos.forEach((video) => {
            if(video.categoria === '') {
                throw new Error('Vídeo não tem categoria');
            }
            containerVideos.innerHTML += `
            <li class="videos__item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                    <p class="categoria" hidden>${video.categoria}</p>
                </div>
            </li>
            `; 
        })
        liVideos = document.querySelectorAll('.videos__item');
    } catch(error) {
        containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error}</p>`;
    }
}

function filtrarPesquisa() {
    let valorFiltro = barraDePesquisa.value.toLowerCase();
    liVideos.forEach((liVideo) => {
        let titulo = liVideo.querySelector('.titulo-video').textContent.toLowerCase();
        liVideo.style.display = titulo.includes(valorFiltro)? 'block' : 'none';
    })
}

function filtrarPorCategoria(filtro) {
    liVideos.forEach((liVideo) => {
        let categoria = liVideo.querySelector('.categoria').textContent.toLowerCase();
        liVideo.style.display = filtro !== 'tudo'? categoria === filtro? 'block' : 'none' : 'block';
    })
}

barraDePesquisa.addEventListener('input', filtrarPesquisa);

btnCategorias.forEach((botao) => {
    let nomeCategoria = botao.getAttribute('name').toLowerCase();
    botao.addEventListener('click', () => filtrarPorCategoria(nomeCategoria))
})

buscarEMostrarVideos();

