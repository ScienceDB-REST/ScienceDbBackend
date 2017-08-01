
//
// GET REQUESTS
//
// get all Roles
router.get('/roles', function(req, res) {
    models.
    Role.findAll(helper.searchPaginate(req, ["name"])).then(function(
        Roles) {
        res.json(Roles);
    });
});

// get single Role
router.get('/role/:id', function(req, res) {
    models.
    Role.find({
        where: {
            id: req.params.id
        }
    }).then(function(x) {
        res.json(x);
    });
});

// get example CSV for subsequent bulk create
router.get('/roles/example_csv', function(req, res) {
    helper.modelCsvExample(models.Role).then(function(modelCsvArr) {
        res.csv(modelCsvArr)
    })
})

// get for vue-table
router.get('/roles/vue_table', function(req, res) {
    helper.vueTable(req, models.Role, ["name"]).then(
        function(x) {
            res.json(x)
        })
});
//
// POST REQUESTS
//
// add new Role
router.post('/roles', function(req, res) {
    models.Role.create({
        name: req.body.name,
        description: req.body.description
    }).then(function(Role) {
        res.json(Role);
    });
});

// bulk create Roles from uploaded CSV or Excel file
router.post('/roles/upload_csv', function(req, res) {
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
// update single role
router.put('/role/:id', function(req, res) {
    models.Role.find({
        where: {
            id: req.params.id
        }
    }).then(function(role) {
        if (role) {
            role.updateAttributes({
                name: req.body.name,
                description: req.body.description
            }).then(function(role) {
                res.send(role);
            });
        }
    });
});
//
// DELETE REQUESTS
//
// delete a single role
router.delete('/role/:id', function(req, res) {
    models.Role.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(role) {
        res.json(role);
    });
});