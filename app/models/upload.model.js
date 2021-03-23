module.exports = mongoose => {
  const Upload = mongoose.model(
    "upload",
    mongoose.Schema({
      fileName: {
        type: String,
        required : true
      },
      fileUrl: {
        type : String,
        required: true
      },
      title: {
        type: String
      },
      caption: {
        type: String
      },
      flag: {
        type: String,
        default: "false"
      }
    }, {
      timestamps: true
    })
  );

  return  Upload;
};
