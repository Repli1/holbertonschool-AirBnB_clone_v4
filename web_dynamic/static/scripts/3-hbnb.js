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
  const headerUrl = 'http://0.0.0.0:5001/api/v1/status/';
  const response = fetch(headerUrl);
  response
    .then(response => {
      if (response.ok) {
        apiStatus.classList.add('available');
      } else {
        apiStatus.classList.remove('available');
      }
    }).catch(err => console.log(err));

  const placesUrl = 'http://0.0.0.0:5001/api/v1/places_search/';
  const placesPostRequest = fetch(placesUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });

  placesPostRequest
    .then(response => response.json())
    .then(data => {
      const sectionPlaces = document.querySelector('section.places');
      for (const place of data) {
        const articleTag = document.createElement('article');
        const divTitleBox = document.createElement('div');
        divTitleBox.classList.add('title_box');
        articleTag.append(divTitleBox);
        const placeNameH2Tag = document.createElement('h2');
        placeNameH2Tag.textContent = place.name;
        divTitleBox.append(placeNameH2Tag);
        const priceByNight = document.createElement('div');
        priceByNight.classList.add('price_by_night');
        priceByNight.textContent = '$' + place.price_by_night;
        divTitleBox.append(priceByNight);
        const informationDiv = document.createElement('div');
        informationDiv.classList.add('information');
        articleTag.append(informationDiv);
        const maxGuestDiv = document.createElement('div');
        maxGuestDiv.classList.add('max_guest');
        maxGuestDiv.textContent = place.max_guest;
        informationDiv.append(maxGuestDiv);
        const numberRoomsDiv = document.createElement('div');
        numberRoomsDiv.classList.add('number_rooms');
        numberRoomsDiv.textContent = place.number_rooms;
        informationDiv.append(numberRoomsDiv);
        const numberBathroomsDiv = document.createElement('div');
        numberBathroomsDiv.classList.add('number_bathrooms');
        numberBathroomsDiv.textContent = place.number_bathrooms;
        informationDiv.append(numberBathroomsDiv);
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');
        userDiv.textContent = 'Owner: (empty)';
        articleTag.append(userDiv);
        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('description');
        descriptionDiv.textContent = `Description: ${place.description}`;
        articleTag.append(descriptionDiv);

        sectionPlaces.append(articleTag);
      }
    }).catch(err => console.log(err));
});
