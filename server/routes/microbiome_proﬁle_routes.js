
//
// GET REQUESTS
//
// get all microbiome_proﬁles
router.get('/microbiome_proﬁles', function(req, res) {
    models.
    microbiome_proﬁle.findAll(helper.searchPaginate(req, [])).then(function(
        microbiome_proﬁles) {
        res.json(microbiome_proﬁles);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get single microbiome_proﬁle
router.get('/microbiome_proﬁle/:id', function(req, res) {
    w = {
        where: {
            id: req.params.id
        }
    }
    i = helper.includeAssociations(req)
    models.
    microbiome_proﬁle.find(objectAssign(w, i)).then(function(x) {
        res.json(x);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get example CSV for subsequent bulk create
router.get('/microbiome_proﬁles/example_csv', function(req, res) {
    helper.modelCsvExample(models.microbiome_proﬁle).then(function(modelCsvArr) {
        res.csv(modelCsvArr)
    })
})

// get for vue-table
router.get('/microbiome_proﬁles/vue_table', function(req, res) {
    helper.vueTable(req, models.microbiome_proﬁle, []).then(
        function(x) {
            res.json(x)
        }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get microbiome_proﬁle Data-Model definition 
router.get('/microbiome_proﬁles/definition', function(req, res) {
    models.
    microbiome_proﬁle.findAll().then(function(microbiome_proﬁles) {
        var modelData = helper.dataModel(microbiome_proﬁles);
        res.json(modelData);
    }).catch(function(err) {
        res.status(500).json(err)
    });
});
//
// POST REQUESTS
//
// add new microbiome_proﬁle
router.post('/microbiome_proﬁles', function(req, res) {
    models.microbiome_proﬁle.create(helper.assignForIntersectedKeys({
        microbiome_sample_id: null,
        taxon_id: null,
        count: null

    }, req.body)).then(function(microbiome_proﬁle) {
        res.json(microbiome_proﬁle);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// bulk create microbiome_proﬁles from uploaded CSV file
router.post('/microbiome_proﬁles/upload_csv', function(req, res) {
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

// bulk create microbiome_proﬁles from uploaded xlsx Excel file
router.post('/microbiome_proﬁles/upload_xlsx', function(req, res) {
    xlsxObjs = helper.parseXlsx(req.files.xlsx_file.data.toString('binary'))
    models.microbiome_proﬁle.bulkCreate(
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
// update single microbiome_proﬁle
router.put('/microbiome_proﬁle/:id', function(req, res) {
    models.microbiome_proﬁle.find({
        where: {
            id: req.params.id
        }
    }).then(function(microbiome_proﬁle) {
        if (microbiome_proﬁle) {
            microbiome_proﬁle.updateAttributes(helper.assignForIntersectedKeys({
                microbiome_sample_id: null,
                taxon_id: null,
                count: null

            }, req.body)).then(function(microbiome_proﬁle) {
                res.send(microbiome_proﬁle);
            }).catch(function(err) {
                res.status(500).json(err)
            })
        } else {
            res.status(500).json(new Error('microbiome_proﬁle with id ' + req.params.id +
                ' not found.'))
        }
    });
});
//
// DELETE REQUESTS
//
// delete a single microbiome_proﬁle
router.delete('/microbiome_proﬁle/:id', function(req, res) {
    models.microbiome_proﬁle.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(microbiome_proﬁle) {
        res.json(microbiome_proﬁle);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});