const seeMoreBtn = document.getElementById('seeMoreBtn');
const hiddenItems = document.querySelectorAll('.news-item.hidden');

let isExpanded = false;

seeMoreBtn.addEventListener('click', () => {
  hiddenItems.forEach(item => {
    item.classList.toggle('hidden');
  });

  isExpanded = !isExpanded;
  seeMoreBtn.textContent = isExpanded ? 'See Less' : 'See More';
});
