function carregarObjetosCSS() {
    //let ObjetoTemporario = new Bola();
    //loadCSS(ObjetoTemporario.getCSS());

    //ObjetoTemporario = new Plataforma(10, 20);
    //loadCSS(ObjetoTemporario.getCSS());

}


class Circulo extends GameObject {
    constructor() {
        super('gCirculo');
        this.raio = 10;
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
        this.#criarCSS();

        //criar vertices do hitbox
        var vertices = fazerCirculo(this.raio, 15); //25 maximo estável
        this.setVertices(vertices);
        //console.log(this.getVertices().printArray());
        
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

        /*
        this.css = `
        #`+this.getId()+`.`+ this.getClassName() + `{
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
        */
        //O margin serve para reposicionar o circulo para dentro de sua hitbox, e ainda torna seu centro a posicão x e y.
    }




    getRaio() {
        return this.raio;
    }

    teste() {
        //alert("Bola Teste Funcionou");
        return true;
    }
    tick() {
        //alert("Tick da bola funcionou");
        //this.velY += 1;
        //this.y += this.velY;
        //this.x += this.velX;

        //collide(this);
        /*
        if(this.y >= 500){
            this.y = 500;
            this.velX = this.velX *0.9;
            this.velY = (this.velY * -1) * this.elasticidade;
            
        }
        */


    }
    draw() {

            


    }
}

class Plataforma extends GameObject {
    constructor(comprimento, altura) {
        super('gPlataforma');
        if(altura == undefined || comprimento == undefined){
            alert("ERRO(Objetos: Plataforma) - altura ou comprimento não definido");
        }
        this.altura = altura;
        this.comprimento = comprimento;
        this.x = 0.0;
        this.y = 0.0;
        this.velY = 0.0;
        this.velX = 0.0;
        this.massa = 1;
        this.elasticidade = 0.1;
        this.atrito = 0;
        this.setCorpoEstatico(true);
        this.setColidirTela(true);
        this.setAfetadoPelaGravidade(true);
        this.corHTML = "1900ff";
        this.#criarCSS();
        this.setVertices(fazerRetangulo(this.comprimento, this.altura));
        
    }

    #criarCSS() {
        /*
        this.css = `
        #`+this.getId()+`.`+this.getClassName()+`{
            height: `+ this.altura + `px;
            width: `+ this.comprimento + `px;
            background-color: #`+ this.corHTML + `;
            display: inline-block;
            position: absolute;
        }
        `;
        */
        this.css = `
        {
            height: `+ this.altura + `px;
            width: `+ this.comprimento + `px;
            background-color: #`+ this.corHTML + `;
            display: inline-block;
            position: absolute;
        }
        `;
    }
    
    /*
    getAltura() {
        return this.altura;
    }
    getComprimento() {
        return this.comprimento;
    }
    */
    teste() {
        return true;
    }
    tick() {

        /*
        if(this.y >= 500){
            this.y = 500;
            this.velX = this.velX *0.9;
            this.velY = (this.velY * -1) * this.elasticidade;
            
        }
        */

    }
    draw() {
        


    }
}