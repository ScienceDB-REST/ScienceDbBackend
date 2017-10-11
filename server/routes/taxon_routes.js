
//
// GET REQUESTS
//
// get all taxons
router.get('/taxons', function(req, res) {
    models.
    taxon.findAll(helper.searchPaginate(req, ["name", "taxonomic_level"])).then(function(
        taxons) {
        res.json(taxons);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get single taxon
router.get('/taxon/:id', function(req, res) {
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
router.get('/taxons/example_csv', function(req, res) {

    var params = JSON.parse(req.query.array);
    var fileType = 'csv';

    if('excel' in req.query && req.query.excel){
        fileType = 'excel';
    }

    models.
    taxon.findAll().then(function(taxons) {
        var rsData = helper.filterNotIn(taxons, params);
        if(fileType === 'excel'){
            res.csv(rsData.map(item => item.dataValues), true);
        }
        else{
            res.csv(rsData.map(item => item.dataValues), true);
        }
        
    }).catch(function(err) {
        res.status(500).json(err)
    });
});

// get for vue-table
router.get('/taxons/vue_table', function(req, res) {
    helper.vueTable(req, models.taxon, ["id", "name", "taxonomic_level"]).then(
        function(x) {
            res.json(x)
        }).catch(function(err) {
        res.status(500).json(err)
    })
});

// get taxon Data-Model definition 
router.get('/taxons/definition', function(req, res) {
    models.
    taxon.findAll().then(function(taxons) {
        var modelData = helper.dataModel(taxons);
        res.json(modelData);        
    }).catch(function(err) {
        res.status(500).json(err)
    });
});

//
// POST REQUESTS
//
// add new taxon
router.post('/taxons', function(req, res) {
    models.taxon.create({
        name: req.body.name,
        taxonomic_level: req.body.taxonomic_level,
        parent_id: req.body.parent_id
    }).then(function(taxon) {
        res.json(taxon);
    }).catch(function(err) {
        res.status(500).json(err)
    })
});

// bulk create taxons from uploaded CSV file
router.post('/taxons/upload_csv', function(req, res) {
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

// bulk create taxons from uploaded xlsx Excel file
router.post('/taxons/upload_xlsx', function(req, res) {
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
router.put('/taxon/:id', function(req, res) {
    models.taxon.find({
        where: {
            id: req.params.id
        }
    }).then(function(taxon) {
        if (taxon) {
            taxon.updateAttributes({
                name: req.body.name,
                taxonomic_level: req.body.taxonomic_level,
                parent_id: req.body.parent_id
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
// delete a taxon/taxons
//router.delete('/taxon/:id', function(req, res) {
//    id: req.params.id
router.delete('/taxon/(:arr)*', function(req, res) {

    var params = [req.params.arr].concat(req.params[0].split('/').slice(1));

    models.taxon.destroy({
        where: {
            id: params
        }
    }).then(function(taxon) {
        res.json(taxon);
    }).catch(function(err) {
        res.status(500).json(err)
    })    
});
