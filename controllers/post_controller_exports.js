const create_comment = require("./post_controller/create_comment");
const delete_comment = require("./post_controller/delete_comment");
const like_unlike_post = require("./post_controller/like_unlike_post");
const update_post = require("./post_controller/update_post");
const delete_post = require("./post_controller/delete_post");
const create_post = require("./post_controller/create_post");
const get_one_post = require("./post_controller/get_one_post");
const get_all_post = require("./post_controller/get_all_posts");
const get_liked_post = require("./post_controller/get_liked_posts");
const get_post_comments = require("./post_controller/get_post_comments");
const get_post_likes = require("./post_controller/get_post_likes");

const post_controller_exports = {
  create_comment,
  delete_comment,
  like_unlike_post,
  update_post,
  delete_post,
  create_post,
  get_one_post,
  get_all_post,
  get_liked_post,
  get_post_comments,
  get_post_likes,
};

module.exports = post_controller_exports;
