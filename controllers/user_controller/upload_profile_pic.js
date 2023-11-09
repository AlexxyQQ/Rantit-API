const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto"); // Added crypto module for generating random filenames
const upload = multer({ dest: "public/uploads/" });
const User = require("../../models/user_model");

async function uploadProfilePic(req, res) {
  const user_data = res.locals.user;
  upload.single("profilePic")(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({
        success: false,
        message: err,
      });
    }
    try {
      const file = req.file;
      console.log(file);
      if (!file) {
        return res.status(400).json({
          success: false,
          message: "Please choose a file",
        });
      }

      const folderPath = `public/uploads/`;
      var uploadPathTemp = path.join(
        folderPath,
        user_data["username"],
        "profilePic"
      );

      if (!fs.existsSync(uploadPathTemp)) {
        fs.mkdirSync(uploadPathTemp, { recursive: true });
      }

      // Generate a random filename
      const randomFilename = crypto.randomBytes(16).toString("hex");
      const fileExtension = path.extname(file.originalname);
      const newFilename = `${randomFilename}${fileExtension}`;

      const filePath = path.join(uploadPathTemp, newFilename);

      // Remove old profile pic file if it exists
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      // check for the uploadPathTemp folder for other images and delete them
      fs.readdir(uploadPathTemp, (err, files) => {
        if (err) throw err;

        for (const file of files) {
          if (file !== newFilename) {
            fs.unlink(path.join(uploadPathTemp, file), (err) => {
              if (err) throw err;
            });
          }
        }
      });

      await fs.promises.writeFile(
        filePath,
        await fs.promises.readFile(file.path)
      );
      fs.unlinkSync(file.path);

      //   update user profile pic
      const loggedUser = await User.findOne({
        username: user_data["username"],
      });
      loggedUser.profilePic = filePath;
      await loggedUser.save();

      return res.status(200).json({
        success: true,
        data: loggedUser,
        message: "File uploaded successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        success: false,
        message: "File upload failed",
      });
    }
  });
}

module.exports = uploadProfilePic;
