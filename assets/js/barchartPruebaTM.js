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

d3.json("assets/data/listaActividades.json", function(error, actividades) {
  
  var visualization = d3plus.viz()
      .container("#tree-chart")
      .legend({"size": 30})
      .tooltip(true)
      .data(actividades)
      .type("treemap")
      .id(["rama_nombre", "categoria_nombre", "nombre"])
      .format("es_ES")
      .size("minimo")
      .draw();
});

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
