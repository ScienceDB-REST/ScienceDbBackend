
//
// GET REQUESTS
//
// get all Users
router.get('/users', function(req, res) {
    models.
    User.findAll(helper.searchPaginate(req, ["name", "email", "usr_hash", "usr_salt"])).then(function(
        Users) {
        res.json(Users);
    });
});

// get single User
router.get('/user/:id', function(req, res) {
    models.
    User.find({
        where: {
            id: req.params.id
        }
    }).then(function(x) {
        res.json(x);
    });
});

// get example CSV for subsequent bulk create
router.get('/users/example_csv', function(req, res) {
    helper.modelCsvExample(models.User).then(function(modelCsvArr) {
        res.csv(modelCsvArr)
    })
})

// get for vue-table
router.get('/users/vue_table', function(req, res) {
    helper.vueTable(req, models.User, ["name", "email", "usr_hash", "usr_salt"]).then(
        function(x) {
            res.json(x)
        })
});
//
// POST REQUESTS
//
// add new User
router.post('/users', function(req, res) {
    models.User.create({
        name: req.body.name,
        email: req.body.email,
        usr_hash: req.body.usr_hash,
        usr_salt: req.body.usr_salt
    }).then(function(User) {
        res.json(User);
    });
});

// bulk create Users from uploaded CSV or Excel file
router.post('/users/upload_csv', function(req, res) {
    csvObjs = helper.parseCsv(req.files.csv_file.data.toString())
    asyncJobs = []
    for (var i = 0, len = csvObjs.length; i < len; i++) {
        asyncJobs.push(models.animal.create(csvObjs[i]))
    }
    Promise.all(asyncJobs).then(function(createdModels) {
        res.json(createdModels)
    })
});
//
// PUT REQUESTS
//
// update single user
router.put('/user/:id', function(req, res) {
    models.User.find({
        where: {
            id: req.params.id
        }
    }).then(function(user) {
        if (user) {
            user.updateAttributes({
                name: req.body.name,
                email: req.body.email,
                usr_hash: req.body.usr_hash,
                usr_salt: req.body.usr_salt
            }).then(function(user) {
                res.send(user);
            });
        }
    });
});
//
// DELETE REQUESTS
//
// delete a single user
router.delete('/user/:id', function(req, res) {
    models.User.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(user) {
        res.json(user);
    });
});