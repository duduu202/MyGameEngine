(function(){
    var html = '<div class="Menu">'+
    '<a href="index.html">'+
    '    <logoENome>'+
    '        <img src="img/logo.png" alt="logo" width="30" height="30"> <!--Inserir logo aqui-->'+
    '        <nomeEmpresa>WebCars</nomeEmpresa>'+
    '    </logoENome>'+
    '</a>'+
    '<ul>'+
    '    <li><a href="index.html">Início</a></li>'+
    '    <li><a href="#">Item 2</a></li>'+
    '    <li><a href="#">Item 3</a></li>'+
    '    <div class="Autenticar">'+
    '        <li><a href="login.html">Login</a></li>'+
    '        <li><a href="Cadastrar.html">Cadastrar</a></li>'+
    '        <li><a href="Teste.html">Teste</a></li>'+
    '    </div>'+
    '</ul>'+
'</div>';

    addDiv("teste",undefined,undefined,undefined,undefined,html);
})();