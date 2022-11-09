const fe = require('node:fs');

//Реалізував через рекурсію. Перевіряє всі папки і файли незалежно від вкладеності :)

function sorter(path) {
    fe.readdir(path, (err, files) => {
        if (err) {
            console.log(err, "ERR");
        }

        for (const file of files) {

            fe.stat(`${path}/${file}`, (err, stats) => {
                if (err) {
                    console.log(err, "ERR");
                }
                console.log(stats.isDirectory())
                if (stats.isDirectory()) {
                    sorter(`${path}/${file}`);
                }
                if (stats.isFile()) {
                    fe.readFile(`${path}/${file}`, (err, data) => {
                        if (err) {
                            console.log(err, "ERR");
                        }
                        let x = JSON.parse(data);
                        if (x.gender === 'male') {
                            fe.rename(`${path}/${file}`, `./students/boys/${file}`, (err) => {
                                if (err) {
                                    console.log(err, "ERR");
                                }
                            })
                        }
                        if (x.gender === 'female') {
                            fe.rename(`${path}/${file}`, `./students/girls/${file}`, (err) => {
                                if (err) {
                                    console.log(err, "ERR");
                                }
                            })
                        }


                    })
                }
            })

        }


    })

}

sorter('./students');

