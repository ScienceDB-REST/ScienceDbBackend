
//
// GET REQUESTS
//
// get all sample_to_metabolite_measurements
router.get('/sample_to_metabolite_measurements', function(req, res) {
    models.
    sample_to_metabolite_measurement.findAll(helper.searchPaginate(req, ["id"])).then(function(
        sample_to_metabolite_measurements) {
        res.json(sample_to_metabolite_measurements);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get single sample_to_metabolite_measurement
router.get('/sample_to_metabolite_measurement/:id', function(req, res) {
    w = {
        where: {
            id: req.params.id
        }
    }
    i = helper.includeAssociations(req)
    models.
    sample_to_metabolite_measurement.find(objectAssign(w, i)).then(function(x) {
        res.json(x);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get example CSV for subsequent bulk create
router.get('/sample_to_metabolite_measurements/example_csv', function(req, res) {
    helper.modelCsvExample(models.sample_to_metabolite_measurement).then(function(modelCsvArr) {
        res.csv(modelCsvArr)
    })
})

// get for vue-table
router.get('/sample_to_metabolite_measurements/vue_table', function(req, res) {
    helper.vueTable(req, models.sample_to_metabolite_measurement, ["id"]).then(
        function(x) {
            res.json(x)
        }).catch(function(err) {
        res.status(500).json(err)
    })
});
//
// POST REQUESTS
//
// add new sample_to_metabolite_measurement
router.post('/sample_to_metabolite_measurements', function(req, res) {
    models.sample_to_metabolite_measurement.create(helper.assignForIntersectedKeys({
        metabolite_measurement_id: null,
        sample_id: null

    }, req.body)).then(function(sample_to_metabolite_measurement) {
        res.json(sample_to_metabolite_measurement);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// bulk create sample_to_metabolite_measurements from uploaded CSV file
router.post('/sample_to_metabolite_measurements/upload_csv', function(req, res) {
    delim = req.body.delim
    cols = req.body.cols
    helper.parseCsv(req.files.csv_file.data.toString(), delim, cols).then(
        function(data) {
            models.sample_to_metabolite_measurement.bulkCreate(
                data, {
                    validate: true
                }).then(function(data) {
                res.json(data)
            }).catch(function(err) {
                res.status(500).json(err)
            })
        })
});

// bulk create sample_to_metabolite_measurements from uploaded xlsx Excel file
router.post('/sample_to_metabolite_measurements/upload_xlsx', function(req, res) {
    xlsxObjs = helper.parseXlsx(req.files.xlsx_file.data.toString('binary'))
    models.sample_to_metabolite_measurement.bulkCreate(
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
// update single sample_to_metabolite_measurement
router.put('/sample_to_metabolite_measurement/:id', function(req, res) {
    models.sample_to_metabolite_measurement.find({
        where: {
            id: req.params.id
        }
    }).then(function(sample_to_metabolite_measurement) {
        if (sample_to_metabolite_measurement) {
            sample_to_metabolite_measurement.updateAttributes(helper.assignForIntersectedKeys({
                metabolite_measurement_id: null,
                sample_id: null

            }, req.body)).then(function(sample_to_metabolite_measurement) {
                res.send(sample_to_metabolite_measurement);
            }).catch(function(err) {
                res.status(500).json(err)
            })
        } else {
            res.status(500).json(new Error('sample_to_metabolite_measurement with id ' + req.params.id +
                ' not found.'))
        }
    });
});
//
// DELETE REQUESTS
//
// delete a single sample_to_metabolite_measurement
router.delete('/sample_to_metabolite_measurement/:id', function(req, res) {
    models.sample_to_metabolite_measurement.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(sample_to_metabolite_measurement) {
        res.json(sample_to_metabolite_measurement);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});