# Aplicació de vídeo a tercers del Servei Català del Trànsit
 
L'aplicació de vídeo a tercers del Servei Català del Trànsit permet visualitzar en directe les càmeres que estan instal·lades a les carreteres catalanes. 


## Com funciona

Per descarregar el codi font de l'aplicació:

```terminal
git clone https://github.com/erikmartinjordan/video-a-tercers
```

Compilació de l'aplicació per Windows (arquitectura de 32 i 64 bits):

```terminal
npx electron-builder --ia32 --x64 -w portable
```

**Important**: Comprova que tens l'[VLC](https://www.videolan.org/vlc/index.es.html) instal·lat i executa l'arxiu `.exe` generat. 


## Modificació de les càmeres

L'arxiu **`cameres.js`** conté la informació de posicionament de totes les càmeres. Per exemple:

```javascript
{
    "0001": {
        "carretera": "B-20",
        "pk": 15.630,
        "coordenades": {
            "lat": 41.446203,
            "lng": 2.180832
        }
    }
}
```

La clau de l'objecte `"0001"` indica el número de la càmera (segons el criteri d'enumeració del Servei Català del Trànsit). Els altres valors:

- `carretera`: El nom de la carretera
- `pk`: Punt quilòmetric on es troba la càmera
- `coordenades`: Les coordenades geogràfiques on es troba la càmera

Per afegir una càmera al mapa, només cal afegir un objecte amb la notació anterior. 

## Modificació dels usuaris

L'arxiu **`config.js`** conté la informació dels diversos ports per visualitzar les càmeres. Per exemple:

```javascript
{
    "SCT": {
        "address": "10.141.124.154",
        "port": 81,
        "rtsp_ports": {
            "9001": {
                "name": "lpuigbarraca"
            },
            "9002": {
                "name": "lserrano"
            },
            "9003": {
                "name": "vgallego"
            },
            "9004": {
                "name": "jpenya"
            },
            "9005": {
                "name": "jcgarcia"
            },
            "9006": {
                "name": "mserra"
            },
            "9007": {
                "name": "jmoli"
            },
            "9008": {
                "name": "premsa"
            }
        }
    }
}
```

La clau de l'objecte `"SCT"` correspon al nom de l'entitat que té assignada una sortida de vídeo a tercers (segons el criteri de nomenclatura del Servei Català del Trànsit). Els altres valors:

- `address`: Direcció IP del servidor de transcodificació
- `port`: Port del servidor de transcodificació   
- `rtsp_ports`: Els ports de sortida de l'*streaming*

Cada port de sortida s'assigna a un únic usuari per evitar col·lisions. 