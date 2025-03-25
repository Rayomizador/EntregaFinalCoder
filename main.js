document.getElementById('cierreCajaForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const Vtarjeta = parseFloat(document.getElementById('Vtarjeta').value) || 0;
  const Vefectivo = parseFloat(document.getElementById('Vefectivo').value) || 0;
  const guardarVentasDelDia = (Vtarjeta, Vefectivo) =>{
    const total = Vtarjeta+Vefectivo;
    localStorage.setItem('ventasDelDia', JSON.stringify({
      ventaTarjeta: Vtarjeta,
      ventaEfectivo: Vefectivo,
      total: total,
      fecha: new Date().toLocaleDateString()
    }));
    
    return total;
  };

  const total = guardarVentasDelDia(Vtarjeta, Vefectivo);
  const Resultado = document.getElementById('Resultado').getElementsByTagName('tbody')[0];
  Resultado.innerHTML = `
    <tr>
      <td>Ventas con Tarjeta</td>
      <td>$${Vtarjeta.toFixed(2)}</td>
    </tr>
    <tr>
      <td>Ventas en Efectivo</td>
      <td>$${Vefectivo.toFixed(2)}</td>  
    </tr>
    <tr>
      <td><strong>Total Ventas</strong></td>
      <td><strong>$${total.toFixed(2)}</strong></td>
    </tr>
  `;
  
  this.reset();
});