
//
// GET REQUESTS
//
// get all field_plots
router.get('/field_plots', function(req, res) {
    models.
    field_plot.findAll(helper.searchPaginate(req, ["field_name", "location_code", "soil_treatment"])).then(function(
        field_plots) {
        res.json(field_plots);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get single field_plot
router.get('/field_plot/:id', function(req, res) {
    w = {
        where: {
            id: req.params.id
        }
    }
    i = helper.includeAssociations(req)
    models.
    field_plot.find(objectAssign(w, i)).then(function(x) {
        res.json(x);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get example CSV for subsequent bulk create
router.get('/field_plots/example_csv', function(req, res) {
    var params = JSON.parse(req.query.array);
    var fileType = 'csv';

    if ('excel' in req.query && req.query.excel) {
        fileType = 'excel';
    }

    models.
    field_plot.findAll().then(function(field_plots) {
        var filteredData = helper.filterNotIn(field_plots, params);
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
router.get('/field_plots/vue_table', function(req, res) {
    helper.vueTable(req, models.field_plot, ["field_name", "location_code", "soil_treatment", "id"]).then(
        function(x) {
            res.json(x)
        }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get field_plot Data-Model definition 
router.get('/field_plots/definition', function(req, res) {
    models.
    field_plot.findAll().then(function(field_plots) {
        var modelData = helper.dataModel(field_plots);
        res.json(modelData);
    }).catch(function(err) {
        res.status(500).json(err)
    });
});
//
// POST REQUESTS
//
// add new field_plot
router.post('/field_plots', function(req, res) {
    models.field_plot.create(helper.assignForIntersectedKeys({
        field_name: null,
        latitude: null,
        longitude: null,
        location_code: null,
        soil_treatment: null

    }, req.body)).then(function(field_plot) {
        res.json(field_plot);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// bulk create field_plots from uploaded CSV file
router.post('/field_plots/upload_csv', function(req, res) {
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

// bulk create field_plots from uploaded xlsx Excel file
router.post('/field_plots/upload_xlsx', function(req, res) {
    xlsxObjs = helper.parseXlsx(req.files.xlsx_file.data.toString('binary'))
    models.field_plot.bulkCreate(
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
// update single field_plot
router.put('/field_plot/:id', function(req, res) {
    models.field_plot.find({
        where: {
            id: req.params.id
        }
    }).then(function(field_plot) {
        if (field_plot) {
            field_plot.updateAttributes(helper.assignForIntersectedKeys({
                field_name: null,
                latitude: null,
                longitude: null,
                location_code: null,
                soil_treatment: null

            }, req.body)).then(function(field_plot) {
                res.send(field_plot);
            }).catch(function(err) {
                res.status(500).json(err)
            })
        } else {
            res.status(500).json(new Error('field_plot with id ' + req.params.id +
                ' not found.'))
        }
    });
});
//
// DELETE REQUESTS
//
// delete a field_plot or field_plots
router.delete('/field_plot/(:arr)*', function(req, res) {

    var params = [req.params.arr].concat(req.params[0].split('/').slice(1));

    models.field_plot.destroy({
        where: {
            id: params
        }
    }).then(function(field_plot) {
        res.json(field_plot);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});
