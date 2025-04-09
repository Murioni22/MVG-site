// Carrega o header
fetch('includes/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
        // Ativa menu atual
        highlightCurrentPage();
    });

// Carrega o footer
fetch('includes/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
    });

// Função para destacar a página atual no menu
function highlightCurrentPage() {
    const currentPage = location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('.menu a');
    
    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
}