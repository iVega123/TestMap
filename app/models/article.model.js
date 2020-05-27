module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        titulo: String,
        corpo: String,
        autor: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Artigo = mongoose.model("artigo", schema);
    return Artigo;
  };