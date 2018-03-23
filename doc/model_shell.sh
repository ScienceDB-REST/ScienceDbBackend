./node_modules/.bin/sequelize model:create --name taxon --attributes 'name:string, taxonomic_level:string, parent_id:integer'
./node_modules/.bin/sequelize db:migrate
express_route_gen . --name taxon --attributes 'name:string, taxonomic_level:string, parent_id:integer'

./node_modules/.bin/sequelize model:create --name field_plot --attributes 'field_name:string, latitude:double, longitude:double, location_code:string, soil_treatment:string'
./node_modules/.bin/sequelize db:migrate
express_route_gen . --name field_plot --attributes 'field_name:string, latitude:double, longitude:double, location_code:string, soil_treatment:string'

./node_modules/.bin/sequelize model:create --name pot --attributes 'pot:string, greenhouse:string, climate_chamber:string, conditions:string'
./node_modules/.bin/sequelize db:migrate
express_route_gen . --name pot --attributes 'pot:string, greenhouse:string, climate_chamber:string, conditions:string'

./node_modules/.bin/sequelize model:create --name cultivar --attributes 'description:string, genotype:string, taxon_id:integer'
./node_modules/.bin/sequelize db:migrate
express_route_gen . --name cultivar --attributes 'description:string, genotype:string, taxon_id:integer'

./node_modules/.bin/sequelize model:create --name individual --attributes 'name:string, sowing_date:date, harvest_date:date, cultivar_id:integer, field_plot_id:integer, pot_id:integer'
./node_modules/.bin/sequelize db:migrate
express_route_gen . --name individual --attributes 'name:string, sowing_date:date, harvest_date:date, cultivar_id:integer, field_plot_id:integer, pot_id:integer'

./node_modules/.bin/sequelize model:create --name sample --attributes 'name:string, material:string, life_cycle_phase:string, barcode_tag:string, description:string, harvest_date:date, individual_id:integer, field_plot_id:integer, pot_id:integer, parent_id:integer'
./node_modules/.bin/sequelize db:migrate
express_route_gen . --name sample --attributes 'name:string, material:string, life_cycle_phase:string, barcode_tag:string, description:string, harvest_date:date, individual_id:integer, field_plot_id:integer, pot_id:integer, parent_id:integer'

./node_modules/.bin/sequelize model:create --name microbiome_otu --attributes 'reference_sequence_id:integer, otu_id:string, sample_id:integer, sample_desc:string, count:integer, experiment:string, version:integer, kingdom:string'
./node_modules/.bin/sequelize db:migrate
express_route_gen . --name microbiome_otu --attributes 'reference_sequence_id:integer, otu_id:string, sample_id:integer, sample_desc:string, count:integer, experiment:string, version:integer, kingdom:string'

./node_modules/.bin/sequelize model:create --name reference_sequence --attributes 'sequence:string, taxon_id:integer, microbiome_otu_id:integer'
./node_modules/.bin/sequelize db:migrate
express_route_gen . --name reference_sequence --attributes 'sequence:string, taxon_id:integer, microbiome_otu_id:integer'

./node_modules/.bin/sequelize model:create --name metabolite_measurement --attributes 'metabolite:string, amount:double, unit:string'
./node_modules/.bin/sequelize db:migrate
express_route_gen . --name metabolite_measurement --attributes 'metabolite:string, sample_id:integer, amount:double, unit:string, is_average:boolean'

./node_modules/.bin/sequelize model:create --name sample_to_metabolite_measurement --attributes 'metabolite_measurement_id:integer, sample_id:integer'
./node_modules/.bin/sequelize db:migrate
express_route_gen .  --name sample_to_metabolite_measurement --attributes 'metabolite_measurement_id:integer, sample_id:integer'
