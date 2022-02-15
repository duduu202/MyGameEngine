/*
 * Essa é uma das classes mais importantes do jogo, pois a classe abstrada GameObject é a classe mãe
 * de todos os objetos do jogo
 * 
*/

//CLASSE ABSTRATA
// massa = kg
class GameObject {
	//////////////////////////////Tudo funcionando! :D
	/**
	 @class GameObject
	 */
	constructor(NovoNomeClasse) {
		this.id = 0;
		this.id_somente_numero = 0;
		this.setId(game.handler.gerarID());
		this.NomeClasse = NovoNomeClasse;
		this.x = 0;
		this.y = 0;
		this.css = null;
		this.velX = 0;
		this.velY = 0;
		this.antigoX = 0;
		this.antigoY = 0;
		this.setCorpoEstatico(true);
		this.setCorpoFisico(false);
		this.setPegarComMouse(false);
		this.setColidirTela(false);
		this.setAfetadoPelaGravidade(false);
		this.elasticidade = 0;
		this.atrito = 0; //Entre 0 e 1
		this.massa = 0;
		this.caindo = true;
		this.jumping = false;
		this.drawHitbox = false;
		this.cssHitbox;
		this.vivo = true;
		//Quadrado
		this.polygon = new arrayVector();
		this.polygon.addpvector(new pvector(0, 0));
		this.polygon.addpvector(new pvector(10, 0));
		this.polygon.addpvector(new pvector(0, 10));
		this.polygon.addpvector(new pvector(10, 10));

		if (this.constructor == GameObject) {
			alert("ERRO, GameObject (abstrato) não deve ser instanciado");
			//throw new Error("Abstract classes can't be instantiated.");
		}

	}
	setAfetadoPelaGravidade(set) {
		this.afetadoPelaGravidade = set;
	}
	isAfetadoPelaGravidade() {
		if(!this.afetadoPelaGravidade)
			return false;

		return this.caindo;
		
	}
	setColidirTela(set) {
		this.colidirTela = set;
	}
	isColidirTela() {
		return this.colidirTela;
	}
	getVertices() {
		this.polygon.novaPosicao(this.x, this.y); //Atualizar o mainX e mainY, e então retornar o polygono
		return this.polygon;
	}
	//Sobscreva essa função na classe filha
	colididoCom(object) {

	}
	mostrarHitbox() {
		//Se ja estiver ativado, retornar
		if (this.drawHitbox)
			return;

		//Se ja existe, não criar outro
		if (this.cssHitbox == null) {
			let poly = cssCreatePolygon(this.getVertices());
			this.cssHitbox = `{
				background-color: rgb(255, 102, 0);
				opacity: 0.5;
				`+ poly + `
			}`;



			carregarCssObjeto(this.cssHitbox, "hitbox" + this.id, "hitbox");
		}

		addDiv("hitbox", "hitbox" + this.id, this.cssHitbox, this.x, this.y);
		this.drawHitbox = true;
	}
	esconderHitbox() {
		//Se ja estiver desativado, retornar
		if (!this.drawHitbox)
			return;

		removerElementoPorId(`hitbox` + this.getId());
		this.drawHitbox = false;
	}
	/**
	 * @param {arrayVector} polygon 
	 */
	setVertices(polygon) {
		if (!(polygon instanceof arrayVector)) {
			alert("ERRO (setVertices), função somente aceita arrayVector");
			return 0;
		}
		this.polygon = polygon;
	}
	isCollided(x, y) {
		var r = polyPoint(this.getVertices(), x, y);
		if (r) {
			return true;
		}
		return false;
	}
	isPegarComMouse() {
		return this.pegarComMouse;
	}
	setPegarComMouse(set) {
		this.pegarComMouse = set;
	}
	addX(add) {
		this.x += add;
	}
	addY(add) {
		this.y += add;
	}
	setCSS(CSS_Code) {
		//Obs: lembre de definir o nome personalizado da classe html
		this.css = CSS_Code;
		loadCSS(this.css);
	}
	getCSS() {
		return this.css;
	}
	//Sua posição nunca mudará
	setCorpoEstatico(set) {
		this.estatico = set;
	}
	isCorpoEstatico() {
		return this.estatico;
	}
	//Existe colisão
	setCorpoFisico(set) {
		this.CorpoFisico = set; //alterar nome da variavel
	}
	isCorpoFisico() {
		return this.CorpoFisico;
	}
	//cada getveltotal são 2 ifs :(
	getVelTotal() {
		var tempvx = this.velX;
		var tempvy = this.velY;

		if (this.velX < 0) {
			tempvx = this.velX * -1;
		}
		if (this.velY < 0) {
			tempvy = this.velY * -1;
		}
		//console.log(tempvx + tempvy);
		return tempvx + tempvy;
	}
	//gameObjectTick é o tick obrigatorio, normalmente usado para aplicar as fisicas anteriormente
	//configuradas
	gameObjectTick() {
		if ((this.antigoX != this.x) || (this.antigoY != this.y)) {
			atualizarDiv(this.id, this.x, this.y);

			this.antigoX = this.x;
			this.antigoY = this.y;

			if (this.drawHitbox == true)
				atualizarDiv(`hitbox` + this.id, this.x, this.y);
		}

		aplicarFisicas(this);


	}
	tick() {
		/*
		for(var i = 0; i<this.#ListaDeMetodosTick.length ; i++){
			const funcao = #ListaDeMetodosTick[i];
			funcao();
		}
		*/
		alert("ERRO, tick() do GameObject deve ser implementado");
	}

	//O draw é meio inutil, visto que não estamos renderizando nada
	draw() {
		/*
		for(var i = 0; i<this.#ListaDeMetodosDraw.length ; i++){
			const funcao = #ListaDeMetodosDraw[i];
			funcao();
		}
		*/
		//alert("ERRO, draw() do GameObject deve ser implementado");
	}

	setId(setId) {
		this.id_somente_numero = setId;
		this.id = "GameObject_" + setId;

	}
	getId() {
		return this.id;
	}


	getClassName() {
		return this.NomeClasse;
	}
	setclassName(NovoNomeClasse) {
		this.NomeClasse = NovoNomeClasse;
	}

	testeGameObject() {
		return "Teste-GameObject-Funcionou";
	}

}