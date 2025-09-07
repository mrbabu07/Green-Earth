const categoryContainer = document.getElementById("categoryContainer");
const cardContainer = document.getElementById("cardContainer")

const loadALLPlants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
  .then(res => res.json())
  .then(data => {
    showCardByCategory(data.plants)
  })
  .catch(err => console.log(err));
};

const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.categories);
      const categories = data.categories;
      showCategory(categories);
    })

    .catch((err) => {
      console.log(err);
    });
};

const showCategory = (categories) => {
  categories.forEach((cat) => {
    // console.log(cat.category_name)
    categoryContainer.innerHTML += `
            <li id="${cat.id}" class=" max-w-[250px] max-h-[35px] py-2 mt-1 rounded hover:border hover:bg-green-600 hover:text-white cursor-pointer">${cat.category_name}</li>

        `;
  });
  categoryContainer.addEventListener("click", (e) => {
    const allLi = document.querySelectorAll("li");
    // console.log(allLi)
    allLi.forEach((li) => {
      li.classList.remove("bg-green-600");
    });
    if (e.target.localName === "li") {
      console.log(e.target);
      e.target.classList.add("bg-green-600");
      loadNewsByCategory(e.target.id)
    }
  });
};

const loadNewsByCategory = (categoryId) => {
  console.log(categoryId)
  fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
  .then(res => res.json())
  .then(data => {
    // console.log(data)
    showCardByCategory(data.plants)
  })
  .catch(err => {
    console.log(err)
  })
}

const showCardByCategory = (plants) =>{
  cardContainer.innerHTML = ""
//  console.log(plants)
plants.forEach(plants => {
  cardContainer.innerHTML += `
  <div class="p-4 bg-white rounded-lg shadow-md">
  <!-- Image -->
  <div class="h-40 bg-gray-200 rounded-lg mb-3 overflow-hidden">
    <img src="${plants.image}" class="w-full h-full object-cover" />
  </div>

  <!-- Title -->
  <h2 class="text-lg font-semibold">${plants.name}</h2>

  <!-- Description -->
  <p class="text-sm text-gray-600">
    ${plants.description}
  </p>

  <!-- Category + Price -->
  <div class="flex justify-between items-center mt-3">
    <span class="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
      ${plants.category}
    </span>
    <span class="font-semibold">৳${plants.price}</span>
  </div>

  <!-- Button -->
  <button class="w-full mt-3 bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition">
    Add to Cart
  </button>
</div>

  `
})
}

loadCategory();
loadALLPlants();
