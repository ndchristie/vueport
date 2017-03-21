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
      if (!doc) return res.sendStatus(404);
      if (err) return console.log(err);
      return res.json(doc);
    });
  })
  .put((req, res) => {
    const query = { name: req.params.name };
    const options = { returnNewDocument: true };
    SocialLink.findOneAndUpdate(query, req.body, options, (err, doc) => {
      if (!doc) return res.sendStatus(404);
      if (err) return console.log(err);
      return res.json(doc);
    });
  })
  .delete((req, res) => {
    SocialLink.findOneAndRemove({ name: req.params.name }, req.body, (err) => {
      if (err) return console.log(err);
      return res.sendStatus(200);
    });
  });

module.exports = router;
