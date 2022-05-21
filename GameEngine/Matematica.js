class pvector {
    /**
     * @param {Number} x
     * @param {Number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
        //this.length = 0;
    }
}
class arrayVector {
    #array;
    #mainX;
    #mainY;
    constructor() {
        this.#array = [];
        this.#mainX = 0;
        this.#mainY = 0;
        this.length = 0;
    }
    /**
     * @param {pvector} pv 
     */
    //cria uma forma geometrica, a ultima coordenada conecta com a primeira automaticamente 
    addpvector(pv) {
        if (!(pv instanceof pvector)) {
            alert("ERRO (addpvector), função somente aceita pvector");
            return 0;
        }
        else if (pv.x === undefined || pv.y === undefined) {
            alert("ERRO (addpvector), valores do pvector undefined");
            return 0;
        }

        //Tirar a linha final (0,0)
        if (this.#array.length >= 3) {
            this.#array.pop();
            this.length -= 1;
        }
        //Inserir a nova linha
        this.#array.push(pv);
        this.length += 1;
        //Nova linha final (0,0)
        if (this.#array.length >= 2) {
            var final = this.getElementoPosInicial(0);
            this.#array.push(final);
            this.length += 1;
        }
    }

    addPosicao(x, y) {
        this.#mainX += x;
        this.#mainY += y;
    }
    novaPosicao(x, y) {
        this.#mainX = x;
        this.#mainY = y;
    }
    //Retorna pvector //Essa é a função mais importante, pois com ela, não é necessário mover cada
    //ponto do vetor atravez de um loop
    getElemento(i) {
        return new pvector(this.#array[i].x + this.#mainX, this.#array[i].y + this.#mainY);
    }
    getElementoPosInicial(i) {
        return new pvector(this.#array[i].x, this.#array[i].y);
    }
    printArray() {
        console.log("mainX = " + this.#mainX);
        console.log("mainY = " + this.#mainY);
        console.log(this.#array);
    }
}
/*
function multiplicarCadaVertice(vertices, valor){
    var a = [1, 2, 3].map(function(x) { return x * 5; });
}
*/

//retorna arrayVector
function fazerCirculo(tamanho, vertices) {
    tamanho *= 0.7;
    if (vertices <= 2) {
        alert("ERRO (fazerCirculo), somente 2 vertices não permitido");
        return 0;
    }

    //antigo metodo
    //var xpoints = [];
    //var ypoints = [];

    let pvertices = new arrayVector();

    var adaptar = 360 / vertices;
    for (let v = 0; v < vertices; v++) {
        //antigo metodo
        //xpoints.push(((Math.cos(v * adaptar * Math.PI / 180)) * tamanho));
        //ypoints.push(((Math.sin(v * adaptar * Math.PI / 180)) * tamanho));

        pvertices.addpvector(
            new pvector(
                ((Math.cos(v * adaptar * Math.PI / 180)) * tamanho),
                ((Math.sin(v * adaptar * Math.PI / 180)) * tamanho)
            )
        );
    }
    return pvertices;
}

function fazerRetangulo(width, height) {
    let retangulo = new arrayVector();

    retangulo.addpvector(new pvector(0, 0));
    retangulo.addpvector(new pvector(width, 0));
    retangulo.addpvector(new pvector(width, height));
    retangulo.addpvector(new pvector(0, height));

    return retangulo;
}

function intersects(circle, rect) {
    var circleDistancex = Math.abs(circle.getX() - rect.getX());
    var circleDistancey = Math.abs(circle.getY() - rect.getY());

    if (circleDistancex > (rect.getComprimento() / 2 + circle.getRaio())) { return false; }
    if (circleDistancey > (rect.getAltura() / 2 + circle.getRaio())) { return false; }

    if (circleDistancex <= (rect.getComprimento() / 2)) { return true; }
    if (circleDistancey <= (rect.getAltura() / 2)) { return true; }

    var cornerDistance_sq = (circleDistancex - rect.getComprimento() / 2) ^ 2 +
        (circleDistancey - rect.getAltura() / 2) ^ 2;

    return (cornerDistance_sq <= (circle.getRaio() ^ 2));
}

function distancia(x1, y1, x2, y2) {
    //a^2 + b^2 = c^2
    var difX = x1 - x2;
    var difY = y1 - y2;
    var resX = difX * difX;
    var resY = difY * difY;
    var distancia = Math.sqrt(resX + resY);
    return distancia;
}
function getNumeroAleatorio(min, max) {
    return Math.random() * (max - min) + min;
}
function cada(ticks) {
    eDivisivel = loopCount % ticks == 0;
    return eDivisivel;
}

/**
 * @param {arrayVector} p
 * @param {arrayVector} r 
 */
var ultimaIntersecaoX;
var ultimaIntersecaoY;
var anguloLinha1Colidida;
var anguloLinha2Colidida;
function detectarColisaoPoligonos(p, r) {
    /*
    Problemas dessa função:
    -Não detecta colisão de um objeto estiver dentro de outro
    -Má performance
    */
    //var colisaoDetectada = false;

    //selecionar as coordenadas do começo e do final das linhas de p. (x,y)
    for (var i = 0; i < p.length - 1; i++) {

        var x1 = p.getElemento(i).x;
        var y1 = p.getElemento(i).y;
        var x2 = p.getElemento(i + 1).x;
        var y2 = p.getElemento(i + 1).y;

        //selecionar as coordenadas do começo e do final das linhas de r. (x,y)
        for (var j = 0; j < r.length - 1; j++) {

            var x3 = r.getElemento(j).x;
            var y3 = r.getElemento(j).y;
            var x4 = r.getElemento(j + 1).x;
            var y4 = r.getElemento(j + 1).y;

            //calculo necessário para detectar se existe alguma inteseção entre essas linhas
            var den = ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
            var t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
            var u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

            if (t > 0 && t < 1 && u > 0 && u < 1) {
                //Coordenadas x e y dessa interseção
                ultimaIntersecaoX = x1 + t * (x2 - x1);
                ultimaIntersecaoY = y1 + t * (y2 - y1);
                anguloLinha1Colidida = Math.atan2(y1 - y2, x1 - x2);
                anguloLinha2Colidida = Math.atan2(y3 - y4, x3 - x4);
                
                //colisaoDetectada = true;
                return true;
            }
        }
    }


    return false;
}

function direcao(x1, y1, x2, y2) {

    var anguloRadians = Math.atan2(y1 - y2, x1 - x2); //Algulo em radianos
    var divForX = Math.cos(anguloRadians); //Força dividida de acordo com o coseno
    var divForY = Math.sin(anguloRadians); //Força dividida de acordo com o seno


    return new pvector(divForX, divForY);
}

function diferenca (num1, num2) {
    if (num1 > num2) {
      return num1 - num2
    } else {
      return num2 - num1
    }
  }