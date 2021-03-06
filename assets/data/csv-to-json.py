# -*- coding: utf-8 -*-
"""
Transformar los CSV en varios JSON compatibles con el _Zoomable Treemap_ para diferentes gráficos.
"""

fRamas = "RamasDeActividad-2017.csv"
"""
Sample
id,nombre
7,ACTIVIDADES COMERCIALES POR MAYOR
1,ACTIVIDADES COMERCIALES POR MENOR
4,ACTIVIDADES FINANCIERAS
"""

fCategorias = "CategoriasDeActividad-2017.csv"
"""
Sample
id,rama,nombre
5,3,AGRICULTURA
14,6,"ALQUILER Y ARRENDAMIENTO DE MÁQUINAS, AUTOS Y EQUIPOS"
71,11,"CAPTACIÓN, PURIFICACIÓN Y DISTRIBUCIÓN DE AGUA"
"""

fActividades = "ActividadesOTA-2017.csv"
"""
Sample
id,categoria,codigo,nombre,minimo,alicuota_num
557,52,171200.2,"Acabado de textiles (incluye blanqueo, teñido y estampado)",577.00,7.00
368,27,523952.1,Activación de líneas teléfonos celulares,783.00,15.80
"""
import csv
import json

def buscarNombrePorID(ID, listItems):
    for item in listItems:
        if item['ID'] == ID:
            return item['nombre']

def buscarRamaPorCategoria(ID, listItems):
    for item in listItems:
        if item['ID'] == ID:
            return item['ramaID']


fjson1 = []  # json final para lista de Ramas
fjson2 = []  # json final para lista de Categorias
fjson3 = []  # json final para lista de Actividades


fjsonDataNodesMin = []  # json final para lista de Actividades (tamaño y nombre) para Minimos
fjsonDataNodesAli = []  # json final para lista de Actividades (tamaño y nombre) para Alicuotas
fjsonPositionNodes = [] # json final para lista de posiciones de nodos
fjsonConnectionNodes = [] #json final para conexiones de nodos

with open(fRamas) as csvfile:
    """
    Este archivo describe los ingresos previstos en el presupuesto 2017
    _Nivel_ que define la estructura jerárquica de los datos
    """
    reader = csv.DictReader(csvfile, delimiter=',', quotechar='"')


    detalle = {}  # detalle de la linea actual dentro de la estructura
    for row in reader:
            linea = {"ID": int(row["id"]),
                     "nombre": row["nombre"]}
            fjson1.append(linea)

with open(fCategorias) as csvfile:
    """
    Este archivo describe los ingresos previstos en el presupuesto 2017
    _Nivel_ que define la estructura jerárquica de los datos
    """
    reader = csv.DictReader(csvfile, delimiter=',', quotechar='"')


    detalle = {}  # detalle de la linea actual dentro de la estructura
    for row in reader:
            nombreRama = buscarNombrePorID(int(row["rama"]), fjson1)
            if (nombreRama == row["nombre"]):
                linea = {"ID": int(row["id"]),
                         "ramaID": int(row["rama"]),
                         "nombre": row["nombre"]+"_"}

                connection = {"source": nombreRama,
                              "target": row["nombre"]+"_"}
            else:
                linea = {"ID": int(row["id"]),
                         "ramaID": int(row["rama"]),
                         "nombre": row["nombre"]}

                connection = {"source": nombreRama,
                              "target": row["nombre"]}
            fjson2.append(linea)
            fjsonConnectionNodes.append(connection)


with open(fActividades) as csvfile:
    """
    Este archivo describe los ingresos previstos en el presupuesto 2017
    _Nivel_ que define la estructura jerárquica de los datos
    """
    reader = csv.DictReader(csvfile, delimiter=',', quotechar='"')


    detalle = {}  # detalle de la linea actual dentro de la estructura
    for row in reader:
            categoria_nom = buscarNombrePorID(int(row["categoria"]), fjson2)
            linea = {"ID": int(row["id"]),
                     "categoriaID": int(row["categoria"]),
                     "codigo": row["codigo"],
                     "nombre": row["nombre"],
                     "minimo": float(row["minimo"]),
                     "alicuota":  float(row["alicuota_num"]),
                     "categoria_nombre": categoria_nom,
                     "ramaID": int(buscarRamaPorCategoria(int(row["categoria"]),fjson2)),
                     "rama_nombre": buscarNombrePorID(buscarRamaPorCategoria(int(row["categoria"]),fjson2), fjson1)
                      }
            fjson3.append(linea)

            connection = {"source": categoria_nom,
                          "target": row["nombre"]}
            # fjsonConnectionNodes.append(connection)



def getMinimoTotalRama(rama):
    total = 0
    contador = 0
    for act in fjson3:
        if(int(act["ramaID"]) == rama):
            total += act["minimo"]
            contador += 1
    return total/contador

def getAlicuotaTotalRama(rama):
    total = 0
    contador = 0
    for act in fjson3:
        if(int(act["ramaID"]) == rama):
            total += act["alicuota"]
            contador += 1
    return total/contador

def getMinimoTotalCategoria(categoria):
    total = 0
    contador = 0
    for act in fjson3:
        if(int(act["categoriaID"]) == categoria):
            total += act["minimo"]
            contador += 1
    return total/contador

def getAlicuotaTotalCategoria(categoria):
    total = 0
    contador = 0
    for act in fjson3:
        if(int(act["categoriaID"]) == categoria):
            total += act["alicuota"]
            contador += 1
    return total/contador
#
# i = 0
# j = 0
for rama in fjson1:
    ramaInfoMin = {"name": rama["nombre"],
                "size": getMinimoTotalRama(int(rama["ID"]))}
    ramaInfoAli = {"name": rama["nombre"],
                "size": getAlicuotaTotalRama(int(rama["ID"]))}
    fjsonDataNodesMin.append(ramaInfoMin)
    fjsonDataNodesAli.append(ramaInfoAli)

    rama["Promedio alicuota"] = getAlicuotaTotalRama(int(rama["ID"]))
    rama["Promedio minimo"] = getMinimoTotalRama(int(rama["ID"]))
    # rama["x"] = i
    # rama["y"] = j
    # # i+=10
    # nodePosition = {"name": rama["nombre"], "x": rama["x"], "y": rama["y"]}
    # fjsonPositionNodes.append(nodePosition);

# i = 10
# j = 10
for categoria in fjson2:
    catInfoMin = {"name": categoria["nombre"],
                "size": getMinimoTotalCategoria(int(categoria["ID"]))}
    catInfoAli = {"name": categoria["nombre"],
                "size": getAlicuotaTotalCategoria(int(categoria["ID"]))}
    fjsonDataNodesMin.append(catInfoMin)
    fjsonDataNodesAli.append(catInfoAli)

    categoria["Promedio alicuota"] = getAlicuotaTotalCategoria(int(categoria["ID"]))
    categoria["Promedio minimo"] = getMinimoTotalCategoria(int(categoria["ID"]))
    # categoria["x"] = i
    # categoria["y"] = j
    # i+=10
    # j+=10
    # nodePosition = {"name": categoria["nombre"], "x": categoria["x"], "y": categoria["y"]}
    # fjsonPositionNodes.append(nodePosition);
# i = 0
# j = 0

for actividad in fjson3:
    actInfoMin = {"name": actividad["nombre"],
                "size": actividad["minimo"]}
    actInfoAli = {"name": actividad["nombre"],
                "size": actividad["alicuota"]}
    fjsonDataNodesMin.append(actInfoMin)
    fjsonDataNodesAli.append(actInfoAli)
#     actividad["x"] = i
#     actividad["y"] = j
#     # i+=2
#     # j+=2
#     nodePosition = {"name": actividad["nombre"], "x": actividad["x"], "y": actividad["y"]}
#     fjsonPositionNodes.append(nodePosition);

f = open("listaRamas.json", "w")
f.write(json.dumps(fjson1, indent=4, sort_keys=True))
f.close()

f = open("listaCategorias.json", "w")
f.write(json.dumps(fjson2, indent=4, sort_keys=True))
f.close()

f = open("listaActividades.json", "w")
f.write(json.dumps(fjson3, indent=4, sort_keys=True))
f.close()

f = open("connections.json", "w")
f.write(json.dumps(fjsonConnectionNodes, indent=4, sort_keys=True))
f.close()

f = open("dataInfoMinimos.json", "w")
f.write(json.dumps(fjsonDataNodesMin, indent=4, sort_keys=True))
f.close()

f = open("dataInfoAlicuotas.json", "w")
f.write(json.dumps(fjsonDataNodesAli, indent=4, sort_keys=True))
f.close()

f = open("positions.json", "w")
f.write(json.dumps(fjsonPositionNodes, indent=4, sort_keys=True))
f.close()
