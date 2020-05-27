const db = require("../models");
const Users = db.users;

// Cria e Salva o Objeto
exports.create = (req, res) => {
    // Valida o Pedido
    if (!req.body.Login) {
        res.status(400).send({ message: "Login can not be empty!" });
        return;
      }
      if (!req.body.Senha) {
        res.status(400).send({ message: "Senha can not be empty!" });
        return;
      }
    
      // Cria o Objeto
      const users = new Users({
        Login: req.body.Login,
        Senha: req.body.Senha,
        Favoritos: req.body.Favoritos
      });
    
      // Salva o Objeto no banco
      users
        .save(users)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        });
};

// Recupera todos os objetos salvos no banco.
exports.findAll = (req, res) => {
    const Login = req.query.Login;
    var condition = Login ? { Login: { $regex: new RegExp(Login), $options: "i" } } : {};
  
    Users.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
};

// Acha um objeto pela sua ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Users.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found User with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving User with id=" + id });
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
    
      Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update User with id=${id}. Maybe User was not found!`
            });
          } else res.send({ message: "User was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating User with id=" + id
          });
        });
};

// Apaga um objeto pela sua respectiva ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Users.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        } else {
          res.send({
            message: "User was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
};

// Apaga todos os elementos do banco de dados.
exports.deleteAll = (req, res) => {
    Users.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};