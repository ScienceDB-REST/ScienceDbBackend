
//
// GET REQUESTS
//
// get all individuals
router.get('/individuals', function(req, res) {
    models.
    individual.findAll(helper.searchPaginate(req, ["id", "name"])).then(function(
        individuals) {
        res.json(individuals);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get single individual
router.get('/individual/:id', function(req, res) {
    w = {
        where: {
            id: req.params.id
        }
    }
    i = helper.includeAssociations(req)
    models.
    individual.find(objectAssign(w, i)).then(function(x) {
        res.json(x);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get example CSV for subsequent bulk create
router.get('/individuals/example_csv', function(req, res) {
    helper.modelCsvExample(models.individual).then(function(modelCsvArr) {
        res.csv(modelCsvArr)
    })
})

// get for vue-table
router.get('/individuals/vue_table', function(req, res) {
    helper.vueTable(req, models.individual, ["id", "name"]).then(
        function(x) {
            res.json(x)
        }).catch(function(err) {
        res.status(500).json(err)
    })
});
//
// POST REQUESTS
//
// add new individual
router.post('/individuals', function(req, res) {
    models.individual.create(helper.assignForIntersectedKeys({
        name: null,
        sowing_date: null,
        harvest_date: null,
        cultivar_id: null,
        field_plot_id: null,
        pot_id: null

    }, req.body)).then(function(individual) {
        return helper.setAssociations(
            models.individual,
            individual,
            req.body
        )
    }).then(function(individual) {
        res.json(individual);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// bulk create individuals from uploaded CSV file
router.post('/individuals/upload_csv', function(req, res) {
    delim = req.body.delim
    cols = req.body.cols
    helper.parseCsv(req.files.csv_file.data.toString(), delim, cols).then(
        function(data) {
            models.individual.bulkCreate(
                data, {
                    validate: true
                }).then(function(data) {
                res.json(data)
            }).catch(function(err) {
                res.status(500).json(err)
            })
        })
});

// bulk create individuals from uploaded xlsx Excel file
router.post('/individuals/upload_xlsx', function(req, res) {
    xlsxObjs = helper.parseXlsx(req.files.xlsx_file.data.toString('binary'))
    models.individual.bulkCreate(
        xlsxObjs, {
            validate: true
        }).then(function(data) {
        res.json(data)
    }).catch(function(err) {
        res.status(500).json(err)
    })
});
//
// PUT REQUESTS
//
// update single individual
router.put('/individual/:id', function(req, res) {
    models.individual.find({
        where: {
            id: req.params.id
        },
        include: [{
            all: true
        }]
    }).then(function(individual) {
        if (individual) {
            individual.updateAttributes(helper.assignForIntersectedKeys({
                name: null,
                sowing_date: null,
                harvest_date: null,
                cultivar_id: null,
                field_plot_id: null,
                pot_id: null

            }, req.body)).then(function(individual) {
                return helper.setAssociations(
                    models.individual,
                    individual,
                    req.body
                )
            }).then(function(individual) {
                res.send(individual);
            }).catch(function(err) {
                res.status(500).json(err)
            })
        } else {
            res.status(500).json(new Error('individual with id ' + req.params.id +
                ' not found.'))
        }
    });
});
//
// DELETE REQUESTS
//
// delete a single individual
router.delete('/individual/:id', function(req, res) {
    models.individual.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(individual) {
        res.json(individual);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});