const baseURL = "http://localhost:3000/ramens";

// Function to fetch all ramen and display images in #ramen-menu
function displayRamens() {
  fetch(baseURL)
    .then((response) => response.json())
    .then((ramens) => {
      const ramenMenu = document.getElementById("ramen-menu");
      ramenMenu.innerHTML = ""; // Clear existing content
      ramens.forEach((ramen) => {
        const img = document.createElement("img");
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener("click", () => handleClick(ramen));
        ramenMenu.appendChild(img);
      });
      // Display the first ramen details when the page loads
      if (ramens.length > 0) handleClick(ramens[0]);
    })
    .catch((error) => console.error("Error fetching ramens:", error));
}

// Function to display ramen details in #ramen-detail
function handleClick(ramen) {
  document.querySelector("#ramen-detail img").src = ramen.image;
  document.querySelector("#ramen-detail h2").textContent = ramen.name;
  document.querySelector("#ramen-detail h3").textContent = ramen.restaurant;
  document.getElementById("rating-display").textContent = ramen.rating;
  document.getElementById("comment-display").textContent = ramen.comment;
}

// Function to add new ramen through the form
function addSubmitListener() {
  const form = document.getElementById("new-ramen");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const newRamen = {
      name: event.target["name"].value,
      restaurant: event.target["restaurant"].value,
      image: event.target["image"].value,
      rating: event.target["rating"].value,
      comment: event.target["comment"].value,
    };
    addRamenToMenu(newRamen);
    form.reset();
  });
}

// Function to add new ramen to the ramen-menu (frontend only)
function addRamenToMenu(ramen) {
  const img = document.createElement("img");
  img.src = ramen.image;
  img.alt = ramen.name;
  img.addEventListener("click", () => handleClick(ramen));
  document.getElementById("ramen-menu").appendChild(img);
}

// Function to update the rating and comment
function addEditListener() {
  const editForm = document.getElementById("edit-ramen");
  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    document.getElementById("rating-display").textContent =
      event.target["new-rating"].value;
    document.getElementById("comment-display").textContent =
      event.target["new-comment"].value;
  });
}

// Main function to initialize event listeners and display ramen
function main() {
  displayRamens();
  addSubmitListener();
  addEditListener();
}

document.addEventListener("DOMContentLoaded", main);
