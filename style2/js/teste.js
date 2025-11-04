function mensagem_WhatsApp() {

    const btn_finalizar = document.getElementById("formulario");

    btn_finalizar.addEventListener('submit', function (evento) {
        evento.preventDefault()
        const nome_fomr = document.getElementById("nome").value;
        const assunto_fomr = document.getElementById("assunto").value;

        const numeroLoja = "5542999145187";

        nome_fomr.innerText = "";
        assunto_fomr.innerText = "";

        const mensagem = `Olá! Me chamo ${nome_fomr} Estou entrando em contato referente ao assunto: ${assunto_fomr}`;

        const link = `https://api.whatsapp.com/send?phone=${numeroLoja}&text=${encodeURIComponent(mensagem)}`;
        window.open(link, "_blank");
        window.location.href = "catalogo.html";
        

    });
    
};

mensagem_WhatsApp();    