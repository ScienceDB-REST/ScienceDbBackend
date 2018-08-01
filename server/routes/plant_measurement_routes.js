
//
// GET REQUESTS
//
// get all plant_measurements
router.get('/plant_measurements', acl.middleware(1),
    function(req, res) {
        models.
        plant_measurement.findAll(helper.searchPaginate(req, ["id", "variable", "unit"])).then(function(
            plant_measurements) {
            res.json(plant_measurements);
        }).catch(function(err) {
            res.status(500).json(err)
        })
    });

// get single plant_measurement
router.get('/plant_measurement/:id', acl.middleware(1),
    function(req, res) {
        w = {
            where: {
                id: req.params.id
            }
        }
        i = helper.includeAssociations(req)
        models.
        plant_measurement.find(objectAssign(w, i)).then(function(x) {
            res.json(x);
        }).catch(function(err) {
            res.status(500).json(err)
        })
    });

// get example CSV for subsequent bulk create
router.get('/plant_measurements/example_csv', acl.middleware(1),
    function(req, res) {
        helper.modelCsvExample(models.plant_measurement).then(function(modelCsvArr) {
            res.csv(modelCsvArr)
        })
    })

// get for vue-table
router.get('/plant_measurements/vue_table', acl.middleware(1),
    function(req, res) {
        helper.vueTable(req, models.plant_measurement, ["id", "variable", "unit"]).then(
            function(x) {
                res.json(x)
            }).catch(function(err) {
            res.status(500).json(err)
        })
    });
//
// POST REQUESTS
//
// add new plant_measurement
router.post('/plant_measurements', acl.middleware(1),
    function(req, res) {
        models.plant_measurement.create(helper.assignForIntersectedKeys({
            variable: null,
            value: null,
            unit: null,
            individual_id: null

        }, req.body)).then(function(plant_measurement) {
            return helper.setAssociations(
                models.plant_measurement,
                plant_measurement,
                req.body
            )
        }).then(function(plant_measurement) {
            res.json(plant_measurement);
        }).catch(function(err) {
            res.status(500).json(err)
        })
    });

// bulk create plant_measurements from uploaded CSV file
router.post('/plant_measurements/upload_csv', acl.middleware(1),
    function(req, res) {
        delim = req.body.delim
        cols = req.body.cols
        helper.parseCsv(req.files.csv_file.data.toString(), delim, cols).then(
            function(data) {
                models.plant_measurement.bulkCreate(
                    data, {
                        validate: true
                    }).then(function(data) {
                    res.json(data)
                }).catch(function(err) {
                    res.status(500).json(err)
                })
            })
    });

// bulk create plant_measurements from uploaded xlsx Excel file
router.post('/plant_measurements/upload_xlsx', acl.middleware(1),
    function(req, res) {
        xlsxObjs = helper.parseXlsx(req.files.xlsx_file.data.toString('binary'))
        models.plant_measurement.bulkCreate(
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
// update single plant_measurement
router.put('/plant_measurement/:id', acl.middleware(1),
    function(req, res) {
        models.plant_measurement.find({
            where: {
                id: req.params.id
            },
            include: [{
                all: true
            }]
        }).then(function(plant_measurement) {
            if (plant_measurement) {
                plant_measurement.updateAttributes(helper.assignForIntersectedKeys({
                    variable: null,
                    value: null,
                    unit: null,
                    individual_id: null

                }, req.body)).then(function(plant_measurement) {
                    return helper.setAssociations(
                        models.plant_measurement,
                        plant_measurement,
                        req.body
                    )
                }).then(function(plant_measurement) {
                    res.send(plant_measurement);
                }).catch(function(err) {
                    res.status(500).json(err)
                })
            } else {
                res.status(500).json(new Error('plant_measurement with id ' + req.params.id +
                    ' not found.'))
            }
        });
    });
//
// DELETE REQUESTS
//
// delete a single plant_measurement
router.delete('/plant_measurement/:id', acl.middleware(1),
    function(req, res) {
        models.plant_measurement.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(plant_measurement) {
            res.json(plant_measurement);
        }).catch(function(err) {
            res.status(500).json(err)
        })
    });