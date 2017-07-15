// var expenses = [{"name":"jim","amount":34,"date":"11/12/2015"},
//   {"name":"carl","amount":120.11,"date":"11/12/2015"},
//   {"name":"jim","amount":45,"date":"12/01/2015"},
//   {"name":"stacy","amount":12.00,"date":"01/04/2016"},
//   {"name":"stacy","amount":34.10,"date":"01/04/2016"},
//   {"name":"stacy","amount":44.80,"date":"01/05/2016"}
// ];
//
// console.log(expenses);
// var expensesByName = d3.nest()
//   .key(function(d) { return d.name; })
//   .entries(expenses);
// console.log(expensesByName);

var actividades = [{"ID":1, "rama":1,"categoria":"cat1","nombre":"Actividad 1","minimo":10,"alicuota_num":12},
  {"ID":2, "rama":1,"categoria":"cat3","nombre":"Actividad 2","minimo":2,"alicuota_num":6},
  {"ID":7, "rama":1,"categoria":"cat3","nombre":"Actividad 7","minimo":5,"alicuota_num":10},
  {"ID":3, "rama":2,"categoria":"cat2","nombre":"Actividad 3","minimo":6,"alicuota_num":2},
  {"ID":4, "rama":1,"categoria":"cat4","nombre":"Actividad 4","minimo":20,"alicuota_num":15},
  {"ID":5, "rama":2,"categoria":"cat5","nombre":"Actividad 5","minimo":4,"alicuota_num":25},
  {"ID":6, "rama":1,"categoria":"cat6","nombre":"Actividad 6","minimo":3,"alicuota_num":1}
];

var ramas =[{"ID":1, "nombre":"Rama1"},
  {"ID":2, "nombre":"Rama2"}]

var categorias = [{"ID":1, "nombre":"cat1","rama":1},
  {"ID":2, "nombre":"cat2","rama":2},
  {"ID":3, "nombre":"cat3","rama":1},
  {"ID":4, "nombre":"cat4","rama":1},
  {"ID":5, "nombre":"cat5","rama":2},
  {"ID":6, "nombre":"cat6","rama":1}]

// create sample dataset
  var sample_data = [
    {"name": "alpha", "size": 10},
    {"name": "beta", "size": 12},
    {"name": "gamma", "size": 30},
    {"name": "delta", "size": 26},
    {"name": "epsilon", "size": 12},
    {"name": "zeta", "size": 26},
    {"name": "theta", "size": 11},
    {"name": "eta", "size": 24}
  ]
  // create list of node positions
  var positions = [
    {"name": "alpha", "x": 1, "y": 15},
    {"name": "beta", "x": 12, "y": 24},
    {"name": "gamma", "x": 16, "y": 18},
    {"name": "delta", "x": 26, "y": 21},
    {"name": "epsilon", "x": 13, "y": 4},
    {"name": "zeta", "x": 31, "y": 13},
    {"name": "theta", "x": 19, "y": 8},
    {"name": "eta", "x": 24, "y": 11}
  ]
  // create list of node connections
  var connections = [
    {"source": "alpha", "target": "beta"},
    {"source": "alpha", "target": "gamma"},
    {"source": "beta", "target": "delta"},
    {"source": "beta", "target": "epsilon"},
    {"source": "zeta", "target": "gamma"},
    {"source": "theta", "target": "gamma"},
    {"source": "eta", "target": "gamma"}
  ]
  // instantiate d3plus
  var visualization = d3plus.viz()
    .container("#node-chart")  // container DIV to hold the visualization
    .type("network")    // visualization type
    .data(sample_data)  // sample dataset to attach to nodes
    .nodes(positions)   // x and y position of nodes
    .edges(connections) // list of node connections
    .size("size")       // key to size the nodes
    .id("name")         // key for which our data is unique on
    .draw()             // finally, draw the visualization!

  importDataRamaPrueba();

console.log(actividades);
// var data = d3.nest()
//   .key(function(d) { return d.rama; })
//   .entries(actividades);

// console.log(data);

// BARRAS
// var visualization = d3plus.viz()
//     .container("#bar-chart")
//     .legend({"size": 30})
//     .tooltip(true)
//     .data(actividades)
//     .type("bar")
//     .id(["rama", "categoria", "nombre"])
//     .format("es_ES")
//     .x("rama")
//     .y("minimo")
//     .draw();

//NODOS

function PruebaInterfaceDibujar(tipoDato, ramaID, categoriaID,data){
  if(data!=null){
    dataset = data;
  }
  console.log(dataset);
  console.log(data);
  tipoDato = "minimo";
  ramaID = 0;
  categoriaID = 0;
  var visualization = d3plus.viz()
      .container("#bar-chart")
      .legend({"size": 30})
      .tooltip(true)
      .data(data)
      .type("bar")
      .id(["rama_nombre", "categoria_nombre", "nombre"])
      .format("es_ES")
      .x("rama")
      .y(tipoDato)
      .draw();
}
