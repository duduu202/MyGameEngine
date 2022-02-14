/*
X X X X IDEIA ANTIGA X X X X
As colisões são detectatas a partir dos xpoints e ypoints dos objetos.

os xpoints e ypoints são pontos cujo define cada vertice da forma geometrica.
Exemplo, um quadrado de tamanho 10 pixels seria:
      var xpoints = [
                      this.getX(), this.getX()+10,
                      this.getX()+10, this.getX(),
                      ]
      var ypoints = [
                      this.getY(), this.getY(),
                      this.getY()+10, this.getY()+10,
                      ]
E uma linha imaginária é criada entre esses pontos na ordem, formando um quadrado
(A ultima linha é o ultimo ponto com o primeiro ponto)

Detectamos a colisão usando essas linhas, detectando a interseção entre elas
Isso nos permite que detectamos a colisão de qualquer forma geométrica
X X X X X X X

Ideia nova:
Todos os vertices são armazenados na classe arrayVector, que tem uma lista de pvector.
usar arrayVector.getElement() que retornará um pvector, onde nele estarão as coordenadas .x e .y

Essas classes estão no Matematica.js

Problemas dessa ideia:
-Dependencia de Matematica.js

Vantagens:
+Organização e otimização

*/

//Codigo feito no java readapdato
//Problemas: a colisão não é detectado de uma forma geometrica estiver dentro da outra
function advancedCollisionDetection(pxpoints, pypoints, rxpoints, rypoints) {
    colDetec = false;
    /*
    float centerPX = Principal.getCenterX(p);
    float centerPY = Principal.getCenterY(p);
    
    if(r.contains(centerPX, centerPY)) {
        return true;
    }
    centerPX = Principal.getCenterX(r);
    centerPY = Principal.getCenterY(r);
    
    if(p.contains(centerPX, centerPY)) {
        return true;
    }
    */
    var x1, y1, x2, y2, x3, y3, x4, y4;

    //Dessa maneira é impossível definir a linha final
    //		int[] px = p.xpoints;
    //		int[] py = p.ypoints;
    //		int[] rx = r.xpoints;
    //		int[] ry = r.ypoints;

    //Isso não é necessário, o array do javascript cresce dinamicamente. Pode ser usado o push()
    /*
    var px = new Array(p.length+1);
    var py = new Array(p.length+1);
    var rx = new Array(r.length+1);
    var ry = new Array(r.length+1);	
    */

    //Isso é uma referencia, não é uma cópia. Para uma cópia, seria necessário usar o .slice()
    //Exemplo var px = pxpoints.slice()
    var px = pxpoints;
    var py = pypoints;
    var rx = rxpoints;
    var ry = rypoints;

    /*
    System.arraycopy(p.xpoints, 0, px, 0, p.npoints);
    System.arraycopy(p.ypoints, 0, py, 0, p.npoints);
    System.arraycopy(r.xpoints, 0, rx, 0, r.npoints);
    System.arraycopy(r.ypoints, 0, ry, 0, r.npoints);
    */

    //Definindo linha final:
    px[px.length - 1] = px[0];
    py[py.length - 1] = py[0];
    rx[rx.length - 1] = rx[0];
    ry[ry.length - 1] = ry[0];

    for (let i = 0; i < px.length - 1; i++) {
        x1 = px[i];
        y1 = py[i];
        x2 = px[i + 1];
        y2 = py[i + 1];
        for (let j = 0; j < rx.length - 1; j++) {
            x3 = rx[j];
            y3 = ry[j];
            x4 = rx[j + 1];
            y4 = ry[j + 1];


            let den = ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
            let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
            let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

            if (t > 0 && t < 1 && u > 0 && u < 1) {
                //System.out.println("den: "+den);//System.out.println("u: "+u);System.out.println("t: "+t);System.out.println("x1: "+x1+ " y1: "+y1+ " x2: "+x2+ " y2: "+y2+ "| x3: "+x3+ " y3: "+y3+ " x4: "+x4+ " y4: "+y4);
                //Coordenadas da interseção (Local da colisão):
                //float intersecaoX, intersecaoY; //////////
                ucX = x1 + t * (x2 - x1);
                ucY = y1 + t * (y2 - y1);
                colDetec = true;
            }
        }
    }
    return colDetec;
}

//Detecção Poligono com Ponto (boolean)
/**
 * @param {arrayVector} vertices 
 */
function polyPoint(vertices, px, py) {
    var collision = false;

    // go through each of the vertices, plus
    // the next vertex in the list
    
    var next = 0;
    for (let current = 0; current < vertices.length; current++) {
        
        // get next vertex in list
        // if we've hit the end, wrap around to 0
        next = current + 1;
        if (next == vertices.length) next = 0;

        // get the PVectors at our current position
        // this makes our if statement a little cleaner
        var vc = vertices.getElemento(current);    // c for "current"
        var vn = vertices.getElemento(next);       // n for "next"
        
        // compare position, flip 'collision' variable
        // back and forth
        if (((vc.y >= py && vn.y < py) || (vc.y < py && vn.y >= py)) &&
            (px < (vn.x - vc.x) * (py - vc.y) / (vn.y - vc.y) + vc.x)) {
            collision = !collision;
        }
        
    }

    return collision;
}