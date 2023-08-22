export {fetchBreeds};
export {fetchCatByBreed};

function fetchBreeds(){
    return fetch('https://api.thecatapi.com/v1/breeds').then(resp=> {
        if(!resp.ok){
            throw new Error(resp.statusText);
        }
        return resp.json();
    }).catch(err=>console.error(err));
}

function fetchCatByBreed(breedId) {
    const options = {
        headers: {
          'x-api-key': 'live_ZRu59ykFsXaEqDXHnATnTcRx6EkUCTVhuGPW3nV8q9LJAexI97wrt6htuCJ76EiB'
        }
      };
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, options)
      .then(resp => {
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }
        return resp.json()
      }).catch(err => console.error(err))
  }