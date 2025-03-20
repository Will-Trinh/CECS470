
// add a DOMContentLoaded event handler.
document.addEventListener("DOMContentLoaded", function () {
  //Transform the JSON data into a JavaScript object.
  const paintings = JSON.parse(content);  // Parse the JSON content 

  //To locate the ids “details”, “paintings ul”, and “details figure”
  const details = document.querySelector("#details");
  const list = document.querySelector("#paintings ul"); // Locating paintings ul
  const figure = document.querySelector("#details figure"); // Locating details figure

  //Call the function generateThumbList to
  generateThumbList(list, paintings);

  // use event delegation to handle clicks in list
  list.addEventListener("click", function (e) {
    // Check if clicked item is an image
    if (e.target && e.target.tagName == "IMG") {
      displayPaintingLarge(e.target);
    }
  });

  function generateThumbList(list, paintings) {
    // loop thru list of paintings and create <li><img></li>
    for (p of paintings) {
      const item = document.createElement("li"); // Create <li>
      const thumb = document.createElement("img"); // Create <img>
      thumb.src = "images/small/" + p.id + ".jpg"; // Set image source
      thumb.alt = p.title;
      thumb.dataset.id = p.id;
      item.appendChild(thumb); // Put <img> inside <li>
      list.appendChild(item); // Add <li> to the <ul>
    }
  }

  function displayPaintingLarge(clickedThumbImage) {
    // retrieve the painting id from data-id attribute
    let id = clickedThumbImage.dataset.id;

    // find that painting in array
    const painting = paintings.find(function (p) {
      return p.id == id;
    });

    // display the found painting
    document.querySelector("#title").textContent = painting.title; // Update Title
    document.querySelector("#artist").textContent = "By " + painting.artist; // Update Artist Name
    let image = document.createElement("img");
    image.src = "images/large/" + painting.id + ".jpg"; // Set up large image
    // clear previous features
    figure.innerHTML = "";
    // display all features for this painting
    displayFeatures(painting.features);
    // add painting to image
    figure.appendChild(image);
  }

  function displayFeatures(features) {
    // Loop through each feature in the painting and call displaySingleFeatureRectangle()
    for (let f of features) {
      displaySingleFeatureRectangle(f);
    }
  }

  function displaySingleFeatureRectangle(feature) {
    let rect = document.createElement("div");
    rect.className = "box";
    // Set position and size based on feature coordinates
    rect.style.position = "absolute";
    rect.style.left = feature.upperLeft[0] + "px"; // X Position
    rect.style.top = feature.upperLeft[1] + "px"; // Y Position
    rect.style.width = feature.lowerRight[0] - feature.upperLeft[0] + "px"; // Width
    rect.style.height = feature.lowerRight[1] - feature.upperLeft[1] + "px"; // Height

    // add event handlers for the feature rectangle
    rect.addEventListener("mouseover", function (e) {
      document.querySelector("#description").textContent = feature.description;  // Show feature description
    });
    rect.addEventListener("mouseout", function (e) {
      document.querySelector("#description").textContent = ""; // Hide feature description
    });

    // add the feature rectangle to the <figure> parent
    figure.appendChild(rect);
  }
});
