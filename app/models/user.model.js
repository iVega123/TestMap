module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        Login: String,
        Senha: String,
        Favoritos: [{}]
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Usuario = mongoose.model("user", schema);
    return Usuario;
  };