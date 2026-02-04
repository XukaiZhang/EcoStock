/* ================= DATOS DEL CATÁLOGO ================= */
// Precios basados en media de mercado español (Obramat, Leroy, BigMat) - Feb 2026
const productos = [
    { 
        id: 1, 
        nombre: "Vigas IPN 120 Acero (Lote 4 uds x 6m)", 
        originalPrice: 380, // Media mercado: ~95€/ud (6m)
        precio: 145,        // Descuento agresivo por excedente (~62%)
        category: "Estructural",
        description: "Lote de 4 vigas IPN 120 de acero S275JR laminado en caliente. Longitud 6 metros cada una. Excedente de estructura metálica en Madrid. Certificado de trazabilidad disponible.",
        img: "https://images.milanuncios.com/api/v1/ma-ad-media-pro/images/2866cbd4-e35b-4524-b433-2b7f70aaa242?rule=hw396_70" 
    },
    { 
        id: 2, 
        nombre: "Palé Ladrillo Cara Vista (400 uds)", 
        originalPrice: 190, // Media mercado: ~0.45€/ud
        precio: 65,         // Descuento ~65%
        category: "Estructural", 
        description: "Palé completo de ladrillo caravista rojo klinker (24x11,5x5 cm). Sobrante de promoción residencial. Ladrillos hidrofugados de primera calidad, sin roturas.",
        img: "https://images.milanuncios.com/api/v1/ma-ad-media-pro/images/2c90e1fb-7a0d-49a8-ab62-17db68b331e5?rule=detail_640x480" 
    },
    { 
        id: 3, 
        nombre: "Cemento Portland (25 Sacos x 25kg)", 
        originalPrice: 135, // Media mercado: ~5.40€/saco
        precio: 50,         // Descuento ~63%
        category: "Estructural", 
        description: "Lote de 25 sacos de Cemento Gris CEM II/B-L 32,5N. Fabricación reciente (menos de 3 semanas). Almacenado en nave climatizada, sin endurecimiento por humedad.",
        img: "https://www.kompas.es/ControlIntegral/imagenes/articulos/saco-cemento-portland-saco-25kg-amengual-adhesivos-masillas-y-aridos-masillas-y-aridos-ferreteria-kompas-art.jpg" 
    },
    { 
        id: 4, 
        nombre: "Grifería Monomando Lavabo (Pack x5)", 
        originalPrice: 350, // Media mercado: ~70€/ud (Gama media tipo Roca/Grohe base)
        precio: 110,        // Descuento ~68%
        category: "Fontanería", 
        description: "5 unidades de grifo monomando para lavabo. Acero inoxidable cromado. Cartucho cerámico de 35mm. Incluye latiguillos y tornillería. Nuevos en caja original.",
        img: "https://media.adeo.com/mkp/ed1b564a57c98563d4d538aaa3dce964/media.jpeg?width=650&height=650&format=jpg&quality=80&fit=bounds" 
    },
    { 
        id: 5, 
        nombre: "Lana de Roca 80mm (Rollo 6m²)", 
        originalPrice: 55,  // Media mercado: ~9€/m²
        precio: 22,         // Descuento ~60%
        category: "Aislamiento", 
        description: "Rollo de aislamiento de lana de roca con barrera de vapor kraft. Espesor 80mm. Ideal para falsos techos y tabiquería. Mejora térmica y acústica. Ignífugo.",
        img: "https://media.cdn.bauhaus/m/276895-1/12.jpg" 
    },
    { 
        id: 6, 
        nombre: "Tubería PVC 110mm (10 uds x 3m)", 
        originalPrice: 160, // Media mercado: ~16€/tubo
        precio: 45,         // Descuento ~70% (Material voluminoso, urge venta)
        category: "Fontanería", 
        description: "Lote de 10 tubos de PVC gris para evacuación de aguas. Diámetro 110mm, longitud 3m. Unión por encolado. Resistencia SN4. Perfecto estado.",
        img: "https://hogaryreformas.com/wp-content/uploads/2024/10/tubo_mm_m_pvc_10106803_picture.jpeg" 
    },
    { 
        id: 7, 
        nombre: "Suelo Porcelánico Gris (20m²)", 
        originalPrice: 440, // Media mercado: ~22€/m²
        precio: 180,        // Descuento ~60%
        category: "Acabados", 
        description: "20 metros cuadrados de gres porcelánico esmaltado. Formato 60x60 cm. Color Gris Cemento Mate. Rectificado (bordes rectos). Antideslizante C2.",
        img: "https://media.adeo.com/media/4401327/media.jpgp" 
    },
    { 
        id: 8, 
        nombre: "Generador Gasolina 5500W Pro", 
        originalPrice: 890, // Media mercado: ~900€ (Gama profesional)
        precio: 390,        // Descuento ~56%
        category: "Maquinaria", 
        description: "Generador eléctrico monofásico 5500W. Motor 4 tiempos OHV. Depósito 25L. Regulador AVR. Solo 10 horas de uso para pruebas. Garantía mecánica vigente.",
        img: "https://www.soydecampo.com/14564-large_default/generador-genergy-sgb-pro-5500w.jpg" 
    }
];

let cart = JSON.parse(localStorage.getItem('ecoCart')) || [];
let currentProductModal = null;

/* ================= LÓGICA DE FILTRADO ================= */
window.filterProducts = function() {
    const checkboxes = document.querySelectorAll('.filter-option input:checked');
    const selectedCategories = Array.from(checkboxes).map(cb => cb.value);

    if (selectedCategories.length === 0) {
        renderGrid(productos); 
    } else {
        const filtered = productos.filter(p => selectedCategories.includes(p.category));
        renderGrid(filtered);
    }
};

/* ================= RENDERIZADO CATÁLOGO ================= */
function renderGrid(listaProductos) {
    const grid = document.getElementById('catalogGrid');
    if (!grid) return;
    
    grid.innerHTML = '';

    if(listaProductos.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px; color: #64748B;">
                <p style="font-size: 1.2rem;">No se encontraron productos con esos filtros.</p>
                <button onclick="clearFilters()" style="margin-top:15px; color:var(--primary); background:none; border:none; cursor:pointer; font-weight:bold; text-decoration:underline;">Ver todo</button>
            </div>`;
        return;
    }

    grid.innerHTML = listaProductos.map(p => `
        <div class="product-card" onclick="openModal(${p.id})">
            <div class="card-img-wrapper">
                <span class="badge-discount">-${Math.round((1 - p.precio/p.originalPrice)*100)}%</span>
                <img src="${p.img}" class="card-img" alt="${p.nombre}" loading="eager" onerror="this.src='https://placehold.co/600x400?text=Sin+Imagen'">
            </div>
            <div class="card-content">
                <span class="category">${p.category}</span>
                <h3 class="card-title">${p.nombre}</h3>
                <div class="card-footer" onclick="event.stopPropagation()">
                    <div style="display:flex; justify-content:space-between; align-items:end">
                        <div>
                            <span style="text-decoration: line-through; color: #94a3b8; font-size: 0.9rem;">${p.originalPrice}€</span>
                            <div class="price" style="margin-bottom:0">${p.precio}€</div>
                        </div>
                        <button class="btn-icon" onclick="addToCart(${p.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

window.clearFilters = function() {
    document.querySelectorAll('.filter-option input').forEach(cb => cb.checked = false);
    renderGrid(productos);
}

/* ================= LÓGICA DEL CARRITO ================= */
function updateUI() {
    const badges = document.querySelectorAll('#cart-count');
    const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    badges.forEach(b => b.innerText = totalItems);
}

window.addToCart = function(id, qty = 1) {
    const product = productos.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + qty;
    } else {
        cart.push({ ...product, quantity: qty });
    }

    localStorage.setItem('ecoCart', JSON.stringify(cart));
    updateUI();
    
    const modal = document.getElementById('productModal');
    if (modal) modal.style.display = "none";

    Swal.fire({
        title: '¡Añadido!',
        text: `${qty}x ${product.nombre} al carrito.`,
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    });
};

window.removeItem = function(index) {
    cart.splice(index, 1);
    localStorage.setItem('ecoCart', JSON.stringify(cart));
    updateUI();
    renderCart();
};

/* ================= LÓGICA DEL MODAL ================= */
window.openModal = function(id) {
    const p = productos.find(prod => prod.id === id);
    currentProductModal = p;
    
    document.getElementById('modalImg').src = p.img;
    document.getElementById('modalCat').innerText = p.category;
    document.getElementById('modalTitle').innerText = p.nombre;
    document.getElementById('modalDesc').innerText = p.description;
    document.getElementById('modalOldPrice').innerText = p.originalPrice + "€";
    document.getElementById('modalPrice').innerText = p.precio + "€";
    document.getElementById('qtyInput').value = 1;

    document.getElementById('productModal').style.display = "block";
}

document.querySelector('.close-modal')?.addEventListener('click', () => {
    document.getElementById('productModal').style.display = "none";
});

window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

window.changeQty = function(change) {
    const input = document.getElementById('qtyInput');
    let val = parseInt(input.value);
    val += change;
    if (val < 1) val = 1;
    input.value = val;
}

window.addToCartFromModal = function() {
    if(currentProductModal) {
        const qty = parseInt(document.getElementById('qtyInput').value);
        addToCart(currentProductModal.id, qty);
    }
}

/* ================= RENDERIZADO PÁGINA CARRITO ================= */
function renderCart() {
    const list = document.getElementById('cart-list');
    if (!list) return;

    if (cart.length === 0) {
        list.innerHTML = `<div style="padding:40px; text-align:center; color:#64748B;">
                            <p>Tu carrito está vacío.</p>
                            <a href="catalogo.html" style="color:var(--primary); font-weight:600; margin-top:10px; display:inline-block">Ir a Oportunidades</a>
                          </div>`;
        updateTotals(0);
        return;
    }

    list.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="item-info">
                <div class="item-img" style="background-image: url('${item.img}')"></div>
                <div class="item-details">
                    <h4>${item.nombre}</h4>
                    <span style="font-size:0.9rem">Cantidad: <b>${item.quantity || 1}</b></span> <br>
                    <span style="color:#ef4444; font-size:0.8rem">Ahorras: ${(item.originalPrice - item.precio).toFixed(2)}€/ud</span>
                </div>
            </div>
            <div style="text-align:right">
                <div style="font-weight:700; margin-bottom:5px;">${(item.precio * (item.quantity || 1)).toFixed(2)}€</div>
                <button class="btn-remove" onclick="removeItem(${index})">Eliminar</button>
            </div>
        </div>
    `).join('');

    const subtotal = cart.reduce((acc, p) => acc + (p.precio * (p.quantity || 1)), 0);
    updateTotals(subtotal);
}

function updateTotals(subtotal) {
    const tax = subtotal * 0.21;
    const total = subtotal + tax;
    
    const elements = {
        sub: document.getElementById('subtotal-price'),
        tax: document.getElementById('tax-price'),
        tot: document.getElementById('total-price'),
        totCheckout: document.getElementById('total-price-checkout')
    };

    if(elements.sub) elements.sub.innerText = subtotal.toFixed(2) + "€";
    if(elements.tax) elements.tax.innerText = tax.toFixed(2) + "€";
    if(elements.tot) elements.tot.innerText = total.toFixed(2) + "€";
    if(elements.totCheckout) elements.totCheckout.innerText = total.toFixed(2) + "€";
}

/* ================= GRÁFICA REALISTA (Series A Growth) ================= */
function initChart() {
    const ctx = document.getElementById('growthChart');
    if (!ctx) return;

    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            // Años fiscales realistas para una startup fundada hace poco
            labels: ['2023 (Seed)', '2024 (Late Seed)', '2025 (Series A)', '2026 (Forecast)'],
            datasets: [{
                label: 'GMV Anual (Millones €)',
                // Datos: Crecimiento exponencial inicial típico (hockey stick) pero en cifras creíbles
                // 1.2M (Validación) -> 3.1M (Tracción) -> 5.8M (Escalado) -> 12.5M (Expansión)
                data: [1.2, 3.1, 5.8, 12.5], 
                borderColor: '#FF5A1F',
                backgroundColor: 'rgba(255, 90, 31, 0.1)',
                borderWidth: 3,
                tension: 0.3, // Curva un poco más tensa, menos "fantasiosa"
                fill: true,
                pointBackgroundColor: '#FFFFFF',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', labels: { color: '#333' } },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + ' M€ (Volumen Transaccionado)';
                        }
                    }
                }
            },
            scales: {
                y: { 
                    beginAtZero: true, 
                    grid: { color: '#e2e8f0' },
                    ticks: { callback: function(value){ return value + ' M€'} }
                },
                x: { grid: { display: false } }
            }
        }
    });
}

window.goToCheckout = function() {
    if (cart.length === 0) {
        Swal.fire('Carrito vacío', 'Añade productos antes de tramitar el pedido.', 'warning');
        return;
    }
    window.location.href = 'checkout.html';
};

window.finalizeOrder = function(e) {
    e.preventDefault();
    Swal.fire({
        title: 'Procesando...',
        timer: 2000,
        didOpen: () => Swal.showLoading()
    }).then(() => {
        Swal.fire('¡Éxito!', 'Pedido confirmado.', 'success')
        .then(() => {
            cart = [];
            localStorage.setItem('ecoCart', JSON.stringify(cart));
            window.location.href = 'index.html';
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    renderGrid(productos);
    if(document.getElementById('cart-list')) renderCart();
    initChart();
});