
//
// GET REQUESTS
//
// get all microbiome_otus
router.get('/microbiome_otus', function(req, res) {
    models.
    microbiome_otu.findAll(helper.searchPaginate(req, ["id", "otu_id", "sample_desc", "experiment", "kingdom"])).then(function(
        microbiome_otus) {
        res.json(microbiome_otus);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get single microbiome_otu
router.get('/microbiome_otu/:id', function(req, res) {
    w = {
        where: {
            id: req.params.id
        }
    }
    i = helper.includeAssociations(req)
    models.
    microbiome_otu.find(objectAssign(w, i)).then(function(x) {
        res.json(x);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get example CSV for subsequent bulk create
router.get('/microbiome_otus/example_csv', function(req, res) {
    helper.modelCsvExample(models.microbiome_otu).then(function(modelCsvArr) {
        res.csv(modelCsvArr)
    })
})

// get for vue-table
router.get('/microbiome_otus/vue_table', function(req, res) {
    helper.vueTable(req, models.microbiome_otu, ["id", "otu_id", "sample_desc", "experiment", "kingdom"]).then(
        function(x) {
            res.json(x)
        }).catch(function(err) {
        res.status(500).json(err)
    })
});
//
// POST REQUESTS
//
// add new microbiome_otu
router.post('/microbiome_otus', function(req, res) {
    models.microbiome_otu.create(helper.assignForIntersectedKeys({
        reference_sequence_id: null,
        otu_id: null,
        sample_id: null,
        sample_desc: null,
        count: null,
        experiment: null,
        version: null,
        kingdom: null

    }, req.body)).then(function(microbiome_otu) {
        return helper.setAssociations(
            models.microbiome_otu,
            microbiome_otu,
            req.body
        )
    }).then(function(microbiome_otu) {
        res.json(microbiome_otu);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// bulk create microbiome_otus from uploaded CSV file
router.post('/microbiome_otus/upload_csv', function(req, res) {
    delim = req.body.delim
    cols = req.body.cols
    helper.parseCsv(req.files.csv_file.data.toString(), delim, cols).then(
        function(data) {
            models.microbiome_otu.bulkCreate(
                data, {
                    validate: true
                }).then(function(data) {
                res.json(data)
            }).catch(function(err) {
                res.status(500).json(err)
            })
        })
});

// bulk create microbiome_otus from uploaded xlsx Excel file
router.post('/microbiome_otus/upload_xlsx', function(req, res) {
    xlsxObjs = helper.parseXlsx(req.files.xlsx_file.data.toString('binary'))
    models.microbiome_otu.bulkCreate(
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
// update single microbiome_otu
router.put('/microbiome_otu/:id', function(req, res) {
    models.microbiome_otu.find({
        where: {
            id: req.params.id
        },
        include: [{
            all: true
        }]
    }).then(function(microbiome_otu) {
        if (microbiome_otu) {
            microbiome_otu.updateAttributes(helper.assignForIntersectedKeys({
                reference_sequence_id: null,
                otu_id: null,
                sample_id: null,
                sample_desc: null,
                count: null,
                experiment: null,
                version: null,
                kingdom: null

            }, req.body)).then(function(microbiome_otu) {
                return helper.setAssociations(
                    models.microbiome_otu,
                    microbiome_otu,
                    req.body
                )
            }).then(function(microbiome_otu) {
                res.send(microbiome_otu);
            }).catch(function(err) {
                res.status(500).json(err)
            })
        } else {
            res.status(500).json(new Error('microbiome_otu with id ' + req.params.id +
                ' not found.'))
        }
    });
});
//
// DELETE REQUESTS
//
// delete a single microbiome_otu
router.delete('/microbiome_otu/:id', function(req, res) {
    models.microbiome_otu.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(microbiome_otu) {
        res.json(microbiome_otu);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});