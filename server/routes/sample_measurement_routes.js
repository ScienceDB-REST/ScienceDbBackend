
//
// GET REQUESTS
//
// get all sample_measurements
router.get('/sample_measurements', acl.middleware(1),
    function(req, res) {
        models.
        sample_measurement.findAll(helper.searchPaginate(req, ["id", "variable", "unit"])).then(function(
            sample_measurements) {
            res.json(sample_measurements);
        }).catch(function(err) {
            res.status(500).json(err)
        })
    });

// get single sample_measurement
router.get('/sample_measurement/:id', acl.middleware(1),
    function(req, res) {
        w = {
            where: {
                id: req.params.id
            }
        }
        i = helper.includeAssociations(req)
        models.
        sample_measurement.find(objectAssign(w, i)).then(function(x) {
            res.json(x);
        }).catch(function(err) {
            res.status(500).json(err)
        })
    });

// get example CSV for subsequent bulk create
router.get('/sample_measurements/example_csv', acl.middleware(1),
    function(req, res) {
        helper.modelCsvExample(models.sample_measurement).then(function(modelCsvArr) {
            res.csv(modelCsvArr)
        })
    })

// get for vue-table
router.get('/sample_measurements/vue_table', acl.middleware(1),
    function(req, res) {
        helper.vueTable(req, models.sample_measurement, ["id", "variable", "unit"]).then(
            function(x) {
                res.json(x)
            }).catch(function(err) {
            res.status(500).json(err)
        })
    });
//
// POST REQUESTS
//
// add new sample_measurement
router.post('/sample_measurements', acl.middleware(1),
    function(req, res) {
        models.sample_measurement.create(helper.assignForIntersectedKeys({
            variable: null,
            value: null,
            unit: null,
            is_average: null

        }, req.body)).then(function(sample_measurement) {
            return helper.setAssociations(
                models.sample_measurement,
                sample_measurement,
                req.body
            )
        }).then(function(sample_measurement) {
            res.json(sample_measurement);
        }).catch(function(err) {
            res.status(500).json(err)
        })
    });

// bulk create sample_measurements from uploaded CSV file
router.post('/sample_measurements/upload_csv', acl.middleware(1),
    function(req, res) {
        delim = req.body.delim
        cols = req.body.cols
        helper.parseCsv(req.files.csv_file.data.toString(), delim, cols).then(
            function(data) {
                models.sample_measurement.bulkCreate(
                    data, {
                        validate: true
                    }).then(function(data) {
                    res.json(data)
                }).catch(function(err) {
                    res.status(500).json(err)
                })
            })
    });

// bulk create sample_measurements from uploaded xlsx Excel file
router.post('/sample_measurements/upload_xlsx', acl.middleware(1),
    function(req, res) {
        xlsxObjs = helper.parseXlsx(req.files.xlsx_file.data.toString('binary'))
        models.sample_measurement.bulkCreate(
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
// update single sample_measurement
router.put('/sample_measurement/:id', acl.middleware(1),
    function(req, res) {
        models.sample_measurement.find({
            where: {
                id: req.params.id
            },
            include: [{
                all: true
            }]
        }).then(function(sample_measurement) {
            if (sample_measurement) {
                sample_measurement.updateAttributes(helper.assignForIntersectedKeys({
                    variable: null,
                    value: null,
                    unit: null,
                    is_average: null

                }, req.body)).then(function(sample_measurement) {
                    return helper.setAssociations(
                        models.sample_measurement,
                        sample_measurement,
                        req.body
                    )
                }).then(function(sample_measurement) {
                    res.send(sample_measurement);
                }).catch(function(err) {
                    res.status(500).json(err)
                })
            } else {
                res.status(500).json(new Error('sample_measurement with id ' + req.params.id +
                    ' not found.'))
            }
        });
    });
//
// DELETE REQUESTS
//
// delete a single sample_measurement
router.delete('/sample_measurement/:id', acl.middleware(1),
    function(req, res) {
        models.sample_measurement.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(sample_measurement) {
            res.json(sample_measurement);
        }).catch(function(err) {
            res.status(500).json(err)
        })
    });