document.getElementById('cierreCajaForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const Vtarjeta = parseFloat(document.getElementById('Vtarjeta').value) || 0;
  const Vefectivo = parseFloat(document.getElementById('Vefectivo').value) || 0;
  
  const ventasDelDia = {
    ventaTarjeta: Vtarjeta,
    ventaEfectivo: Vefectivo,
    total: Vtarjeta + Vefectivo,
    fecha: new Date().toLocaleDateString()
  };
  
  localStorage.setItem('ventasDelDia', JSON.stringify(ventasDelDia));


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
      <td><strong>$${ventasDelDia.total.toFixed(2)}</strong></td>
    </tr>
  `;

  enviarASlack(ventasDelDia)
    .then(() => {
      const alerta = document.createElement('div');
      alerta.className = 'alert alert-success mt-3';
      alerta.textContent = '✅ Ventas enviadas a Slack';
      this.appendChild(alerta);
      setTimeout(() => alerta.remove(), 3000);
    })
    .catch(error => {
      console.error("Error Slack:", error);
      const alerta = document.createElement('div');
      alerta.className = 'alert alert-danger mt-3';
      alerta.textContent = '⚠️ Error al enviar a Slack';
      this.appendChild(alerta);
      setTimeout(() => alerta.remove(), 3000);
    });

  this.reset();
});

const enviarASlack = (ventas) => {
  return new Promise((resolve, reject) => {  
    const webhookUrl = 'https://eoe6efwi5mlqavk.m.pipedream.net';
    
    const mensaje = {
      "message": {
        "text": `📊 *Cierre de Caja* - ${ventas.fecha}\n` +
                `💳 *Tarjeta:* $${ventas.ventaTarjeta.toFixed(2)}\n` +
                `💰 *Efectivo:* $${ventas.ventaEfectivo.toFixed(2)}\n` +
                `🎯 *Total:* $${ventas.total.toFixed(2)}`
      },
      "metadata": {
        "event_type": "cierre-caja",
        "event_payload": {
          "fecha": ventas.fecha,
          "total": ventas.total
        }
      }
    };

    fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mensaje)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => resolve(data))
    .catch(error => reject(error));
  });
};