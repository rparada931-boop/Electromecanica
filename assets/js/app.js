const grid = document.getElementById('grid-servicios');
const modalElement = document.getElementById('modalServicio');
const bsModal = new bootstrap.Modal(modalElement);

// 1. Cargar los 10 servicios desde el JSON
fetch('assets/js/servicios.json')
    .then(res => res.json())
    .then(data => {
        data.forEach(s => {
            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4';
            card.innerHTML = `
                <div class="card card-servicio h-100 text-white">
                    <img src="${s.imagen}" class="card-img-top img-servicio" alt="${s.nombre}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="neon-text">${s.nombre}</h5>
                        <p class="text-secondary small">$${s.precio.toLocaleString()}</p>
                        <button class="btn btn-outline-warning mt-auto" onclick="abrirAgenda(${s.id})">AGENDAR AHORA</button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
        window.servicios = data;
    });

// 2. Función para abrir el modal y configurar el calendario
function abrirAgenda(id) {
    const serv = window.servicios.find(item => item.id === id);
    document.getElementById('nombreServicio').innerText = serv.nombre;
    document.getElementById('descServicio').innerText = serv.descripcion;
    
    const cal = document.getElementById('calendario');
    cal.innerHTML = '';
    const dias = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES'];
    
    dias.forEach(dia => {
        const btn = document.createElement('button');
        btn.className = 'day-btn';
        btn.innerText = dia;
        
        btn.onclick = () => {
            const patente = document.getElementById('patente').value;
            const modelo = document.getElementById('modelo').value;

            if (patente === '' || modelo === '') {
                alert("❌ ERROR: Debes ingresar PATENTE y MODELO del auto.");
            } else {
                alert(`⚡ AGENDADO CON ÉXITO ⚡\n\nAuto: ${modelo}\nPatente: ${patente.toUpperCase()}\nServicio: ${serv.nombre}\nDía: ${dia}`);
                bsModal.hide();
                document.getElementById('patente').value = '';
                document.getElementById('modelo').value = '';
            }
        };
        cal.appendChild(btn);
    });

    bsModal.show();
}