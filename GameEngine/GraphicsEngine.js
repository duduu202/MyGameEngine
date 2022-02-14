/*
    Carrega, atualiza e modifica CSS
*/

let cssCarregados = [];
function carregarCss(css){
    if (css == null) {
        console.log("ERRO (loadCSS) - css NULL");
        return;
    }
    var head = document.getElementsByTagName('head')[0];
    var s = document.createElement('style');
    s.setAttribute('type', 'text/css');
    if (s.styleSheet) {   // IE
        s.styleSheet.cssText = css;
    } else {                // the world
        s.appendChild(document.createTextNode(css));
    }
    head.appendChild(s);

    console.log("css de objeto carregado");

}
function carregarCssObjeto(css, id, nomeClasse) {
    //#`+this.getId()+`.`+this.getClassName()+`
    //#`+this.getId()+`.`+ this.getClassName() + `
    //alert(css);
    if (cssCarregados.includes(id)) {
        console.log("Atenção (carregarCssObjeto) - css sobrescrevido");
        atualizarCssObjeto(css, id, nomeClasse);
        return;
    }
    
    if (css == null) {
        console.log("ERRO (carregarCssObjeto) - css NULL");
        return;
    }
    if (nomeClasse != null && id != null) {
        css = `#` + id + `.`+ nomeClasse + css;

        //console.log("ERRO (carregarCssObjeto) - nomeClasse e id NULL");
    }
    else{
        if(nomeClasse != null){
            css = `.`+ nomeClasse + css;
        }
        else if(id != null){
            css = `#` + id + css;
        }
    }



    var head = document.getElementsByTagName('head')[0];
    var s = document.createElement('style');
    s.setAttribute('type', 'text/css');
    s.setAttribute('id', 'css_'+id);
    if (s.styleSheet) {   // IE
        s.styleSheet.cssText = css;
    } else {                // the world
        s.appendChild(document.createTextNode(css));
    }
    head.appendChild(s);

    cssCarregados.push(id);
    //console.log("css de objeto carregado " + id + " " + nomeClasse);
}
///CRIA ISSO E OS PROBLEMAS SERÃO RESOLVIDOS, o cssCarregados não serve, passa os ids no load css e deixa aquela função colocar os ids no css e carrega-los
function atualizarCssObjeto(css, id, nomeClasse) {
    removerElementoPorId("css_"+id);

    css = `#` + id + `.`+ nomeClasse + css; 

    var head = document.getElementsByTagName('head')[0];
    var s = document.createElement('style');
    s.setAttribute('type', 'text/css');
    s.setAttribute('id', 'css_'+id);
    if (s.styleSheet) {   // IE
        s.styleSheet.cssText = css;
    } else {                // the world
        s.appendChild(document.createTextNode(css));
    }
    head.appendChild(s);
    //console.log("css de objeto atualizado " + id + " " + nomeClasse);
}

(function () {
    //656 = 0.97
    //788 = ?
    //falta só esticar a tela e ja era!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /*
    element.clientHeight
    adaptarTela = `
    body {
        transform: scale(1.165);
        transform-origin: 0 0;
        width: 500px;
      }
    `;
    carregarCss(adaptarTela);
    */
})();



function atualizarDiv(id, posicaoX, posicaoY, html) {
    var documento = document.getElementById(id);
    //alert("atualizar funfou");
    if (documento == null) {
        console.log("ATENÇÃO (atualizarDiv) - div null, id: " + id);
        return;
    }
    if (html !== undefined) {
        documento.innerHTML = html;
    }
    placeDiv(posicaoX, posicaoY, documento);
}

function addDiv(className, setId, cssStyle, posicaoX, posicaoY, html) {

    //Se ja existir uma div com o mesmo id, não adiciona-lo!
    if (document.getElementById(setId) != null) {
        console.log("ERRO (addDiv) - Objeto não adicionado! motivo: mesmo ID\nclassName:" + className + "\nID:" + setId);
        return;
    }

    if (className == undefined) {
        className = "semNome";
    }
    if (setId == undefined) {
        setId = "semId";
    }
    if (posicaoX == undefined) {
        posicaoX = 0;
    }
    if (posicaoY == undefined) {
        posicaoY = 0;
    }
    if (cssStyle != undefined) {
        carregarCssObjeto(cssStyle, setId, className);
    }

    const div = document.createElement('div');
    div.className = className;
    div.id = setId;

    if (html != undefined) {
        div.innerHTML = html;
    }
    //div.innerHTML = getCircleCSS();
    //div.innerHTML = '' + cssStyle;
    document.getElementById('content').appendChild(div);
    atualizarDiv(setId, posicaoX, posicaoY);
}
function removerElementoPorId(id) {

    var div = document.getElementById(id);
    if (div != null) {
        div.remove();
        console.log("div removida, id: " + id);
    }
    else {
        console.log("ERRO(RemoverDivPorId) - div não encontrada: " + id);
    }

}

function placeDiv(x_pos, y_pos, elementoDocumento) {
    //alert("placeDiv (GameEngine)");

    //var d = document.getElementById(id);

    elementoDocumento.style.position = "absolute";
    elementoDocumento.style.left = x_pos + 'px';
    elementoDocumento.style.top = y_pos + 'px';
}
function tamanhoDiv(w, h, move) {
    //alert("funcionou");
    var d = document.getElementById(move);
    d.style.height = h + 'px';
    d.style.width = w + 'px';

}


/**
 * @param {arrayVector} vertices 
 */
//Dado os vertices usando um objeto da classe arrayVector com os pvector contendo os x e os y. Essa função
//criará um clip-path: polygon(). Sendo capaz de, por exemplo, criar um polígono de um certo hitbox de algum objeto
function cssCreatePolygon(vertices) {
    var polygon = 'clip-path: polygon(';
    /*
    * Para criar um polígono, existe um problema. O clip-path não cria, ele corta algo que ja existe,
    * então para fazer um polígono, precisamos de uma base, por exemplo: height:100%; width:100%; para cortar.
    * Mas se algum vertice estiver em um valor negativo, será impossível cortar essa base, sendo que esses height e 
    * width começa sempre no 0 até o valor dentro do width.
    * 
    * Exemplo:
    * width: 60px; height: 50px;
    *   0(x,y) 
    *   ↓     ↓ 60(x,y)    
    *    _____               .                                /\
    *   |     |              | ' .   E se cortarmos um losango\/
    *   |_____|              |_____. com o centro sendo x:0 e y:0
    *                                teriamos isso.
    * 
    *  
    * Para corrigir isso, precisamos tornar esses valores negativos em positivos, para isso, precisamos saber
    * o menor numero negativo:
    */
    var menorX = 0;
    var menorY = 0;
    for (let i = 0; i < vertices.length; i++) {
        if (vertices.getElementoPosInicial(i).x < menorX && vertices.getElementoPosInicial(i).x < 0)
            menorX = vertices.getElementoPosInicial(i).x;
        if (vertices.getElementoPosInicial(i).y < menorY && vertices.getElementoPosInicial(i).y < 0)
            menorY = vertices.getElementoPosInicial(i).y;
    }

    //Depois, vamos converter esses numeros em positivos
    menorX = menorX * -1;
    menorY = menorY * -1;

    var maiorX = 0;
    var maiorY = 0;

    //E finalmente, construir o polígono somando esses valores. Assim, o menor numero negativo será o x:0 e y:0
    //e os outros numeros negativos se tornarão positivos! Sendo possível fazer o corte.
    for (let i = 0; i < vertices.length; i++) {
        if (vertices.getElementoPosInicial(i).x + menorX > maiorX) {
            maiorX = vertices.getElementoPosInicial(i).x + menorX;
        }
        if (vertices.getElementoPosInicial(i).y + menorY > maiorY) {
            maiorY = vertices.getElementoPosInicial(i).y + menorY;
        }
        polygon = polygon.concat((vertices.getElementoPosInicial(i).x + menorX).toString(), 'px');
        polygon = polygon.concat(' ');
        polygon = polygon.concat((vertices.getElementoPosInicial(i).y + menorY).toString(), 'px');
        if (i < vertices.length - 1)
            polygon = polygon.concat(',');
    }
    polygon = polygon.concat(');');

    //E depois, tambem precisamos reposicionar o polígono e adicionar um retangulo para ser cortado
    polygon = polygon.concat(`
    height:`+ maiorY + `px;
    width:`+ maiorX + `px;

    margin-top: -`+ menorX + `px;
    margin-bottom: -`+ menorX + `px;
    margin-right: `+ menorX + `px;
    margin-left: -`+ menorX + `px;
    `);

    return polygon;
}


//TESTE
function getCircleCSS() {
    return '<style> .gCircle { height: 60px; width: 60px; background-color: #bbb; border-radius: 50%; display: inline-block; position: absolute; } </style>';
}
function getCSSTeste() {
    return '<style> height: 25px; width: 25px; background-color: #bbb; border-radius: 50%; display: inline-block; position: absolute; </style>';
}

function testeGraphicsEngine() {
    //alert("testeGameEngine funcionou");
    return "teste-GraphicsEngine-funcionou";
}