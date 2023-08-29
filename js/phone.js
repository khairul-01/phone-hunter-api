const phoneLoad = async (searchText, isShowAll) => {
   const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
   const data = await res.json();
   const phones = data.data;
   phoneDisplay(phones, isShowAll);
}
const phoneDisplay = (phones, isShowAll) => {
   console.log(phones);
   console.log(phones.length);
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
      phones = phones.slice(0,12);
   }
   
   // find place where to add
   const phoneContainer = document.getElementById('phone-container');
   phoneContainer.innerText = '';
   phones.forEach(phone => {
      console.log(phone);
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
}
// phoneLoad();
const showDetail = async (id) => {
   console.log('show deatails button is clicked', id);
   // loading single phone data
   const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
   const data = await res.json();
   console.log(data);
}
// handle search button
const handleSearch = (isShowAll) => {
   toggleHandler(true);
   const searchField = document.getElementById('search-field');
   const searchText = searchField.value;
   console.log(searchText);
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