// Interação básica para os botões (pode ser expandido)
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.closest('.product-container').querySelector('h2').textContent;
        alert(`${productName} adicionado ao carrinho!`);
    });
});