function add_carrinho() {
    const form = document.getElementById("meuform");
    if (!form) return;

    const botoes = document.querySelectorAll(".tamanho");
    let btn_tamanho = "";

    botoes.forEach(btn => {
        btn.addEventListener("click", () => {
            btn_tamanho = btn.innerText;
        });
    });

    const cont = document.getElementById("num");
    const btn_voltar = document.getElementById("voltar");

    // 🔹 Carrega o valor salvo do contador ao abrir a página
    document.addEventListener("DOMContentLoaded", () => {
        const valorSalvo = localStorage.getItem("contador");
        const valor = valorSalvo ? Number(valorSalvo) : 0;
        cont.innerText = valor;

        // Esconde o botão se o contador for 0
        if (valor === 0 && btn_voltar) {
            btn_voltar.style.display = "none";
        } else if (btn_voltar) {
            btn_voltar.style.display = "block";
        }
    });

    form.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nome = document.getElementById("nome").innerText;
        const quantidade = Number(document.getElementById("quantidade").value);
        const calca = document.getElementById("roupa").src;
        const preco = document.querySelector(".preco");

        let valor_produto = Number(preco.innerText.replace("R$", "").trim());

        // Atualiza contador
        let valor = Number(cont.innerText);
        valor = valor + quantidade;
        cont.innerText = valor;
        localStorage.setItem("contador", valor);

        // Mostra o botão se o contador for maior que 0
        if (btn_voltar) {
            btn_voltar.style.display = valor > 0 ? "block" : "none";
        }

        let valor_total = valor_produto * quantidade;
        let resultado = valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        // Cria o objeto do produto
        const produto = { btn_tamanho, nome, quantidade, calca, resultado };

        // Busca o carrinho salvo
        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        // Verifica se o produto já existe (mesma imagem)
        const produtoExistente = carrinho.find(item => item.calca === calca);

        if (produtoExistente) {
            produtoExistente.quantidade += quantidade;
            produtoExistente.resultado =
                Number(produtoExistente.resultado) + Number(resultado);
            preco.innerText = produtoExistente.resultado.toString();
        } else {
            carrinho.push(produto);
        }

        // Salva o carrinho atualizado
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
    });
}

add_carrinho();



function mostrar_carrinho() {
    const mostrar = document.getElementById("mostrar");
    if (!mostrar) return;

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    mostrar.innerHTML = "";

    carrinho.forEach((element, index) => {
        mostrar.innerHTML += `
        <div class="produtos">
            <p class="item-nome">Produto: ${element.nome}</p>
            <p class="item-quantidade">Quantidade: ${element.quantidade}</p>
            <p class="item-tamanho">Tamanho: ${element.btn_tamanho}</p>
            <img src="${element.calca}">
            <p>Total:${element.resultado}</p>
            <button class="btn-remove" data-index="${index}">Remover</button>
        </div>`;
    });

    const botoesRemover = document.querySelectorAll(".btn-remove");

    botoesRemover.forEach(botao => {
        botao.addEventListener("click", () => {
            const index = Number(botao.getAttribute("data-index"));

            // Remove o item do carrinho
            const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
            const itemRemovido = carrinho[index];
            carrinho.splice(index, 1);

            // Atualiza o localStorage
            localStorage.setItem("carrinho", JSON.stringify(carrinho));

            // Atualiza o contador de itens
            let contador = Number(localStorage.getItem("contador")) || 0;
            contador -= itemRemovido.quantidade;
            if (contador < 0) contador = 0;
            localStorage.setItem("contador", contador);

            // Atualiza o número na tela
            const cont = document.getElementById("num");
            if (cont) cont.innerText = contador;


            mostrar_carrinho();
        });
    });


    const soma_dos_valores = document.getElementById("valor");
    soma_dos_valores.innerHTML = "";

    // variável acumuladora da soma total
    let soma_total = 0;

    // percorre o carrinho e soma os valores
    carrinho.forEach(element => {
        let num_limpo = element.resultado.replace("R$", "").trim();
        num_limpo = num_limpo.replace(",", ".")
        soma_total += Number(num_limpo);



    });

    let soma_formatada = soma_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    soma_dos_valores.innerHTML = `
        <div class="div-total">
            <p class="total">Total:${soma_formatada}</p>
        </div>  
    `;




}

document.addEventListener("DOMContentLoaded", mostrar_carrinho);

mostrar_carrinho();

function limpar_carrinho() {
    const btn_limpar = document.getElementById("voltar");
    const add = document.getElementById("mostrar");

    const carrinho = JSON.parse(localStorage.getItem("carrinho"));

    btn_limpar.addEventListener('click', () => {
        window.confirm("Deseja Limpar o carrinho?")
        add.innerHTML = "";
        localStorage.removeItem("carrinho");
        const valorSalvo = localStorage.removeItem("contador");
        document.getElementById("num").innerText = "0";
    })

}

limpar_carrinho();

function finalizar_compra() {
    const finalizar_pedido = document.getElementById("finalizar");
    const add_compra = document.getElementById("mostrar");

    finalizar_pedido.addEventListener('click', () => {
        alert("Compra efetuada com sucesso, irá receber mais informções em seu e-mail")
        window.location.href = 'catalogo.html';
        add_compra.innerHTML = "";
        localStorage.removeItem("carrinho");
        const valorSalvo = localStorage.removeItem("contador");
        document.getElementById("num").innerText = "0";

    });

}
finalizar_compra();






