module.exports = `
  type Plant  {
    plateform: String
    technicalPlateau: String
    experimentAlias: String
    species: String
    experiment: String
    study: String
    studyAlias: String
    plant: String
    plantAlias: String
    genotype: String
    genotypeAlias: String
    plantPatternAlias: String
    seedLot: String
    scenario: String
    position: String
    repetition: String
    pot: String
    aliasPot: String
    location: String

  }

  enum PlantField {
    plateform
    technicalPlateau
    experimentAlias
    species
    experiment
    study
    studyAlias
    plant
    plantAlias
    genotype
    genotypeAlias
    plantPatternAlias
    seedLot
    scenario
    position
    repetition
    pot
    aliasPot
    location
  }

  input searchPlantInput {
    field: PlantField
    value: typeValue
    operator: Operator
    searchArg: [searchPlantInput]
  }

  type Query {
    plants(experimentURI: String): [Plant]
    readOnePlant(experimentURI: String, plantURI: String): Plant
  }
`;
