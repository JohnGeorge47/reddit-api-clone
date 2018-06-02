import db from "./../models";
let userController = {};

userController.post = (req, res) => {
  const { username, password } = req.body;
  const user = new db.User({
    username,
    password
  });

  user
    .save()
    .then(newuser => {
      res.status(200).json({
        success: true,
        data: newuser
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
};

export default userController;
