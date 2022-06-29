//let handler;

let bird;
let happyBird;
let happyBirdPontos;
////
class Obstaculo {
    objetosPassaramObstaculo = []
    velocidade;
    obstaculoCima;
    obstaculoBaixo;
    ObstaculoX;
    constructor() {
        this.comprimento = 100;
        this.altura = screenHeight;
        this.velocidade = 2;
        this.ObstaculoX = 500;
        this.buraco = getNumeroAleatorio(50, this.altura - 50);
        this.tamanhoBuraco = 70;
        
        this.obstaculoCima = new Plataforma(this.comprimento, this.altura);
        this.obstaculoCima.x = this.ObstaculoX;
        this.obstaculoCima.y = - this.buraco - this.tamanhoBuraco;
        this.obstaculoCima.setPegarComMouse(true);

        this.obstaculoBaixo = new Plataforma(this.comprimento, this.altura);
        this.obstaculoBaixo.x = this.ObstaculoX;
        this.obstaculoBaixo.y = screenHeight - this.buraco + this.tamanhoBuraco;
        this.obstaculoBaixo.setPegarComMouse(true);

        happyBird.adicionarObjeto(this.obstaculoCima);
        happyBird.adicionarObjeto(this.obstaculoBaixo);
    }

    tick() {
        this.ObstaculoX -= this.velocidade;
        this.obstaculoCima.x = this.ObstaculoX;
        this.obstaculoBaixo.x = this.ObstaculoX;

    }

    passouObstaculo(object) {
        if (this.objetosPassaramObstaculo.includes(object))
            return false;

        if (object.x >= this.obstaculoBaixo.x + this.comprimento / 2) {
            console.log("passou");
            this.objetosPassaramObstaculo.push(object);
            object.pontos += 1;
            return true;
        }

        return false;
    }

    remover() {
        happyBird.removerObjeto(this.obstaculoCima);
        happyBird.removerObjeto(this.obstaculoBaixo);
    }
}

////
class HappyBird extends Game {
    obstaculos = [];
    passaro;
    pontoRecord;
    constructor() {
        super();
        this.pontos = 0;
        this.pontoRecord = 0;
        happyBirdPontos = 0;
        addDiv("happyBirdPontos", "pontos", undefined, 0, 0, this.pontos);
        addDiv("happyBirdPontoRecord", "pontoRecord", undefined, 20, 0, this.pontoRecord);
    }
    setPassaro(set) {
        this.passaro = set;
    }
    perdeu() {
        //atualizarDiv("pontos",0,0,0);
        if (this.pontoRecord < this.pontos) {
            this.pontoRecord = this.pontos;
            atualizarDiv("pontoRecord", 20, 0, this.pontoRecord);
        }
        // this.pontos = 0;

        this.reiniciar();
    }
    tick() {
        if (trueCada(120)) {
            this.obstaculos.push(new Obstaculo());
        }
        if (!this.passaro.vivo) {
            //alert("perdeu");
            this.perdeu();
        }

        for (let i = 0; i < this.obstaculos.length; i++) {
            if (this.obstaculos[i].passouObstaculo(this.passaro)) {
                this.pontos++; // 2 variaveis de pontos? uma aqui e outra no passaro?
                atualizarDiv("pontos", 0, 0, this.pontos);
            }
        }

        /*
        if(!this.perdeu){
            if(bird.y < 1){
                this.perdeu = true;
                happyBird.removerObjeto(bird.id_somente_numero);
            }
            if(this.perdeu){
                //alert("HAHA MUITO RUIM");
            }
        }
        */
        this.obstaculos.forEach(this.tickObstaculos);
    }
    reiniciar() {
        this.pontos = 0;
        
        for(var i = 0; i<this.obstaculos.length; i++){
            this.obstaculos[i].remover();
        }
        this.obstaculos = [];

        this.passaro.vivo = true;
        this.passaro.y = 100;
        this.passaro.velY = 0;
        atualizarDiv("pontos", 0, 0, this.pontos);
    }
    tickObstaculos(item, index, arr) {
        item.tick();

        if (item.ObstaculoX < 10) {
            item.remover();
            arr.splice(index, 1);

        }
    }

}


class Bird extends GameObject {
    constructor() {
        super('gCirculo');
        this.pontos = 0;
        this.raio = 10;
        this.x = 0.0;
        this.y = 0.0;
        this.velY = 0.0;
        this.velX = 0.0;
        this.massa = 1;
        this.cor = "#8f3114";
        this.elasticidade = 0.0;
        this.atrito = 0.5;
        this.setCorpoEstatico(false);
        this.setPegarComMouse(false);
        this.setCorpoFisico(true);
        this.setAfetadoPelaGravidade(true);
        this.#criarCSS();
        this.vivo = true;
        //criar vertices do hitbox
        var vertices = fazerCirculo(this.raio, 4);
        this.setVertices(vertices);
        //console.log(this.getVertices().printArray());

        this.pular = true;
    }
    #criarCSS() {
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
        //O margin serve para reposicionar o circulo para dentro de sua hitbox, e ainda torna seu centro a posicão x e y.
    }
    tick() {

        if (Teclado.isPressionado("w") && this.pular) {
            this.velY = -10;
            this.pular = false;
        }

        if (!Teclado.isPressionado("w")) {
            this.pular = true;
        }


    }
    colididoCom(object) {

        this.vivo = false;
    }

    draw() {
    }
}

var carregado = false;

function carregarHappyBird() {
    if (carregado) {
        reiniciarHappyBird();
    }
    else {


        if (happyBird == undefined)
            happyBird = new HappyBird();

        inserirGame(happyBird);

        
        bird = new Bird();
        bird.setColidirTela(true);
        bird.x = 200;
        bird.y = 100;
        happyBird.adicionarObjeto(bird);
        happyBird.setPassaro(bird);
        iniciarGameEngine();
        //let plataforma = new Plataforma(100, 700-300);
        //plataforma.x = 400;
        //plataforma.y = 300;
        //plataforma.setPegarComMouse(true);
        //happyBird.adicionarObjeto(plataforma);
    }
    carregado = true;
}

function reiniciarHappyBird() {
    happyBird.reiniciar();

}


