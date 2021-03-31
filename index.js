const express = require ('express');
const app = express();
const { v4:uuidv4 } = require('uuid');

app.use(express.json());

const projects = [];

//console.log(app);

// app.get('/', (request, response) => {
//     response.send('Olá, Mundo!');
// })

app.get('/projects', (request, response) => {
    //const { title, owner } = request.query;



    return response.json(projects);
});

app.post('/projects', (request, response) => {
    const {title, owner} = request.body;

    const project = {id: uuidv4(), title, owner};

    projects.push(project); // joga a criação do projeto pra o array

    return response.json(project); // sempre retornar o projeto recém criado e nunca exibir a lista completa, é até questão de segurança
});

app.put('/projects/:id', (request, response) => {
    const params = request.params;

    console.log(params);

    return response.json([
        'Projeto 50',
        'Projeto 2',
        'Projeto 3', 
        'Projeto 4',
        'Projeto 5'
    ]);
});

app.delete('/projects/:id', (request, response) => {
    return response.json([
        'Projeto 50',
        'Projeto 2'
    ]);
});

app.listen(3000, () => {
    console.log('Servidor rodando!');
});