const novaFatura = document.querySelector('.botao-nova-fatura');
const caixaNovaFatura = document.querySelector('.caixa-novo-invoice');
const fundoEscuto = document.querySelector('.fundo-escuro');
const botaoDescartarNovaFatura = document.querySelector('.descartar-invoice-novo');
const botaoSalvarNovaFatura = document.querySelector('.salvar-invoice-novo');
const inputNomeFaturaNova = document.querySelector('#nome-invoice-novo');
const inputValorFaturaNova = document.querySelector('#valor-invoice-novo');
const inputVencimentoFaturaNova = document.querySelector('#data-vencimento-novo');
const statusFaturaNova = document.querySelector('.status-novo-invoice');
const conteudoPrincipal = document.querySelector('.conteudo-principal');
const conteudoPrincipalVazio = document.querySelector('.conteudo-principal-vazio');
const botaoVoltar = document.querySelector('.botao-voltar');
const botaoDeletar = document.querySelector('.deletar-invoice');
const botaoEditar = document.querySelector('.editar-invoice');
const botaoMarcarPago = document.querySelector('.marcar-pago');
const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const userId = localStorage.getItem('userId');
let faturasSalvas = []
console.log(userId)

if(window.innerWidth < 650) {
    document.querySelector('.total-faturas').innerText = `0 faturas`;
    document.querySelector('.botao-nova-fatura').innerHTML = '<img src="./imagens/icon+.png" class="icon-mais"> Nova';
    document.querySelector('.texto-filtro').innerHTML = 'Filtrar'
}
function adcFatura (legenda, codigo, vencimento, nome, valor, status){
    const divNova = document.createElement("div");
    divNova.innerHTML = 
    `<p class="codigo-invoice">#${codigo}</p>
    <p class="vencimento-invoice">Vencimento: ${vencimento}</p>
    <p class="vencimento-invoice-tab">Venc.: ${vencimento}</p>
    <p class="nome-invoice">${nome}</p>
    <p class="valor-invoice">$ ${valor}</p>
    <div class="status-click">
        <p class="status-invoice ${(status.toLowerCase())}">${status}</p>
        <img src="./imagens/back.png" class="click-invoice" accesskey="${legenda}">
    </div>`
    divNova.classList.add('cartao-invoice');
    divNova.accessKey = legenda
    const divAtual = document.querySelector('.marcacao');
    conteudoPrincipal.insertBefore(divNova, divAtual);
    
    const click = divNova.children[5].children[1]
    const invoiceId = click.accessKey
    click.onclick = function(){
        mostrarFatura(invoiceId)
    }
}
function mostrarFatura (invoiceId){
    fetch(`https://chs-invoice-app-be.herokuapp.com/invoices/${invoiceId}`)
    .then(resposta => resposta.json()).then(resposta => {
        console.log(resposta)
        let arrDate = resposta.invoiceDate.split('-')
        let mes = meses[parseInt(arrDate[1], 10) - 1]
        let vencimento = `${arrDate[2]} ${mes} ${arrDate[0]}`
        let legenda = resposta.invoiceId
        let nome = resposta.invoiceName
        let valor = resposta.invoiceValue.toFixed(2)
        let status = resposta.invoiceStatus
        let arrCodigo = legenda.split("", 6)
        let codigo = ""
        for(let j=0; j < 6; j++){
            codigo = codigo + arrCodigo[j]
        }
        document.querySelector('#status-invoice-selecionado').innerHTML = status
        document.querySelector('.informacoes-do-invoice').innerHTML = 
       `<p class="codigo-invoice-selecionado">#${codigo}</p>
        <p class="nome-invoice-selecionado">${nome}</p>
        <p class="id-invoice-selecionado">ID: ${legenda}</p>
        <p class="vencimento-invoice-selecionado">Vencimento: ${vencimento}</p>
        <p class="valor-invoice-selecionado">Valor: $ ${valor}</p>`
        document.querySelector('.barra-de-tarefas-invoices-desktop').classList.remove('oculto')
        
        localStorage.setItem('invoiceIdSelect', legenda)
    })
}


// BUSCANDO INVOICES POR ID DO USUARIO
function carregarInvoicesCadastrados (userId){
    fetch(`https://chs-invoice-app-be.herokuapp.com/user/${userId}`)
    .then(resposta => resposta.json()).then(resposta => {
        console.log(resposta)
        document.querySelector('.total-faturas').innerHTML = `Existe um total de ${resposta.length} faturas`
        if(resposta.length > 0){
            for(let i=0; i < resposta.length; i++){
                let arrDate = resposta[i].invoiceDate.split('-')
                let mes = meses[parseInt(arrDate[1], 10) - 1]
                let vencimento = `${arrDate[2]} ${mes} ${arrDate[0]}`
                let legenda = resposta[i].invoiceId
                let nome = resposta[i].invoiceName
                let valor = resposta[i].invoiceValue.toFixed(2)
                let status = resposta[i].invoiceStatus
                let arrCodigo = legenda.split("", 6)
                let codigo = ""
                for(let j=0; j < 6; j++){
                    codigo = codigo + arrCodigo[j]
                }
                adcFatura (legenda, codigo, vencimento, nome, valor, status)
            }
        } else {
            conteudoPrincipal.classList.add('oculto');
            conteudoPrincipalVazio.classList.remove('oculto')
        }
    })
}

carregarInvoicesCadastrados(userId)

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
                let arrDate = resposta.invoiceDate.split('-')
                let mes = meses[parseInt(arrDate[1], 10) - 1]
                let vencimento = `${arrDate[2]} ${mes} ${arrDate[0]}`
                let legenda = resposta.invoiceId
                let nome = resposta.invoiceName
                let valor = resposta.invoiceValue.toFixed(2)
                let status = resposta.invoiceStatus
                let arrCodigo = legenda.split("", 6)
                let codigo = ""
                for(let j=0; j < 6; j++){
                    codigo = codigo + arrCodigo[j]
                }
                adcFatura (legenda, codigo, vencimento, nome, valor, status)

                inputNomeFaturaNova.value = ""
                inputValorFaturaNova.value = ""
                inputVencimentoFaturaNova.value = ""
                statusFaturaNova.value = 'Pendente'
                fundoEscuto.classList.add('oculto')
                caixaNovaFatura.classList.add('oculto')
            })
    }
    if(conteudoPrincipal.classList.contains('oculto')){
        conteudoPrincipalVazio.classList.add('oculto')
        conteudoPrincipal.classList.remove('oculto');
    }
}
botaoVoltar.onclick = function(){
    document.querySelector('.barra-de-tarefas-invoices-desktop').classList.add('oculto')
}
botaoDeletar.onclick = function(){
    console.log('teste')
    let invoiceId = localStorage.getItem('invoiceIdSelect')
    fetch(`https://chs-invoice-app-be.herokuapp.com/invoices/${invoiceId}`, {
        method: 'DELETE'
    }).finally(() => console.log('ok'))
}