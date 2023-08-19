export {fetchBreeds};

function fetchBreeds(){
    return fetch('https://api.thecatapi.com/v1/breeds').then(resp=> {
        if(!resp.ok){
            throw new Error(resp.statusText);
        }
        return resp.json();
    }).catch(err=>console.error(err));
}