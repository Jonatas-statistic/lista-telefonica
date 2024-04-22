const { Client } = require('pg');
const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

//Pèsquisar o que é CORS
app.use(cors())
app.use(express.json());

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'lista-telefonica',
  password: '123456',
  port: 5432, // Default PostgreSQL port
});
client.connect()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// Get - Lista todos os contatos
app.get('/contact', (req, res) => {
  // Create a new PostgreSQL client
  const query = 'SELECT id, name FROM contact';
  // Execute the query
  client.query(query)
    .then(result => {
      res.json(result.rows);
    }).catch(err => {
      res.status(400).json({mensagem: 'Erro ao listar contatos'});
    })

})

// Get - Retornar apenas um contato
app.get('/contact/:id', (req, res) => {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'lista-telefonica',
    password: '123456',
    port: 5432, // Default PostgreSQL port
  });

  // Connect to the PostgreSQL database
  client.connect()
    .then(() => {
      console.log('Connected to PostgreSQL database');
      // Example query
      const query = `SELECT id, name, phone, email, description FROM contact where id = ${req.params['id']}`;
      // Execute the query
      return client.query(query);
    })
    .then((result) => {
      res.json(result.rows[0]);
    })
    .catch((err) => {
      console.error('Error executing query', err);
    })
    .finally(() => {
      // Close the connection to the database
      client.end();
    });
})

// Post - Insere um novo contato no banco de dados
app.post('/contact', (req, res) => {
  const data = req.body
  
  let name = data['name'];
  name = name.toUpperCase();

  // Create a new PostgreSQL client
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'lista-telefonica',
    password: '123456',
    port: 5432, // Default PostgreSQL port
  });

  // Connect to the PostgreSQL database
  client.connect()
    .then(() => {
      console.log('Connected to PostgreSQL database');
      // Example query
      const query = `INSERT INTO contact(name, phone, email, description) VALUES ('${name}', '${data['phone']}', '${data['email']}', '${data['description']}')`;
      // Execute the query
      return client.query(query);
    })
    .then((result) => {
      res.json({ status: 'Registro inserido com seucesso!' });
    })
    .catch((err) => {
      console.error('Error executing query', err);
    })
    .finally(() => {
      // Close the connection to the database
      client.end();
    });
})

// Put - Atualiza um contato no banco de dados
app.put('/contact/:id', (req, res) => {
  const data = req.body

  let name = data['name'];
  name = name.toUpperCase();

  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'lista-telefonica',
    password: '123456',
    port: 5432, // Default PostgreSQL port
  });

  // Connect to the PostgreSQL database
  client.connect()
    .then(() => {
      console.log('Connected to PostgreSQL database');
      // Example query
      const query = `UPDATE contact SET name = '${name}', phone = '${data['phone']}', email = '${data['email']}', description = '${data['description']}' WHERE id = ${req.params['id']}`
      // Execute the query
      return client.query(query);
    })
    .then((result) => {
      res.json({ status: 'Registro atualizado com seucesso!' });
    })
    .catch((err) => {
      console.error('Error executing query', err);
    })
    .finally(() => {
      // Close the connection to the database
      client.end();
    });
})

// Delete - Remove um contato do banco de dados
app.delete('/contact/:id', (req, res) => {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'lista-telefonica',
    password: '123456',
    port: 5432, // Default PostgreSQL port
  });

  // Connect to the PostgreSQL database
  client.connect()
    .then(() => {
      console.log('Connected to PostgreSQL database');
      // Example query
      const query = `delete from contact where id = ${req.params['id']}`
      // Execute the query
      return client.query(query);
    })
    .then((result) => {
      res.json({ status: 'Registro removido com seucesso!' });
    })
    .catch((err) => {
      console.error('Error executing query', err);
    })
    .finally(() => {
      // Close the connection to the database
      client.end();
    });
})

