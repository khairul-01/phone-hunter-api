const phoneLoad = async (searchText, isShowAll) => {
   const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
   const data = await res.json();
   const phones = data.data;
   phoneDisplay(phones, isShowAll);
}
phoneLoad('apple', true);

const phoneDisplay = (phones, isShowAll) => {
   // console.log(phones);
   // console.log(phones.length);
   // displaying show all button based on condition
   const showAllBtn = document.getElementById('show-all-btn');
   if(phones.length>12 && !isShowAll){
      showAllBtn.classList.remove('hidden');
   }
   else{
      showAllBtn.classList.add('hidden');
   }
   // displaying only first 10 phones
   if(!isShowAll){
      phones = phones.slice(0,9);
   }
   
   // find place where to add
   const phoneContainer = document.getElementById('phone-container');
   phoneContainer.innerText = '';
   phones.forEach(phone => {
      // console.log(phone);
      // create a div
      const phoneCard = document.createElement('div');
      phoneCard.classList = `card w-96 bg-base-100 shadow-xl p-4`;
      // set inner html
      phoneCard.innerHTML = `
      <figure><img src="${phone.image}" /></figure>
      <div class="card-body">
         <h2 class="card-title">${phone.phone_name}</h2>
         <p>If a dog chews shoes whose shoes does he choose?</p>
         <div class="card-actions justify-center">
            <button onclick="showDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
         </div>
      </div>
      `;
      // append child
      phoneContainer.appendChild(phoneCard);
   });
   toggleHandler(false);
   if(phoneContainer.innerText === ''){
      const noAvailable = document.getElementById('no-available');
      noAvailable.classList.remove('hidden');
   }
   else{
      const noAvailable = document.getElementById('no-available');
      noAvailable.classList.add('hidden');
   }
}
// phoneLoad();
// each phone details
const showDetail = async (id) => {
   console.log('show details button is clicked', id);
   // loading single phone data
   const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
   const data = await res.json();
   const phone = data.data;
   eachPhoneDetails(phone);
}
// each phone details
const eachPhoneDetails = (phone) => {
   console.log(phone);
   const phoneName = document.getElementById('d-phone-name');
   phoneName.innerText = phone?.name;

   const phoneDContainer = document.getElementById('phone-detail-container');
   phoneDContainer.innerHTML =  
   `<img src="${phone?.image}">
   
   <p><span>Storage:  </span>${phone?.mainFeatures?.storage}</p>
   <p><span>Display Size:  </span>${phone?.mainFeatures?.displaySize
   }</p>
   <p><span>Chipset:  </span>${phone?.mainFeatures?.chipSet}</p>
   <p><span>Memory:  </span>${phone?.mainFeatures?.memory}</p>
   <p><span>Slug:  </span>${phone?.slug}</p>
   <p><span>Release Date:  </span>${phone?.releaseDate}</p>
   <p><span>Brand:  </span>${phone?.brand}</p>
   <p><span>GPS:  </span>${phone?.others?.GPS}</p>
   `
   // <p><span>GPS:  </span>${phone?.others?.GPS || 'No GPS available'}</p> (using or method)
   // <p><span>GPS:  </span>${phone?.others?.GPS ? phone.others.GPS : No GPS available}</p> (using ternary operator)
   // show the modal
   phoneDetails.showModal();
}
// handle search button
const handleSearch = (isShowAll) => {
   toggleHandler(true);
   const searchField = document.getElementById('search-field');
   const searchText = searchField.value;
   // console.log(searchText);
   phoneLoad(searchText, isShowAll);
}

// handle toggle spinner
const toggleHandler = (isSpnner) => {
   const toggleHandle = document.getElementById('toggle-spinner');
   if(isSpnner){
      toggleHandle.classList.remove('hidden');
   }
   else{
      toggleHandle.classList.add('hidden');
   }
}

// Show all button
const showAllButton = () => {
   handleSearch(true);
   console.log('show all button clicked');
}