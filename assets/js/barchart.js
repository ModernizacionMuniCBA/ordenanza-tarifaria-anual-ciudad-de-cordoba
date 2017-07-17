var ramaIDs;
var categoriasIDs;
var currentDataset;

function ColorLuminance(hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;
    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
    }
    return rgb;
}


function initGraphs(){
  $(".atras-button").hide();
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
    getHash();
    });
  });
}

function actualizarCategorias(ramaID){
  setHash(null,ramaID,null);
  $('#selectCategorias')
    .find('option')
    .remove();
    $('#selectCategorias').append($('<option>', {
        value: 0,
        text: "Todas las categorias"
    }));
  if(ramaID==0){
    $(".atras-button").hide();
  }else{
    $(".atras-button").show();
    for (var i = 0; i < ramasIDs.length; i++){
      if(ramaID == ramasIDs[i].ID){
        $(".title-categoria").text(ramasIDs[i].nombre);
      }
    }
    $("#atras-bar-button").attr("onclick","actualizarCategorias(0)");
  }
  $('#selectRamas').val(ramaID);
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
  $('#selectCategorias').val(catID);
  setHash(null,ramaID,catID);
  if(catID==0){
    $("#atras-bar-button").attr("onclick","actualizarCategorias(0)");
    if(ramaID==0){
      actualizarCategorias(0);
    }else{
        filterData(categoriasIDs, "categorias", ramaID)
    }
    $("#atras-bar-button").attr("onclick","actualizarCategorias(0)");
  }else{
    $("#atras-bar-button").attr("onclick","actualizarActividades(0)");
    for (var i = 0; i < categoriasIDs.length; i++){
      if(catID == categoriasIDs[i].ID){
        $(".title-categoria").text(categoriasIDs[i].nombre);
      }
    }
    drawActivities(catID);
  }

}

function initBarChart(){
  d3.json("assets/data/listaRamas.json", function(error, data) {
    drawBarChart(data);
  });
}

function getTooltipWidth(){
  var wWidth = $( window ).width();
  if (wWidth < 480){
    return $( window ).width()-50;
  }else if(wWidth < 768){
    return 500;
  }else if(wWidth < 1200){
    return 700;
  }else{
    return 700;
  }
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
  function getTooltipData(){
    if($("#selectRamas").val()==0){

    }else if($("#selectCategorias").val()==0){

    }else{
      return ["alicuota", "minimo"];
    }
  }
  var visualization = d3plus.viz()
      .container("#bar-chart")
      .format("es_ES")
      .tooltip({"footer": function(dp, d3viz) {
        if($("#selectRamas").val()!=0 && $("#selectCategorias").val()!=0){
          return "<p class=\"d3plus_tooltip_footer_custom\">Click para Cerrar</p>"
        }else{
          return "<p class=\"d3plus_tooltip_footer_custom\">Click para Ampliar</p>";
        }
      }})
      .tooltip(getTooltipData())   // list the keys to show in tooltip
      .tooltip({"large":getTooltipWidth(), "small":getTooltipWidth()})
      .format({
          "number": function(number, key) {
            var formatted = number;
            if (key.key === "alicuota") {
              var formatted = d3plus.number.format(number/10, key)
              if($("#selectRamas").val()==0){
                return "Promedio %" + formatted.replace("B", " Mm");
              }else if($("#selectCategorias").val()==0){
                return "Promedio %" + formatted.replace("B", " Mm");
              }else{
                return "%" + formatted.replace("B", " Mm");
              }
            }
            else if (key.key === "minimo") {
              // var formatted = d3plus.number.format(number, key)
              if($("#selectRamas").val()==0){
                return "Promedio $" + number.toFixed(2);
              }else if($("#selectCategorias").val()==0){
                return "Promedio $" + number.toFixed(2);
              }else{
                return "$" + number.toFixed(2);
              }
            }else{
              return number
            }
          }
      })
      .mouse({
        "click" : function(dp, d3viz) {
            console.log(dp);
            var color = $("#d3plus_group_"+dp.d3plus.id+" rect").attr("fill");
            $(".atras-button").attr("style", "color:"+ColorLuminance(color,-0.2)+"!important;");
            console.log(color);
            if($("#selectRamas").val()==0){
              $("#selectRamas").val(dp.ID);
              actualizarCategorias(dp.ID);
            }else if($("#selectCategorias").val()==0){
              $("#selectCategorias").val(dp.ID);
              actualizarActividades(dp.ID);
            }else{
              $("#selectRamas").val(dp.ramaID);
              $("#selectCategorias").val(0);
              actualizarCategorias(dp.ramaID);
            }
          }
        })
      .data(data)
      .type("bar")
      .id("nombre")
      .x("nombre")
      .y(y)
      .draw()
}

function updateBarChart(){
  // $("#bar-chart").empty();
  // tipoDato = $('input[type=radio][name=radioTipoDato]:checked').val();
  // if(tipoDato == "ali"){
  //   y = "alicuota";
  // }else{
  //   y = "minimo";
  // }
  // // console.log(data);
  // // console.log(y);
  // var visualization = d3plus.viz()
  // .container("#bar-chart")
  // .format("es_ES")
  // .tooltip({"footer": function(dp, d3viz) {
  //   if($("#selectRamas").val()!=0 && $("#selectCategorias").val()!=0){
  //     return "<p class=\"d3plus_tooltip_footer_custom\">Click para Cerrar</p>"
  //   }else{
  //     return "<p class=\"d3plus_tooltip_footer_custom\">Click para Ampliar</p>";
  //   }
  // }})
  // .mouse({
  //   "click" : function(dp, d3viz) {
  //       console.log(dp);
  //       var color = $("#d3plus_group_"+dp.d3plus.id+" rect").attr("fill");
  //       $(".atras-button").attr("style", "color:"+ColorLuminance(color,-0.2)+"!important;");
  //       console.log(color);
  //       if($("#selectRamas").val()==0){
  //         $("#selectRamas").val(dp.ID);
  //         actualizarCategorias(dp.ID);
  //       }else if($("#selectCategorias").val()==0){
  //         $("#selectCategorias").val(dp.ID);
  //         actualizarActividades(dp.ID);
  //       }else{
  //         $("#selectRamas").val(dp.ramaID);
  //         $("#selectCategorias").val(0);
  //         actualizarCategorias(dp.ramaID);
  //       }
  //     }
  //   })
  // .data(currentDataset)
  // .type("bar")
  // .id("nombre")
  // .x("nombre")
  // .y(y)
  // .draw()
  drawBarChart(currentDataset);
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

function drawTM(){
  d3.json("assets/data/listaActividades.json", function(error, actividades) {
    $("#tree-chart").empty();
    tipoDato = $('input[type=radio][name=radioTipoDatoTM]:checked').val();
    var size;
    if(tipoDato == "ali"){
      size = "alicuota";
    }else{
      size = "minimo";
    }
    var visualization = d3plus.viz()
        .container("#tree-chart")
        // .legend({"size": 30})
        .data(actividades)
        .type("treemap")
        .id(["rama_nombre", "categoria_nombre", "nombre"])
        .format("es_ES")
        .size(size)
        .draw();
  });

}

function drawActivities(filterValue){
  d3.json("assets/data/listaActividades.json", function(error, data) {
    // console.log(data);
    filterData(data, "actividades", filterValue);
  });
}

function setHash(tipoDato, ramaID, catID){
  if(tipoDato == null){
    tipoDato = $('input[type=radio][name=radioTipoDato]:checked').val();
    if(tipoDato == "ali"){
      tipoDato = "a";
    }else{
      tipoDato = "m";
    }
  }
  if(ramaID == null){
    ramaID = $('#selectRamas').val();
  }
  if(catID == null){
    catID = $('#selectCategorias').val();
  }
  hash = tipoDato+"-"+ramaID+"-"+catID
  window.location.hash = hash;
}

function getHash(){
  var hash = window.location.hash.substr(1);
  console.log(hash);
  var hash_splited = hash.split("-");
  var tipoDato = hash_splited[0];
  var ramaID = hash_splited[1];
  var catID = hash_splited[2];
  console.log(ramaID);
  console.log(catID);
  $("#selectRamas").val(ramaID);
  $("#selectCategorias").val(catID);
  if(tipoDato == "a"){
    tipoDato = "ali";
  }else{
    tipoDato = "min";
  }
  $('input[type=radio][name=radioTipoDato][value="'+tipoDato+'"]').prop("checked",true);
  if(ramaID!=0){
    if(catID==0){
      actualizarCategorias(ramaID);
    }else{
      actualizarActividades(catID);
    }
  }else{
    if(catID==0){
      initBarChart();
    }else{
      actualizarActividades(catID);
    }
  }
}
