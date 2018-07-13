# -*- coding: utf-8 -*-
"""
Transformar los CSV en varios JSON compatibles con el _Zoomable Treemap_ para diferentes gráficos.
Adaptación rapida del script del año anterior que tenia los datos organizados de otra forma
"""

import csv
import json
import requests
import os
url_data = 'http://gobiernoabierto.cordoba.gob.ar/tarifaria/lista-de-rubros-2018.csv?p=9011'
""" Sample
Nº Código,Alíc.,Mínimo,Actividad ID,Descripción,Rama ID,Rama,Categoria ID,Categoria
513410,7.00,705.00,1454,Venta al por mayor de aparatos fotográficos e instrumentos de óptica,19,ACTIVIDADES COMERCIALES,128,"Depósito, distribución y Venta por mayor de otros artículos"
513532,7.00,705.00,1456,Venta al por mayor de artículos de bazar y menaje,19,ACTIVIDADES COMERCIALES,128,"Depósito, distribución y Venta por mayor de otros artículos"
"""
csv_data = 'lista-de-rubros-2018.csv'
# si el archivo ya existe, no bajarlo
if not os.path.isfile(csv_data):
    req = requests.get(url_data)
    f = open(csv_data, 'wb')
    f.write(req.content)
    f.close()

def buscarNombrePorID(ID, listItems):
    for item in listItems:
        if item['ID'] == ID:
            return item['nombre']

def buscarRamaPorCategoria(ID, listItems):
    for item in listItems:
        if item['ID'] == ID:
            return item['ramaID']

ramas = {}
categorias = {}
actividades = {}

fjson1 = []  # json final para lista de Ramas
fjson2 = []  # json final para lista de Categorias
fjson3 = []  # json final para lista de Actividades


fjsonDataNodesMin = []  # json final para lista de Actividades (tamaño y nombre) para Minimos
fjsonDataNodesAli = []  # json final para lista de Actividades (tamaño y nombre) para Alicuotas
fjsonPositionNodes = [] # json final para lista de posiciones de nodos
fjsonConnectionNodes = [] #json final para conexiones de nodos

with open(csv_data) as csvfile:
    reader = csv.DictReader(csvfile, delimiter=',', quotechar='"')
    detalle = {}  # detalle de la linea actual dentro de la estructura
    for row in reader:
        actividad_codigo = row['Nº Código'].strip()
        alicuota = row['Alíc.'].strip()
        minimo = row['Mínimo'].strip()
        actividad_id = row['Actividad ID'].strip()
        actividad_descripcion = row['Descripción'].strip()
        rama_id = row['Rama ID'].strip()
        rama_nombre = row['Rama'].strip()
        categoria_id = row['Categoria ID'].strip()
        categoria_nombre = row['Categoria'].strip()
        
        if rama_id not in ramas.keys():
            ramas[rama_id] = rama_nombre
            linea = {"ID": int(rama_id), "nombre": rama_nombre}
            fjson1.append(linea)

        # lista de categorias
        if categoria_id not in categorias.keys():
            categorias[categoria_id] = categoria_nombre
        
            linea = {"ID": int(categoria_id), "ramaID": int(rama_id), "nombre": categoria_nombre}
            connection = {"source": rama_nombre, "target": categoria_nombre}
            
            if rama_nombre == categoria_nombre:
                linea["nombre"] += "_"
                connection["target"] += "_"

            fjson2.append(linea)
            fjsonConnectionNodes.append(connection)

        actividades[actividad_id] = actividad_descripcion
        
        linea = {"ID": int(actividad_id),
                 "categoriaID": int(categoria_id),
                 "codigo": actividad_codigo,
                 "nombre": actividad_descripcion,
                 "minimo": float(minimo),
                 "alicuota":  float(alicuota),
                 "categoria_nombre": categoria_nombre,
                 "ramaID": int(rama_id),
                 "rama_nombre": rama_nombre
                  }
        fjson3.append(linea)

        connection = {"source": categoria_nombre, "target": actividad_descripcion}

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
