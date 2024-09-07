const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const bookRoutes = require('./routes/book.routes');
const authorRoutes = require('./routes/author.routes');
const categoryRoutes = require('./routes/category.routes');

const app = express();

app.use(bodyParser.json());

app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/categories', categoryRoutes);

app.get('/', (req, res) => {
      res.send('Welcome to the Book Library API');
});

const PORT = process.env.PORT || 2500;

sequelize.sync()
      .then(() => {
            app.listen(PORT, () => {
                  console.log(`Server is running on port ${PORT}`);
            });
      })
      .catch(err => {
            console.error('Unable to connect to the database:', err);
      });