//é uma boa ideia...
class gteste {
    constructor() {
        this.x = 2;
        this.y = 3;
        this.vertices = [
            new pvector(0, 0), new pvector(10, 0),
            new pvector(0, 10), new pvector(10, 10)
        ]
    }
    getTeste() {
        let res = this.vertices.map(
            v => v.x * this.getX()
            //function(v, x, y) {
            //	var x = this.getX();
            //	var y = this.getY();
            //	return [v.x + x, v.y + y];
            //}
        );
        console.log(res[0].x);
        return res;
    }
    getX() {
        console.log("entrou no getX()");
        return this.x;
    }
    getY() {
        return this.y;
    }

}
class pvector {
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
    addpvector(pv) {
        if (!(pv instanceof pvector)) {
            //alert("ERRO (addpvector), função somente aceita pvector");
            return 0;
        }
        else if(pv.x === undefined || pv.y === undefined){
            //alert("ERRO (addpvector), valores do pvector undefined");
            return 0;
        }
        this.length += 1;
        this.#array.push(pv);
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
    //ponto do vetor
    getElemento(i){
        return new pvector(this.#array[i].x+this.#mainX, this.#array[i].y+this.#mainY);
    }
    getElementoPosInicial(i){
        return new pvector(this.#array[i].x, this.#array[i].y);
    }
    printArray(){
        console.log("mainX = " + this.#mainX);
        console.log("mainY = " + this.#mainY);
        console.log(this.#array);
    }
}

function teste() {
    /*
    var aa = [1, 2, 3];
    var bb = aa.map(x => x * 5); // <-------


    
    console.log(bb);   // [5, 10, 15]
    */
    let arr = new arrayVector();
    arr.addpvector(new pvector(0, 0));arr.addpvector(new pvector(10, 0));
    arr.addpvector(new pvector(0, 10));arr.addpvector(new pvector(10, 10));
    
    
    console.log(arr.printArray());
    //let a = new pvector(1,1);
    let v = new arrayVector();

    //let b = [new pvector(1, 1), new pvector(3, 2)];
    //let obj = new gteste();
    //let res = obj.getTeste();

    v.addpvector(new pvector(11, 11));v.addpvector(new pvector(22, 22));
    v.addpvector(new pvector(33, 33));v.addpvector(new pvector(44, 44));
    v.addpvector(new pvector());
    v.addpvector("n aceita isso");
    //let n = [1,2,3,4,5];
    /*
    if(b[1].x == 2){
        console.log("funcionou 2");
    }
    else{
        console.log(b[0].x);
    }
    */
    v.addPosicao(5,-24);
    v.novaPosicao(0,-0);
    //v.printArray();
    //console.log(v.getElement(0));
    //console.log(v.length);
}

function teste2(){
    var a = 10000200;
    a = Number.MAX_VALUE;
    console.log(a);
}

function teste3(){
    var id = "GameObject_2341583251853";
    var onlyId = id.split("GameObject_");
    console.log(onlyId);
}
teste3();

