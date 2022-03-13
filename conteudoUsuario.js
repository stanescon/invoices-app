console.log(window.innerWidth)
if(window.innerWidth < 650) {
    document.querySelector('.total-faturas').innerText = `0 faturas`;
    document.querySelector('.botao-nova-fatura').innerHTML = '<img src="./imagens/icon+.png" class="icon-mais"> Nova';
    document.querySelector('.texto-filtro').innerHTML = 'Filtrar'
}