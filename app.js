const express = require('express');
const fs = require('fs/promises');
const path = require('path');

let app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const dataBasePath = path.join(__dirname, 'dataBase', 'users.json');

app.get('/', (req, res) => {

    res.end('hello peoples!')
})

app.get('/users', (req, res) => {

    const readAll = async () => {
        try {
            const data = await fs.readFile(dataBasePath)
            return JSON.parse(data)
        } catch (e) {
            return e
        }

    }

    readAll().then(value => {
        res.json(value)
    }).catch(reason => {
        res.json(reason)
    })

})

app.get('/user/:id', (req, res) => {
    let {id} = req.params;

    const userByID = async () => {
        try {
            let data = await fs.readFile(dataBasePath);
            return JSON.parse(data)
        } catch (e) {
            return e
        }

    }

    if (!isNaN(+id)) {

        userByID().then(value => {
            if (value.length - 1 >= id && id >= 0) {
                res.json(value[id]);
            } else {
                res.json('User not found!');
            }
        }).catch(reason => {
            res.json(reason);
        })

    } else {
        res.json('You must write a number "id"');
    }

})

app.post('/user', (req, res) => {
    const data = req.body;

    const addUser = async () => {
        try {
            let oldData = await fs.readFile(dataBasePath);
            oldData = JSON.parse(oldData);
            oldData.push(data);
            await fs.writeFile(dataBasePath, JSON.stringify(oldData))
        } catch (e) {
            console.log(e)
        }

    }

    if (data.name.length > 2 && data.age > 0) {
        addUser();
        res.end('done');
    } else {
        res.end('bad request!')
    }

})

app.delete('/user/:id',(req, res) => {
    let {id} = req.params;

    const deleteById = async () => {
        try {
            let data = JSON.parse(await fs.readFile(dataBasePath));
                if(data.length > id && id >= 0) {
                    console.log(data);
                    data.splice(id, 1);
                    await fs.writeFile(dataBasePath, JSON.stringify(data));
                    return data
                }else {
                    return 'bad request!!!';
                }
        }
        catch (e){
            console.log(e);
        }

    }

         deleteById().then(value => {
            res.json(value);
        }).catch(reason => {
            res.json(reason);
        })

})

app.patch('/user/:id', (req, res)=>{
    let {id} = req.params;
    let object = req.body;

    const changeById = async () => {
        try {
            let data = JSON.parse(await fs.readFile(dataBasePath));
            data.splice(id,1, object);
            await fs.writeFile(dataBasePath,data);
            return data
        }catch (e) {
            console.log(e)
        }


    };

    if (object.name.length > 2 && object.age > 0) {
        changeById();

    } else {
        res.end('bad request! Change DATA!')
    }

})



app.listen(5001, () => {
    console.log('server is running!');
})