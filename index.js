const botaoCadastre = document.querySelector('.botao-cadastre-se');
const botaoIrParaLogin = document.querySelector('.botao-ir-login');

botaoCadastre.onclick = function(){
    document.querySelector('.caixa-login').classList.add('oculto');
    document.querySelector('.caixa-register').classList.remove('oculto');
}
botaoIrParaLogin.onclick = function(){
    document.querySelector('.caixa-login').classList.remove('oculto');
    document.querySelector('.caixa-register').classList.add('oculto');
}
