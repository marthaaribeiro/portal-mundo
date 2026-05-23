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
});