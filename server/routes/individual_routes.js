
//
// GET REQUESTS
//
// get all individuals
router.get('/individuals', function(req, res) {
    models.
    individual.findAll(helper.searchPaginate(req, ["name"])).then(function(
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
    helper.vueTable(req, models.individual, ["name"]).then(
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
    models.individual.create({
        name: req.body.name,
        sowing_date: req.body.sowing_date,
        harvest_date: req.body.harvest_date,
        cultivar_id: req.body.cultivar_id,
        field_plot_id: req.body.field_plot_id,
        pot_id: req.body.pot_id
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
            models.marker.bulkCreate(
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
        }
    }).then(function(individual) {
        if (individual) {
            individual.updateAttributes({
                name: req.body.name,
                sowing_date: req.body.sowing_date,
                harvest_date: req.body.harvest_date,
                cultivar_id: req.body.cultivar_id,
                field_plot_id: req.body.field_plot_id,
                pot_id: req.body.pot_id
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