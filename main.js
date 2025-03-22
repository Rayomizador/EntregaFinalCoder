let nuevoDiv = document.createElement('div');
nuevoDiv.innerHTML = '<p>Este es un nuevo div</p>';
document.body.appendChild(nuevoDiv);

let lista = document.getElementById('lista');
let nuevoItem = document.createElement('li');
nuevoItem.textContent = 'Nuevo ítem';
lista.appendChild(nuevoItem);

let primerItem = lista.firstChild;
lista.insertBefore(nuevoItem, primerItem);