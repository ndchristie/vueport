const router = require('express').Router();
const SocialLink = require('../../mongoose/models/SocialLink');

router.route('/social-links')
  .get((req, res) => {
    SocialLink.find({}, (err, docs) => {
      if (err) return console.log(err);
      return res.json(docs);
    });
  })
  .post((req, res) => {
    const demoLink = new SocialLink({
      name: req.body.name,
      href: req.body.href,
    });
    demoLink.save((err, doc) => {
      if (err) return console.log(err);
      return res.send(doc);
    });
  });

router.route('/social-links/:name')
  .get((req, res) => {
    SocialLink.findOne({ name: req.params.name }, (err, doc) => {
      if (err) return console.log(err);
      return res.json(doc);
    });
  })
  .put((req, res) => {
    console.log(req.body);
    // YOU CANT FIND AND UPDATE UNLESS YOU GO TO THE OLD LINK
    SocialLink.findOneAndUpdate({ name: req.params.name }, req.body, (err, doc) => {
      if (err) return console.log(err);
      console.log(doc);
      return res.json(doc);
    });
  })
  .delete((req) => {
    SocialLink.findOneAndRemove({ name: req.params.name }, req.body, (err) => {
      if (err) return console.log(err);
      return 200;
    });
  });

module.exports = router;
