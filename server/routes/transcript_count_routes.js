
//
// GET REQUESTS
//
// get all transcript_counts
router.get('/transcript_counts', acl.middleware(1),
    function(req, res) {
        models.
        transcript_count.findAll(helper.searchPaginate(req,
            ["id", "gene", "variable", "tissue_or_condition"])).then(function(
            transcript_counts) {
            res.json(transcript_counts);
        }).catch(function(err) {
            res.status(500).json(err)
        })
    });

// get single transcript_count
router.get('/transcript_count/:id', acl.middleware(1),
    function(req, res) {
        w = {
            where: {
                id: req.params.id
            }
        }
        i = helper.includeAssociations(req)
        models.
        transcript_count.find(objectAssign(w, i)).then(function(x) {
            res.json(x);
        }).catch(function(err) {
            res.status(500).json(err)
        })
    });

// get example CSV for subsequent bulk create
router.get('/transcript_counts/example_csv', acl.middleware(1),
    function(req, res) {
        helper.modelCsvExample(models.transcript_count).then(function(modelCsvArr) {
            res.csv(modelCsvArr)
        })
    })

// get CSV of all transcript_counts
router.get('/transcript_counts/csv_export', acl.middleware(1),
    function(req, res) {
        helper.csvExport(models.transcript_count).then(function(csvStr) {
            res.set({
                'Content-Disposition': 'attachment; filename=transcript_counts.csv',
                'Content-type': 'text/csv'
            })
            res.send(csvStr)
        })
    })

// get for vue-table
router.get('/transcript_counts/vue_table', acl.middleware(1),
    function(req, res) {
        helper.vueTable(req, models.transcript_count,
            ["id", "gene", "variable", "tissue_or_condition"]).then(
            function(x) {
                res.json(x)
            }).catch(function(err) {
            res.status(500).json(err)
        })
    });
//
// POST REQUESTS
//
// add new transcript_count
router.post('/transcript_counts', acl.middleware(1),
    function(req, res) {
        models.transcript_count.create(helper.assignForIntersectedKeys({
            gene: null,
            variable: null,
            count: null,
            tissue_or_condition: null,
            individual_id: null

        }, req.body)).then(function(transcript_count) {
            return helper.setAssociations(
                models.transcript_count,
                transcript_count,
                req.body
            )
        }).then(function(transcript_count) {
            res.json(transcript_count);
        }).catch(function(err) {
            res.status(500).json(err)
        })
    });

// bulk create transcript_counts from uploaded CSV file
router.post('/transcript_counts/upload_csv', acl.middleware(1),
    function(req, res) {
        delim = req.body.delim
        cols = req.body.cols
        helper.parseCsv(req.files.csv_file.data.toString(), delim, cols).then(
            function(data) {
                models.transcript_count.bulkCreate(
                    data, {
                        validate: true
                    }).then(function(data) {
                    res.json(data)
                }).catch(function(err) {
                    res.status(500).json(err)
                })
            })
    });

// bulk create transcript_counts from uploaded xlsx Excel file
router.post('/transcript_counts/upload_xlsx', acl.middleware(1),
    function(req, res) {
        xlsxObjs = helper.parseXlsx(req.files.xlsx_file.data.toString('binary'))
        models.transcript_count.bulkCreate(
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
// update single transcript_count
router.put('/transcript_count/:id', acl.middleware(1),
    function(req, res) {
        models.transcript_count.find({
            where: {
                id: req.params.id
            },
            include: [{
                all: true
            }]
        }).then(function(transcript_count) {
            if (transcript_count) {
                transcript_count.updateAttributes(helper.assignForIntersectedKeys({
                    gene: null,
                    variable: null,
                    count: null,
                    tissue_or_condition: null,
                    individual_id: null

                }, req.body)).then(function(transcript_count) {
                    return helper.setAssociations(
                        models.transcript_count,
                        transcript_count,
                        req.body
                    )
                }).then(function(transcript_count) {
                    res.send(transcript_count);
                }).catch(function(err) {
                    res.status(500).json(err)
                })
            } else {
                res.status(500).json(new Error('transcript_count with id ' + req.params.id +
                    ' not found.'))
            }
        });
    });
//
// DELETE REQUESTS
//
// delete a single transcript_count
router.delete('/transcript_count/:id', acl.middleware(1),
    function(req, res) {
        models.transcript_count.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(transcript_count) {
            res.json(transcript_count);
        }).catch(function(err) {
            res.status(500).json(err)
        })
    });