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
    const btnVejaMais = document.getElementById("btn-veja-mais");
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