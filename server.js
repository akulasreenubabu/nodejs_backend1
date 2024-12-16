const express = require('express');
const app = express();
app.use(express.json());

let users = [{ id: 1, name: 'Venkat', course: 'Node' },
{ id: 2, name: 'Lavanya', course: 'React' },
{ id: 3, name: 'Teja', course: 'UI/UX' },
{ id: 4, name: 'Shiva', course: 'Node' }];

app.get('/', (req, res) => {
    res.send('Welcome Back!');
})

app.get('/user', (req, res) => {
    res.json({
        message: "Successful"
    })
})

app.get('/user/:id', (req, res) => {
const id = req.params.id;
  //  res.send(`Welcome ${a}!`);
const user=users.find(user=> {
return user.id===parseInt(id)
  })
  console.log(id);
  console.log('user',JSON.stringify(user));
  res.json({message: 'user data successfully fetched', data: user})  
})


app.post('/user', (req, res) => {
    console.log('request', JSON.stringify(req.body))
    const body = req.body;
    console.log('body', JSON.stringify(body))
    users=users.concat(body);
    let result={
        message: "Successful", data: body, users
    }
    console.log('response', JSON.stringify(result))
    res.json(result)
})

app.put('/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;

    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    users[userIndex] = { ...users[userIndex], ...updatedData };
    res.json({
        message: "User successfully updated",
        data: users[userIndex]
    });
});

app.delete('/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    users = users.filter(user => user.id !== id);
    res.json({
        message: "User successfully deleted",
        users
    });
});

// app.post('/user', (req, res) => {
//     const body = req.body;
//     res.json({
//         message: "User data received successfully!",
//         data: body
//     });
//});


const port = 3001;
app.listen(port, () => {
    console.log('Server is running on ' + port);
})