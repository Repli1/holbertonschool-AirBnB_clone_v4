document.addEventListener('DOMContentLoaded', () => {
  const checkBoxes = document.querySelectorAll('.amenities .popover input');
  const amenityH4Tag = document.querySelector('.amenities h4');
  const apiStatus = document.querySelector('#api_status');

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
  const url = 'http://0.0.0.0:5001/api/v1/status/';
  const response = fetch(url);
  response
    .then(response => {
      if (response.ok) {
        apiStatus.classList.add('available');
      } else {
        apiStatus.classList.remove('available');
      }
    }).catch(err => console.log(err));
});
