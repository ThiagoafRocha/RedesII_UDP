var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var itera = 0
var modalCorpo = document.getElementById("modalCorpo");
var vImage = ['3p.jpg', 'bn.jpg', 'jm.jpg']
var vPdf = ['Porquinhos.pdf', 'Branca.pdf', 'JoaoMaria.pdf']
var vText = [
    'Os porquinhos saem da casa da mãe e cada um constrói sua casa e o lobo mau derruba a casa para tentar comê-los.',
    'A princesa vive na floresta com 7 anões e sua madrasta, fantasiada de bruxa, vende uma maçã envenenada que a faz dormir e ela só acorda com o beijo do príncipe.',
    'Dois irmão são abandonados na floresta e encontram um casa toda feita de doces onde tem uma bruxa e são presos.'
]

function get() {

    modal.style.display = "block";
}


span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function pdfR() {
    if (itera < 2) {
        itera = itera + 1
    } else {
        itera = 0
    }

    var img = document.getElementById("mudaimg");
    var resumo = document.getElementById("resumo");
    img.innerHTML = ""
    img.innerHTML = `<img class="imagePDF" src="/Interface/assets/${vImage[itera]}" alt="">`
    resumo.innerHTML = ""
    resumo.innerHTML = vText[itera]
}

function pdfL() {
    if (itera == 0) {
        itera = 2
    } else {
        itera = itera - 1
    }
    var img = document.getElementById("mudaimg");
    var resumo = document.getElementById("resumo");
    img.innerHTML = ""
    img.innerHTML = `<img class="imagePDF" src="/Interface/assets/${vImage[itera]}" alt="">`
    resumo.innerHTML = ""
    resumo.innerHTML = vText[itera]
}



function getPass() {
    var pass = document.getElementById("pass");
    if (pass.value == '123456') {
        modalCorpo.innerHTML = ""
        modalCorpo.innerHTML = `<button class="btnRed" onclick="resetC()">Download</button>`
    } else {
        pass.value = ""
        pass.placeholder = "Senha Incorreta"
        pass.focus()
    }
}

function resetC() {
    let local = `${vPdf[itera]}`
    var resultado = axios.get(`http://localhost:8080/download/${itera}`)
    return resultado.then(response => {
        console.log(response.data)
        modalCorpo.innerHTML = ""
        modalCorpo.innerHTML =
            `<div class="adjust">
                <span class="close">&times;</span>
                <label for="pass">Digite a senha:</label>
                <input id="pass" type="text">
                <button class="btnRed" onclick='getPass()'>Confirmar</button>
            </div>`
        
        window.open(local,'Download')

    }).catch(error => {
        console.log('deu erro' + error)
    });

}