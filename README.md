# ScienceDbBackend

This is a skeleton NodeJS project using the technology explained in this [Blog post](http://mherman.org/blog/2015/10/22/node-postgres-sequelize/#.VijvshNViko).

The package is meant to integrate with Code Generators enabling the quick and easy definition and migration of (scientific) data models. See:

* [Data Model Code Generation](https://github.com/ScienceDb/express_route_gen_js)
* [Graphical User Interface as Single Page Web Application (VueJS)](https://github.com/ScienceDb/ScienceDbGui)
* [Code Generator for the above GUI](https://github.com/ScienceDb/admin_gui_gen)

## Setup

Clone the repository and subsequently run `npm install --save` inside the project's directory.

To migrate and populate the database execute `sh ./initialSetup.sh` or inspect the SHELL script to manually select each step.

## REPL

To run an interactive NodeJS shell with the model files loaded run `node repl.js`. In the environment you'll find `models`, e.g. `models.User` to be used further.

## Implemented API

In the following the basic CRUD use cases are explained and a usage example given using the CLI `curl` instruction. `CRUD` stands for Create, Read, Update, and Delete.

### Use cases and RESTful endpoints

Imagine a data model `marker` with slots `chromosome`, `position`, and `name`.

#### LOGIN
`curl --cookie-jar ./cookies.tmp -X POST --data 'email=admin.email@science.db&password=####' 'http://science.dn:3030/login'` (Port depends on your setup!)

After having logged in and stored the respective cookie in an appropriate file (the cookie-jar) subsequent calls to the API can be made being logged-in.
_Note_: All API endpoints require a successful log-in using cookies!

#### CREATE

##### Single instance

To create a single instance of a given data model (a row in the relation database) use the following command.

`curl -b ./cookies.tmp --data "name=XYZ&position=1234&&chromosome=chr1" 'http://science.db:3030/markers'`

##### Bulk create

To create many model instances (rows in the relational database’s respective table) use the upload Excel or upload CSV end-points.

###### CSV
`curl -b cookies.tmp -F 'csv_file=@./DS_02_MappingData_converted.csv' 'http://science.db:3030/markers/upload_csv'`

###### Excel (XLSX)

````
curl -b cookies.tmp -F 'xlsx_file=@./DS_06_TempLogger_converted.xlsx' 'http://science.db:3030/warehouse_climates/upload_xlsx'
````

#### READ
A single, a subset, or all instances of a given model can be read. Here, a single model is identified by its ID, while a subset can be obtained by pagination (page and per_page parameters), and or or by searching (filter parameter) textual model-fields (textual columns in the respective relational database’s table).

##### SINGLE

Given an identifier of the desired model instance it can be retrieved as follows:

`curl -b cookies.tmp 'http://science.db:3030/marker/1'`

##### MULTIPLE

###### Search

To retrieve all markers that match “ChrC09” in any of their textual fields (chromosome and name) use the following command:

`curl -b cookies.tmp 'http://science.db:3030/markers?filter=chrC09'`

###### Subset / Paginate

To iterate through model instances the following command can be applied.

`curl -b cookies.tmp 'http://science.db:3030/markers?page=10&per_page=20’`

###### Subset of Search Results

To combine the above two methods, simply give all request parameters:

`curl -b cookies.tmp 'http://science.db:3030/markers?page=10&per_page=20&filter=chrC0 9'`

#### UPDATE

In order to change some of the fields of a given model instance, its ID is required as are the new values of the fields in question. Given this, the following command updates a model instance accordingly:

`curl -b cookies.tmp -X PUT --data 'name=NewFancyName' 'http://science.db:3030/marker/1'`

#### DELETE

In order to delete an instance of a data model its ID is required. The following command deletes the instance by removing it from the underlying relational database’s corresponding table:

`curl -b cookies.tmp -X DELETE 'http://science.db:3030/marker/4'`

#### Using the API within an analysis / Example in R

The following example code explains how to obtain data from Kodiaq-DB from within a RScript.

````
require(httr)
login.res <- POST('http://science.db:3030/login',
body=list('email'='admin.email@science.db',
'password'='####')
)
markers.res <- GET('http://science.db:3030/markers')
# To obtain the content of the response as a list of list, use:
markers.lst <- content(markers.res)
# For example:
Reduce(rbind, lapply( content(markers.res)[1:3], as.data.frame,
stringsAsFactors=FALSE ))[,1:4]
# Gives the following tabular output:
id name chromosome position
1 x chr1 12
4 Bn_A01_p1000115 chrA01 617757
5 Bn_A01_p100441 chrA01 2468965
````
