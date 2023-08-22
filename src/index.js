import axios from "axios";
import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';
import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";
import {creatingMarkUpForListOfCats} from "./creatingMarkUp";
import {creatingMarkUpForOneCat} from "./creatingMarkUp";

Notiflix.Notify.init({
  width: '400px',
  position: 'left-top',
  distance: '20px',
  opacity: 1,
  timeout: 100000,
});

axios.defaults.headers.common["x-api-key"] = "live_ZRu59ykFsXaEqDXHnATnTcRx6EkUCTVhuGPW3nV8q9LJAexI97wrt6htuCJ76EiB";

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader-text');
const errorText = document.querySelector('.error');

function createdListOfCats(){
  fetchBreeds().then(data => {
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
}

function createdOneCat(){
  loader.classList.remove('is-hidden')
  catInfo.innerHTML = '';
  fetchCatByBreed(breedSelect.value)
  .then(data => {
    loader.classList.add('is-hidden');
    if (!data || !(!!data.length)) {
      breedSelect.classList.add('is-hidden');
      Notiflix.Notify.failure(`${errorText.innerHTML}`);
      return;
    }
    data.map(itemCat => {
    return catInfo.innerHTML = itemCat.breeds.map(breed => {
      return creatingMarkUpForOneCat(itemCat.url, breed.description, breed.temperament);
    }).join('');
  }).join('');
})
}

createdListOfCats();
breedSelect.addEventListener('change', createdOneCat);
