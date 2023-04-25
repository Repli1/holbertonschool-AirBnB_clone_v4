document.addEventListener('DOMContentLoaded', () => {
  const checkBoxes = document.querySelectorAll('.amenities .popover input');
  const amenityH4Tag = document.querySelector('.amenities h4');

  const [amenityIDs, amenityNames] = [[], []];
  for (const box of checkBoxes) {
    box.addEventListener('click', () => {
      if (box.checked) {
        amenityIDs.push(box.getAttribute('data-id'));
        amenityNames.push(box.getAttribute('data-name'));
      } else {
        const popIndex = amenityIDs.indexOf(box.getAttribute('data-id'));
        amenityIDs.splice(popIndex, 1);
        amenityNames.splice(popIndex, 1);
      }
      amenityH4Tag.textContent = amenityNames.join(', ');
    });
  }
});
