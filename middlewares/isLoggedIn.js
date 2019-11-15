module.exports = (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect("/signin");
    return;
  }
  next();
};
