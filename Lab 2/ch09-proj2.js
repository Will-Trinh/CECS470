
// add a DOMContentLoaded event handler.
document.addEventListener("DOMContentLoaded", function () {
  //Transform the JSON data into a JavaScript object.
  const paintings = JSON.parse(content);

  //To locate the ids “details”, “paintings ul”, and “details figure”
  const details = document.querySelector("#details");
  const list = document.querySelector("paintings ul");
  const figure = document.querySelector("details figure");

  //Call the function generateThumbList to
  generateThumbList(list, paintings);

  // use event delegation to handle clicks in list
  _____________.addEventListener("____________", function (e) {
    if (e.target && e.target.___________ == "IMG") {
      displayPaintingLarge(e.target);
    }
  });

  function generateThumbList(list, paintings) {
    // loop thru list of paintings and create <li><img></li>
    for (p of paintings) {
      const item = document.createElement("li");
      const thumb = document.createElement("img");
      thumb.src = "images/small/" + p.id + ".jpg";
      thumb.alt = p.title;
      thumb.dataset.id = p.id;
      item.appendChild(thumb);
      list.appendChild(item);
    }
  }

  function displayPaintingLarge(clickedThumbImage) {
    // retrieve the painting id from data-id attribute
    let id = clickedThumbImage.____________.id;

    // find that painting in array
    const painting = paintings.find(function (p) {
      return p.id == ______;
    });

    // display the found painting
    document.querySelector("#title")._______ = painting.title;
    document.querySelector("#artist").textContent = "By " + ________________;
    let image = document.createElement("img");
    image.src = "images/large/" + painting._______________ + ".jpg";
    // clear previous features
    figure.innerHTML = "";
    // display all features for this painting
    displayFeatures(___________.features);
    // add painting to image
    figure.append__________(image);
  }

  function displayFeatures(features) {
    for (let f of _________) {
      displaySingleFeatureRectangle(f);
    }
  }

  function displaySingleFeatureRectangle(feature) {
    let rect = document.createElement("div");
    rect.className = "box";
    rect.style.position = "__________";
    rect.style.left = feature.upperLeft[0] + "px";
    rect.style.top = feature.______________;
    rect.style.width = feature.lowerRight[0] - feature.upperLeft[0] + "px";
    rect.style.height = ________________________________;

    // add event handlers for the feature rectangle
    rect.addEventListener("mouseover", function (e) {
      document.querySelector("#description").____________ = feature.___________;
    });
    rect.addEventListener("___________", function (e) {
      document.querySelector("#description")._________________ = "";
    });

    // add the feature rectangle to the <figure> parent
    figure._______________(rect);
  }
});
