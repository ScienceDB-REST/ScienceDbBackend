
//
// GET REQUESTS
//
// get all samples
router.get('/samples', function(req, res) {
    models.
    sample.findAll(helper.searchPaginate(req, ["id", "name", "material", "life_cycle_phase", "barcode_tag", "description"])).then(function(
        samples) {
        res.json(samples);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get single sample
router.get('/sample/:id', function(req, res) {
    w = {
        where: {
            id: req.params.id
        }
    }
    i = helper.includeAssociations(req)
    models.
    sample.find(objectAssign(w, i)).then(function(x) {
        res.json(x);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get example CSV for subsequent bulk create
router.get('/samples/example_csv', function(req, res) {
    helper.modelCsvExample(models.sample).then(function(modelCsvArr) {
        res.csv(modelCsvArr)
    })
})

// get for vue-table
router.get('/samples/vue_table', function(req, res) {
    helper.vueTable(req, models.sample, ["id", "name", "material", "life_cycle_phase", "barcode_tag", "description"]).then(
        function(x) {
            res.json(x)
        }).catch(function(err) {
        res.status(500).json(err)
    })
});
//
// POST REQUESTS
//
// add new sample
router.post('/samples', function(req, res) {
    models.sample.create(helper.assignForIntersectedKeys({
        name: null,
        material: null,
        life_cycle_phase: null,
        barcode_tag: null,
        description: null,
        harvest_date: null,
        individual_id: null,
        field_plot_id: null,
        pot_id: null,
        parent_id: null

    }, req.body)).then(function(sample) {
        res.json(sample);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// bulk create samples from uploaded CSV file
router.post('/samples/upload_csv', function(req, res) {
    delim = req.body.delim
    cols = req.body.cols
    helper.parseCsv(req.files.csv_file.data.toString(), delim, cols).then(
        function(data) {
            models.sample.bulkCreate(
                data, {
                    validate: true
                }).then(function(data) {
                res.json(data)
            }).catch(function(err) {
                res.status(500).json(err)
            })
        })
});

// bulk create samples from uploaded xlsx Excel file
router.post('/samples/upload_xlsx', function(req, res) {
    xlsxObjs = helper.parseXlsx(req.files.xlsx_file.data.toString('binary'))
    models.sample.bulkCreate(
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
// update single sample
router.put('/sample/:id', function(req, res) {
    models.sample.find({
        where: {
            id: req.params.id
        }
    }).then(function(sample) {
        if (sample) {
            sample.updateAttributes(helper.assignForIntersectedKeys({
                name: null,
                material: null,
                life_cycle_phase: null,
                barcode_tag: null,
                description: null,
                harvest_date: null,
                individual_id: null,
                field_plot_id: null,
                pot_id: null,
                parent_id: null

            }, req.body)).then(function(sample) {
                res.send(sample);
            }).catch(function(err) {
                res.status(500).json(err)
            })
        } else {
            res.status(500).json(new Error('sample with id ' + req.params.id +
                ' not found.'))
        }
    });
});
//
// DELETE REQUESTS
//
// delete a single sample
router.delete('/sample/:id', function(req, res) {
    models.sample.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(sample) {
        res.json(sample);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});