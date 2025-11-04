function quantidade() {
    const mais = document.querySelector('.btn-mais');
    const quantidade = document.getElementById('quantidade');
    const menos = document.querySelector('.btn-menos');

    mais.addEventListener('click', () => {
        quantidade.value = parseInt(quantidade.value) + 1;
    });

    menos.addEventListener('click', () => {
        if (parseInt(quantidade.value) > parseInt(quantidade.min)) {
            quantidade.value = parseInt(quantidade.value) - 1;
        };

    });
};

quantidade();

function tamanho_roupa() {
    const botoes = document.querySelectorAll('.btn-p, .btn-m, .btn-g');

    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            // Remove a borda de todos
            botoes.forEach(b => b.style.border = 'none');
            // Adiciona a borda apenas no clicado
            botao.style.border = 'solid 2px white';
        });
    });
};

tamanho_roupa();


function animacao() {
    window.addEventListener('load', () => {
        const veja_mais = document.querySelector('.veja-mais');
        const desc = document.getElementById("nome");
        const preco = document.querySelector('.preco');
        const img = document.querySelector('.cargo-img');
        const btn_tamanho = document.querySelector('.tamanho-roupa');
        const inputs_quantidade = document.querySelector('.inputs-quantidade');
        const btn_carinho = document.querySelector('.carrinho-btn');
        const desc_completa = document.querySelector('.desc-completa');

        // Adicionar transições
        veja_mais.style.transition = '1s';
        desc.style.transition = '1s';
        preco.style.transition = '1s';
        img.style.transition = '0.7s';
        btn_tamanho.style.transition = '1s';
        inputs_quantidade.style.transition = '1s';
        btn_carinho.style.transition = '1s';
        desc_completa.style.transition = '1s';

        setTimeout(() => {
            veja_mais.style.marginLeft = '165px';
            preco.style.left = '52%';
            desc.style.left = '52%';
            img.style.opacity = '1';
            btn_tamanho.style.opacity = '1';
            inputs_quantidade.style.opacity = '1';
            btn_carinho.style.opacity = '1';
            desc_completa.style.marginLeft = '120px';
        }, 100);
    });
}

animacao();


