function verificarDados() {
    let nome = window.document.querySelector("input#nome").value
    let nickname = window.document.querySelector("input#nickname").value
    let email = window.document.querySelector("input#email").value
    let senha = window.document.querySelector("input#senha").value
    let senhaConfirmada = window.document.querySelector("input#senhaConfirmada").value

    let res = window.document.querySelector("div#resposta")
    let resposta = ""

    if (senha != senhaConfirmada) {
        resposta = "[ERRO] O valor da senha confirmada é diferente da primeira senha."
    }

    if (nome.length > 64) {
        if (resposta == "") {
            resposta = "[ERRO] O nome digitado é grande demais."
        }
        else {
            resposta += "<br>[ERRO] O nome digitado é grande demais."
        }
    }

    if (nickname.length > 40) {
        if (resposta == "") {
            resposta = "[ERRO] O apelido digitado é grande demais."
        }
        else {
            resposta += "<br>[ERRO] O apelido digitado é grande demais."
        }
    }

    if (email.length > 256) {
        if (resposta == "") {
            resposta = "[ERRO] O e-mail digitado é grande demais."
        }
        else {
            resposta += "<br>[ERRO] O e-mail digitado é grande demais."
        }
    }

    if (nome == "") {
        if (resposta == "") {
            resposta = "[ERRO] É preciso preencher o campo do nome"
        }
        else {
            resposta += "<br>[ERRO] O nome digitado é grande demais."
        }
    }
    
    res.innerHTML = resposta
}