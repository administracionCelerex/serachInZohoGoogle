# serachZohoInGoogle

## **Acerca de**

Este programa se encarga de hacer un match de contactos entre google y crm
dando como reusltado un archivo Ecxel el cual puede ser analizado 

## prerequisitos

- nodejs
- archivo de admincontactos del CRM ZOHO editando las cabeceras de la siguiente manera
 y cambiandole el nombre a datacrm.xls
```
| Fecha Nacimiento | Edad | ID | nombreZoho | Celular | Telefono | Empresa | Email | Notas | Apodo | Puesto | Fuente | Zona | RFC | Genero | Ocupación | Página Web | Telefonos | Emails | Direcciones | Archivos Adjuntos |   |   |
|-----------------------|------|----|------------|---------|----------|---------|-------|-------|-------|--------|--------|------|-----|--------|-----------|------------|-----------|--------|-------------|-------------------|---|---|
```
- el archivo **contactos.json** que genera el sistema. ***getAlllContacts*** debe ser similar a lo siguinte

```
{
            "resourceName": "people/c12...",
            "etag": "%Eh..",
            ......,
},
```

## Como usarlo

1. Descargue el archivo .zip o clone el repositorio
2. descomprima el archivo en el lugar deseado
3. abra una terminar dentro de la carpeta que se descomprimio
4. ejecute el comando **npm install** (esto descargara todas las dependecias, debe generarse el folder node_modules)
5. crear el folder **data** dentro del proyecto
6. copie dentro del folder los archivos **contactos.json** y **datacrm**
7. dentro del proyecto ejecute el comando node app.js. Al terminar dentro de la carpeta data deberan estar los archivos:

* intereseccion.xlsx (son todos los contactos que el sistema pudo encontrar como los mismos, sin embargo, debe revisarse aun el archivo idRepetidos).

*   A-B.xlsx (son los contactos que el sistema no pudo relacionar por numeros, telefonos o correos, estos deben buscarse de modo manual)
*   GmailDataConverted.xlsx (todos los contactos de Gmail pasados a un ecxel)
*   idsRepetidos.txt (muchas veces un contacto esta repetido o tiene similitud con otro, este archivo se usa para saber cuales contactos el sitema confunndio, le puso informacion errornea. debe ser revisado el archivo **interseccion** y remplazar correctamente la informacion)

## Notas

Cada que se corre el sitema los archivos que se crean remplazan a los existentes por lo cual es necesario guardar antes estos archivos.