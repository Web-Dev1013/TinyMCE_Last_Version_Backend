const db = require("../models");
const uploadFile = require("../middleware/upload");
const Image = db.image;
exports.getListFiles = (req, res) => {
  // find all image information from 
  try {
    Image.find()
      .then(imageInfos => {
        res.status(200).json({
          message: "Get Images' Infos!",
          imageInfos: imageInfos
        });
      })
  } catch (error) {
    // log on console
    console.log(error);

    res.status(500).json({
      message: "Retrieving Error!",
      error: error
    });
  }
};

exports.saveImageInfo = (req, res) => {
  console.log(req.body);
  try {
    Image.findByIdAndUpdate(req.body.id, {
        fileName: req.body.fileName.split("/")[1],
        fileUrl: "public/image/" + req.body.fileName.split("/")[1],
        title: req.body.altData,
        caption: req.body.caption,
        flag: "true"
      })
      .then((data) => {
        res.send("success");
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Experience."
        });
      })
  } catch (err) {
    console.log(err);
  }
}

exports.removeImage = async (req, res) => {
  try{
    let removeImageId = req.body.removeImageId;
    console.log(removeImageId)
    await Image.deleteOne({_id: removeImageId}, (err, data)=>{
      if(err){
        res.status(500).json({
          message: "Something went wrong Please try again later"
        });
      }else{
        res.status(200).json({
          message: "Image deleted"
        });
      }
    })
  }catch(err){
    console.log(err);
  }
}

exports.upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.body == undefined) {
      return res.status(400).send({
        message: "Please upload a file!"
      });
    }

    const new_image = new Image({
      fileName: req.file.originalname,
      fileUrl: "public/image/" + req.file.originalname,
      flag: "false"
    });
    if (req.body.id == 0) {
      //Save Image in the database
      new_image.save()
        .then((data) => {
          res.send(data._id);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while creating the Experience."
          });
        });
    } else {
      Image.findByIdAndUpdate(req.body.id, {
          fileName: req.file.originalname,
          fileUrl: "public/image/" + req.file.originalname,
          title: req.body.title,
          capture: req.body.capture
        })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "User was updated successfully."
            });
          } else {
            res.send({
              message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Error updating User with id=" + id
          });
        });
    }

  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }
    res.status(500).send({
      message: `Could not upload the file: ${err}`,
    });
  }
};
