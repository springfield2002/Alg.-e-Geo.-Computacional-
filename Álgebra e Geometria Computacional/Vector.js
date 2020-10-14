class Vector {
    constructor(dim, values){
        this.dim = dim
        
        if(values == undefined){
            this.values = [];
            for(let i = 0; i < this.dim; i++){
                this.values.push(0);
            }
        } else {
            if(values.length == this.dim){
                this.values = values
            } else {
                throw "A quantidade de elementos é incompatível com o tamanho do vetor"
            }
        }
    }

    get(i){
        if(i < 1 || i > this.dim) throw "o índice da linha não corresponde ao tamanho do vetor"
        return this.values[i-1];
    }

    set(i,value){
        this.values[i-1] = value;
    }
}