document.getElementById('cierreCajaForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const VEfectivo = parseFloat(document.getElementById('Vefectivo').value);
    const VTarjeta = parseFloat(document.getElementById('Vtarjeta').value);
    const VentaTotal = VEfectivo + VTarjeta;
  
    const resultadosTable = document.getElementById('resultadosTable').getElementsByTagName('tbody')[0];
    resultadosTable.innerHTML = `
      <tr>
        <td>Vefectivo</td>
        <td>${VEfectivo}</td>
      </tr>
      <tr>
        <td>Vtarjeta</td>
        <td>${VTarjeta}</td>
      </tr>
      <tr>
        <td>Vtotal</td>
        <td>${VentaTotal}</td>
      </tr>
    `;
  });

  