./node_modules/.bin/sequelize model:create --name taxon --attributes 'name:string, taxonomic_level:string, parent_id:integer'
./node_modules/.bin/sequelize db:migrate
express_route_gen . --name taxon --attributes 'name:string, taxonomic_level:string, parent_id:integer'

./node_modules/.bin/sequelize model:create --name ﬁeld_plot --attributes 'ﬁeld_name:string, latitude:double, longitude:double, location_code:string, soil_treatment:string'
./node_modules/.bin/sequelize db:migrate
express_route_gen . --name ﬁeld_plot --attributes 'ﬁeld_name:string, latitude:double, longitude:double, location_code:string, soil_treatment:string'

./node_modules/.bin/sequelize model:create --name pot --attributes 'pot:string, greenhouse:string, climate_chamber:string, conditions:string'
./node_modules/.bin/sequelize db:migrate
express_route_gen . --name pot --attributes 'pot:string, greenhouse:string, climate_chamber:string, conditions:string'

./node_modules/.bin/sequelize model:create --name cultivar --attributes 'description:string, genotype:string, taxon_id:integer'
./node_modules/.bin/sequelize db:migrate
express_route_gen . --name cultivar --attributes 'description:string, genotype:string, taxon_id:integer'

./node_modules/.bin/sequelize model:create --name individual --attributes 'name:string, sowing_date:date, harvest_date:date, cultivar_id:integer, ﬁeld_plot_id:integer, pot_id:integer'
./node_modules/.bin/sequelize db:migrate
express_route_gen . --name individual --attributes 'name:string, sowing_date:date, harvest_date:date, cultivar_id:integer, ﬁeld_plot_id:integer, pot_id:integer'

./node_modules/.bin/sequelize model:create --name microbiome_sample --attributes 'name:string, material:string, life_cycle_phas:string, barcode_tag:string, description:string, harvest_date:date, individual_id:integer, field_plot_id:integer, pot_id:integer'
./node_modules/.bin/sequelize db:migrate
express_route_gen . --name microbiome_sample --attributes 'name:string, material:string, life_cycle_phas:string, barcode_tag:string, description:string, harvest_date:date, individual_id:integer, field_plot_id:integer, pot_id:integer'

./node_modules/.bin/sequelize model:create --name microbiome_proﬁle --attributes 'microbiome_sample_id:integer, taxon_id:integer, count:integer'
./node_modules/.bin/sequelize db:migrate
express_route_gen . --name microbiome_proﬁle --attributes 'microbiome_sample_id:integer, taxon_id:integer, count:integer'

./node_modules/.bin/sequelize model:create --name soil_sample --attributes 'name:string, harvest_date:date, field_plot_id:integer, pot_id:integer'
./node_modules/.bin/sequelize db:migrate
express_route_gen . --name soil_sample --attributes 'name:string, harvest_date:date, field_plot_id:integer, pot_id:integer'

