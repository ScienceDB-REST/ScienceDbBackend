
//
// GET REQUESTS
//
// get all cultivars
router.get('/cultivars', acl.middleware(1),
    function(req, res) {
        models.
        cultivar.findAll(helper.searchPaginate(req,
            ["id", "description", "genotype"])).then(function(
            cultivars) {
            res.json(cultivars);
        }).catch(function(err) {
            res.status(500).json(err)
        })
    });

// get single cultivar
router.get('/cultivar/:id', acl.middleware(1),
    function(req, res) {
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
router.get('/cultivars/example_csv', acl.middleware(1),
    function(req, res) {
        helper.modelCsvExample(models.cultivar).then(function(modelCsvArr) {
            res.csv(modelCsvArr)
        })
    })

// get CSV of all cultivars
router.get('/cultivars/csv_export', acl.middleware(1),
    function(req, res) {
        helper.csvExport(models.cultivar).then(function(csvStr) {
            res.set({
                'Content-Disposition': 'attachment; filename=cultivars.csv',
                'Content-type': 'text/csv'
            })
            res.send(csvStr)
        })
    })

// get for vue-table
router.get('/cultivars/vue_table', acl.middleware(1),
    function(req, res) {
        helper.vueTable(req, models.cultivar,
            ["id", "description", "genotype"]).then(
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
router.post('/cultivars', acl.middleware(1),
    function(req, res) {
        models.cultivar.create(helper.assignForIntersectedKeys({
            description: null,
            genotype: null,
            taxon_id: null

        }, req.body)).then(function(cultivar) {
            return helper.setAssociations(
                models.cultivar,
                cultivar,
                req.body
            )
        }).then(function(cultivar) {
            res.json(cultivar);
        }).catch(function(err) {
            res.status(500).json(err)
        })
    });

// bulk create cultivars from uploaded CSV file
router.post('/cultivars/upload_csv', acl.middleware(1),
    function(req, res) {
        delim = req.body.delim
        cols = req.body.cols
        tmpFile = path.join(__dirname, '..', '..', 'tmp', uuidV4() + '.csv')
        req.files.csv_file.mv(tmpFile).then(() => {
            return helper.parseCsvStream(tmpFile, models.cultivar, delim, cols)
        }).then(() => {
            res.status(200).json('OK')
        }).catch((err) => {
            console.trace(err)
            res.status(500).json(err)
        }).finally(() => {
            fs.unlinkSync(tmpFile)
        })
    });

// bulk create cultivars from uploaded xlsx Excel file
router.post('/cultivars/upload_xlsx', acl.middleware(1),
    function(req, res) {
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
router.put('/cultivar/:id', acl.middleware(1),
    function(req, res) {
        models.cultivar.find({
            where: {
                id: req.params.id
            },
            include: [{
                all: true
            }]
        }).then(function(cultivar) {
            if (cultivar) {
                cultivar.updateAttributes(helper.assignForIntersectedKeys({
                    description: null,
                    genotype: null,
                    taxon_id: null

                }, req.body)).then(function(cultivar) {
                    return helper.setAssociations(
                        models.cultivar,
                        cultivar,
                        req.body
                    )
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
router.delete('/cultivar/:id', acl.middleware(1),
    function(req, res) {
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