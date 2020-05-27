const db = require("../models");
const Article = db.article;

// Cria e Salva o Objeto
exports.create = (req, res) => {
    // Valida o Pedido
    if (!req.body.titulo) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    
      // Cria o Objeto
      const article = new Article({
        titulo: req.body.titulo,
        corpo: req.body.corpo,
        autor: req.body.autor
      });
    
      // Salva o Objeto no banco
      article
        .save(article)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Article."
          });
        });
};

// Recupera todos os objetos salvos no banco.
exports.findAll = (req, res) => {
    const titulo = req.query.titulo;
    var condition = titulo ? { titulo: { $regex: new RegExp(titulo), $options: "i" } } : {};
  
    Article.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Article."
        });
      });
};

// Acha um objeto pela sua ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Article.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Article with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Article with id=" + id });
      });
};

// Atualiza o Objeto pelo ID
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Article.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Article with id=${id}. Maybe Article was not found!`
            });
          } else res.send({ message: "Article was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Article with id=" + id
          });
        });
};

// Apaga um objeto pela sua respectiva ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Article.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Article with id=${id}. Maybe Article was not found!`
          });
        } else {
          res.send({
            message: "Article was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Article with id=" + id
        });
      });
};

// Apaga todos os elementos do banco de dados.
exports.deleteAll = (req, res) => {
    Article.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Articles were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all articles."
      });
    });
};

// Acha todos os elementos publicados no banco de dados.
exports.findAllPublished = (req, res) => {
    Article.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles."
      });
    });
};