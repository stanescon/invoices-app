const botaoCadastre = document.querySelector('.botao-cadastre-se');
const botaoIrParaLogin = document.querySelector('.botao-ir-login');
const botaoCadastrar = document.querySelector('.botao-cadastrar')
const botaoLogar = document.querySelector('.botao-logar');

botaoCadastre.onclick = function(){
    document.querySelector('.caixa-login').classList.add('oculto');
    document.querySelector('.caixa-register').classList.remove('oculto');
}
botaoIrParaLogin.onclick = function(){
    document.querySelector('.caixa-login').classList.remove('oculto');
    document.querySelector('.caixa-register').classList.add('oculto');
}

const nomeSobrenome = document.querySelector('#nome-cadastro');
const usuarioCadastro = document.querySelector('#usuario-cadastro');
const senhaCadastro = document.querySelector('#senha-cadastro');
const emailCadastro = document.querySelector('#email-cadastro');

botaoCadastrar.onclick = function(){
    if(nomeSobrenome.value && usuarioCadastro.value && senhaCadastro.value && emailCadastro.value){
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        fetch('https://chs-invoice-app-be.herokuapp.com/users', {
            headers,
            method: 'POST',
            body: JSON.stringify({
                fullName: nomeSobrenome.value,
                nickname: usuarioCadastro.value,
                email:emailCadastro.value,
                password:senhaCadastro.value
            })
        }).then(resposta => resposta.json()).then(resposta => {
            localStorage.setItem('user', JSON.stringify(resposta));
            window.location.href = './conteudo-usuario.html';
        });
    }
}

botaoLogar.onclick = function(){
    fetch('https://chs-invoice-app-be.herokuapp.com/users')
    .then(resposta => resposta.json()).then(resposta => {
        console.log(resposta)
    })
}



