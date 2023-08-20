export {creatingMarkUpForListOfCats };
export {creatingMarkUpForOneCat};

function creatingMarkUpForListOfCats(arr) {
  return arr.map(item => `<option value="${item.id}">${item.name}</option>`).join('');
}

function creatingMarkUpForOneCat(image, description, temperament) {
  return `<img src="${image}" alt="" width="300"><div><h2>${temperament}</h2><p>${description}</p></div>`
}