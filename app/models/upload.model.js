module.exports = mongoose => {
  const Upload = mongoose.model(
    "upload",
    mongoose.Schema({
      fileName: String,
      fileUrl: String
    }, {
      timestamps: true
    })
  );

  return  Upload;
};
