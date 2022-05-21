let G = 6.67428*10^-11;
let universo = undefined;


class Universo extends Game {
    tick(){

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

    var planeta = new CorpoCeleste();
    planeta.x = 400;
    planeta.y = 200;
    planeta.setRaio(20);
    planeta.criarCSS();
    planeta.velX = 0.4;
    planeta.velY = 0.4;
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
    planeta2.setCorpoFisico(true);
    planeta2.setPegarComMouse(true);
    planeta2.setCorpoEstatico(false);
    planeta2.setAfetadoPelaGravidade(false);
    universo.adicionarObjeto(planeta2);


    iniciarGameEngine();

    carregado = true;
}


