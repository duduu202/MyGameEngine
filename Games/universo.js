let G = 6.67428*10^-11;

let universo = undefined;

class Universo extends Game {
    tick(){
        this.cadaGravidade(this.handler.getTodosObjetos());
        
    }

    cadaGravidade(objetos) {
        var px=0, py=0, objx=0, objy=0, m1=0, m2=0;
        //double objx = 0, objy = 0, m2 = 0;
        //Seleção dos corpos
        
        for (var i = 0; i < objetos.length; i++) {
            px = objetos[i].x;
            py = objetos[i].y;
            m1 = objetos[i].massa;
    
            //Não podemos calcular a gravidade do mesmo corpo, logo: i+1
            for (var j = 1 + i; j < objetos.length; j++) {
                    objx = objetos[j].x;
                    objy = objetos[j].y;
                    m2 = objetos[j].massa;
    
                    //Teorema de Pitagoras para calcular a distância
                    var diferencaX = objx - px;
                    var diferencaY = objy - py;
                    var distancia = (diferencaX * diferencaX) + (diferencaY * diferencaY);
                    distancia = Math.sqrt(distancia);
    
                    //distancia *= 100;
    
                    //std::cout << distancia <<" " << i << j << "\n";
    
                    //OTIMIZAÇÃO temporaria e errada, pois corpos gigantes tem alcance maior de gravidade
                    if (distancia > 10) { //0.02
                           
                        //Newton's Law of Universal Gravitation
                        var F = (G * m1 * m2) / Math.pow(distancia, 2);
                        
    
                        //Algulo em radianos
                        var anguloRadians = Math.atan2(diferencaY, diferencaX);
    
                        var divForX = Math.cos(anguloRadians); //Força dividida de acordo com o coseno
                        var divForY = Math.sin(anguloRadians); //Força dividida de acordo com o seno
    
                        objetos[i].velX += ((divForX * F) / Math.pow(m1, 2) * 2)*-1;
                        objetos[i].velY += ((divForY * F) / Math.pow(m1, 2) * 2)*-1;
                        
                        //Mesma força para ambos dos corpos :)
                        objetos[j].velX += ((divForX * F) / Math.pow(m2, 2) * 2);
                        objetos[j].velY += ((divForY * F) / Math.pow(m2, 2) * 2);
                        
    
    
    
    
    
                    }
                
            }
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
        this.velY = 1.0;
        this.velX = 1.0;
        this.massa = 1;
        this.cor = "#eeff00";
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
    planeta.x = 400;
    planeta.y = 200;
    planeta.setRaio(20);
    planeta.criarCSS();
    planeta.velX = 0.4;
    planeta.velY = 0.4;
    planeta.massa = 200;
    planeta.setCorpoFisico(true);
    planeta.setPegarComMouse(true);
    planeta.setCorpoEstatico(false);
    planeta.setAfetadoPelaGravidade(false);
    universo.adicionarObjeto(planeta);
    
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
    gerarCorposAleatorios(50);

    iniciarGameEngine();

    carregado = true;
}


function gerarCorposAleatorios(n){
    for(var i = 0; i<n; i++){
        var planeta = new CorpoCeleste();
        planeta.x = getNumeroAleatorio(100, 800);
        planeta.y = getNumeroAleatorio(100, 600);
        var tamanho = getNumeroAleatorio(1, 40);
        planeta.setRaio(tamanho);
        planeta.criarCSS();
        planeta.velX = getNumeroAleatorio(-2, 2);
        planeta.velY = getNumeroAleatorio(-2, 2);
        planeta.massa = tamanho*10;
        planeta.setCorpoFisico(true);
        planeta.setPegarComMouse(true);
        planeta.setCorpoEstatico(false);
        planeta.setAfetadoPelaGravidade(false);
        planeta.colidirTela = true;
        universo.adicionarObjeto(planeta);
    }
}