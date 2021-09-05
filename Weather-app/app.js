
window.addEventListener('load', () => {
  let long;
  let lat;
  let tempDescription = document.querySelector('.temp-description');
  let tempDegree = document.querySelector('.temp-degree');
  let location = document.querySelector('.location-timezone');
  let tempSection = document.querySelector('.temp');

  const tempSpan = document.querySelector('.temp span')

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

      fetch(api)
        .then(response => response.json())
        .then(data => {

          const { temperature, summary, icon } = data.currently;

          // Set DOM 
          tempDegree.textContent = temperature;
          tempDescription.textContent = summary;
          location.textContent = data.timezone;
          let celsius = (temperature - 32) * (5 / 9);

          // Set Icon
          setIcon(icon, document.querySelector(".icon"));

          // change temp
          tempSection.addEventListener('click', () => {
            if (tempSpan.textContent === 'F') {
              tempSpan.textContent = "C"
              tempDegree.textContent = Math.floor(celsius);
            } else {
              tempSpan.textContent = "F"
              tempDegree.textContent = temperature;
            }
          })
        });
    });

  }

  function setIcon(icon, iconId) {
    const skycons = new Skycons({ color: 'white' });

    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    console.log(skycons.play);
    return skycons.set(iconId, skycons.currentIcon);

  }

});