function onEdit(e) {
  var hojaBuscador = e.source.getSheetByName('Buscador');
  var rango = e.range;

  // Verificar si la edición fue en la columna A y no es la fila de encabezados
  if (hojaBuscador && rango.getColumn() === 1 && rango.getRow() > 1) {
    var idBuscado = rango.getValue();
    if (idBuscado) {
      buscarEnBases(idBuscado, rango.getRow());
    }
  }
}

function buscarEnBases(id, fila) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hojas = ['FOS2024', 'FI2024', 'FOS2025', 'FI2025'];
  var hojaBuscador = ss.getSheetByName('Buscador');

  for (var i = 0; i < hojas.length; i++) {
    var hoja = ss.getSheetByName(hojas[i]);
    if (hoja) {
      var datos = hoja.getDataRange().getValues();
      
      for (var j = 1; j < datos.length; j++) {
        if (datos[j][1] == id) { // Columna B (índice 1) es la Cédula
          
          // Mostrar los resultados en la fila correspondiente, incluyendo la sede
          hojaBuscador.getRange(fila, 2, 1, 11).setValues([
            [
              datos[j][0], // Tipo Documento (Columna A)
              datos[j][1], // Cédula (Columna B)
              datos[j][2], // Nombre 1 (Columna C)
              datos[j][3], // Nombre 2 (Columna D)
              datos[j][4], // Apellido 1 (Columna E)
              datos[j][5], // Apellido 2 (Columna F)
              datos[j][6], // Género (Columna G)
              datos[j][7], // Fecha Egreso (Columna H)
              datos[j][9], // Certificado (Columna J)
              datos[j][10], // Tipo Defunción (Columna K)
              hojas[i] // Sede (nombre de la hoja)
            ]
          ]);
          return;
        }
      }
    }
  }

  // Si no encuentra resultados, limpia las celdas
  hojaBuscador.getRange(fila, 2, 1, 11).clearContent();
  Browser.msgBox('No se encontraron resultados para la Cédula: ' + id);
}
