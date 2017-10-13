
//
// GET REQUESTS
//
// get all ﬁeld_plots
router.get('/ﬁeld_plots', function(req, res) {
    models.
    ﬁeld_plot.findAll(helper.searchPaginate(req, ["ﬁeld_name", "location_code", "soil_treatment"])).then(function(
        ﬁeld_plots) {
        res.json(ﬁeld_plots);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get single ﬁeld_plot
router.get('/ﬁeld_plot/:id', function(req, res) {
    w = {
        where: {
            id: req.params.id
        }
    }
    i = helper.includeAssociations(req)
    models.
    ﬁeld_plot.find(objectAssign(w, i)).then(function(x) {
        res.json(x);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get example CSV for subsequent bulk create
router.get('/ﬁeld_plots/example_csv', function(req, res) {
    helper.modelCsvExample(models.ﬁeld_plot).then(function(modelCsvArr) {
        res.csv(modelCsvArr)
    })
})

// get for vue-table
router.get('/ﬁeld_plots/vue_table', function(req, res) {
    helper.vueTable(req, models.ﬁeld_plot, ["ﬁeld_name", "location_code", "soil_treatment"]).then(
        function(x) {
            res.json(x)
        }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get ﬁeld_plot Data-Model definition 
router.get('/ﬁeld_plots/definition', function(req, res) {
    models.
    ﬁeld_plot.findAll().then(function(ﬁeld_plots) {
        var modelData = helper.dataModel(ﬁeld_plots);
        res.json(modelData);
    }).catch(function(err) {
        res.status(500).json(err)
    });
});
//
// POST REQUESTS
//
// add new ﬁeld_plot
router.post('/ﬁeld_plots', function(req, res) {
    models.ﬁeld_plot.create(helper.assignForIntersectedKeys({
        ﬁeld_name: null,
        latitude: null,
        longitude: null,
        location_code: null,
        soil_treatment: null

    }, req.body)).then(function(ﬁeld_plot) {
        res.json(ﬁeld_plot);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// bulk create ﬁeld_plots from uploaded CSV file
router.post('/ﬁeld_plots/upload_csv', function(req, res) {
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

// bulk create ﬁeld_plots from uploaded xlsx Excel file
router.post('/ﬁeld_plots/upload_xlsx', function(req, res) {
    xlsxObjs = helper.parseXlsx(req.files.xlsx_file.data.toString('binary'))
    models.ﬁeld_plot.bulkCreate(
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
// update single ﬁeld_plot
router.put('/ﬁeld_plot/:id', function(req, res) {
    models.ﬁeld_plot.find({
        where: {
            id: req.params.id
        }
    }).then(function(ﬁeld_plot) {
        if (ﬁeld_plot) {
            ﬁeld_plot.updateAttributes(helper.assignForIntersectedKeys({
                ﬁeld_name: null,
                latitude: null,
                longitude: null,
                location_code: null,
                soil_treatment: null

            }, req.body)).then(function(ﬁeld_plot) {
                res.send(ﬁeld_plot);
            }).catch(function(err) {
                res.status(500).json(err)
            })
        } else {
            res.status(500).json(new Error('ﬁeld_plot with id ' + req.params.id +
                ' not found.'))
        }
    });
});
//
// DELETE REQUESTS
//
// delete a single ﬁeld_plot
router.delete('/ﬁeld_plot/:id', function(req, res) {
    models.ﬁeld_plot.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(ﬁeld_plot) {
        res.json(ﬁeld_plot);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});