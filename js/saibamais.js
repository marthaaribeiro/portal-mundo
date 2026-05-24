// Data alvo da Copa do Mundo de 2026
const dataAlvo = new Date(2026, 6, 11, 16, 0, 0).getTime(); 

const atualizaContagem = setInterval(function() {
    const agora = new Date().getTime();
    const diferenca = dataAlvo - agora;

    const d = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const h = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diferenca % (1000 * 60)) / 1000);

    // Atualiza a tela usando seus novos IDs em minúsculo
    document.getElementById("dias").innerText = d.toString().padStart(2, '0');
    document.getElementById("horas").innerText = h.toString().padStart(2, '0');
    document.getElementById("minutos").innerText = m.toString().padStart(2, '0');
    document.getElementById("segundos").innerText = s.toString().padStart(2, '0');

    if (diferenca < 0) {
        clearInterval(atualizaContagem);
        document.getElementById("contagem-regressiva").innerHTML = "<p id='titulo-contagem'>A COPA JÁ COMEÇOU!</p>";
    }
}, 1000);


document.addEventListener("DOMContentLoaded", function() {
    // Seleciona o botão e todas as linhas do bloco 3 ao 6
    // Substitua a linha antiga que selecionava o botão por esta:
    const btnVejaMais = document.getElementById("btn-veja-mais-ganhadores");
    const blocosOcultos = [
        document.getElementById("card-ganhadores-3"),
        document.getElementById("card-ganhadores-4"),
        document.getElementById("card-ganhadores-5"),
        document.getElementById("card-ganhadores-6")
    ];
    const linhaDois = document.getElementById("card-ganhadores-2");

    // Configuração Inicial: Esconde as linhas extras assim que a página carrega
    blocosOcultos.forEach(bloco => {
        if (bloco) bloco.classList.add("hidden-card");
    });

    // Controla o clique do botão
    btnVejaMais.addEventListener("click", function() {
        // Verifica se a primeira linha oculta está escondida
        const estaEscondido = blocosOcultos[0].classList.contains("hidden-card");

        if (estaEscondido) {
            // Mostra todas as linhas guardadas
            blocosOcultos.forEach(bloco => {
                if (bloco) bloco.classList.remove("hidden-card");
            });
            // Devolve a borda divisória para a linha 2, já que agora tem conteúdo abaixo dela
            linhaDois.style.borderBottom = "2px solid rgb(255, 255, 255)";
            
            // Muda o texto do botão
            btnVejaMais.innerText = "VEJA MENOS";
        } else {
            // Esconde as linhas novamente
            blocosOcultos.forEach(bloco => {
                if (bloco) bloco.classList.add("hidden-card");
            });
            // Remove a borda da linha 2 para ficar idêntico ao design limpo original
            linhaDois.style.borderBottom = "none";
            
            // Retorna o texto original do botão
            btnVejaMais.innerText = "VEJA MAIS";
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    
    const botoesGrupos = document.querySelectorAll(".btn-grupo");
    const conteudosGrupos = document.querySelectorAll(".conteudo-grupo");

    botoesGrupos.forEach(botao => {
        botao.addEventListener("click", function () {
            // 1. Desmarca todos os botões de grupos
            botoesGrupos.forEach(b => b.classList.remove("ativo-btn"));
            
            // 2. Esconde TODOS os containers de grupos (isso vai sumir com as caixas extras)
            conteudosGrupos.forEach(c => c.classList.remove("ativo"));

            // 3. Ativa o botão clicado
            this.classList.add("ativo-btn");
            
            // 4. Mostra apenas o grupo correspondente
            const grupoId = this.getAttribute("data-grupo");
            const grupoAlvo = document.getElementById(grupoId);
            
            if (grupoAlvo) {
                grupoAlvo.classList.add("ativo");
                
                // 5. Clica automaticamente no primeiro país deste grupo selecionado
                const primeiroBotaoPais = grupoAlvo.querySelector(".btn-pais");
                if (primeiroBotaoPais) {
                    primeiroBotaoPais.click();
                }
            }
        });
    });

    // --- CONTROLE DOS PAÍSES INTERNOS ---
    const botoesPaises = document.querySelectorAll(".btn-pais");

    botoesPaises.forEach(botao => {
        botao.addEventListener("click", function () {
            const grupoPai = this.closest(".conteudo-grupo");
            
            // Limpa apenas os botões e países internos DESTE grupo
            grupoPai.querySelectorAll(".btn-pais").forEach(b => b.classList.remove("ativo-btn"));
            grupoPai.querySelectorAll(".conteudo-pais").forEach(c => c.classList.remove("ativo"));

            // Ativa o país atual
            this.classList.add("ativo-btn");
            const paisId = this.getAttribute("data-pais");
            const paisAlvo = document.getElementById(paisId);
            
            if (paisAlvo) {
                paisAlvo.classList.add("ativo");
            }
        });
    });

    // Inicializa abrindo o Grupo B
    const grupoInicial = document.querySelector('.btn-grupo[data-grupo="grupo-b"]');
    if (grupoInicial) {
        grupoInicial.click();
    }

    // --- 3. SISTEMA DE LEITURA DA URL (COM TESTE DE DIAGNÓSTICO) ---
    const parametros = new URLSearchParams(window.location.search);
    const grupoSelecionado = parametros.get("grupo"); 

    console.log("URL lida com sucesso! O grupo identificado foi:", grupoSelecionado);

    if (grupoSelecionado) {
        const botaoFiltroAlvo = document.querySelector(`.btn-grupo[data-grupo="${grupoSelecionado}"]`);
        
        if (botaoFiltroAlvo) {
            console.log("Botão encontrado no HTML! Forçando o clique nele...");
            
            // Força a remoção de qualquer classe ativa antiga antes de clicar
            botoesGrupos.forEach(b => b.classList.remove("ativo-btn"));
            conteudosGrupos.forEach(c => c.classList.remove("ativo"));
            
            // Executa o clique
            botaoFiltroAlvo.click();
        } else {
            console.log("Erro: O botão com data-grupo='" + grupoSelecionado + "' não existe no HTML.");
            abrirGrupoPadrao();
        }
    } else {
        console.log("Nenhum grupo veio na URL. Abrindo o padrão (Grupo B).");
        abrirGrupoPadrao();
    }

    function abrirGrupoPadrao() {
        const grupoInicial = document.querySelector('.btn-grupo[data-grupo="grupo-b"]');
        if (grupoInicial) {
            grupoInicial.click();
        }
    }
});

// 1. Listas com os caminhos das imagens para cada grupo (na ordem do texto)
const imagensGrupoB = [
    "../imagens/brasoes/brasao-canada-bw.jpeg",
    "../imagens/brasoes/brasao-bosnia.png",
    "../imagens/brasoes/brasao-catar.png",
    "../imagens/brasoes/brasao-suica.png"
];

const imagensGrupoC = [
    "../imagens/brasoes/brasao-brasil.png",
    "../imagens/brasoes/brasao-marrocos.png",
    "../imagens/brasoes/brasao-escocia.png",
    "../imagens/brasoes/brasao-haiti.png"
];

const imagensGrupoG = [
    "../imagens/brasoes/brasao-belgica.png",
    "../imagens/brasoes/brasao-egito.png",
    "../imagens/brasoes/brasao-ira.png",
    "../imagens/brasoes/brasao-nzelandia.png"
];

// 2. Selecionando os elementos de imagem do HTML através do ID
const imgB = document.getElementById("img-grupo-b");
const imgC = document.getElementById("img-grupo-c");
const imgG = document.getElementById("img-grupo-g");

// Variável para controlar qual país está ativo (0 a 3)
let indiceAtual = 0;

// 3. Função que faz a troca das imagens simultaneamente
function alternarBrasoes() {
    // Avança para o próximo índice. Se chegar ao fim (4), volta para o 0
    indiceAtual = (indiceAtual + 1) % 4;

    // Atualiza o atributo 'src' de cada imagem ao mesmo tempo
    imgB.src = imagensGrupoB[indiceAtual];
    imgC.src = imagensGrupoC[indiceAtual];
    imgG.src = imagensGrupoG[indiceAtual];
}

// 4. Dispara a função a cada 3000 milissegundos (3 segundos)
setInterval(alternarBrasoes, 3000);


// 1. Lista com o caminho das imagens que você quer alternar
const imagens = [
    "imagens/img-gerais/jogando-1.jpg",
    "imagens/img-gerais/jogando-2.jpg", // Substitua pelos seus caminhos reais
    "imagens/img-gerais/jogando-3.jpg",
    "imagens/img-gerais/jogando-4.avif"
];

// 2. Seleciona a tag <img> dentro da div correta
const imgElement = document.querySelector("#imagens-o-que-e-a-copa img");

let indexAtual = 0;
const tempoIntervalo = 4000; // Tempo em milissegundos (4 segundos)

function trocarImagem() {
    // Aplica um efeito de sumiço rápido antes de trocar a foto
    imgElement.style.opacity = 5;

    setTimeout(() => {
        // Avança para o próximo índice da lista (e volta ao zero quando chega no fim)
        indexAtual = (indexAtual + 1) % imagens.length;
        
        // Altera o atributo src e o alt da imagem
        imgElement.src = imagens[indexAtual];
        imgElement.alt = `jogadores-jogando-${indexAtual + 1}`;
        
        // Traz a imagem de volta com a nova foto
        imgElement.style.opacity = 1;
    }, 500); // Meio segundo esperando o fade-out acontecer
}

// Inicia o intervalo para rodar a função infinitamente
setInterval(trocarImagem, tempoIntervalo);


// Seleciona a div que contém as imagens
const trilho = document.getElementById("imagens-patrocinadores");

// Pega o HTML interno atual (todos os logos originais)
const logosOriginais = trilho.innerHTML;

// Duplica os logos dentro da mesma div
// Isso cria a ilusão de ótica necessária para o loop do CSS funcionar perfeitamente
trilho.innerHTML = logosOriginais + logosOriginais;