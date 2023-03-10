//jshint esversion:6
const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// let posts = [];

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

//mongoose schema
const postSchema = {
    title: String,
    content: String
};
//define post collection
const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res) {
    //res.render("home", {posts_html: posts})}
    //find all the posts in the posts collection and render that in the home.ejs
    Post.find({}, function (err, posts) {
        res.render("home", {
            startingContent: homeStartingContent,
            posts: posts
        });
    });
});

app.get('/posts/:postId', (req, res) => {
        const requestedPostId = req.params.postId;
        //const requestedTitle = _.lowerCase(req.params.title);

        Post.findOne({_id: requestedPostId}, function (err, post) {
            res.render("post", {
                title: post.title,
                content: post.content
            });
        });
    }
    // posts.forEach(function(post){
    //   const storedTitle = _.lowerCase(post.title);
    //   if (storedTitle === requestedTitle){
    //     res.render("post", {post_html: post});
    //     return;
    //   }
    // });
    // }
);

app.get("/about", function(req, res){
  res.render("about", {about_Content: aboutContent})}
);

app.get("/contact", function(req, res){
  res.render("contact", {contact_Content:contactContent})}
);

app.get("/compose", function(req, res){
  res.render("compose")}
);

app.post("/compose", function(req, res){
  //using bodyParser to log the input from html
  //console.log(req.body.postTitle)

  //create js object
  // const postObj = {
  //   title:req.body.postTitle,
  //   body: req.body.postBody
  // };
  // console.log(postObj);
  //store postObj into global variable posts array
  //posts.push(postObj);
    //store req to post document
    const post = new Post ({
        title: req.body.postTitle,
        content: req.body.postBody
    });
    post.save(function(err){
        if (!err){
            res.redirect("/");
        } else {
            console.log(err);
        }
    });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
