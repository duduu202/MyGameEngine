class CorpoCeleste extends GameObject{
    constructor(){
        this.massa = 1000;
    }

}

class simulacao extends Game{
    constructor(){

    }
    
    tick(){

    }
    draw(){

    }
}

function iniciarSimulacao(){
    var planeta = new Circulo();
    planeta.CorpoCeleste = true;
    planeta.x = 400;
    planeta.y = 200;
    planeta.setCorpoFisico(true);
    planeta.setPegarComMouse(true);
    planeta.setCorpoEstatico(false);

}