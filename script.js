const categoryContainer = document.getElementById("categoryContainer");
const cardContainer = document.getElementById("cardContainer");
const addToCardContainer = document.getElementById("addToCardContainer");
const cartDetailsModal = document.getElementById("cart-details-modal");
const modalContainer = document.getElementById("modalContainer");

let addCarts = [];

const loadALLPlants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      showCardByCategory(data.plants);
    })
    .catch((err) => console.log(err));
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
    const allLi = categoryContainer.querySelectorAll("li");

    // console.log(allLi)
    allLi.forEach((li) => {
      li.classList.remove("bg-green-600");
    });
    if (e.target.localName === "li") {
      console.log(e.target);
      e.target.classList.add("bg-green-600");
      loadNewsByCategory(e.target.id);
    }
  });
};

const loadNewsByCategory = (categoryId) => {
  showLoading();
  console.log(categoryId);
  fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      showCardByCategory(data.plants);
    })
    .catch((err) => {
      console.log(err);
    });
};

const showCardByCategory = (plants) => {
  cardContainer.innerHTML = "";

  //  console.log(plants)
  plants.forEach((plants) => {
    cardContainer.innerHTML += ` <div>
  <div id="${plants.id}" class="p-4 bg-white rounded-lg shadow-md">
  <!-- Image -->
  <div class="h-40 bg-gray-200 rounded-lg mb-3 overflow-hidden">
    <img src="${plants.image}" class="w-full h-full object-cover" />
  </div>

  <!-- Title -->
  <h2 class="text-lg font-semibold">${plants.name}</h2>

  <!-- Description -->
  <p class="text-sm text-gray-600 line-clamp-4">
    ${plants.description}
    

  </p>

  <!-- Category + Price -->
  <div class="flex justify-between items-center mt-3">
    <span class="px-3 p-1 text-sm rounded-full bg-green-100 text-green-700">
      ${plants.category}
      
    </span>
    <span class="font-semibold">৳${plants.price}</span>
  </div>

  <!-- Button -->
  <button id="addToCardContainer" class="btn w-full mt-3 bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition">
    Add to Cart
  </button>
  
</div>
</div>

  `;
  });
};

cardContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "Add to Cart") {
    handleAddCarts(e);
  }
});

const handleAddCarts = (e) => {
  const card = e.target.parentNode; // button parent div
  fetch(`https://openapi.programming-hero.com/api/plant/${card.id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showDetails(data.plants);
    })
    .catch((err) => {
      console.log(er);
    });

  const showDetails = (plants) => {
    cartDetailsModal.showModal();
    modalContainer.innerHTML = `
    <div style="max-width:400px; margin:0 auto; padding:10px;  border-radius:8px;">
      <img src="${plants.image}"  style="width:100%; height:250px; object-fit:cover; border-radius:8px; margin-bottom:10px;" />
      <h2 style="font-size:20px; font-weight:bold; margin:5px 0;">${plants.name}</h2>
      <h3 style="color:red; margin:5px 0;">Category: ${plants.category}</h3>
      <p style="margin:10px 0; color: gray;">${plants.description}</p>
      <h3 style="font-size:18px; font-weight:bold; color: green;">Price: ৳${plants.price}</h3>
    </div>
  `;
  };

  // title
  const title = card.querySelector("h2").innerText;

  // price
  const price = card
    .querySelector("span.font-semibold")
    .innerText.replace("৳", "");

  const id = card.id;

  addCarts.push({
    title: title,
    id: id,
    price: price,
  });

  showAddCarts(addCarts);
};

const showAddCarts = (addCarts) => {
  addToCardContainer.innerHTML = "";

  let total = 0;

  addCarts.forEach((addCart) => {
    total += parseFloat(addCart.price);

    addToCardContainer.innerHTML += `
      <div class="my-2 p-1 bg-green-200 rounded flex justify-between items-center">
        <div>
          <h1>${addCart.title}</h1>
          <p>৳${addCart.price}</p>
        </div>
        <button onclick="handleDelete('${addCart.id}')" class="btn btn-xs bg-green-200 border-none">✘</button>
      </div>
    `;
  });

  // Update total
  const cartTotal = document.getElementById("cartTotal");
  cartTotal.innerText = `৳${total}`;
};

const handleDelete = (addCartId) => {
  addCarts = addCarts.filter((addCart) => addCart.id !== addCartId);

  showAddCarts(addCarts);
};

const showLoading = () => {
  cardContainer.innerHTML = `
          <div class="flex justify-center items-center h-20 w-200"><span class="loading loading-bars loading-xl"></span></div>

  `;
};

loadCategory();
loadALLPlants();
