// Data alvo da Copa do Mundo de 2026
const dataAlvo = new Date(2026, 6, 11, 16, 0, 0).getTime(); 

const atualizaContagem = setInterval(function() {
    const agora = new Date().getTime();
    const diferenca = dataAlvo - agora;

    const d = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const h = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diferenca % (1000 * 60)) / 1000);

    
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
    const btnVejaMais = document.getElementById("btn-veja-mais-ganhadores");
    const blocosOcultos = [
        document.getElementById("card-ganhadores-3"),
        document.getElementById("card-ganhadores-4"),
        document.getElementById("card-ganhadores-5"),
        document.getElementById("card-ganhadores-6")
    ];
    const linhaDois = document.getElementById("card-ganhadores-2");

   
    blocosOcultos.forEach(bloco => {
        if (bloco) bloco.classList.add("hidden-card");
    });

    
    btnVejaMais.addEventListener("click", function() {
        
        const estaEscondido = blocosOcultos[0].classList.contains("hidden-card");

        if (estaEscondido) {
           
            blocosOcultos.forEach(bloco => {
                if (bloco) bloco.classList.remove("hidden-card");
            });
           
            linhaDois.style.borderBottom = "2px solid rgb(255, 255, 255)";
            
            
            btnVejaMais.innerText = "VEJA MENOS";
        } else {
           
            blocosOcultos.forEach(bloco => {
                if (bloco) bloco.classList.add("hidden-card");
            });
           
            linhaDois.style.borderBottom = "none";
            
            
            btnVejaMais.innerText = "VEJA MAIS";
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    
    const botoesGrupos = document.querySelectorAll(".btn-grupo");
    const conteudosGrupos = document.querySelectorAll(".conteudo-grupo");

    botoesGrupos.forEach(botao => {
        botao.addEventListener("click", function () {
            
            botoesGrupos.forEach(b => b.classList.remove("ativo-btn"));
            
            
            conteudosGrupos.forEach(c => c.classList.remove("ativo"));

            
            this.classList.add("ativo-btn");
            
            
            const grupoId = this.getAttribute("data-grupo");
            const grupoAlvo = document.getElementById(grupoId);
            
            if (grupoAlvo) {
                grupoAlvo.classList.add("ativo");
                
                
                const primeiroBotaoPais = grupoAlvo.querySelector(".btn-pais");
                if (primeiroBotaoPais) {
                    primeiroBotaoPais.click();
                }
            }
        });
    });

   
    const botoesPaises = document.querySelectorAll(".btn-pais");

    botoesPaises.forEach(botao => {
        botao.addEventListener("click", function () {
            const grupoPai = this.closest(".conteudo-grupo");
            
            
            grupoPai.querySelectorAll(".btn-pais").forEach(b => b.classList.remove("ativo-btn"));
            grupoPai.querySelectorAll(".conteudo-pais").forEach(c => c.classList.remove("ativo"));

           
            this.classList.add("ativo-btn");
            const paisId = this.getAttribute("data-pais");
            const paisAlvo = document.getElementById(paisId);
            
            if (paisAlvo) {
                paisAlvo.classList.add("ativo");
            }
        });
    });

   
    const grupoInicial = document.querySelector('.btn-grupo[data-grupo="grupo-b"]');
    if (grupoInicial) {
        grupoInicial.click();
    }

    
    const parametros = new URLSearchParams(window.location.search);
    const grupoSelecionado = parametros.get("grupo"); 

    console.log("URL lida com sucesso! O grupo identificado foi:", grupoSelecionado);

    if (grupoSelecionado) {
        const botaoFiltroAlvo = document.querySelector(`.btn-grupo[data-grupo="${grupoSelecionado}"]`);
        
        if (botaoFiltroAlvo) {
            console.log("Botão encontrado no HTML! Forçando o clique nele...");
            
           
            botoesGrupos.forEach(b => b.classList.remove("ativo-btn"));
            conteudosGrupos.forEach(c => c.classList.remove("ativo"));
            
           
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


const imgB = document.getElementById("img-grupo-b");
const imgC = document.getElementById("img-grupo-c");
const imgG = document.getElementById("img-grupo-g");


let indiceAtual = 0;


function alternarBrasoes() {
  
    indiceAtual = (indiceAtual + 1) % 4;

   
    imgB.src = imagensGrupoB[indiceAtual];
    imgC.src = imagensGrupoC[indiceAtual];
    imgG.src = imagensGrupoG[indiceAtual];
}


setInterval(alternarBrasoes, 3000);



const imagens = [
    "imagens/img-gerais/jogando-1.jpg",
    "imagens/img-gerais/jogando-2.jpg", 
    "imagens/img-gerais/jogando-3.jpg",
    "imagens/img-gerais/jogando-4.avif"
];


const imgElement = document.querySelector("#imagens-o-que-e-a-copa img");

let indexAtual = 0;
const tempoIntervalo = 4000; 

function trocarImagem() {
    
    imgElement.style.opacity = 5;

    setTimeout(() => {
       
        indexAtual = (indexAtual + 1) % imagens.length;
        
       
        imgElement.src = imagens[indexAtual];
        imgElement.alt = `jogadores-jogando-${indexAtual + 1}`;
        
      
        imgElement.style.opacity = 1;
    }, 500); 
}


setInterval(trocarImagem, tempoIntervalo);



const trilho = document.getElementById("imagens-patrocinadores");


const logosOriginais = trilho.innerHTML;

trilho.innerHTML = logosOriginais + logosOriginais;



document.addEventListener("DOMContentLoaded", () => {
    
   
    const cards = document.querySelectorAll('.cards-carrossel');
    const btnAnterior = document.getElementById('btn-anterior');
    const btnProximo = document.getElementById('btn-proximo');

    let cardAtualIndex = 0;

    function atualizarCarrossel(novoIndex) {
        
        cards[cardAtualIndex].classList.remove('active');
        
       
        cardAtualIndex = novoIndex;
        
       
        cards[cardAtualIndex].classList.add('active');
    }

    
    btnProximo.addEventListener('click', () => {
        let proximoIndex = (cardAtualIndex + 1) % cards.length;
        atualizarCarrossel(proximoIndex);
    });

   
    btnAnterior.addEventListener('click', () => {
        let anteriorIndex = (cardAtualIndex - 1 + cards.length) % cards.length;
        atualizarCarrossel(anteriorIndex);
    });

});