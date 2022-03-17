if(window.innerWidth < 650) {
    document.querySelector('.total-faturas').innerText = `0 faturas`;
    document.querySelector('.botao-nova-fatura').innerHTML = '<img src="./imagens/icon+.png" class="icon-mais"> Nova';
    document.querySelector('.texto-filtro').innerHTML = 'Filtrar'
}

const userId = localStorage.getItem('userId')
console.log(userId)


// BUSCANDO INVOICES POR ID DO USUARIO
fetch(`https://chs-invoice-app-be.herokuapp.com/user/${userId}`)
.then(resposta => resposta.json()).then(resposta => {
    console.log(resposta)
})



const novaFatura = document.querySelector('.botao-nova-fatura')
const caixaNovaFatura = document.querySelector('.caixa-novo-invoice')
const fundoEscuto = document.querySelector('.fundo-escuro')
const botaoDescartarNovaFatura = document.querySelector('.descartar-invoice-novo')
const botaoSalvarNovaFatura = document.querySelector('.salvar-invoice-novo')
const inputNomeFaturaNova = document.querySelector('#nome-invoice-novo')
const inputValorFaturaNova = document.querySelector('#valor-invoice-novo')
const inputVencimentoFaturaNova = document.querySelector('#data-vencimento-novo')
const statusFaturaNova = document.querySelector('.status-novo-invoice')

novaFatura.onclick = function(){
    fundoEscuto.classList.remove('oculto')
    caixaNovaFatura.classList.remove('oculto')
}
botaoDescartarNovaFatura.onclick = function(){
    inputNomeFaturaNova.value = ""
    inputValorFaturaNova.value = ""
    inputVencimentoFaturaNova.value = ""
    statusFaturaNova.value = 'Pendente'
    fundoEscuto.classList.add('oculto')
    caixaNovaFatura.classList.add('oculto')
}
botaoSalvarNovaFatura.onclick = function(){
    if(inputNomeFaturaNova.value && inputValorFaturaNova.value && inputVencimentoFaturaNova.value){
        const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            fetch('https://chs-invoice-app-be.herokuapp.com/invoices', {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    userId: userId,
                    invoiceName: inputNomeFaturaNova.value,
                    invoiceValue: inputValorFaturaNova.value,
                    invoiceDate: inputVencimentoFaturaNova.value,
                    invoiceStatus: statusFaturaNova.value
                })
            }).then(resposta => resposta.json()).then(resposta => {
                console.log(resposta)
            })
    }
}


