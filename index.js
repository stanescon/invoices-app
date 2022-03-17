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
            console.log(resposta)
            if(resposta.errorId && resposta.errorId === 301){
                alert('O nome de usuario já existe')
            } else if(resposta.errorId && resposta.errorId === 201){
                alert('O e-mail já foi cadastrado')
            } else if(resposta.fullName){
                alert('Seu cadastro foi criado com sucesso');
                document.querySelector('.caixa-register').classList.add('oculto');
                document.querySelector('.caixa-login').classList.remove('oculto');
            }                        
        });
    }
}

const usuario = document.querySelector('#usuario');
const senha = document.querySelector('#senha')


fetch('https://chs-invoice-app-be.herokuapp.com/users').then(resposta => resposta.json()).then(resposta =>
console.log(resposta))



botaoLogar.onclick = function(){
    console.log(usuario.value, senha.value)
    if(usuario.value && senha.value){
        const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            fetch('https://chs-invoice-app-be.herokuapp.com/login', {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    nickname: usuario.value,
                    password: senha.value
                })
            }).then(resposta => resposta.json()).then(resposta => {
                console.log(resposta)
                if(resposta.userId){
                    localStorage.setItem('userId', resposta.userId)
                } else if(resposta.errorId && resposta.errorId === 201){
                    alert('Usuario e/ou senha icorreto/s')
                }         
            });
    }
}



