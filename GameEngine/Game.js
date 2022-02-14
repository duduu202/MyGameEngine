//let handler; //Handler publico, mas deve ser declarado adequadamente no inciar, antes de tudo
var teste = false;
var mygame;
function iniciar(mygame){
    //handler = new Handler();

        
    iniciarGameEngine();
}


function  testeComunicacao(){
    
    //alert("entrou");
    //Handler.addObject(obj);
    
    mygame = new Game();
    inserirGame(mygame);
    testeBolas();
    
    
    testePlataformas(mygame);
    /*
    let obj1 = new Bola();
    obj1.setX(25);
    obj1.setY(getRandomNumber(-0, 800)/2);
    obj1.setVelX(getRandomNumber(-10, 10));
    obj1.setColidirTela(true);
    handler.addObject(obj1);
    */
    let obj1 = new Circulo();
    obj1.x = 200;
    obj1.y = 100;
    obj1.velX = 0;
    obj1.VelY = 0;
    obj1.setColidirTela(true);
    obj1.setCorpoFisico(true);
    obj1.setAfetadoPelaGravidade(true);
    obj1.setCorpoEstatico(false);
    obj1.setPegarComMouse(true);
    //handler.addObject(obj1);
    mygame.adicionarObjeto(obj1);
    /*
    let obj2 = new Bola();
    obj2.x = 300;
    obj2.y = 100;
    obj2.velX = 0;
    obj2.VelY = 0;
    obj2.setColidirTela(true);
    obj2.setCorpoFisico(true);
    obj2.setAfetadoPelaGravidade(true);
    obj2.setCorpoEstatico(false);
    obj2.setPegarComMouse(true);
    handler.addObject(obj2);
    */


    //obj1.mostrarHitbox();
    //obj1.mostrarHitbox();

    iniciar(mygame);

    //let obj = new Circulo();
    //alert("1."+testeGameEngine() +" 2."+ obj.testeGameObject() +" 3."+ testeGraphicsEngine());

    //addDiv("teste", "teste", getCircleCSS(), 100, 100);
    //  Os arquivos são todos inseridos no index.html, assim os arquivos ".js" tem acesso
    //a outros arquivos ".js"
    //  Se o caso fosse SOMENTE javascript, seria necessario usar recusos do node js para
    //importar classes ou funções

}

function loadHappyBird(){
    let obj1 = new Bird();
    obj1.x = 200;
    obj1.y = 100;
    obj1.velX = 0;
    obj1.VelY = 0;
    obj1.setColidirTela(true);
    obj1.setCorpoFisico(true);
    obj1.setAfetadoPelaGravidade(true);
    obj1.setCorpoEstatico(false);
    obj1.setPegarComMouse(true);
    mygame.adicionarObjeto(obj1);
}


function testeBolas(){
    for(let j = 0; j< 2; j++)
    for(let i = 0; i < 20; i++){
        let obj1 = new Circulo();
        obj1.x = i*25;
        obj1.y = (getNumeroAleatorio(-0, 800)/2);
        obj1.velX = (getNumeroAleatorio(-10, 10));
        obj1.setColidirTela(true);
        obj1.setPegarComMouse(true);
        mygame.adicionarObjeto(obj1);
    }
}

function testePlataformas(mygame){
    let obj1 = new Plataforma(800, 200);
    obj1.x = 25;
    obj1.y = 200;
    obj1.setCorpoEstatico(true);
    obj1.setCorpoFisico(true);
    obj1.setPegarComMouse(true);
    mygame.adicionarObjeto(obj1);

    /*
    let obj2 = new Plataforma(20, 20);
    obj2.x = 25;
    obj2.y = 200;
    obj2.setCorpoEstatico(false);
    obj2.setCorpoFisico(true);
    obj2.setPegarComMouse(true);
    handler.addObject(obj2);
    */

}
//testeComunicacao();

