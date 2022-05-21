
/*
CORRIGIR SEGUINTES PROBLEMAS:

-function intersects(circle, rect)????
  Só vou conseguir detectar colisão com formatos especificos? 
  circulos x circulos e 
  retangulos x retangulos e 
  circulos x retangulos?

Possivel solução:
+Criar hitbox personalizada dentro do GameObject usando xpoints e ypoints e usar funções de detecção de colisão
criado anteriormente no projeto java ? (Projeto SurvivalSpace) - Talvez  ((FEITO!))
    -Desvantagens dessa ideia:
      Péssima performace
    +Vantagens dessa ideia:
      Hitbox perfeita
    
      Edit:Para evitar uma performace ruim, a posição da hitbox só é atualizada quando ela for requisitada, sem a necessidade
      de um loop para atualizar tudo, abra o Matematica.js para mais informações

*/

let parar = false;
let iniciado = false;
let screenWidth = 1280;
let screenHeight = 650;
let mousePageX = 0; let corrigirX = 0;
let mousePageY = 0; let corrigirY = 0;
let mouseClientX = 0;
let mouseClientY = 0;
let velMouseX = 0.0;
let velMouseY = 0.0;
let mouseIsDown = false;
let pegouObjetoComMouseId;
let chaoAtrito = 0.6; //0.6 //1.0 = escorregar para sempre
let gravidade = 0.6;
let start;
let delay;

/**
 * @param {Game} game 
 */
var game;

class Game {
  handler;
  a;
  constructor() {
    this.handler = new Handler();
    //alert("Erro(GameEngine) - Essa classe não deve ser instanciada"); //Ou pode :)
  }
  adicionarObjeto(objeto) {
    this.handler.adicionarObjeto(objeto);
    carregarCssObjeto(objeto.getCSS(), objeto.id, objeto.NomeClasse);
    //alert(this.handler.objects.length);
    //alert(this.a);
  }
  removerObjeto(objeto) {
    var id = objeto.id_somente_numero;
    objeto.esconderHitbox();
    this.handler.removerObjeto(id);
    removerElementoPorId("GameObject_" + id);

  }
  printA() {
    //alert(this.a);
  }
  excluirTodosObjetos() {

    for (var i = 0; i < this.handler.objects.length; i++) {
      removerElementoPorId("GameObject_" + this.handler.objects[i].id_somente_numero);
    }
    this.handler.excluirTudo();

  }
  tick() {
  }
  draw() {
  }
}
function inserirGame(set) {
  //game = new Game();
  if (iniciado) {
    game.excluirTodosObjetos();
  }
  game = set;
}
/*
function reiniciarGame() {
  if (iniciado && game != undefined) {
    game.excluirTodosObjetos();
  }
}
*/
function iniciarGameEngine() {
  //alert("GameEngine iniciado");
  //adicionarWindow();
  if (game == undefined) {
    alert("ERRO(GameEngine) - game não definido");
    return 0;
  }

  if (!iniciado)
    GameLoop();

  iniciado = true;
}

var contarLoop = 0;
function GameLoop() {
  start = performance.now();
  if (!parar) {

    contarLoop++;
    //alert("GameLoop " + loopCount +" "+ parar);
    //this.handler.handlerTick();
    //tickEDraw();
    game.tick();
    game.handler.handlerTick();
    game.draw();
    game.handler.handlerDraw();

    delay = performance.now() - start;
    setTimeout(GameLoop, 16.7 - delay);

    velMouseX = 0;
    velMouseY = 0;
  }

}

function carregarScripts() {
  /*
    <script src="Game.js"></script>
    <script src="GraphicsEngine.js"></script>
    <script src="GameEngine.js"></script>
    <script src="GameObject.js"></script>
    <script src="Handler.js"></script>
    <script src="Objetos.js"></script>
    <script src="CollisionDetection.js"></script>
    <script src="Matematica.js"></script>
    <script src="Teclado.js"></script>
    */
  var d = document.getElementsByTagName('head')[0];

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '/GameEngine/Game.js';
  d.appendChild(script);

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '/GameEngine/GraphicsEngine.js';
  d.appendChild(script);

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '/GameEngine/GameObject.js';
  d.appendChild(script);

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '/GameEngine/Handler.js';
  d.appendChild(script);

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '/GameEngine/Objetos.js';
  d.appendChild(script);

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '/GameEngine/CollisionDetection.js';
  d.appendChild(script);

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '/GameEngine/Matematica.js';
  d.appendChild(script);

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '/GameEngine/Teclado.js';
  d.appendChild(script);
}

//Ex: A cada 20 ticks, boolean = true;
function trueCada(ticks) {
  var eDivisivel = contarLoop % ticks == 0;
  return eDivisivel;
}

function tickEDraw() {
  game.tick();
  game.handler.handlerTick();
  game.draw();
  game.handler.handlerDraw();
}
function getDelayForLoop() {
  return delay;
}

function foraTela(x, y) {
  if (x < 0) {
    return true;
  }
  if (x < screenWidth) {
    return true;
  }
  if (y < screenHeight) {
    return true;
  }
  if (y < 0) {
    return true;
  }

  return false;
}
/**
 * @param {GameObject} object 
 */

function aplicarFisicas(object) {
  var tempX = object.x, tempY = object.y;
  //tempX = object.getX();
  //tempY = object.getY();
  //object.x = 50;
  if (object.isPegarComMouse()) {
    pegarComMouse(object);
  }

  if (object.isCorpoFisico()) {
    if (object.isAfetadoPelaGravidade()) {
      object.velY = (object.velY + gravidade);
    }
    if(trueCada(1)){
      collide(object);
    }
  }

  if (!object.isCorpoEstatico()) {
    object.addX(object.velX);
    object.addY(object.velY);
  }

}
/**
 * @param {GameObject} object 
 */
function collide(object) {
  if (object.isColidirTela()){
    if(colideScreen(object)){
      verificarObjetoParado(object);
    }
  }
    
  if(aplicarColisaoEntreObjetos2(object)){
    verificarObjetoParado(object);
  }
}

//SEMPRE TRUE, pois esta com erro
var toleranciaObjetoParado = 0;
var toleranciaVelocidadeObjetoParado = 0.60000000001;
function verificarObjetoParado(object){

  return;
  if(object.getVelTotal() < toleranciaVelocidadeObjetoParado){
    console.log(object.getVelTotal());
    object.velX = 0;
    object.velY = 0;
    return;
  }

  if(diferenca(object.antigoY, object.y) < toleranciaObjetoParado){
    object.velY = object.velY *0.2;
    object.caindo = false;
  }
  else{
    object.caindo = true;
  }
  if(diferenca(object.antigoX, object.x) < toleranciaObjetoParado){
    object.velX = object.velX *0.2;
  }
  /*
  if (object.getVelTotal() < 1.0){ //Se ele ficar muito lento, ele ficará parado para sempre
    object.velX = 0;
    object.velY = 0;
    //object.caindo = false;
    console.log(object.getVelTotal());
  }
  else{
    //object.caindo = true;
  }
  
  //object.caindo = true;
  */
}

function colideScreen(object) {
  let colidiu = false;
  if (object.isCorpoEstatico())
    return false;

  if (object.x > screenWidth) {
    object.x = screenWidth;
    object.velX = (object.velX * -1 * object.elasticidade) * 0.8;
    colidiu = true;
  }
  if (object.x < 0) {
    object.x = 0;
    object.velX = (object.velX * -1 * object.elasticidade) * 0.8;
    colidiu = true;
  }
  if (object.y > screenHeight) {
    object.y = screenHeight;
    object.velY = (object.velY * -1 * object.elasticidade) * 0.8;
    object.velX = (object.velX * chaoAtrito) * 0.8;
    colidiu = true;
  }
  if (object.y < 0) {
    object.y = 0;
    object.velY = (object.velY * -1 * object.elasticidade) * 0.8;
    colidiu = true;
    //object.setVelX(object.getVelX()*chaoAtrito);
  }

  //TESTE
  //if(object.getId() == 1){

  return colidiu;


}
/**
 * @param {array} objects
 * @param {GameObject} object
 */
function aplicarColisaoEntreObjetos2(object) {
  //detectarColisaoPoligonos
  //Problema: verificações desnecessárias.
  //Se um objetoA colidir com um objetoB, não precisa verificar a colisão de objetoB com A,
  //pois essa verificação ja foi feita
  let colidiu = false;
  let objects = game.handler.getTodosObjetos();
  for (var i = 0; i < objects.length; i++) {
    if (objects[i].getId() !== object.getId()) {

      //for(var j = 0; j<objects.length; j++){
      if (detectarColisaoPoligonos(object.getVertices(), objects[i].getVertices())) {

        object.colididoCom(objects[i]);
        colidiu = true;
      }
      //}
    }
  }
  return colidiu;
}
function corrigirColisao() {
  //object.setVelX(object.getVelX*-1);
  //object.setVelY(object.getVelY*-1);
  //object.setVelY(0);
  //object.setVelX(0);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //object.x = object.antigoX;
  //object.y = object.antigoY;

  /*
  console.log("-");
  console.log(Math.cos(anguloLinha2Colidida));
  console.log(Math.sin(anguloLinha2Colidida));
  console.log("-");
  */
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Por que o angulo ta errado? (Na verdade a aplicação esta errada, o angulo acho que ta certo)
  /*
  var v = direcao(object.x, object.y, objects[i].x, objects[i].y);
  temptest2 = v.x
  temptest3 = v.y;
  */
  var tempVelX = object.getVelTotal() * Math.cos(anguloLinha2Colidida);
  var tempVelY = object.getVelTotal() * Math.sin(anguloLinha2Colidida);
  object.velX = tempVelX * 0;
  object.velY = tempVelY;
  //objects[i].atrito.velX += object.velY;
  //objects[i].atrito.velX += object.velX;



  //object.velY = (object.velY * -1 * object.elasticidade);
  //object.velX = (object.velX * objects[i].atrito);
}
/**
 * @param {GameObject} object 
 */
function pegarComMouse(object) {
  //if(!object.isPegarComMouse())
  //  return;
  if (!mouseIsDown)
    pegouObjetoComMouseId = 0;

  if (object.getId() == pegouObjetoComMouseId) {
    //object.x = (mousePageX) - object.x;
    //object.y = (mousePageY) - object.y;

    object.x = mousePageX;
    object.y = mousePageY;

    //object.addX(velMouseX);
    //object.addY(velMouseY);
    object.velX = velMouseX; object.velY = velMouseY;

  }
  else if (pegouObjetoComMouseId == 0 && (mouseIsDown && object.isCollided(mousePageX, mousePageY))) {
    //object.addX(velMouseX);
    //object.addY(velMouseY);
    //object.setVelX(velMouseX);object.setVelY(velMouseY);
    object.mostrarHitbox();
    pegouObjetoComMouseId = object.getId();
    object.caindo = true;
  }
  else {
    object.esconderHitbox();
  }

}
/*
function getMousePageX() {
  return pageX;
}
function getMousePageY() {
  return pageY;
}
function getMouseClientX() {
  return clientX;
}
function getMouseClientY() {
  return clientY;
}
*/


function setParar(bool) {
  if (parar != bool) {
    parar = bool;
    GameLoop();
  }
}

function getNumeroAleatorio(min, max) {
  return ((Math.random() * (max - min)) + min);
}

//// Ferramentas ////

function testeGameEngine() {
  //alert("testeGameEngine funcionou");
  let b = new Circulo();
  if (b.teste())
    return "teste-GameEngine-funcionou";
  else {
    return "teste-GameEngine-ERRO";
  }
}

(function () {
  tela(1, 1, 0, 0);
})();
function tela(proporcaoX, proporcaoY, posicaoX, posicaoY) {
  corrigirX = posicaoX;

  var css = `
  #content
      *{
          margin-left:`+ posicaoX + `px !important;
      }
  `;

  carregarCss(css);
}

//// Event Listeners ////
window.addEventListener('mousedown', function () {
  mouseIsDown = true;
  setTimeout(function () {
    if (mouseIsDown) {
      // mouse was held down for > 2 seconds
      //alert("teste mouse down");
    }
  }, 2000);
});

window.addEventListener('mouseup', function () {
  mouseIsDown = false;
});

var tempo;
function mouseParou() {
  velMouseX = 0;
  velMouseY = 0;
}
window.addEventListener("mousemove", function () {
  clearTimeout(tempo);
  tempo = setTimeout(mouseParou, 50);
});


(function () {
  document.onmousemove = handleMouseMove;
  document.onmouse
  function handleMouseMove(event) {
    var eventDoc, doc, body;

    event = event || window.event; // IE-ism

    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
      eventDoc = (event.target && event.target.ownerDocument) || document;
      doc = eventDoc.documentElement;
      body = eventDoc.body;

      event.pageX = event.clientX +
        (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
        (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = event.clientY +
        (doc && doc.scrollTop || body && body.scrollTop || 0) -
        (doc && doc.clientTop || body && body.clientTop || 0);
    }

    // Use event.pageX / event.pageY here
    velMouseX = event.clientX - mouseClientX - corrigirX;
    velMouseY = event.clientY - mouseClientY - corrigirY;
    mousePageX = event.pageX - corrigirX;
    mousePageY = event.pageY - corrigirY;
    mouseClientX = event.clientX - corrigirX;
    mouseClientY = event.clientY - corrigirY;

    /*
    if(mouseIsDown){
      var x = event.clientX-10;
      var y = event.clientY-10;
      var ball = document.querySelector(".ball");
      ball.style.position = "absolute";
      ball.style.left = `${x}px`;
      ball.style.top = `${y}px`;
    }
    */
  }
})();








