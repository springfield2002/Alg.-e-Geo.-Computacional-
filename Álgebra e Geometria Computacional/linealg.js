class LinearAlgebra {

    transpose(a) {
        let c = new Matrix(a.cols, a.rows);

        for (let i = 1; i <= c.rows; i++) {
            for (let j = 1; j <= c.cols; j++) {
                c.set(i, j, a.get(j, i))
            }
        }

        return c;
    }

    plus(a, b) {

        if (a.rows != b.rows || a.cols != b.cols) {
            throw "As matrizes são imcompatíveis"
        }
        let c = new Matrix(a.rows, a.cols);

        for (let i = 1; i <= c.rows; i++) {
            for (let j = 1; j <= c.cols; j++) {
                c.set(i, j, a.get(i, j) + b.get(i, j))
            }
        }

        return c

    }


    times(a, b) {



        if (typeof b != "object" || (!b instanceof Matrix)) {
            throw "o parametro deve ser uma matriz"
        }

        let c = new Matrix(a.rows, a.cols);

        if (typeof a == "number") {

            for (let i = 1; i <= c.rows; i++) {
                for (let j = 1; j <= c.cols; j++) {
                    c.set(i, j, a * b.get(i, j))
                }
            }
        }

        else if (typeof a == "object" && b instanceof Matrix) {
            if (a.rows != b.rows || a.cols != b.cols) {
                throw "As matrizes são imcompatíveis"
            }

            for (let i = 1; i <= c.rows; i++) {
                for (let j = 1; j <= c.cols; j++) {
                    c.set(i, j, a.get(i, j) * b.get(i, j))
                }
            }

        }

        else {
            throw "o a deve ser do tipo escalar nunérico ou matriz"
        }
        return c
    }

    div(a, b) {
        if ((typeof b != "object" || (!b instanceof Matrix)) || (typeof a != "object" || (!a instanceof Matrix))) {
            throw "os parametros devem ser matrizes"
        }

        if (a.rows != b.rows || a.cols != b.cols) {
            throw "As matrizes são imcompatíveis"
        }
        for (let i = 0; i < b.values.length; i++) {
            if (b.values[i] == 0) {
                throw " a matriz b possui pelo menos um elemento nulo";
            }
        }
        let c = new Matrix(a.rows, a.cols);

        for (let i = 1; i <= c.rows; i++) {
            for (let j = 1; j <= c.cols; j++) {
                c.set(i, j, a.get(i, j) / b.get(i, j))
            }
        }

        return c

    }


    dot(a, b) {

        if ((typeof b != "object" || (!b instanceof Matrix)) || (typeof a != "object" || (!a instanceof Matrix))) {
            throw "os parametros devem ser matrizes"
        }
        if (a.cols != b.rows) {
            throw "A a primeira matriz possui a quantidade de colunas diferente da quatidade de linhas da segunda matriz"
        }
        let c = new Matrix(a.rows, b.cols);


        for (let i = 1; i <= c.rows; i++) {
            for (let j = 1; j <= c.cols; j++) {
                let value = 0
                for (let k = 1; k <= a.cols; k++) {
                    value += a.get(i, k) * b.get(k, j)
                    c.set(i, j, value)
                }
            }
        }

      
        return c;
    }

    trocaLinha(a, i1, i2) {

        if (typeof a != "object" || (!a instanceof Matrix)) {
            throw "os parametros devem ser matrizes"
        }

        if (i1 < 1 || i1 > a.cols) {
            throw "linha 1 inexistente"
        }

        if (i2 < 1 || i2 > a.cols) {
            throw "linha 2 inexistente"
        }

        let aux = [];

        for (let j = 1; j <= a.cols; j++) {
            aux[j - 1] = a.get(i1, j);
            a.set(i1, j, a.get(i2, j));
            a.set(i2, j, aux[j - 1]);
        }


    }

    multConst(a, k, i) {

        if (typeof a != "object" || (!a instanceof Matrix)) {
            throw "os parametros devem ser matrizes"
        }

        if (typeof k != "number") {
            throw "k precisa ser uma constante numérica"
        }

        if (i < 1 || i > a.cols) {
            throw "linha inexistente"
        }

        for (let j = 1; j <= a.cols; j++) {
            a.set(i, j, Math.round(k * a.get(i, j)))
            if(a.get(i, j)== -0){
                a.set(i,j,0)
            }
        }


    }

    Regra3(a, k, i1, i2) {

        if (typeof a != "object" || (!a instanceof Matrix)) {
            throw "os parametros devem ser matrizes"
        }

        if (i1 < 1 || i1 > a.rows) {
            throw "linha 1 inexistente"
        }

        if (i2 < 1 || i2 > a.rows) {
            throw "linha 2 inexistente"
        }

        if (typeof k != "number") {
            throw "k precisa ser uma constante numérica"
        }

        for (let j = 1; j <= a.cols; j++) {
            a.set(i2, j, (a.get(i2, j) + (a.get(i1, j) * k)));
            
        }
    }
    solve(a) {

        if (typeof a != "object" || (!a instanceof Matrix)) {
            throw "o parametro deve ser matriz"
        }
        if (a.cols != a.rows + 1) {
            throw "essa matriz não é extendida"
        }

        let c = new Matrix(a.rows, a.cols, a.values.slice());

        for (let j = 1; j <= c.cols - 2; j++) {
            for (let i = j + 1; i <= c.rows; i++) {

                let pivo = c.get(j, j);
                let b = c.get(i, j);
                let k = -b / pivo;

                this.Regra3(c, k, j, i);
            }
        }

        for (let j = c.cols - 1; j >= 2; j--) {
            for (let i = j - 1; i >= 1; i--) {

                let pivo = c.get(j, j);
                let b = c.get(i, j);
                let k = -b / pivo;

                this.Regra3(c, k, j, i);
                
            }
        }

        for (let j = 1; j <= c.cols - 1; j++) {
            let k = 1 / c.get(j, j);
            this.multConst(c, k, j);
        }

        let res = []
        
        for (let i = 1; i <= c.rows; i++) {
            res[i -1] = Math.round(c.get(i, c.cols)) 
        }
            var answer = new Vector(c.rows, res)
        return answer



    }
}
