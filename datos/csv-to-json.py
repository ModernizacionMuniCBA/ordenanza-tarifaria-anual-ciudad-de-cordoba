# -*- coding: utf-8 -*-
"""
Transformar los CSV en varios JSON compatibles con el _Zoomable Treemap_ para diferentes gráficos.
"""

fRamas = "RamasDeActividad-2017.csv"
fCategorias = "CategoriasDeActividad-2017.csv"
fActividades = "ActividadesOTA-2017.csv"

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

fjsonDataNodes = []  # json final para lista de Actividades (tamaño y nombre)
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
            linea = {"ID": int(row["id"]),
                     "ramaID": int(row["rama"]),
                     "nombre": row["nombre"]}
            fjson2.append(linea)

            connection = {"source": buscarNombrePorID(int(row["rama"])), "target": row["nombre"]}
            fjsonConnectionNodes.append(connection)


with open(fActividades) as csvfile:
    """
    Este archivo describe los ingresos previstos en el presupuesto 2017
    _Nivel_ que define la estructura jerárquica de los datos
    """
    reader = csv.DictReader(csvfile, delimiter=',', quotechar='"')


    detalle = {}  # detalle de la linea actual dentro de la estructura
    for row in reader:
            linea = {"ID": int(row["id"]),
                     "categoria": int(row["categoria"]),
                     "codigo": row["codigo"],
                     "nombre": row["nombre"],
                     "minimo": float(row["minimo"]),
                     "alicuota_num":  float(row["alicuota_num"]),
                     "categoria_nombre": buscarNombrePorID(row["categoria"], fjson2),
                     "rama": int(buscarRamaPorCategoria(row["categoria"],fjson2)),
                     "rama_nombre": buscarNombrePorID(buscarRamaPorCategoria(row["categoria"],fjson2), fjson1)
                      }
            fjson3.append(linea)

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
