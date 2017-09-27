require('httr')

pots <- content(GET('localhost:3000/pots'))

pots.tbl <- Reduce(rbind, lapply( pots, as.data.frame, stringsAsFactors=FALSE ))
