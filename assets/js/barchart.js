var ramaIDs;
var categoriasIDs;
function llenarSelects(){
  d3.csv("assets/data/RamasDeActividad-2017.csv", function(error, data) {
    data.forEach(function(d) {
      d.id = +d.id;
      d.nombre = d.nombre;
      $('#selectRamas').append($('<option>', {
          value: d.id,
          text: d.nombre
      }));
    });
    ramasIDs = data;
  });
  d3.csv("assets/data/CategoriasDeActividad-2017.csv", function(error, data) {
    data.forEach(function(d) {
      d.id = +d.id;
      d.rama = +d.rama;
      d.nombre = d.nombre;
      $('#selectCategorias').append($('<option>', {
          value: d.id,
          text: d.nombre
      }));
    });
    categoriasIDs = data;
  });
}
llenarSelects();

function actualizarCategorias(ramaID){
  d3.csv("assets/data/CategoriasDeActividad-2017.csv", function(error, data) {
    $('#selectCategorias')
      .find('option')
      .remove();
      $('#selectCategorias').append($('<option>', {
          value: 0,
          text: "Todas las categorias"
      }));
    data.forEach(function(d) {
      d.id = +d.id;
      d.rama = +d.rama;
      d.nombre = d.nombre;
      if(ramaID==0){
        $('#selectCategorias').append($('<option>', {
            value: d.id,
            text: d.nombre
        }));
      }else{
        if(d.rama == ramaID){
          $('#selectCategorias').append($('<option>', {
              value: d.id,
              text: d.nombre
          }));
        }
      }
    });
    $('#selectCategorias').val(0);
    if(ramaID==0){
      importDataRama();
    }else{
      importDataCategorias(ramaID);
    }
  });
}
var dataset = importDataRama();

function dibujarD3Ramas(tipoDato, data) {
  if(data!=null){
    dataset = data;
  }
  $("#bar-chart").empty();
  var y = "";
  if(tipoDato == "ali"){
    y = "alicuota_num";
  }else{
    y = "minimo";
  }

    var visualization = d3plus.viz()
        .container("#bar-chart")
        .data(dataset)
        .type("bar")
        .id("rama_nombre")
        .x({"value":"rama", "scale":"discrete"})
        .y("minimo")
        .draw()
}

function dibujarD3Categorias(tipoDato, data) {
  if(data!=null){
    dataset = data;
  }
  $("#bar-chart").empty();
  var y = "";
  if(tipoDato == "ali"){
    y = "alicuota_num";
  }else{
    y = "minimo";
  }
    var visualization = d3plus.viz()
        .container("#bar-chart")
        .data(dataset)
        .type("bar")
        .id("categoria_nombre")
        .x({"value":"categoria", "scale":"discrete"})
        .y(y)
        .draw()
}

function dibujarD3Actividades(tipoDato, data) {
  if(data!=null){
    dataset = data;
  }
  $("#bar-chart").empty();
  var y = "";
  if(tipoDato == "ali"){
    y = "alicuota_num";
  }else{
    y = "minimo";
  }
    var visualization = d3plus.viz()
        .container("#bar-chart")
        .data(dataset)
        .type("bar")
        .id("nombre")
        .x({"value":"id", "scale":"discrete"})
        .y(y)
        .draw()
}

function interfaceDibujar(tipoDato, ramaID, categoriaID,data){
  if(data!=null){
    dataset = data;
  }
  console.log(dataset);
  console.log(data);
  if (tipoDato == null){
    tipoDato = $('input[type=radio][name=radioTipoDato]:checked').val();
    console.log("Tipo Dato: " + tipoDato);
  }
  if (ramaID == null){
    ramaID = $("#selectRamas").val();
    console.log("Rama Dato: " +ramaID);
  }
  if (categoriaID == null){
    categoriaID = $("#selectCategorias").val();
    console.log("Cat Dato: " + categoriaID);
  }
  if(ramaID!=0){
    if(categoriaID==0){
      dibujarD3Categorias(tipoDato,null);
    }else{
      dibujarD3Actividades(tipoDato,null);
    }
  }else{
    dibujarD3Ramas(tipoDato,null);
  }
}
