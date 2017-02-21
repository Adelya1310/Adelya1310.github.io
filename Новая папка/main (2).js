var companies = [
	{
		name: "gaz",
		productPrice: 562
	},
	{
		name: "kamaz",
		productPrice: 512
	},
	{
		name: "nefaz",
		productPrice: 122
	},
	{
		name: "mak",
		productPrice: 221
	},
];

console.log(companies);

var orderCount = document.getElementById('orderCount');
var result = document.getElementById('result');

var plus = document.getElementById('plus');
var minus = document.getElementById('minus');

var buttonAdd = document.getElementById('add');


var price = 0;

var arr = companies.map(function(item, number) {
	console.log(item);
	console.log(number);
})

console.log(arr);

plus.onclick = function() {
	orderCount.value++;
	price = Math.min.apply(Math, companies.map(function(o) {
		return o.productPrice;
	})) * orderCount.value;
	result.innerHTML = 'result: ' + price;
	console.log(price);
}

minus.onclick = function() {
	orderCount.value--;
	price = Math.min.apply(Math, companies.map(function(o) {
		return o.productPrice;
	})) * orderCount.value;
	result.innerHTML = 'result: ' + price;
	console.log(price);
}


buttonAdd.onclick =function(){
	var obj ={};
	obj.name =document.getElementById('name').value;
	obj.productPrice =parseInt(document.getElementById('price').value);
	console.log(obj);
	companies.push(obj)

	addToTable(obj);

        document.getElementById('name').value = "";
	document.getElementById('price').value = "";
}

function addToTable(company){

    var table = document.createElement('table');
    // Insert New Row for table at index '0'.
    var row1 = table.insertRow(0);
    // Insert New Column for Row1 at index '0'.
    var row1col1 = row1.insertCell(0);
    row1col1.innerHTML = company.name;
    // Insert New Column for Row1 at index '1'.
    var row1col2 = row1.insertCell(1);
    row1col2.innerHTML = company.productPrice;
    // Append Table into div.
    var div = document.getElementById('divTable');
    div.appendChild(table);
}

(function createTable(){
	for (i = 0; i < companies.length; i++ ){

		addToTable(companies[i]);
	}
})();
