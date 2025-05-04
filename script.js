if (window.innerWidth < 768) {
    alert("For the best experience, please switch to Desktop Site view.");
}

document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("nav a");

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const targetPage = this.getAttribute("href");

            document.body.classList.add("fade-out");

            setTimeout(() => {
                window.location.href = targetPage;
            }, 200); // 200ms delay
        });
    });
});


