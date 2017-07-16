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
            {"ID":2, "nombre":"Rama2"}];

var categorias = [{"ID":1, "nombre":"cat1","rama":1},
                  {"ID":2, "nombre":"cat2","rama":2},
                  {"ID":3, "nombre":"cat3","rama":1},
                  {"ID":4, "nombre":"cat4","rama":1},
                  {"ID":5, "nombre":"cat5","rama":2},
                  {"ID":6, "nombre":"cat6","rama":1}];

// create sample dataset
  var sample_data = [
    {"name": "Rama 1", "size": 10},
    {"name": "Rama 2", "size": 12},
    {"name": "Rama 3", "size": 30},
    {"name": "Cat 1", "size": 26},
    {"name": "Cat 2", "size": 12},
    {"name": "Cat 3", "size": 26},
    {"name": "Cat 4", "size": 11},
    {"name": "Act 1", "size": 24},
    {"name": "Act 2", "size": 24},
    {"name": "Act 3", "size": 24},
    {"name": "Act 4", "size": 24},
    {"name": "Act 5", "size": 24}
  ]
  // create list of node positions
  var positions = [
    {"name": "Rama 1", "x": 1, "y": 15},
    {"name": "Rama 2", "x": 12, "y": 24},
    {"name": "Rama 3", "x": 16, "y": 18},
    {"name": "Cat 1", "x": 26, "y": 21},
    {"name": "Cat 2", "x": 13, "y": 4},
    {"name": "Cat 3", "x": 31, "y": 13},
    {"name": "Cat 4", "x": 19, "y": 8},
    {"name": "Act 1", "x": -21, "y": 8},
    {"name": "Act 2", "x": 22, "y": 9},
    {"name": "Act 3", "x": 23, "y": 10},
    {"name": "Act 4", "x": 24, "y": 11},
    {"name": "act 5", "x": 25, "y": 12}
  ]
  // create list of node connections
  var connections = [
    {"source": "Rama 1", "target": "Cat 1"},
    {"source": "Rama 2", "target": "Cat 2"},
    {"source": "Rama 3", "target": "Cat 3"},
    {"source": "Rama 3", "target": "Cat 4"},
    {"source": "Cat 1", "target": "Act 1"},
    {"source": "Cat 1", "target": "Act 4"},
    {"source": "Cat 2", "target": "Act 3"},
    {"source": "Cat 3", "target": "Act 2"},
    {"source": "Cat 4", "target": "Act 5"}
  ]
  // instantiate d3plus


var nodeData;
var nodePositions;
var nodeConnections;

  d3.json("assets/data/connections.json", function(error, dataCon) {
    d3.json("assets/data/positions.json", function(error, dataPos) {
      d3.json("assets/data/dataInfoAlicuotas.json", function(error, dataData) {
        nodeData = dataData;
        // console.log(dataData);
        nodePositions = dataPos;
        // console.log(dataPos);
        nodeConnections = dataCon;
        // console.log(dataCon);

        var visualization = d3plus.viz()
          .container("#node-chart")  // container DIV to hold the visualization
          .type("network")    // visualization type
          .data(nodeData)  // sample dataset to attach to nodes
          // .nodes(nodePositions)   // x and y position of nodes
          .edges(nodeConnections) // list of node connections
          .size("size")       // key to size the nodes
          .id("name")         // key for which our data is unique on
          .draw()             // finally, draw the visualization!

      });
    });
  });

  function filterJSON(json, key, value) {
    var result = {};
    for (var explosionIndex in json) {
      if (json[explosionIndex][key] === value) {
        result[explosionIndex] = json[explosionIndex];
      }
    }
    return result;
  }




  // importDataRamaPrueba();

// console.log(actividades);
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
