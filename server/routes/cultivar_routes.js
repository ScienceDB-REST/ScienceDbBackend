
//
// GET REQUESTS
//
// get all cultivars
router.get('/cultivars', function(req, res) {
    models.
    cultivar.findAll(helper.searchPaginate(req, ["description", "genotype"])).then(function(
        cultivars) {
        res.json(cultivars);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get single cultivar
router.get('/cultivar/:id', function(req, res) {
    w = {
        where: {
            id: req.params.id
        }
    }
    i = helper.includeAssociations(req)
    models.
    cultivar.find(objectAssign(w, i)).then(function(x) {
        res.json(x);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get example CSV for subsequent bulk create
router.get('/cultivars/example_csv', function(req, res) {
    var params = JSON.parse(req.query.array);
    var fileType = 'csv';

    if ('excel' in req.query && req.query.excel) {
        fileType = 'excel';
    }

    models.
    cultivar.findAll().then(function(cultivars) {
        var filteredData = helper.filterNotIn(cultivars, params);
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
router.get('/cultivars/vue_table', function(req, res) {
    helper.vueTable(req, models.cultivar, ["description", "genotype", "id"]).then(
        function(x) {
            res.json(x)
        }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get cultivar Data-Model definition 
router.get('/cultivars/definition', function(req, res) {
    models.
    cultivar.findAll().then(function(cultivars) {
        var modelData = helper.dataModel(cultivars);
        res.json(modelData);
    }).catch(function(err) {
        res.status(500).json(err)
    });
});
//
// POST REQUESTS
//
// add new cultivar
router.post('/cultivars', function(req, res) {
    models.cultivar.create(helper.assignForIntersectedKeys({
        description: null,
        genotype: null,
        taxon_id: null

    }, req.body)).then(function(cultivar) {
        res.json(cultivar);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// bulk create cultivars from uploaded CSV file
router.post('/cultivars/upload_csv', function(req, res) {
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

// bulk create cultivars from uploaded xlsx Excel file
router.post('/cultivars/upload_xlsx', function(req, res) {
    xlsxObjs = helper.parseXlsx(req.files.xlsx_file.data.toString('binary'))
    models.cultivar.bulkCreate(
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
// update single cultivar
router.put('/cultivar/:id', function(req, res) {
    models.cultivar.find({
        where: {
            id: req.params.id
        }
    }).then(function(cultivar) {
        if (cultivar) {
            cultivar.updateAttributes(helper.assignForIntersectedKeys({
                description: null,
                genotype: null,
                taxon_id: null

            }, req.body)).then(function(cultivar) {
                res.send(cultivar);
            }).catch(function(err) {
                res.status(500).json(err)
            })
        } else {
            res.status(500).json(new Error('cultivar with id ' + req.params.id +
                ' not found.'))
        }
    });
});
//
// DELETE REQUESTS
//
// delete a cultivar or cultivars
router.delete('/cultivar/(:arr)*', function(req, res) {

    var params = [req.params.arr].concat(req.params[0].split('/').slice(1));

    models.cultivar.destroy({
        where: {
            id: params
        }
    }).then(function(cultivar) {
        res.json(cultivar);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});
