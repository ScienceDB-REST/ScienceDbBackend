
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
    helper.modelCsvExample(models.cultivar).then(function(modelCsvArr) {
        res.csv(modelCsvArr)
    })
})

// get for vue-table
router.get('/cultivars/vue_table', function(req, res) {
    helper.vueTable(req, models.cultivar, ["description", "genotype"]).then(
        function(x) {
            res.json(x)
        }).catch(function(err) {
        res.status(500).json(err)
    })
});
//
// POST REQUESTS
//
// add new cultivar
router.post('/cultivars', function(req, res) {
    models.cultivar.create({
        description: req.body.description,
        genotype: req.body.genotype,
        taxon_id: req.body.taxon_id
    }).then(function(cultivar) {
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
            models.cultivar.bulkCreate(
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
            cultivar.updateAttributes({
                description: req.body.description,
                genotype: req.body.genotype,
                taxon_id: req.body.taxon_id
            }).then(function(cultivar) {
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
// delete a single cultivar
router.delete('/cultivar/:id', function(req, res) {
    models.cultivar.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(cultivar) {
        res.json(cultivar);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});