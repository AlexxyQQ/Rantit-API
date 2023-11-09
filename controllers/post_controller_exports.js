const create_comment = require("./post_controller/create_comment");
const delete_comment = require("./post_controller/delete_comment");
const like_post = require("./post_controller/like_post");
const unlike_post = require("./post_controller/unlike_post");
const update_post = require("./post_controller/update_post");
const delete_post = require("./post_controller/delete_post");
const create_post = require("./post_controller/create_post");

const post_controller_exports = {
  create_comment,
  delete_comment,
  like_post,
  unlike_post,
  update_post,
  delete_post,
  create_post,
};

module.exports = post_controller_exports;
