var ramaIDs;
var categoriasIDs;
var currentDataset;
function llenarSelects(){
  d3.json("assets/data/listaRamas.json", function(error, dataRamas) {
    d3.json("assets/data/listaCategorias.json", function(error, data) {
      dataRamas.forEach(function(d) {
        $('#selectRamas').append($('<option>', {
          value: d.ID,
          text: d.nombre
        }));
      });
      ramasIDs = dataRamas;
      data.forEach(function(d) {
        $('#selectCategorias').append($('<option>', {
          value: d.ID,
          text: d.nombre
        }));
      });
    categoriasIDs = data;
    });
  });
}

function actualizarCategorias(ramaID){
  $('#selectCategorias')
    .find('option')
    .remove();
    $('#selectCategorias').append($('<option>', {
        value: 0,
        text: "Todas las categorias"
    }));
    var cat;

  for (var i = 0; i < categoriasIDs.length; i++){
    var cat = categoriasIDs[i];
    if(ramaID==0){
      $('#selectCategorias').append($('<option>', {
          value: cat.ID,
          text: cat.nombre
      }));
    }else{
      if(cat.ramaID == ramaID){
        $('#selectCategorias').append($('<option>', {
            value: cat.ID,
            text: cat.nombre
        }));
      }
    }
  }
  $('#selectCategorias').val(0);
  //ACA HAY QUE HACER QUE DIBUJE EL GRAFICO DE NUEVO
  if(ramaID==0){
    drawBarChart(ramasIDs);
  }else{
    filterData(categoriasIDs, "categorias", ramaID)
  }

}

function actualizarActividades(catID){
  var ramaID = $('#selectRamas').val();
  if(catID==0){
    if(ramaID==0){
      drawBarChart(ramasIDs);
    }else{
        filterData(categoriasIDs, "categorias", ramaID)
    }
  }else{
    drawActivities(catID);
  }

}

// var dataset = importDataRama();

// function dibujarD3Ramas(tipoDato, data) {
//   if(data!=null){
//     dataset = data;
//   }
//   $("#bar-chart").empty();
//   var y = "";
//   if(tipoDato == "ali"){
//     y = "alicuota_num";
//   }else{
//     y = "minimo";
//   }
//
//     var visualization = d3plus.viz()
//         .container("#bar-chart")
//         .data(dataset)
//         .type("bar")
//         .id("rama_nombre")
//         .x({"value":"rama", "scale":"discrete"})
//         .y(y)
//         .draw()
// }
//
// function dibujarD3Categorias(tipoDato, data) {
//   if(data!=null){
//     dataset = data;
//   }
//   $("#bar-chart").empty();
//   var y = "";
//   if(tipoDato == "ali"){
//     y = "alicuota_num";
//   }else{
//     y = "minimo";
//   }
//     var visualization = d3plus.viz()
//         .container("#bar-chart")
//         .data(dataset)
//         .type("bar")
//         .id("categoria_nombre")
//         .x({"value":"categoria", "scale":"discrete"})
//         .y(y)
//         .draw()
// }
//
// function dibujarD3Actividades(tipoDato, data) {
//   if(data!=null){
//     dataset = data;
//   }
//   $("#bar-chart").empty();
//   var y = "";
//   if(tipoDato == "ali"){
//     y = "alicuota_num";
//   }else{
//     y = "minimo";
//   }
//     var visualization = d3plus.viz()
//         .container("#bar-chart")
//         .data(dataset)
//         .type("bar")
//         .id("nombre")
//         .x({"value":"id", "scale":"discrete"})
//         .y(y)
//         .draw()
// }
//
// function interfaceDibujar(tipoDato, ramaID, categoriaID,data){
//   if(data!=null){
//     dataset = data;
//   }
//   // console.log(dataset);
//   // console.log(data);
//   if (tipoDato == null){
//     tipoDato = $('input[type=radio][name=radioTipoDato]:checked').val();
//     console.log("Tipo Dato: " + tipoDato);
//   }
//   if (ramaID == null){
//     ramaID = $("#selectRamas").val();
//     console.log("Rama Dato: " +ramaID);
//   }
//   if (categoriaID == null){
//     categoriaID = $("#selectCategorias").val();
//     console.log("Cat Dato: " + categoriaID);
//   }
//   if(ramaID!=0){
//     if(categoriaID==0){
//       dibujarD3Categorias(tipoDato,null);
//     }else{
//       dibujarD3Actividades(tipoDato,null);
//     }
//   }else{
//     dibujarD3Ramas(tipoDato,null);
//   }
// }

function initBarChart(){
  llenarSelects();
  d3.json("assets/data/listaRamas.json", function(error, data) {
    drawBarChart(data);
  });
}

function drawBarChart(data){
  currentDataset = data;
  $("#bar-chart").empty();
  tipoDato = $('input[type=radio][name=radioTipoDato]:checked').val();
  if(tipoDato == "ali"){
    y = "alicuota";
  }else{
    y = "minimo";
  }
  // console.log(data);
  // console.log(y);
  var visualization = d3plus.viz()
      .container("#bar-chart")
      .data(data)
      .type("bar")
      .id("nombre")
      .x("nombre")
      .y(y)
      .draw()
}

function updateBarChart(){
  $("#bar-chart").empty();
  tipoDato = $('input[type=radio][name=radioTipoDato]:checked').val();
  if(tipoDato == "ali"){
    y = "alicuota";
  }else{
    y = "minimo";
  }
  // console.log(data);
  // console.log(y);
  var visualization = d3plus.viz()
      .container("#bar-chart")
      .data(currentDataset)
      .type("bar")
      .id("nombre")
      .x("nombre")
      .y(y)
      .draw()
}

function filterData(dataset, filterType, filterValue){ //Si recibe filterValue 0 devuelve lo que recibe en dataset
  var da = [];
  var j = 0;
  var k = 1;
  for (var i = 0; i < dataset.length; i++){
    var item = dataset[i];
    if(filterType == "categorias"){
      if (item.ramaID == filterValue){
        da[j]=item;
        j++;
      }
    }else{
      if (item.categoriaID == filterValue){
        item.ID = k;
        k++;
        da[j]=item;
        j++;
      }
    }
  }
  console.log(da);
  drawBarChart(da);
}

function drawActivities(filterValue){
  d3.json("assets/data/listaActividades.json", function(error, data) {
    // console.log(data);
    filterData(data, "actividades", filterValue);
  });
}
