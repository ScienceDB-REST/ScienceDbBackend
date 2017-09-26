
//
// GET REQUESTS
//
// get all microbiome_samples
router.get('/microbiome_samples', function(req, res) {
    models.
    microbiome_sample.findAll(helper.searchPaginate(req, ["name", "material", "life_cycle_phas", "barcode_tag", "description"])).then(function(
        microbiome_samples) {
        res.json(microbiome_samples);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get single microbiome_sample
router.get('/microbiome_sample/:id', function(req, res) {
    w = {
        where: {
            id: req.params.id
        }
    }
    i = helper.includeAssociations(req)
    models.
    microbiome_sample.find(objectAssign(w, i)).then(function(x) {
        res.json(x);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get example CSV for subsequent bulk create
router.get('/microbiome_samples/example_csv', function(req, res) {
    helper.modelCsvExample(models.microbiome_sample).then(function(modelCsvArr) {
        res.csv(modelCsvArr)
    })
})

// get for vue-table
router.get('/microbiome_samples/vue_table', function(req, res) {
    helper.vueTable(req, models.microbiome_sample, ["name", "material", "life_cycle_phas", "barcode_tag", "description"]).then(
        function(x) {
            res.json(x)
        }).catch(function(err) {
        res.status(500).json(err)
    })
});
//
// POST REQUESTS
//
// add new microbiome_sample
router.post('/microbiome_samples', function(req, res) {
    models.microbiome_sample.create({
        name: req.body.name,
        material: req.body.material,
        life_cycle_phas: req.body.life_cycle_phas,
        barcode_tag: req.body.barcode_tag,
        description: req.body.description,
        harvest_date: req.body.harvest_date,
        individual_id: req.body.individual_id,
        field_plot_id: req.body.field_plot_id,
        pot_id: req.body.pot_id
    }).then(function(microbiome_sample) {
        res.json(microbiome_sample);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// bulk create microbiome_samples from uploaded CSV file
router.post('/microbiome_samples/upload_csv', function(req, res) {
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

// bulk create microbiome_samples from uploaded xlsx Excel file
router.post('/microbiome_samples/upload_xlsx', function(req, res) {
    xlsxObjs = helper.parseXlsx(req.files.xlsx_file.data.toString('binary'))
    models.microbiome_sample.bulkCreate(
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
// update single microbiome_sample
router.put('/microbiome_sample/:id', function(req, res) {
    models.microbiome_sample.find({
        where: {
            id: req.params.id
        }
    }).then(function(microbiome_sample) {
        if (microbiome_sample) {
            microbiome_sample.updateAttributes({
                name: req.body.name,
                material: req.body.material,
                life_cycle_phas: req.body.life_cycle_phas,
                barcode_tag: req.body.barcode_tag,
                description: req.body.description,
                harvest_date: req.body.harvest_date,
                individual_id: req.body.individual_id,
                field_plot_id: req.body.field_plot_id,
                pot_id: req.body.pot_id
            }).then(function(microbiome_sample) {
                res.send(microbiome_sample);
            }).catch(function(err) {
                res.status(500).json(err)
            })
        } else {
            res.status(500).json(new Error('microbiome_sample with id ' + req.params.id +
                ' not found.'))
        }
    });
});
//
// DELETE REQUESTS
//
// delete a single microbiome_sample
router.delete('/microbiome_sample/:id', function(req, res) {
    models.microbiome_sample.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(microbiome_sample) {
        res.json(microbiome_sample);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});