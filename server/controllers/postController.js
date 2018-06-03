import db from "./../models";

let postController = {};

postController.post = (req, res) => {
  const { title, text, link, userId } = req.body;
  const post = new db.Post({
    title,
    text,
    link,
    _creator: userId
  });
  post
    .save()
    .then(newPost => {
      return res.status(200).json({
        success: true,
        data: newPost
      });
    })
    .catch(err => {
      return res.status(500).json({
        message: err
      });
    });
};

postController.getAll = (req, res) => {
  db.Post.find({})
    .populate({
      path: "_creator",
      select: "username -_id"
    })
    .then(posts => {
      return res.status(200).json({
        success: true,
        data: posts
      });
    })
    .catch(err => {
      return res.status(500).json({
        message: err
      });
    });
};

export default postController;
