
//
// GET REQUESTS
//
// get all soil_samples
router.get('/soil_samples', function(req, res) {
    models.
    soil_sample.findAll(helper.searchPaginate(req, ["name"])).then(function(
        soil_samples) {
        res.json(soil_samples);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get single soil_sample
router.get('/soil_sample/:id', function(req, res) {
    w = {
        where: {
            id: req.params.id
        }
    }
    i = helper.includeAssociations(req)
    models.
    soil_sample.find(objectAssign(w, i)).then(function(x) {
        res.json(x);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get example CSV for subsequent bulk create
router.get('/soil_samples/example_csv', function(req, res) {
    var params = JSON.parse(req.query.array);
    var fileType = 'csv';

    if ('excel' in req.query && req.query.excel) {
        fileType = 'excel';
    }

    models.
    soil_sample.findAll().then(function(soil_samples) {
        var filteredData = helper.filterNotIn(soil_samples, params);
        if (fileType === 'excel') {
            res.csv(filteredData.map(item => item.dataValues), true);
        } else {
            res.csv(filteredData.map(item => item.dataValues), true);
        }
    }).catch(function(err) {
        res.status(500).json(err)
    })
})

// get for vue-table
router.get('/soil_samples/vue_table', function(req, res) {
    helper.vueTable(req, models.soil_sample, ["name"]).then(
        function(x) {
            res.json(x)
        }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get soil_sample Data-Model definition 
router.get('/soil_samples/definition', function(req, res) {
    models.
    soil_sample.findAll().then(function(soil_samples) {
        var modelData = helper.dataModel(soil_samples);
        res.json(modelData);
    }).catch(function(err) {
        res.status(500).json(err)
    });
});
//
// POST REQUESTS
//
// add new soil_sample
router.post('/soil_samples', function(req, res) {
    models.soil_sample.create(helper.assignForIntersectedKeys({
        name: null,
        harvest_date: null,
        field_plot_id: null,
        pot_id: null

    }, req.body)).then(function(soil_sample) {
        res.json(soil_sample);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// bulk create soil_samples from uploaded CSV file
router.post('/soil_samples/upload_csv', function(req, res) {
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

// bulk create soil_samples from uploaded xlsx Excel file
router.post('/soil_samples/upload_xlsx', function(req, res) {
    xlsxObjs = helper.parseXlsx(req.files.xlsx_file.data.toString('binary'))
    models.soil_sample.bulkCreate(
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
// update single soil_sample
router.put('/soil_sample/:id', function(req, res) {
    models.soil_sample.find({
        where: {
            id: req.params.id
        }
    }).then(function(soil_sample) {
        if (soil_sample) {
            soil_sample.updateAttributes(helper.assignForIntersectedKeys({
                name: null,
                harvest_date: null,
                field_plot_id: null,
                pot_id: null

            }, req.body)).then(function(soil_sample) {
                res.send(soil_sample);
            }).catch(function(err) {
                res.status(500).json(err)
            })
        } else {
            res.status(500).json(new Error('soil_sample with id ' + req.params.id +
                ' not found.'))
        }
    });
});
//
// DELETE REQUESTS
//
// delete a single soil_sample
router.delete('/soil_sample/:id', function(req, res) {
    models.soil_sample.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(soil_sample) {
        res.json(soil_sample);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});