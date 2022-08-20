import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import countriesApi from "./fetchCountries";

const DEBOUNCE_DELAY = 300;

document.querySelector('#search-box').addEventListener('input', debounce(onInputListen, DEBOUNCE_DELAY));
export const list = document.querySelector('.country-list');


function onInputListen(evt) {
  const inputValue = evt.target.value.trim();
  if (!inputValue) {
    list.innerHTML ='';
    return;
  };

  countriesApi(inputValue).then(data => {
    createMarkup(data)
  })
};

function createMarkup(obj) {
  if (obj.length > 10) {
    
    return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.', {
      width: '360px',
      svgSize: '120px',
    });
  };

  if (obj.length > 2 && obj.length < 10) {
      const markup = obj.map(({flags:{svg}, name:{official}}) => {
        return `<li>
        <h2><img src="${svg}" alt="${official}"> ${official}</h2>
        </li>` 
      }).join('');
    
    list.innerHTML = markup;
  };
  
  if (obj.length === 1) {
    const markup = obj.map(({flags:{svg}, name:{official}, capital, population, languages}) => {
        return `<li> 
         <h2><img src="${svg}" alt="${official}"> ${official}</h2>
         <p><b>Capital:</b> ${capital}</p>
         <p><b>Population:</b> ${population}</p>
         <p><b>Languages:</b> ${Object.values(languages)}</p>
       </li>` 
      }).join('');
    list.innerHTML = markup;
  };  
};






