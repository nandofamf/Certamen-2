$(document).ready(function() {
    const cart = [];
    const predefinedProducts = [
      { name: 'Producto 1', quantity: 5 },
      { name: 'Producto 2', quantity: 3 },
      { name: 'Producto 3', quantity: 2 },
      { name: 'Producto 4', quantity: 1 },
      { name: 'Producto 5', quantity: 4 }
    ];
  
    function renderCart() {
      $('#cart').empty();
      cart.forEach((item, index) => {
        if (item.quantity > 0) { 
          const listItem = $(`<li class="list-group-item" id="item-${index}">
                                <span class="name">${item.name}</span> - Cantidad: <span class="quantity">${item.quantity}</span>
                                <button class="btn btn-info btn-sm float-right mr-2" onclick="editItem(${index})">Editar</button>
                                <button class="btn btn-danger btn-sm float-right mr-2" onclick="removeFromCart(${index})">Eliminar</button>
                             </li>`);
          $('#cart').append(listItem);
        }
      });
    }
  
    function addToCart(product) {
      if (!product.name || isNaN(product.quantity)) { 
        alert('Todos los campos son obligatorios y deben ser números.');
        return;
      }
      
      if (product.quantity <= 0 || product.quantity > 10) { 
        alert('La cantidad debe ser entre 1 y 10.');
        return;
      }
      
      const existingProductIndex = cart.findIndex(item => item.name === product.name);
      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += product.quantity;
        if (cart[existingProductIndex].quantity > 10) cart[existingProductIndex].quantity = 10; 
      } else {
        cart.push(product);
      }
      renderCart();
    }
  
    function removeFromCart(index) {
      cart.splice(index, 1);
      renderCart();
    }

    function editItem(index) {
      const item = cart[index];
      const productNameInput = $('<input type="text" class="form-control" value="' + item.name + '">');
      const quantityInput = $('<input type="number" class="form-control" value="' + item.quantity + '" min="1" max="10">');
      const saveButton = $('<button class="btn btn-info btn-sm float-right mr-2" onclick="saveChanges(' + index + ')">Guardar</button>');
      
      $(`#item-${index}`).find('.name').replaceWith(productNameInput);
      $(`#item-${index}`).find('.quantity').replaceWith(quantityInput);
      $(`#item-${index}`).find('.btn-info').hide(); 
      $(`#item-${index}`).append(saveButton); 
    }


    
    function saveChanges(index) {
      const newName = $(`#item-${index} input[type="text"]`).val().trim();
      if (!newName) {
        alert('El nombre del producto no puede estar vacío.');
        return;
      }
      cart[index].name = newName;

      const newQuantity = parseInt($(`#item-${index} input[type="number"]`).val());
      if (newQuantity <= 0 || newQuantity > 10 || isNaN(newQuantity)) {
        alert('La cantidad debe ser un número entre 1 y 10.');
        return;
      }
      cart[index].quantity = newQuantity;
      renderCart();
    }
  
    function showProductDetails(index) {
      const product = cart[index];
      $('#modalProductName').text(product.name);
      $('#modalProductQuantity').text(product.quantity);
    }
  
    $('#addProductForm').on('submit', function(event) {
      event.preventDefault();
      const name = $('#productName').val().trim();
      const quantity = parseInt($('#productQuantity').val());
  
      addToCart({ name, quantity });
      $('#addProductForm')[0].reset();
    });
  
    predefinedProducts.forEach(product => addToCart(product));
  
    window.removeFromCart = removeFromCart;
    window.showProductDetails = showProductDetails;
    window.editItem = editItem;
    window.saveChanges = saveChanges;
  });
  
  $.getJSON('https://mindicador.cl/api', function(data) {
    var dailyIndicators = data;
    $("#uf-value").html('$' + dailyIndicators.uf.valor);
    $("#dolar-value").html('$' + dailyIndicators.dolar.valor);
    $("#euro-value").html('$' + dailyIndicators.euro.valor);
  }).fail(function() {
    console.log('Error al consumir la API!');
  });

  $('a[href="#inicio"]').click(function(){
    $('html, body').animate({
        scrollTop: 0
    }, 'slow');
    return false;
});

$('a[href="#productos"]').click(function(){
    $('html, body').animate({
        scrollTop: $("#productos").offset().top
    }, 'slow');
    return false;
});


