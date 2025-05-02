<script>
  document.getElementById("seeMoreBtn").addEventListener("click", function () {
    const hiddenItems = document.querySelectorAll(".news-item.hidden");
    hiddenItems.forEach(item => item.classList.remove("hidden"));
    this.style.display = "none";
  });
</script>
