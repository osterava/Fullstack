const bcrypt = require("bcrypt");
const userRourter = require("express").Router();
const User = require("../models/user");

userRourter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs", {
        title: 1,
        author: 1,
        url: 1,
        id: 1
      });
  response.json(users.map(u => u.toJSON()));
});

userRourter.get('/:id', async (request, response) => {
  const user = await User
    .findById(request.params.id)
    .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })

  if (user) {
    response.json(user)
  } else {
    response.status(404).end()
  }

});

userRourter.post("/", async (request, response, next) => {
  const body = request.body;

  if (body.password === undefined) {
    return response.status(400).json({ error: "no password" });
  }
  if (body.password.length < 3) {
    return response
      .status(400)
      .json({ error: "password must be at 3 characters long" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  });

  try {
    const savedUser = await user.save();
    response.json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

module.exports = userRourter;