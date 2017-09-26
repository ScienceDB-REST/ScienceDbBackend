
//
// GET REQUESTS
//
// get all microbiome_profiles
router.get('/microbiome_profiles', function(req, res) {
    models.
    microbiome_profile.findAll(helper.searchPaginate(req, [])).then(function(
        microbiome_profiles) {
        res.json(microbiome_profiles);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get single microbiome_profile
router.get('/microbiome_profile/:id', function(req, res) {
    w = {
        where: {
            id: req.params.id
        }
    }
    i = helper.includeAssociations(req)
    models.
    microbiome_profile.find(objectAssign(w, i)).then(function(x) {
        res.json(x);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get example CSV for subsequent bulk create
router.get('/microbiome_profiles/example_csv', function(req, res) {
    helper.modelCsvExample(models.microbiome_profile).then(function(modelCsvArr) {
        res.csv(modelCsvArr)
    })
})

// get for vue-table
router.get('/microbiome_profiles/vue_table', function(req, res) {
    helper.vueTable(req, models.microbiome_profile, []).then(
        function(x) {
            res.json(x)
        }).catch(function(err) {
        res.status(500).json(err)
    })
});
//
// POST REQUESTS
//
// add new microbiome_profile
router.post('/microbiome_profiles', function(req, res) {
    models.microbiome_profile.create({
        microbiome_sample_id: req.body.microbiome_sample_id,
        taxon_id: req.body.taxon_id,
        count: req.body.count
    }).then(function(microbiome_profile) {
        res.json(microbiome_profile);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// bulk create microbiome_profiles from uploaded CSV file
router.post('/microbiome_profiles/upload_csv', function(req, res) {
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

// bulk create microbiome_profiles from uploaded xlsx Excel file
router.post('/microbiome_profiles/upload_xlsx', function(req, res) {
    xlsxObjs = helper.parseXlsx(req.files.xlsx_file.data.toString('binary'))
    models.microbiome_profile.bulkCreate(
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
// update single microbiome_profile
router.put('/microbiome_profile/:id', function(req, res) {
    models.microbiome_profile.find({
        where: {
            id: req.params.id
        }
    }).then(function(microbiome_profile) {
        if (microbiome_profile) {
            microbiome_profile.updateAttributes({
                microbiome_sample_id: req.body.microbiome_sample_id,
                taxon_id: req.body.taxon_id,
                count: req.body.count
            }).then(function(microbiome_profile) {
                res.send(microbiome_profile);
            }).catch(function(err) {
                res.status(500).json(err)
            })
        } else {
            res.status(500).json(new Error('microbiome_profile with id ' + req.params.id +
                ' not found.'))
        }
    });
});
//
// DELETE REQUESTS
//
// delete a single microbiome_profile
router.delete('/microbiome_profile/:id', function(req, res) {
    models.microbiome_profile.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(microbiome_profile) {
        res.json(microbiome_profile);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});