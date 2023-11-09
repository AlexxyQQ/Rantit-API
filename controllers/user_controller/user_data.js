const User = require("../../models/user_model");

async function userData(req, res) {
  try {
    const localUser = res.locals.user;
    console.log(req.body.userId);

    if (localUser.username === "admin") {
      if (!req.body.userId) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const dbUser = await User.findById(req.body.userId);

      // Corrected typo: $rx should be $regex
      const allSong = await Song.find({
        serverUrl: { $regex: dbUser.username },
      });
      const allPublicSong = await Song.find({
        serverUrl: { $regex: dbUser.username },
        isPublic: true,
      });

      return res.status(200).json({
        success: true,
        message: "All Users",
        allSong,
        allPublicSong,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

module.exports = userData;
