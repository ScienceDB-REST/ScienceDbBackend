
//
// GET REQUESTS
//
// get all pots
router.get('/pots', function(req, res) {
    models.
    pot.findAll(helper.searchPaginate(req, ["pot", "greenhouse", "climate_chamber", "conditions"])).then(function(
        pots) {
        res.json(pots);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get single pot
router.get('/pot/:id', function(req, res) {
    w = {
        where: {
            id: req.params.id
        }
    }
    i = helper.includeAssociations(req)
    models.
    pot.find(objectAssign(w, i)).then(function(x) {
        res.json(x);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get example CSV for subsequent bulk create
router.get('/pots/example_csv', function(req, res) {
    helper.modelCsvExample(models.pot).then(function(modelCsvArr) {
        res.csv(modelCsvArr)
    })
})

// get for vue-table
router.get('/pots/vue_table', function(req, res) {
    helper.vueTable(req, models.pot, ["pot", "greenhouse", "climate_chamber", "conditions"]).then(
        function(x) {
            res.json(x)
        }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get pot Data-Model definition 
router.get('/pots/definition', function(req, res) {
    models.
    pot.findAll().then(function(pots) {
        var modelData = helper.dataModel(pots);
        res.json(modelData);
    }).catch(function(err) {
        res.status(500).json(err)
    });
});
//
// POST REQUESTS
//
// add new pot
router.post('/pots', function(req, res) {
    models.pot.create(helper.assignForIntersectedKeys({
        pot: null,
        greenhouse: null,
        climate_chamber: null,
        conditions: null

    }, req.body)).then(function(pot) {
        res.json(pot);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// bulk create pots from uploaded CSV file
router.post('/pots/upload_csv', function(req, res) {
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

// bulk create pots from uploaded xlsx Excel file
router.post('/pots/upload_xlsx', function(req, res) {
    xlsxObjs = helper.parseXlsx(req.files.xlsx_file.data.toString('binary'))
    models.pot.bulkCreate(
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
// update single pot
router.put('/pot/:id', function(req, res) {
    models.pot.find({
        where: {
            id: req.params.id
        }
    }).then(function(pot) {
        if (pot) {
            pot.updateAttributes(helper.assignForIntersectedKeys({
                pot: null,
                greenhouse: null,
                climate_chamber: null,
                conditions: null

            }, req.body)).then(function(pot) {
                res.send(pot);
            }).catch(function(err) {
                res.status(500).json(err)
            })
        } else {
            res.status(500).json(new Error('pot with id ' + req.params.id +
                ' not found.'))
        }
    });
});
//
// DELETE REQUESTS
//
// delete a single pot
router.delete('/pot/:id', function(req, res) {
    models.pot.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(pot) {
        res.json(pot);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});