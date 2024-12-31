let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create" ;
let tmp ;
// get total
function getTotal()
{
    if (price.value != ''){
        let result = (+price.value+ +taxes.value+ +ads.value)
    - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor='#040';
    }else{
        total.innerHTML = '';
        total.style.backgroundColor = '#910a0ab4';
    }
}
let dataPro ;
if (localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else {
    dataPro = [];
}
// create product
submit.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase() ,
        price:price.value ,
        taxes:taxes.value ,
        ads:ads.value ,
        discount:discount.value ,
        total:total.innerHTML ,
        count:count.value,
        category:category.value.toLowerCase() ,
    }
    if (title.value!= "" 
        && price.value != ""
    && category.value !=""
    && newPro.count < 100 )
    {
    if (mood == "create"){
        if (newPro.count>1)
        {
            for (let i = 0; i < newPro.count ; i++) {
                dataPro.push(newPro);
            }
            }else{
                dataPro.push(newPro);
            }
        }else {
            dataPro[tmp]= newPro;
            mood = "ceate";
            submit.innerHTML = "create";
            count.style.display = "block"
        }
        clearData()
    }
    // save localstorage
    localStorage.setItem('product', JSON.stringify(dataPro) )
    showData()
}
// clear inputs
function clearData(){
    title.value = null ,
    price.value = null ,
    taxes.value = null ,
    ads.value = null ,
    discount.value = null ,
    total.innerHTML  = null ,
    count.value = null ,
    category.value = null 
}
// read 
function showData(){
    getTotal()
    let table ='';
    for (let index = 0; index < dataPro.length; index++) {
        table += `
                    <tr>
                        <td>${index+1}</td>
                        <td>${dataPro[index].title}</td>
                        <td>${dataPro[index].price}</td>
                        <td>${dataPro[index].taxes}</td>
                        <td>${dataPro[index].ads}</td>
                        <td>${dataPro[index].discount}</td>
                        <td>${dataPro[index].total}</td>
                        <td>${dataPro[index].category}</td>
                        <td><button onclick="updateData(${index})" id="update">update</button></td>
                        <td><button onclick="deleteData(${index})" id="delete">delete</button></td>
                    </tr>
        `
    }
    document.getElementById('tbody').innerHTML=table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML=`
        <button onclick="deleteAll()">DeleteAll (${dataPro.length})</button>
        `
    }else {
        btnDelete.innerHTML='';
    }
}
showData()
// delete 
function deleteData(index){
    dataPro.splice(index,1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}

// deleteAll

function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

// updateData

function updateData (index){
    title.value = dataPro[index].title;
    price.value = dataPro[index].price;
    taxes.value = dataPro[index].taxes;
    ads.value = dataPro[index].ads;
    discount.value = dataPro[index].discount;
    getTotal()
    count.style.display = "none";
    category.value = dataPro[index].category;
    submit.innerHTML = "update";
    mood = "update";
    tmp = index ;
    scroll({
        top : 0 ,
        behavior : "smooth"
    })
}
// Search 
let searchMood = "title";
// SearchMood
function getSearchMood(id){
    let search =document.getElementById("search")
    if (id == "searchTitle"){
        searchMood = "title";
    }
    else {
        searchMood = "category";
    }
    search.placeholder = "search By " + searchMood;
    search.focus()
    search.value="";
    showData()
    }
    // searchData
    function searchData(value){
        let table = "" ;
        if (searchMood == "title"){
            for (let i = 0;  i< dataPro.length; i++) {
                if(dataPro[i].title.includes(value.toLowerCase())){
                    table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
        `
            }
        }
        }else{
            table="";
            for (let i = 0;  i< dataPro.length; i++) {
                if(dataPro[i].category.includes(value.toLowerCase())){
                    table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
        `
            }
        }
        }
        document.getElementById('tbody').innerHTML=table;
    }
    showData()