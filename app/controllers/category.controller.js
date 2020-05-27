const db = require("../models");
const Category = db.category;

// Cria e Salva o Objeto
exports.create = (req, res) => {
    // Valida o Pedido
    if (!req.body.category) {
        res.status(400).send({ message: "Category can not be empty!" });
        return;
      }
    
      // Cria o Objeto
      const category = new Category({
        category: req.body.category,
      });
    
      // Salva o Objeto no banco
      category
        .save(category)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Category."
          });
        });
};

// Recupera todos os objetos salvos no banco.
exports.findAll = (req, res) => {
    const category = req.query.category;
    var condition = category ? { category: { $regex: new RegExp(category), $options: "i" } } : {};
  
    Category.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Category."
        });
      });
};

// Acha um objeto pela sua ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Category.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Category with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Category with id=" + id });
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
    
      Category.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Category with id=${id}. Maybe Category was not found!`
            });
          } else res.send({ message: "Category was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Category with id=" + id
          });
        });
};

// Apaga um objeto pela sua respectiva ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Category.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
          });
        } else {
          res.send({
            message: "Category was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Category with id=" + id
        });
      });
};

// Apaga todos os elementos do banco de dados.
exports.deleteAll = (req, res) => {
    Category.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Category were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all categories."
      });
    });
};

// Acha todos os elementos publicados no banco de dados.
exports.findAllPublished = (req, res) => {
    Category.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    });
};