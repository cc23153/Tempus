function verificarDados() {
    let pwd = window.document.querySelector("input#pwd").value
    let senhaConfirmada = window.document.querySelector("input#pwdConfirmada").value

    let res = window.document.querySelector("div#resposta")
    let resposta = ""

    if (senha != senhaConfirmada) {
        resposta = "[ERRO] O valor da senha confirmada é diferente da primeira senha."
    }
    
    res.innerHTML = resposta
}