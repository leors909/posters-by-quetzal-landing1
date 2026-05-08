document.addEventListener('DOMContentLoaded', () => {
    const catalogGrid = document.getElementById('catalog-grid');
    if (catalogGrid) { loadCatalog(); }

    const orderForm = document.getElementById('order-form');
    if (orderForm) { orderForm.addEventListener('submit', handleFormSubmission); }
});

async function loadCatalog() {
    try {
        // Datos simulados (Drop urbano / Cultura Pop)
        const products = [
            { id: 1, title: 'Hurry Up Tomorrow - Art Print', price: '$180', category: 'Póster Alto Gramaje', img: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&q=80' },
            { id: 2, title: 'Starboy Oversized Hoodie', price: '$650', category: 'Apparel', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80' },
            { id: 3, title: 'Acid Wash Graphic Tee', price: '$350', category: 'Apparel', img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80' }
     
        ];

        const catalogGrid = document.getElementById('catalog-grid');
        catalogGrid.innerHTML = ''; 

        products.forEach(product => {
            const card = `
                <div class="product-card">
                    <img src="${product.img}" alt="${product.title}">
                    <div class="product-info">
                        <h3>${product.title}</h3>
                        <p style="font-family: 'Courier New', Courier, monospace;">${product.category}</p>
                        <strong>${product.price} MXN</strong>
                    </div>
                </div>
            `;
            catalogGrid.innerHTML += card;
        });
    } catch (error) {
        console.error("Error al cargar la API:", error);
    }
}

async function handleFormSubmission(e) {
    e.preventDefault();
    const responseDiv = document.getElementById('form-response');
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    responseDiv.innerHTML = '<p style="margin-top:20px; font-weight:bold;">PROCESANDO SOLICITUD...</p>';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });

        if (response.ok) {
            responseDiv.innerHTML = `
                <div class="streetwear-box" style="margin-top: 20px; border-color: #00b894; box-shadow: 6px 6px 0px #00b894;">
                    <h3 style="color: #00b894;">¡DROP CONFIRMADO!</h3>
                    <p style="font-family: Arial;">Tu solicitud fue recibida. Te contactaremos pronto para afinar los detalles de tu custom.</p>
                </div>
            `;
            e.target.reset();
        }
    } catch (error) {
        responseDiv.innerHTML = '<p style="color: red; margin-top:20px; font-weight:bold;">ERROR EN EL SERVIDOR. INTENTA DE NUEVO.</p>';
    }
}
