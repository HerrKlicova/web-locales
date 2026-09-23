# Instancias estáticas de Mona Sans (GitHub, licencia OFL 1.1, nombre reservado «Mona») para la
# web del taller. Se fija la anchura y el peso, se recorta a los caracteres del español y se
# renombra la familia a «SC Grotesk», como pide la licencia para versiones modificadas de una
# fuente con nombre reservado. La licencia va al lado, en OFL.txt.
#
#   pip install fonttools brotli
#   python instancias.py <ruta a mona-sans-latin-wdth-normal.woff2>
# (el archivo de origen viene en el paquete npm @fontsource-variable/mona-sans, carpeta files/)
#
# Tres cortes: la ancha (125 %) en 700 para titulares y números, y la normal en 400 y 600 para el
# texto. Cada uno pesa unos 18 KB, frente a los 98 KB de la variable completa.
import os
import sys
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools import subset

SRC = sys.argv[1]
AQUI = os.path.dirname(os.path.abspath(__file__))
FAMILIA = 'SC Grotesk'
CORTES = [
    ('ancha-700', {'wdth': 125, 'wght': 700}, 'Expanded Bold'),
    ('texto-400', {'wdth': 100, 'wght': 400}, 'Regular'),
    ('texto-600', {'wdth': 100, 'wght': 600}, 'SemiBold'),
]
# Latín básico y Latin-1 (tildes, eñe, ¿¡«»), más comillas tipográficas, rayas, puntos
# suspensivos y el euro.
UNICODES = list(range(0x20, 0x7F)) + list(range(0xA0, 0x100)) + [0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2026, 0x20AC, 0x2122, 0x2192, 0x2022]

for nombre, ejes, estilo in CORTES:
    f = instancer.instantiateVariableFont(TTFont(SRC), ejes, inplace=False, updateFontNames=False)
    opts = subset.Options()
    # tnum: cifras de ancho fijo para las horas; case: signos a la altura de las mayúsculas.
    opts.layout_features = ['kern', 'liga', 'calt', 'tnum', 'case', 'ccmp', 'locl', 'mark', 'mkmk']
    opts.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14]
    opts.hinting = False
    opts.flavor = 'woff2'
    s = subset.Subsetter(opts)
    s.populate(unicodes=UNICODES)
    s.subset(f)
    n = f['name']
    for rec in list(n.names):
        args = (rec.platformID, rec.platEncID, rec.langID)
        if rec.nameID == 1:
            n.setName(FAMILIA if estilo == 'Regular' else f'{FAMILIA} {estilo}', 1, *args)
        elif rec.nameID == 16:
            n.setName(FAMILIA, 16, *args)
        elif rec.nameID == 4:
            n.setName(f'{FAMILIA} {estilo}', 4, *args)
        elif rec.nameID == 6:
            n.setName(f'SCGrotesk-{estilo.replace(" ", "")}', 6, *args)
        elif rec.nameID == 3:
            n.setName(f'SCGrotesk-{estilo.replace(" ", "")};derivada de Mona Sans', 3, *args)
    f.flavor = 'woff2'
    salida = os.path.join(AQUI, f'sc-grotesk-{nombre}.woff2')
    f.save(salida)
    print(os.path.basename(salida), os.path.getsize(salida), 'bytes')
