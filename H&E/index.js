if ($(".dtContent > td.largebody").text().indexOf("VIP") >= 0) {
  alert("exists");
}
document.title = "H&E Equipment Services";
$(".tableSiteBanner, #navWrapper").wrapAll(`<div class="BannerWrapper"></div>`);
$(".BannerWrapper").append(`<i class="fa-solid fa-bars hamburger-icon"></i>`);
$("body").append(`<div id="hamburger-overlay">
						<i class="fa-solid fa-xmark hamburger-exit"></i>
						<ul id="mobile-menu">
							<li class="menuY linkH">
								<a href="../page.php?id=7">HOME</a>
  							</li>
							<li class="menuY linkC">
								<a href="/catalog/?g=3073&amp;y=6985">CATALOG</a>
  							</li>
							<li class="menuG linkA">
								<a href="/account/index.php">MY ACCOUNT</a>
  							</li>
							<li class="menuY linkS">
								<a href="/cart/index.php">${$(".linkS a")[0].innerText}</a>
  							</li>
						</ul>
  					</div>`);

const shoppingCarts = $(".linkS a");
shoppingCarts.each((index, item) => {
  $(".linkS a")[index].innerHTML = item.innerText.replace("SHOPPING CART", '<i class="fa-solid fa-cart-shopping"></i>');
});
$(".linkC a").attr("href", "/catalog/?g=3073&y=6985");
$(".hamburger-icon").on("click", () => {
  $("#hamburger-overlay").css("display", "initial");
});
$(".hamburger-exit").on("click", () => {
  $("#hamburger-overlay").css("display", "none");
});
// Categories that should have a toggle arrow
const parentCategories = ["Decals", "Forms", "Signage", "Stationery", "Training"];

// Categories that should be wrapped in dropdown-container div
// .JK_Drop_
const dropdownMenus = [
  ["Equipment Decals", "Rough Textured Surface - Decal", "Inspection Decals", "Tools"],
  ["Admin", "Parts", "Rentals", "Service", "Vehicle Compliance"],
  ["Banners", "Office", "Safety", "Sign Bases", "Yard Signs"],
  ["Business Cards", "Envelopes", "Labels", "Letterheads", "Recruiting Cards", "Thank You Cards"],
  ["Booklets", "Cards", "Certificates"],
];

function renderDropDown() {
  const storedHTML = sessionStorage.getItem("JK_Dropdown");

  function adjustHTML() {
    $(`li.TCbullet[style="text-indent:10px;"]`).each((index, item) => {
      $(item).attr("style", "margin-left:10px;");
    });
    $(`li.TCbullet[style="text-indent:20px;"]`).each((index, item) => {
      $(item).attr("style", "margin-left:20px;");
    });
    $(`li.TCbullet[style="text-indent:30px;"]`).each((index, item) => {
      $(item).attr("style", "margin-left:30px;");
    });
    //Find parent categories, add dropdown-btn class and JK_Drop_${categoryName} class
    parentCategories.forEach((category) => {
      if ($(`a[alt="${category}"]`)[0] === undefined) return;
      $(`a[alt="${category}"]`)[0].parentElement.classList.add("dropdown-btn");
    });
    $(".anchorCategory").each((index, item) => {
      let category = "JK_Drop_" + item.innerHTML;
      category = category.replace(/\s+/g, "").replace("(", "").replace(")", "");
      item.parentElement.classList.add(category);
    });

    dropdownMenus.forEach((catArr) => {
      catArr.forEach((cat, index) => {
        catArr[index] = `.JK_Drop_${cat.replace(/\s/g, "")}`;
      });
      let selector = catArr.join(",");
      if ($(selector) === undefined) return;
      $(selector).wrapAll(`<div class="dropdown-container"/>`);
    });
    $(".dropdown-btn").append(`<i class="fa-solid fa-caret-down"></i><i class="fa-solid fa-caret-left"></i>`);
  }
  function addListeners() {
    //Toggle dropdown when clicked
    let dropdown = document.getElementsByClassName("dropdown-btn");
    for (let i = 0; i < dropdown.length; i++) {
      dropdown[i].children[1].addEventListener("click", function () {
        dropdown[i].classList.toggle("active");
        let dropdownContent = dropdown[i].nextElementSibling;
        console.log(dropdownContent);
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }
        sessionStorage.setItem("JK_Dropdown", $(".TreeControl")[0].outerHTML);
      });
      dropdown[i].children[2].addEventListener("click", function () {
        dropdown[i].classList.toggle("active");
        let dropdownContent = dropdown[i].nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }
        sessionStorage.setItem("JK_Dropdown", $(".TreeControl")[0].outerHTML);
      });
    }
  }

  if (storedHTML !== null) {
    const activeCategory = $("#active")[0].outerText;
    console.log(activeCategory);
    $(".TreeControl")[0].outerHTML = storedHTML.replace(`id="active"`, ``);
    $(".TCbullet").each((index, item) => {
      if (item.outerText === activeCategory) item.setAttribute("id", "active");
    });
    addListeners();
  } else {
    adjustHTML();
    addListeners();
  }
  $(".TreeControl").css("display", "block");
}
$(".TreeControl").css("display", "none");
if (window.location.pathname.includes("catalog")) setTimeout(renderDropDown, 50);
