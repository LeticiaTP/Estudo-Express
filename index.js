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
    const {id} = request.params; // pega o ID
    const {title, owner} = request.body; // retornando uma nova informação

    // aqui usamos o findIndex para percorrer todo o array atrás do id
    // findIndex vai percorrer todos os projetos, e toda vez que ele percorrer na variável project
    // caso ela seja satisfeita e retornar true, ela retornará o id que estou passando (project => project.id === id)
    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex <0) {
        return response.status(400).json ({ error: 'Projeto não foi encontrado'});
    }

    // agora que tenho índice, vou criar uma nova informação do projeto
    const project = {
        id,
        title,
        owner
    }

    projects[projectIndex] = project;

    return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
    const {id} = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);
    if (projectIndex <0) {
        return response.status(400).json({ error: 'Projeto não foi encontrado'});
    }

    projects.splice(projectIndex, 1); // uma posição apagada

    return response.status(204).send(); // resposta de sem retorno
});

app.listen(3000, () => {
    console.log('Servidor rodando!');
});