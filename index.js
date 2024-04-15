const { Client } = require('pg');
const express = require('express')

const app = express()
const port = 3000

app.use(express.json());



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// Get - Lista todos os contatos
app.get('/contact', (req, res) => {
  // Create a new PostgreSQL client
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'lista-contatos',
    password: '123456',
    port: 5432, // Default PostgreSQL port
  });

  // Connect to the PostgreSQL database
  client.connect()
    .then(() => {
      console.log('Connected to PostgreSQL database');
      // Example query
      const query = 'SELECT * FROM contact';
      // Execute the query
      return client.query(query);
    })
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      console.error('Error executing query', err);
    })
    .finally(() => {
      // Close the connection to the database
      client.end();
    });
})

// Get - Retornar apenas um contato
app.get('/contact/:id', (req, res) => {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'lista-contatos',
    password: '123456',
    port: 5432, // Default PostgreSQL port
  });

  // Connect to the PostgreSQL database
  client.connect()
    .then(() => {
      console.log('Connected to PostgreSQL database');
      // Example query
      const query = `SELECT *  FROM contact where id = ${req.params['id']}`;
      // Execute the query
      return client.query(query);
    })
    .then((result) => {
      res.json(result.rows);
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

  // Create a new PostgreSQL client
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'lista-contatos',
    password: '123456',
    port: 5432, // Default PostgreSQL port
  });
  
  // Connect to the PostgreSQL database
  client.connect()
    .then(() => {
      console.log('Connected to PostgreSQL database');
      // Example query
      const query = `INSERT INTO contact(name, phone) VALUES ('${data['name']}', '${data['phone']}')`;
      // Execute the query
      return client.query(query);
    })
    .then((result) => {
      res.send('Registro inserido com seucesso!');
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

  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'lista-contatos',
    password: '123456',
    port: 5432, // Default PostgreSQL port
  });

  // Connect to the PostgreSQL database
  client.connect()
    .then(() => {
      console.log('Connected to PostgreSQL database');
      // Example query
      const query = `UPDATE contact SET name = '${data['name']}', phone = '${data['phone']}' WHERE id = ${req.params['id']}`
      // Execute the query
      return client.query(query);
    })
    .then((result) => {
      res.send('Registro atualizado com seucesso!');
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
    database: 'lista-contatos',
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
      res.send('Registro removido com seucesso!');
    })
    .catch((err) => {
      console.error('Error executing query', err);
    })
    .finally(() => {
      // Close the connection to the database
      client.end();
    });
})

