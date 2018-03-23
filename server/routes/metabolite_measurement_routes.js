
//
// GET REQUESTS
//
// get all metabolite_measurements
router.get('/metabolite_measurements', function(req, res) {
    models.
    metabolite_measurement.findAll(helper.searchPaginate(req, ["id", "metabolite", "unit"])).then(function(
        metabolite_measurements) {
        res.json(metabolite_measurements);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get single metabolite_measurement
router.get('/metabolite_measurement/:id', function(req, res) {
    w = {
        where: {
            id: req.params.id
        }
    }
    i = helper.includeAssociations(req)
    models.
    metabolite_measurement.find(objectAssign(w, i)).then(function(x) {
        res.json(x);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get example CSV for subsequent bulk create
router.get('/metabolite_measurements/example_csv', function(req, res) {
    helper.modelCsvExample(models.metabolite_measurement).then(function(modelCsvArr) {
        res.csv(modelCsvArr)
    })
})

// get for vue-table
router.get('/metabolite_measurements/vue_table', function(req, res) {
    helper.vueTable(req, models.metabolite_measurement, ["id", "metabolite", "unit"]).then(
        function(x) {
            res.json(x)
        }).catch(function(err) {
        res.status(500).json(err)
    })
});
//
// POST REQUESTS
//
// add new metabolite_measurement
router.post('/metabolite_measurements', function(req, res) {
    models.metabolite_measurement.create(helper.assignForIntersectedKeys({
        metabolite: null,
        sample_id: null,
        amount: null,
        unit: null,
        is_average: null

    }, req.body)).then(function(metabolite_measurement) {
        res.json(metabolite_measurement);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// bulk create metabolite_measurements from uploaded CSV file
router.post('/metabolite_measurements/upload_csv', function(req, res) {
    delim = req.body.delim
    cols = req.body.cols
    helper.parseCsv(req.files.csv_file.data.toString(), delim, cols).then(
        function(data) {
            models.metabolite_measurement.bulkCreate(
                data, {
                    validate: true
                }).then(function(data) {
                res.json(data)
            }).catch(function(err) {
                res.status(500).json(err)
            })
        })
});

// bulk create metabolite_measurements from uploaded xlsx Excel file
router.post('/metabolite_measurements/upload_xlsx', function(req, res) {
    xlsxObjs = helper.parseXlsx(req.files.xlsx_file.data.toString('binary'))
    models.metabolite_measurement.bulkCreate(
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
// update single metabolite_measurement
router.put('/metabolite_measurement/:id', function(req, res) {
    models.metabolite_measurement.find({
        where: {
            id: req.params.id
        }
    }).then(function(metabolite_measurement) {
        if (metabolite_measurement) {
            metabolite_measurement.updateAttributes(helper.assignForIntersectedKeys({
                metabolite: null,
                sample_id: null,
                amount: null,
                unit: null,
                is_average: null

            }, req.body)).then(function(metabolite_measurement) {
                res.send(metabolite_measurement);
            }).catch(function(err) {
                res.status(500).json(err)
            })
        } else {
            res.status(500).json(new Error('metabolite_measurement with id ' + req.params.id +
                ' not found.'))
        }
    });
});
//
// DELETE REQUESTS
//
// delete a single metabolite_measurement
router.delete('/metabolite_measurement/:id', function(req, res) {
    models.metabolite_measurement.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(metabolite_measurement) {
        res.json(metabolite_measurement);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});