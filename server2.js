const express = require('express');
const dbConnection = require('./databaseConnection')

const app = express();
app.use(express.json());

app.get('/user/:id', async (req, res) => {
    try {
        const client = await dbConnection.connect2()
        const id = req.params.id;
        const users = await client.query('select * from users where id=' + id)
        console.log('Users:', users)
        if (users && users.length != 0 && users[0].length != 0) {
            res.json({ message: 'User data successfully fetched', data: users[0] })
        }
        else {
            res.json({ message: 'User is not found' })
        }
    }
    catch (error) {
        console.log('error', error)
        res.json({
            message: "Something went wrong! Contact Administrator",
        });
    }
})

app.post('/user', async (req, res) => {
    try {
        console.log('request', JSON.stringify(req.body))
        const body = req.body;
        console.log('body', JSON.stringify(body))
        const client = await dbConnection.connect2()
        const query = "insert into users (id,name,course) values ?"
        const values = body.map((item) => [item.id, item.name, item.course])
        console.log('Values:', JSON.stringify(values))
        const users = await client.query(query, [values])
        console.log('Users:', JSON.stringify(users))
        let result = {
            message: "Successful", data: body, users
        }
        console.log('response', JSON.stringify(result))
        res.json(result)
    }
    catch (error) {
        console.log('error', error)
        res.json({
            message: "Something went wrong! Contact Administrator",
        });
    }
})

app.put('/user/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedData = req.body;
        const client = await dbConnection.connect2()
        const query = "update users set name= ?, course = ?  where id = ?"
        const values = [updatedData.name, updatedData.course, id]
        const users = await client.query(query, values)
        console.log('Users:', JSON.stringify(users))
        if (users && users.length != 0 && users[0].affectedRows === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.json({
            message: "User successfully updated",
        });
    }
    catch (error) {
        console.log('error', error)
        res.json({
            message: "Something went wrong! Contact Administrator",
        });
    }
});

app.delete('/user/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const client = await dbConnection.connect2()
        const query = "delete from users where id = ?"
        const values = [id]
        const users = await client.query(query, values)
        console.log('Users:', JSON.stringify(users))

        if (users && users.length != 0 && users[0].affectedRows == 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User successfully deleted",
            users
        });
    }
    catch (error) {
        console.log('error', error)
        res.json({
            message: "Something went wrong! Contact Administrator",
        });
    }
});

const port = 3001;
app.listen(port, () => {
    console.log('Server is running on ' + port);
})