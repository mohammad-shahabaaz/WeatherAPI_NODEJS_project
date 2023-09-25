const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1');
const messagetwo = document.querySelector('#message-2');

// messageOne.textContent = "From JavaScript"


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    let location = search.value

    if(!location){
        messageOne.textContent = "Error";
        messagetwo.textContent = "Please Provide a location";
        return;
    }
    messageOne.textContent = "Loading";
    messagetwo.textContent = "";

    // console.log(location)
    // http://localhost:3000
    fetch(`/weather?address=${location}`)
    .then((response)=>{response.json()
        .then((data)=>{
            console.log(data)
            search.value = "";
        if(data.Error){
            messageOne.textContent = "Error";
            messagetwo.textContent = `Error : ${data.Error}`;
            
            
        }else{
            messageOne.textContent = `Forecast : ${data.Forecast}`;
            messagetwo.textContent = `Location: ${data.Data}`;
        
        }
    })
    
}).catch((error)=>{
    search.value = '';
            messageOne.textContent = 'Error:';
            messageTwo.textContent = 'There was an error fetching the weather data.';
            console.error('There was an error fetching the weather data:', error);
})
})