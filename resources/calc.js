var ul = document.getElementById("products-list");
var ulFilters = document.getElementById("filters-list");

var order = document.getElementById("order");
var cart = document.getElementById("cart");
cart.innerHtml = 0;
var counter = {};
var checkedProducts = {};

var cartList = document.getElementById("cart-list");

var templateProductCategories = products[0].categories || {};

function checkCartList(product, orderPrice){

    if (checkedProducts.hasOwnProperty[product.id]) {
      delete checkedProducts[product.id];
    } else {
        product.total = orderPrice;
        checkedProducts[product.id] = product;
    }

  console.log(orderPrice);
  console.log(product);

    cartList.innerHTML = "";

  var totalPrice = 0;

    for (key in checkedProducts){
      var value = checkedProducts[key];
      console.log(value);
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(value.name + " : " + value.total + " рублей"));
      cartList.appendChild(li);
      totalPrice += value.total;
    }

  var totalLi = document.createElement("li");
  totalLi.appendChild(document.createTextNode("Итоговая цена: " + totalPrice));

  var makeOrder = document.createElement("button");
  makeOrder.type = "button";
  makeOrder.name = "make-order";
  makeOrder.innerHTML = "Отправить заявку";
  makeOrder.id = "make-order";
  makeOrder.className += "btn btn-default btn-sm";
  makeOrder.addEventListener('click', function() {
    alert("Заявка принята");
    counter = {};
    checkedProducts = {};
    cartList.innerHTML = '';
    showResult();
  });

  cartList.appendChild(totalLi);
  cartList.appendChild(makeOrder);
  }

(function (){
  for (var i = 0; i < templateProductCategories.length; i++){

    var name = templateProductCategories[i].name;
    var li = document.createElement("li");

    /*
    var input = document.createElement("input");
    input.type = "checkbox";
    input.value = name;
    */

    var button = document.createElement("button");
    button.type = "button";
    button.value = name;
    button.className += "btn btn-default btn-sm";
    button.innerHTML = templateProductCategories[i].description;
    button.style.backgroundImage ='linear-gradient(rgb(252, 248, 227) 0%, rgb(236, 178, 31) 100%)' ;



    /*
    var lable = document.createElement("lable");
    lable.textContent = " " + templateProductCategories[i].description;
    */

    //li.appendChild(input);
    li.appendChild(button);
    //li.appendChild(lable);
    ulFilters.appendChild(li);
  }
})();


var checkedCategories = []; // add listener on add -- rerender ul products

(function(){
  /*
  var inputs = ulFilters.getElementsByTagName('input');
  for(var i = 0; i < inputs.length; i++){
    inputs[i].addEventListener('change',handler,false);
  };
  */
  var inputs = ulFilters.getElementsByTagName('button');
  for(var i = 0; i < inputs.length; i++){
    inputs[i].addEventListener('click',handler,false);
  };
  function handler(e){
    if (this.style.backgroundImage == 'linear-gradient(rgb(252, 248, 227) 0%, rgb(236, 178, 31) 100%)'){this.style.backgroundImage = '';} else {
      this.style.backgroundImage = 'linear-gradient(rgb(252, 248, 227) 0%, rgb(236, 178, 31) 100%)';
    }
      /*
    console.log(this.x == undefined);
    if (this.x == undefined || this.x == '') {this.style.backgroundImage == ''; this.x = 1;console.log(1);} else {
      this.style.backgroundImage = 'linear-gradient(#fede97 0%,#ecb21f 100%)';
      this.x = '';
      console.log(2);
    }
    */
      /*
    console.log(this.style.backgroundImage == '');
    if (this.style.backgroundImage == ''){
      //this.style.backgroundColor = '#f2f2f2';
    this.style.backgroundImage = '';
      console.log("ok")
    } else if (this.style.backgroundImage == ''){

    } else {
      //this.style.backgroundColor = '';
      this.style.backgroundImage = 'linear-gradient(#fede97 0%,#ecb21f 100%)';
    }
    */
    this.style.focus = false;
    console.log(this);
    var checkingCat = e.target.value;
    var index = checkedCategories.indexOf(checkingCat);
    if (index > -1) {checkedCategories.splice(index, 1)} else {
      checkedCategories.push(checkingCat);
    }
    ul.innerHTML = "";
    render();
    e.preventDefault();

    counter = {};
    showResult();
  };
})();

function inCheckedCategories(element){
  var productCategories = element.categories;
  var arrayCategories = productCategories.filter((e)=>{return e.included}).map((e)=>{return e.name});

  var temp = arrayCategories.filter((e)=>{return checkedCategories.indexOf(e) > -1})
  return (temp.length > 0) ? true : false;
}

function render(){
  var filteredProducts = products.filter(inCheckedCategories);
  for (var i = 0; i < filteredProducts.length; i++){
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(filteredProducts[i].name + " : " +filteredProducts[i].price + " рублей / " + filteredProducts[i].unit));

    var addToCart = document.createElement("input");
    addToCart.type = "button";
    addToCart.name = filteredProducts[i].name;
    addToCart.value = "->";
    addToCart.id = filteredProducts[i].id;
    addToCart.className += "checked";
    addToCart.product = filteredProducts[i];


    addToCart.addEventListener('click', function() {

      var id = "quantity" + this.id;
      var inputEl = document.getElementById(id);
      inputEl.value = '';
      var orderPrice = inputEl.orderPrice;

      counter[inputEl.id] = 0;
      showResult();

      checkCartList(inputEl.product, orderPrice);
    });

    var inp = document.createElement("input")
    inp.product = filteredProducts[i];
    inp.type = "number";
    inp.size = 4;
    inp.price = filteredProducts[i].price; // name is actually price !!!
    inp.id = "quantity" + filteredProducts[i].id;
    inp.className += "prepare";
    inp.addEventListener('input', function() {
      var price = this.value * this.price;
      this.orderPrice = price;
      counter[this.id] = price;
      showResult();

    });

    var hr = document.createElement("hr");

    var container = document.createElement("span");
    container.appendChild(inp);
    container.appendChild(addToCart);
    container.className += "preorder"

    li.appendChild(container);
    li.appendChild(hr);
    ul.appendChild(li);
  }
}

function showResult(){
  var totalPrice = 0;
  for(key in counter){
      var value = counter[key];
      totalPrice += parseInt(value);
  }
  var tempcart = document.getElementById("cart");
  tempcart.innerHTML = totalPrice + " рублей";
  //cart.innerHtml = totalPrice; WTF!! this does not works !!!
}

var checkboxes = document.getElementsByTagName('input');

for (var i=0; i < checkboxes.length; i++)  {
    if (checkboxes[i].type == 'checkbox')   {
          checkboxes[i].checked = false;
        }
}


