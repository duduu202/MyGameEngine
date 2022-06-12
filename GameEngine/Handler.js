class Handler{
    objects = [];
    IDs = [];
    constructor(){
        //alert("Handler construido");
    }
    teste(){
        
        alert("handler funcionou\nobjects = "+this.IDs.length);

    }

    tick(){
        handlerTick();
    }
    draw(){
        handlerDraw();
    }
    getLength(){
        return this.objects.length;
    }
    handlerTick(){
        //alert("handlerTick funcionou " + this.objects.length);
        if(trueCada(120)){
            //alert(this.objects.length);
        }
        for(let i = 0; i < this.objects.length; i++){
            this.objects[i].gameObjectTick();
            this.objects[i].tick();

            //this.objects[i].draw();
        }
    }
    handlerDraw(){
        //alert("handlerDraw funcionou " + this.objects.length);
        for(let i = 0; i < this.objects.length; i++){
            this.objects[i].draw();
            this.objects[i].gameObjectDraw();
            //alert(this.objects[i].getClassName());
        }
        //alert("draw acabou");
    }

    /**
     * @param {GameObject} object
     */
    adicionarObjeto(object){
        //alert("Objeto adicionado ao handler: ");
        if(object.getId() == undefined)
            object.setId(this.gerarID());

        //addDiv(className, setId, cssStyle, posicaoX, posicaoY) {
        addDiv(object.getClassName(),object.getId(), 0, object.x, object.y);
        this.objects.push(object);
        //alert(this.objects.length);
    }
    /**
     * @param {GameObject} object
     */
    removerObjeto(id){
        //this.objects.splice(id-1, 1);
        //console.log("\nAntes de remover: " + this.objects);
        for(var i = 0; i<this.objects.length; i++){
            if(this.objects[i].id_somente_numero == id){
                this.objects.splice(i, 1);
  
            }
            else{
                if(this.objects[i].id_somente_numero == undefined)
                    console.log("ERRO(removerObjeto) - ID não definido: "+ this.objects[i].id_somente_numero);
            }
            if(this.IDs[i] == id){
                this.IDs.splice(i, 1);
            }
        }
        //console.log("Depois de remover:  " + this.objects);
        //Falta apagar o id/////////////////////////////////////////// TESTE
    }
    getTodosObjetos(){
        return this.objects;
    }
    excluirTudo(){
        
        //this.objects.splice(0, this.objects.length);
        //this.IDs.splice(0, this.IDs.length);
        this.objects.length = 0;
        this.IDs.length = 0;

    }
    gerarID(){
        //id 0 significa NULL
        var id = 1;
        while(this.IDs.includes(id)){
            id = id+1;
        }
        this.IDs.push(id);
        //console.log("id gerado:" + id);
        return id;
    }
}

