const fileSelector = document.getElementById('file-selector');

fileSelector.addEventListener('change', function (event) {

    const file = event.target.files[0];

    if (file) {

        let reader = new FileReader(file);
        let firstLine = true;

        reader.onload = function () {

            let lines = reader.result.split('\n');
            let matrix;

            for (let i = 0; i < lines.length; i++) {
                if (!lines[i].startsWith('%') && lines[i] != '') {
                    let aux = lines[i].split(' ');
                    if (firstLine) {
                        matrix = new Matrix(parseInt(aux[0]), parseInt(aux[1]))
                        firstLine = false;
                    } else {
                        matrix.set(parseInt(aux[0]), parseInt(aux[1]), parseInt(aux[2]))
                    }
                }
            }

            
           
            let start = Date.now()
            
            let la = new LinearAlgebra()
            
            la.solve(matrix)
            
            let stop = Date.now()

            console.log(stop - start);
            console.log(la.solve(matrix))

        };

        reader.readAsText(file);

    }

});