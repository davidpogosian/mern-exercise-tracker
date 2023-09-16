const router = require('express').Router();
let User = require('../models/user.model');

// /users get request
router.route('/').get((req, res) => {
    User.find() // mongoose method, gets list of all users in the db
        .then(users => res.json(users)) // send back json of all the users
        .catch(err => res.status(400).json('Error: ' + err)); // return status 400 w/ error msg
});

// /users/add http post request
router.route('/add').post((req, res) => {
    // get requested username
    const username = req.body.username;
    // create new document
    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;