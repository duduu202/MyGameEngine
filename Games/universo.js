let G = (6.67428* Math.pow(10, -11)); //*1000000000000;
let delta = 1;
const modoOtimizado = true;
let universo = undefined;

class Universo extends Game {
    tick(){
        this.cadaGravidade(this.handler.getTodosObjetos());
        
    }

    cadaGravidade(objects) {
        var x1=0, y1=0, x2=0, y2=0, mass1=0, mass2=0;
        //double objx = 0, objy = 0, m2 = 0;
        //Seleção dos corpos
        
        for (var i = 0; i < objects.length; i++) {
            x1 = objects[i].x;
            y1 = objects[i].y;
            mass1 = objects[i].massa;
    
            //Não podemos calcular a gravidade do mesmo corpo, logo: i+1
            for (var j = 1 + i; j < objects.length; j++) {
                    x2 = objects[j].x;
                    y2 = objects[j].y;
                    mass2 = objects[j].massa;
    
                    //Teorema de Pitagoras para calcular a distância
                    var differenceX = x2 - x1;
                    var differenceY = y2 - y1;
                    var distance = (differenceX * differenceX) + (differenceY * differenceY);
                    distance = Math.sqrt(distance);
    
                    //distancia *= 100;
    
                    //std::cout << distancia <<" " << i << j << "\n";
    
                    //OTIMIZAÇÃO temporaria e errada, pois corpos gigantes tem alcance maior de gravidade
                    if (distance > 5){ //&& distancia < 75000) { //0.02
                           
                        //Newton's Law of Universal Gravitation
                        
                        var F = ((G * mass1 * mass2) / Math.pow(distance, 2));
                        
                        //Algulo em radianos
                        var radiansAngle = Math.atan2(differenceY, differenceX);
    
                        var divForX = Math.cos(radiansAngle); //Força dividida de acordo com o coseno
                        var divForY = Math.sin(radiansAngle); //Força dividida de acordo com o seno
    
                        objects[i].velX += ((divForX * F) / Math.pow(mass1, 2) * 2) * deltaTime;
                        objects[i].velY += ((divForY * F) / Math.pow(mass1, 2) * 2) * deltaTime;
                        
                        //Mesma força para ambos dos corpos :)
                        objects[j].velX += ((divForX * F) / Math.pow(mass2, 2) * 2)*-1 * deltaTime;
                        objects[j].velY += ((divForY * F) / Math.pow(mass2, 2) * 2)*-1 * deltaTime;
                    }
                    
                    if(trueCada(10) && !modoOtimizado){

                    
                    //CORES (de acordo com a sua velocidade)
                    var vxc = objects[i].velX;
                    var vyc = objects[i].velY;

                    if (vxc < 0)
                        vxc = vxc * -1;
                    if (vyc < 0)
                        vyc = vyc * -1;

                    var media = (vxc + vyc) / 2;

                    var corR = media * 50;
                    var corG = media * 10;//media*1;
                    var corB = media * 5;//media*1;
                    
                    objects[i].cor = "rgb("+corR+","+corG+"," +corB+")";
                    atualizarCssCor(objects[i].getId(), objects[i].cor);

                    /////////2
                    vxc = objects[j].velX;
                    vyc = objects[j].velY;

                    if (vxc < 0)
                        vxc = vxc * -1;
                    if (vyc < 0)
                        vyc = vyc * -1;

                    media = (vxc + vyc) / 2;

                    var corR2 = media * 50;
                    var corG2 = media * 10;//media*1;
                    var corB2 = media * 5;//media*1;

                    objects[j].cor = "rgb("+corR2+","+corG2+"," +corB2+")";
                    atualizarCssCor(objects[j].getId(), objects[i].cor);
                    }

            }
        }
    }

    zerarVelocidade(){
        var objetos = this.handler.getTodosObjetos();
        for (var i = 0; i < objetos.length; i++) {
            objetos[i].velX = 0;
            objetos[i].velY = 0;
        }
    }
    diminuirVelocidade(){
        var objetos = this.handler.getTodosObjetos();
        for (var i = 0; i < objetos.length; i++) {
            objetos[i].velX = objetos[i].velX/2;
            objetos[i].velY = objetos[i].velY/2;
        }
    }
}


class CorpoCeleste extends GameObject{
    constructor(){
        super("gPlaneta");
        this.raio = 0;
        this.setRaio(10);
        this.x = 0.0;
        this.y = 0.0;
        this.velY = 0;
        this.velX = 0;
        this.massa = 1;
        this.cor = "rgb("+getNumeroAleatorio(50, 255)+","+getNumeroAleatorio(50, 255)+"," +getNumeroAleatorio(50, 255)+")";
        this.elasticidade = 0.6;
        this.atrito = 0.5;
        this.setCorpoEstatico(false);
        //this.setPegarComMouse(true);
        this.setCorpoFisico(true);
        this.setAfetadoPelaGravidade(true);
        this.criarCSS();

        //criar vertices do hitbox

        //console.log(this.getVertices().printArray());
    }
    setRaio(r){
        this.raio = r;
        var vertices = fazerCirculo(this.raio, 8); //25 maximo estável
        this.setVertices(vertices);
    }
    criarCSS() {
        this.css = `
        {
            height: `+ this.raio + `px;
            width: `+ this.raio + `px;
            background-color: `+ this.cor + `;
            border-radius: 50%;
            display: inline-block;
            position: absolute;
            margin-top: -`+ this.raio / 2 + `px;
            margin-bottom: -`+ this.raio / 2 + `px;
            margin-right: `+ this.raio / 2 + `px;
            margin-left: -`+ this.raio / 2 + `px;
        }
        `;
    }
    tick(){

    }


}

function reiniciarUniverso(){
    universo.excluirTodosObjetos();
}




let carregado = false;
function carregarUniverso(){

    if(carregado){
        reiniciarUniverso();
    }
    if(universo == undefined){
        universo = new Universo();
    }

    inserirGame(universo);

    /*
    var planeta = new CorpoCeleste();
    planeta.x = 100+500+100;
    planeta.y = 700;
    planeta.setRaio(10);
    planeta.criarCSS();
    //planeta.velX = 0.4;
    planeta.velY = 0.4;
    planeta.massa = 600;
    planeta.setCorpoFisico(true);
    planeta.setPegarComMouse(true);
    planeta.setCorpoEstatico(false);
    planeta.setAfetadoPelaGravidade(false);
    planeta.colidirTela = false;
    universo.adicionarObjeto(planeta);
*/

    var planeta2 = new CorpoCeleste();
    planeta2.x = 500;
    planeta2.y = 500; //700
    planeta2.setRaio(40);
    planeta2.criarCSS();
    //plane2ta.velX = 0.4;
    //plane2ta.velY = 0.4;
    planeta2.massa = 6000*10000000000;
    planeta2.setCorpoFisico(true);
    planeta2.setPegarComMouse(true);
    planeta2.setCorpoEstatico(false);
    planeta2.setAfetadoPelaGravidade(false);
    planeta2.colidirTela = false;
    universo.adicionarObjeto(planeta2);
/*
    var planeta2 = new CorpoCeleste();
    planeta2.x = 100+500+100;
    planeta2.y = 200;
    planeta2.setRaio(40);
    planeta2.criarCSS();
    //plane2ta.velX = 0.4;
    //plane2ta.velY = 0.4;
    planeta2.massa = 6000*10000000000;
    planeta2.setCorpoFisico(true);
    planeta2.setPegarComMouse(true);
    planeta2.setCorpoEstatico(false);
    planeta2.setAfetadoPelaGravidade(false);
    planeta2.colidirTela = false;
    universo.adicionarObjeto(planeta2);

    */
    /*
    var planeta2 = new CorpoCeleste();
    planeta2.x = 450;
    planeta2.y = 200;
    planeta2.velX = 0.2;
    planeta2.velY = 0.2;
    planeta2.massa = 200;
    planeta2.setCorpoFisico(true);
    planeta2.setPegarComMouse(true);
    planeta2.setCorpoEstatico(false);
    planeta2.setAfetadoPelaGravidade(false);
    universo.adicionarObjeto(planeta2);
    */
    gerarCorposAleatorios(400);

    iniciarGameEngine();

    carregado = true;
}


function gerarCorposAleatorios(n){
    for(var i = 0; i<n; i++){
        var planeta = new CorpoCeleste();
        planeta.x = getNumeroAleatorio(400, 500);
        planeta.y = getNumeroAleatorio(500, 600);
        //planeta.x = getNumeroAleatorio(540, 550);
        //planeta.y = getNumeroAleatorio(0, 0);

        planeta.y = 10 + i*2/2;
        var tamanho = getNumeroAleatorio(1, 5);

        planeta.setRaio(tamanho);
        planeta.criarCSS();
        planeta.velX = 0.9 * i/300;
        //planeta.velX = getNumeroAleatorio(-0.0000002, 0.0000002);
        planeta.velY = getNumeroAleatorio(-0.0000002, 0.0000002);
        planeta.massa = tamanho*10;
        planeta.setCorpoFisico(true);
        planeta.CorpoFisico = false; //COLISÃO DESLIGADA
        planeta.setPegarComMouse(true);
        planeta.setCorpoEstatico(false);
        planeta.setAfetadoPelaGravidade(false);
        planeta.colidirTela = false;
        planeta.setColidirTela(true);
        universo.adicionarObjeto(planeta);
    }
}

function zerarVelocidade(){
    universo.zerarVelocidade();
}
function diminuirVelocidade(){
    universo.diminuirVelocidade();
}

function aumentarDeltaTime(){
    deltaTime = deltaTime*2;
}
function diminuirDeltaTime(){
    deltaTime = deltaTime/2;
}
function resetarDeltaTime(){
    deltaTime = 1;
}

function aumentarTick(){
    tickPorSegundo = tickPorSegundo*2;
}
function diminuirTick(){
    tickPorSegundo = tickPorSegundo/2;
}
function resetarTick(){
    tickPorSegundo = 60;
}