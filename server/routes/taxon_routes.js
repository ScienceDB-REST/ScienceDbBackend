
//
// GET REQUESTS
//
// get all taxons
router.get('/taxons', acl.middleware(1),
    function(req, res) {
        models.
        taxon.findAll(helper.searchPaginate(req, ["id", "name", "taxonomic_level"])).then(function(
            taxons) {
            res.json(taxons);
        }).catch(function(err) {
            res.status(500).json(err)
        })
    });

// get single taxon
router.get('/taxon/:id', acl.middleware(1),
    function(req, res) {
        w = {
            where: {
                id: req.params.id
            }
        }
        i = helper.includeAssociations(req)
        models.
        taxon.find(objectAssign(w, i)).then(function(x) {
            res.json(x);
        }).catch(function(err) {
            res.status(500).json(err)
        })
    });

// get example CSV for subsequent bulk create
router.get('/taxons/example_csv', //acl.middleware(1),
    function(req, res) {
        helper.modelCsvExample(models.taxon).then(function(modelCsvArr) {
            res.csv(modelCsvArr)
        })
    })

// get for vue-table
router.get('/taxons/vue_table', acl.middleware(1),
    function(req, res) {
        helper.vueTable(req, models.taxon, ["id", "name", "taxonomic_level"]).then(
            function(x) {
                res.json(x)
            }).catch(function(err) {
            res.status(500).json(err)
        })
    });
//
// POST REQUESTS
//
// add new taxon
router.post('/taxons', acl.middleware(1),
    function(req, res) {
        models.taxon.create(helper.assignForIntersectedKeys({
            name: null,
            taxonomic_level: null,
            parent_id: null

        }, req.body)).then(function(taxon) {
            return helper.setAssociations(
                models.taxon,
                taxon,
                req.body
            )
        }).then(function(taxon) {
            res.json(taxon);
        }).catch(function(err) {
            res.status(500).json(err)
        })
    });

// bulk create taxons from uploaded CSV file
router.post('/taxons/upload_csv', acl.middleware(1),
    function(req, res) {
        delim = req.body.delim
        cols = req.body.cols
        helper.parseCsv(req.files.csv_file.data.toString(), delim, cols).then(
            function(data) {
                models.taxon.bulkCreate(
                    data, {
                        validate: true
                    }).then(function(data) {
                    res.json(data)
                }).catch(function(err) {
                    console.log(JSON.stringify(err));
                    res.status(500).json(err)
                })
            })
    });

// bulk create taxons from uploaded xlsx Excel file
router.post('/taxons/upload_xlsx', acl.middleware(1),
    function(req, res) {
        xlsxObjs = helper.parseXlsx(req.files.xlsx_file.data.toString('binary'))
        models.taxon.bulkCreate(
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
// update single taxon
router.put('/taxon/:id', acl.middleware(1),
    function(req, res) {
        models.taxon.find({
            where: {
                id: req.params.id
            },
            include: [{
                all: true
            }]
        }).then(function(taxon) {
            if (taxon) {
                taxon.updateAttributes(helper.assignForIntersectedKeys({
                    name: null,
                    taxonomic_level: null,
                    parent_id: null

                }, req.body)).then(function(taxon) {
                    return helper.setAssociations(
                        models.taxon,
                        taxon,
                        req.body
                    )
                }).then(function(taxon) {
                    res.send(taxon);
                }).catch(function(err) {
                    res.status(500).json(err)
                })
            } else {
                res.status(500).json(new Error('taxon with id ' + req.params.id +
                    ' not found.'))
            }
        });
    });
//
// DELETE REQUESTS
//
// delete a single taxon
router.delete('/taxon/:id', acl.middleware(1),
    function(req, res) {
        models.taxon.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(taxon) {
            res.json(taxon);
        }).catch(function(err) {
            res.status(500).json(err)
        })
    });