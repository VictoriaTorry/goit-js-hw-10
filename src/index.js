import axios from "axios";
import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';
import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";
import {creatingMarkUpForListOfCats} from "./creatingMarkUp";


axios.defaults.headers.common["x-api-key"] = "live_ZRu59ykFsXaEqDXHnATnTcRx6EkUCTVhuGPW3nV8q9LJAexI97wrt6htuCJ76EiB";

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader-text');
const errorText = document.querySelector('.error');

breedSelect.classList.add('is-hidden');
errorText.classList.add('is-hidden');

// function creatingMarkUpForListOfCats(arr) {
//   return arr.map(item => `<option value="${item.id}">${item.name}</option>`).join('');
// }

// function creatingMarkUpForOneCat(image, description, temperament) {
//   return `<img src="${image}" alt="" width="300"><div><h2>${temperament}</h2><p>${description}</p></div>`
// }

// function fetchCatByBreed(breedId) {
//   return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, options)
//     .then(resp => {
//       if (!resp.ok) {
//         throw new Error(resp.statusText);
//       }
//       return resp.json()
//     })
//     .then(data => data.map(itemCat => {
//       return itemCat.breeds.map(breed => {
//         return creatingMarkUpForOneCat(itemCat.url, breed.description, breed.temperament);
//       }).join('');
//     }).join(''))
//     .catch(err => console.error(err));
// }

fetchBreeds().then(data => {
  Notiflix.Notify.init({
    width: '400px',
    position: 'left-top',
    distance: '20px',
    opacity: 1,
    timeout: 100000,
  });
  loader.classList.add('is-hidden')
  if (!data) {
    Notiflix.Notify.failure(`${errorText.innerHTML}`);
    return;
  }
  breedSelect.classList.remove('is-hidden');
  breedSelect.insertAdjacentHTML('beforeend', creatingMarkUpForListOfCats(data))
  new SlimSelect({
    select: '.breed-select'
  });
})

breedSelect.addEventListener('change', () => {
  loader.classList.remove('is-hidden')
  catInfo.innerHTML = '';
  fetchCatByBreed(breedSelect.value).then(data => {
    loader.classList.add('is-hidden');
    catInfo.innerHTML = data;
  });
});