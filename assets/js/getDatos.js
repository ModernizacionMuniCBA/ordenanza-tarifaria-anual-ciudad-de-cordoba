function importDataRama(){
  d3.csv("assets/data/RamasDeActividad-2017.csv", function(error, data) {
    data.forEach(function(d) {
      d.id = +d.id;
      d.nombre = d.nombre;
    });
    ramasIDs = data;
    // console.log(ramasIDs);
  });

  d3.csv("assets/data/CategoriasDeActividad-2017.csv", function(error, data) {
    data.forEach(function(d) {
      d.id = +d.id;
      d.rama = +d.rama;
      d.nombre = d.nombre;
    });
    categoriasIDs = data;
    // console.log(categoriasIDs);
  });
  d3.csv("assets/data/ActividadesOTA-2017.csv", function(error, data) {
      data.forEach(function(d) {
        d.categoria = +d.categoria;
        d.codigo = +d.codigo;
        d.nombre = d.nombre;
        d.minimo = +d.minimo;
        d.alicuota_num = +d.alicuota_num;
        d.categoria_nombre = getCatNombre(d.categoria);
        d.rama = getRamaIDFromCatID(d.categoria);
        d.rama_nombre = getRamaNombre(d.rama);
      });
      // console.log(data);
      // interfaceDibujar(null,null,null,data);
    });
}

function getRamaIDFromCatID(catID){
  for (i = 0; i < categoriasIDs.length; i++) {
    if(categoriasIDs[i].id == catID){
      return categoriasIDs[i].rama;
    }
  }
}

function getRamaNombre(ramaID){
  for (i = 0; i < ramasIDs.length; i++) {
    if(ramasIDs[i].id == ramaID){
      return ramasIDs[i].nombre;
    }
  }
}

function getCatNombre(catID){
  for (i = 0; i < categoriasIDs.length; i++) {
    if(categoriasIDs[i].id == catID){
      return categoriasIDs[i].nombre;
    }
  }
}

function importDataCategorias(ramaID){
  d3.csv("assets/data/RamasDeActividad-2017.csv", function(error, data) {
    data.forEach(function(d) {
      d.id = +d.id;
      d.nombre = d.nombre;
    });
    ramasIDs = data;
    // console.log(ramasIDs);
  });

  d3.csv("assets/data/CategoriasDeActividad-2017.csv", function(error, data) {
    data.forEach(function(d) {
      d.id = +d.id;
      d.rama = +d.rama;
      d.nombre = d.nombre;
    });
    categoriasIDs = data;
    // console.log(categoriasIDs);
  });
  d3.csv("assets/data/ActividadesOTA-2017.csv", function(error, data) {
      var da = [];
      var i = 0;
      data.forEach(function(d) {
        d.categoria = +d.categoria;
        d.codigo = +d.codigo;
        d.nombre = d.nombre;
        d.minimo = +d.minimo;
        d.alicuota_num = +d.alicuota_num;
        d.categoria_nombre = getCatNombre(d.categoria);
        d.rama = getRamaIDFromCatID(d.categoria);
        d.rama_nombre = getRamaNombre(d.rama);
        if(d.rama == ramaID){
          da[i]=d;
          i++;
        }
      });
      // console.log(da);
      interfaceDibujar(null,null,null,da);
    });
}

function importDataActividadesporCat(catID){
  if(catID==0){
    importDataCategorias($("#selectRamas").val());
  }else{
  d3.csv("assets/data/RamasDeActividad-2017.csv", function(error, data) {
    data.forEach(function(d) {
      d.id = +d.id;
      d.nombre = d.nombre;
    });
    ramasIDs = data;
    // console.log(ramasIDs);
  });

  d3.csv("assets/data/CategoriasDeActividad-2017.csv", function(error, data) {
    data.forEach(function(d) {
      d.id = +d.id;
      d.rama = +d.rama;
      d.nombre = d.nombre;
    });
    categoriasIDs = data;
    // console.log(categoriasIDs);

  });
  d3.csv("assets/data/ActividadesOTA-2017.csv", function(error, data) {
      var da = [];
      var i = 0;
      data.forEach(function(d) {
        d.categoria = +d.categoria;
        d.codigo = +d.codigo;
        d.nombre = d.nombre;
        d.minimo = +d.minimo;
        d.alicuota_num = +d.alicuota_num;
        d.categoria_nombre = getCatNombre(d.categoria);
        d.rama = getRamaIDFromCatID(d.categoria);
        d.rama_nombre = getRamaNombre(d.rama);
        if(d.categoria == catID){
          da[i]=d;
          i++;
        }
      });
      // console.log(da);
      interfaceDibujar(null,null,null,da);
    });
  }
}

function importDataRamaPrueba(){
  d3.csv("assets/data/RamasDeActividad-2017.csv", function(error, data) {
    data.forEach(function(d) {
      d.id = +d.id;
      d.nombre = d.nombre;
    });
    ramasIDs = data;
    // console.log(ramasIDs);
  });

  d3.csv("assets/data/CategoriasDeActividad-2017.csv", function(error, data) {
    data.forEach(function(d) {
      d.id = +d.id;
      d.rama = +d.rama;
      d.nombre = d.nombre;
    });
    categoriasIDs = data;
    // console.log(categoriasIDs);
  });
  d3.csv("assets/data/ActividadesOTA-2017.csv", function(error, data) {
      data.forEach(function(d) {
        d.categoria = +d.categoria;
        d.codigo = +d.codigo;
        d.nombre = d.nombre;
        d.minimo = +d.minimo;
        d.alicuota_num = +d.alicuota_num;
        d.categoria_nombre = getCatNombre(d.categoria);
        d.rama = getRamaIDFromCatID(d.categoria);
        d.rama_nombre = getRamaNombre(d.rama);
      });
      // console.log(data);
      PruebaInterfaceDibujar(null,null,null,data);
    });
}
