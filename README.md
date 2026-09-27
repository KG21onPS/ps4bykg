# ps4bykg

Host statique GitHub Pages pour le dépôt :

https://github.com/KG21onPS/ps4bykg

## URL GitHub Pages prévue

https://KG21onPS.github.io/ps4bykg/

## Installation

1. Mets tout le contenu de ce ZIP à la racine du dépôt `ps4bykg`.
2. Va dans `Settings > Pages`.
3. Choisis `Deploy from a branch`.
4. Branche : `main`.
5. Dossier : `/(root)`.
6. Clique sur `Save`.

## Payload

Le payload inclus doit être placé ici :

`payloads/goldhen.bin`

Le bouton **Charger le BIN** télécharge ce fichier dans le navigateur et le place dans :

`window.PS4BYKG_PAYLOAD`

## Important

Ce host est statique. Il ne contient pas de chaîne d'exploit WebKit/kernel
et n'exécute pas le payload à lui seul.

## Cache hors-ligne

Le bouton **Mettre en cache hors-ligne** tente de conserver le site et le payload
dans le cache disponible du navigateur.
