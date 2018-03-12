
//
// GET REQUESTS
//
// get all reference_sequences
router.get('/reference_sequences', function(req, res) {
    models.
    reference_sequence.findAll(helper.searchPaginate(req, ["sequence"])).then(function(
        reference_sequences) {
        res.json(reference_sequences);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get single reference_sequence
router.get('/reference_sequence/:id', function(req, res) {
    w = {
        where: {
            id: req.params.id
        }
    }
    i = helper.includeAssociations(req)
    models.
    reference_sequence.find(objectAssign(w, i)).then(function(x) {
        res.json(x);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get example CSV for subsequent bulk create
router.get('/reference_sequences/example_csv', function(req, res) {
    helper.modelCsvExample(models.reference_sequence).then(function(modelCsvArr) {
        res.csv(modelCsvArr)
    })
})

// get for vue-table
router.get('/reference_sequences/vue_table', function(req, res) {
    helper.vueTable(req, models.reference_sequence, ["sequence"]).then(
        function(x) {
            res.json(x)
        }).catch(function(err) {
        res.status(500).json(err)
    })
});
//
// POST REQUESTS
//
// add new reference_sequence
router.post('/reference_sequences', function(req, res) {
    models.reference_sequence.create({
        sequence: req.body.sequence,
        taxon_id: req.body.taxon_id,
        microbiome_otu_id: req.body.microbiome_otu_id
    }).then(function(reference_sequence) {
        res.json(reference_sequence);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// bulk create reference_sequences from uploaded CSV file
router.post('/reference_sequences/upload_csv', function(req, res) {
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

// bulk create reference_sequences from uploaded xlsx Excel file
router.post('/reference_sequences/upload_xlsx', function(req, res) {
    xlsxObjs = helper.parseXlsx(req.files.xlsx_file.data.toString('binary'))
    models.reference_sequence.bulkCreate(
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
// update single reference_sequence
router.put('/reference_sequence/:id', function(req, res) {
    models.reference_sequence.find({
        where: {
            id: req.params.id
        }
    }).then(function(reference_sequence) {
        if (reference_sequence) {
            reference_sequence.updateAttributes({
                sequence: req.body.sequence,
                taxon_id: req.body.taxon_id,
                microbiome_otu_id: req.body.microbiome_otu_id
            }).then(function(reference_sequence) {
                res.send(reference_sequence);
            }).catch(function(err) {
                res.status(500).json(err)
            })
        } else {
            res.status(500).json(new Error('reference_sequence with id ' + req.params.id +
                ' not found.'))
        }
    });
});
//
// DELETE REQUESTS
//
// delete a single reference_sequence
router.delete('/reference_sequence/:id', function(req, res) {
    models.reference_sequence.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(reference_sequence) {
        res.json(reference_sequence);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});