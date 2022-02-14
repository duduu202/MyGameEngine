
class Teclado {
    static teclas = [];

    constructor() {
        alert("ERRO(Teclado) - não instancie a classe Teclado");
    }

    static adicionarTecla(tecla) {
        this.teclas.push(tecla);
    }

    static removerTecla(tecla) {
        this.teclas = this.teclas.filter(e => e !== tecla);
    }

    static isPressionado(tecla) {
        return this.teclas.includes(tecla);
    }

    static printTeclasPressionadas() {
        console.log(this.teclas);
    }
}


document.addEventListener('keydown', (e) => {
    //alert(e.key);
    Teclado.adicionarTecla(e.key);
    //document.getElementById('test').innerHTML = 'playerSpriteX = ' + playerSpriteX;
});

document.addEventListener('keyup', (e) => {
    //alert(e.key);
    Teclado.removerTecla(e.key);
    //document.getElementById('test').innerHTML = 'playerSpriteX = ' + playerSpriteX;
});