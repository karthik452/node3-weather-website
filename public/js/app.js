console.log('JS file ..........');
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data)=>
    console.log(data))
});


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const error = document.querySelector('#error');
const result = document.querySelector('#result');

weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault();
    console.log('testing'+search.value);
    fetch('http://localhost:3000/weather?address='+search.value).then((response) => {
    response.json().then((data)=>{
    console.log(data.Temperature);
    console.log(data)
    if(data.error){
        error.textContent = data.error;
        result.textContent = '';
    }else{
        error.textContent = '';
        result.textContent = data.forecast;
    }}
    );
});
    
})