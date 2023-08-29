const phoneLoad = async () => {
   const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
   const data = await res.json();
   const phones = data.data;
   phoneDisplay(phones);
}
const phoneDisplay = phones => {
   // find place where to add
   const phoneContainer = document.getElementById('phone-container')
   phones.forEach(phone => {
      console.log(phone);
      // create a div
      const phoneCard = document.createElement('div');
      phoneCard.classList = `card w-96 bg-base-100 shadow-xl`;
      // set inner html
      phoneCard.innerHTML = `
      <figure><img src="${phone.image}" /></figure>
      <div class="card-body">
         <h2 class="card-title">${phone.phone_name}</h2>
         <p>If a dog chews shoes whose shoes does he choose?</p>
         <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
         </div>
      </div>
      `;
      // append child
      phoneContainer.appendChild(phoneCard);
   })
}
phoneLoad();