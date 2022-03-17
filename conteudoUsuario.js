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
