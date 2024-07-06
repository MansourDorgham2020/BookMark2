var bookMarkInput = document.getElementById('bookMark')
var siteUrl = document.getElementById('siteUrl')
var addBtn = document.getElementById('addBtn')
var ubdateBtn = document.getElementById('ubdateBtn')
var indexElement = 0
markList = [];
if(localStorage.getItem('marks')!==null){
    markList = JSON.parse(localStorage.getItem('marks'));
    displayData()
}

function addMark(){
    if(checkValidationName()===true&&checkValidationUrl()===true){
    var mark = {
        name: bookMarkInput.value,
        url: siteUrl.value
    }
    markList.push(mark)
    localStorage.setItem('marks',JSON.stringify(markList))
    displayData()
    clearData()
}
}
function clearData(){
    bookMarkInput.value = null
    siteUrl.value = null
    bookMarkInput.classList.remove('is-valid')
    siteUrl.classList.remove('is-valid')
}
function displayData(){
    var cartona="";
    for(var i=0; i<markList.length; i++){
        cartona += `<tr>

        <td>${i}</td>
    <td>${markList[i].name}</td>
    <td>
        <a href="${siteUrl.value}" target="_blank" class="text-decoration-none">
        <button class="btn btn-visit "><i class="fa-regular fa-eye"></i> Visit </button>
        </a>
    </td>
    <td>
    <button onclick="deleteItem(${i})" class="btn btn-delete btn-outline-danger "><i class="fa-solid fa-trash"></i> Delete</button>
        <button class="btn btn-outline-warning"onclick="setFormUbdate(${i})" >Ubdate</button>

    </td>
    
</tr>
        `
    }
    document.getElementById('tableData').innerHTML = cartona
}
function deleteItem(index){
    markList.splice(index,1)
    displayData()
    localStorage.setItem('marks',JSON.stringify(markList))
}
function checkValidationName(){
    var text = bookMarkInput.value
    var regex = /^[A-Z][a-z]{3,8}$/
    var msg = document.getElementById('msgValidation')
    if(regex.test(text)){
        bookMarkInput.classList.add('is-valid')
        bookMarkInput.classList.remove('is-invalid')
        msg.classList.add('d-none')
        return true
    }
    else{
        bookMarkInput.classList.add('is-invalid')
        bookMarkInput.classList.remove('is-valid')
        msg.classList.remove('d-none')
        return false
    }
}
function checkValidationUrl(){
    var text = siteUrl.value
    var regex = /^(?:https?|ftp):\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/\S*)?$/
    var msgUrl = document.getElementById('msgValidationUrl')
    if(regex.test(text)){
        siteUrl.classList.add('is-valid')
        siteUrl.classList.remove('is-invalid')
        msgUrl.classList.add('d-none')
        return true
    }
    else{
        siteUrl.classList.add('is-invalid')
        siteUrl.classList.remove('is-valid')
        msgUrl.classList.remove('d-none')
        return false
    }
}
function setFormUbdate(index){
    bookMarkInput.value = markList[index].name
    siteUrl.value = markList[index].url
    addBtn.classList.add('d-none')
    ubdateBtn.classList.remove('d-none')
   indexElement = index 
}

function ubdateData(){
    var mark = {
        name : bookMarkInput.value,
        url : siteUrl.value,
    }
    markList.splice(indexElement,1,mark)
    localStorage.setItem('marks',JSON.stringify(markList))
    displayData()
    clearData()
    addBtn.classList.remove('d-none')
    ubdateBtn.classList.add('d-none')

}
