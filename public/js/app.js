console.log('Client side JS is loaded');

//calling API from JS



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    let url = '/weather?address=<location>';
    url = url.replace('<location>', location);
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
            // console.log(data.location, data.forecast);
        }
    });
});
});