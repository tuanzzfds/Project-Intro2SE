var express = require("express");
var router = express.Router();
const Admin = require("../models/admin.model");
const adminController = require("../controllers/admin.controller");

router.get("/", (req, res, next) => {
  res.render("admin-sign-in", { title: "Admin - ChillnFree" });
});

router.get("/dashboard", async (req, res, next) => {
  if (!req.cookies.isAdmin) {
    res.redirect("/");
  } else {
    const songs = await adminController.getAllSongsInJSON();
    const allUsers = await adminController.getAllUsersInJSON();
    const feedbacks = await adminController.getAllReportsInJSON();
    const recentlyRegisteredUsers = [...allUsers];
    res.render("admin-dashboard", {
      recentlyRegisteredUsers,
      feedbacks,
      allUsers,
      songs,
    });
  }
});

router.post("/sign-in", async (req, res, next) => {
  const user = req.body.user;
  const password = req.body.password;
  try {
    const admin = await Admin.findOne({ user: user, password: password });
    if (admin) {
    //   res.cookie("isAdmin",false);
        console.log("thanh cong");
      res.cookie("isAdmin",true);
      res.redirect("/admin/dashboard");
    } else {
      console.log("not thanh cong");
      res.redirect("/admin");
    }
  } catch (err) {
    res.redirect("/admin");
  }
});

module.exports = router;
