const houses = [
  {id:1,title:'Modern 2BR Apartment',price:1200,img:'assets/house5.webp',beds:2,baths:1,area:'900 sqft',desc:'A bright modern apartment close to transit and shops.'},
  {id:2,title:'Cozy Family House',price:1800,img:'assets/house6.webp',beds:3,baths:2,area:'1400 sqft',desc:'Spacious backyard and quiet neighborhood, great for families.'},
  {id:3,title:'Downtown Loft',price:2300,img:'assets/house7.webp',beds:1,baths:1,area:'800 sqft',desc:'Loft-style apartment near restaurants and nightlife.'},
  {id:4,title:'Suburban Townhouse',price:1450,img:'assets/house8.webp',beds:2,baths:2,area:'1100 sqft',desc:'Comfortable townhouse with garage and storage.'}
];

function el(q){return document.querySelector(q)}

function renderListings(){
  const grid = el('#listingGrid');
  if(!grid) return;
  grid.innerHTML = '';
  houses.forEach(h=>{
    const a = document.createElement('a');
    a.className = 'house-card';
    a.href = `house.html?id=${h.id}`;
    a.innerHTML = `
      <img src="${h.img}" alt="${h.title}">
      <div class="card-body">
        <h3>${h.title}</h3>
        <p class="price">$${h.price} / month</p>
      </div>`;
    grid.appendChild(a);
  });
}

function getQueryParam(name){
  const params = new URLSearchParams(location.search);
  return params.get(name);
}

function renderHouseDetail(){
  const id = getQueryParam('id');
  const container = el('#houseDetail');
  if(!container) return;
  const house = houses.find(h=>String(h.id)===String(id));
  if(!house){
    container.innerHTML = '<p>House not found.</p>';
    return;
  }
  container.innerHTML = `
    <div class="house-top" style="display:flex;gap:1rem;flex-wrap:wrap">
      <img src="${house.img}" alt="${house.title}" style="width:320px;max-width:100%">
      <div>
        <h1>${house.title}</h1>
        <p class="price">$${house.price} / month</p>
        <p><strong>${house.beds} beds</strong> • <strong>${house.baths} baths</strong> • ${house.area}</p>
        <p>${house.desc}</p>
        <p><a class="btn" href="contact.html">Contact about this house</a></p>
      </div>
    </div>
  `;
}

function initAuthForms(){
  const signup = el('#signupForm');
  if(signup){
    signup.addEventListener('submit', e=>{
      e.preventDefault();
      const fd = new FormData(signup);
      const user = {name:fd.get('name'),email:fd.get('email'),password:fd.get('password'),budget:fd.get('budget')};
      const users = JSON.parse(localStorage.getItem('rentopa_users')||'[]');
      users.push(user);
      localStorage.setItem('rentopa_users',JSON.stringify(users));
      alert('Account created — you can now log in');
      location.href='home.html';
    });
  }

  const login = el('#loginForm');
  if(login){
    login.addEventListener('submit', e=>{
      e.preventDefault();
      const fd = new FormData(login);
      const email = fd.get('email');
      const password = fd.get('password');
      const users = JSON.parse(localStorage.getItem('rentopa_users')||'[]');
      const found = users.find(u=>u.email===email && u.password===password);
      if(found){
        localStorage.setItem('rentopa_current', JSON.stringify({email}));
        alert('Login successful');
        location.href='home.html';
      } else alert('Invalid credentials');
    });
  }

  const contact = el('#contactForm');
  if(contact){
    contact.addEventListener('submit', e=>{
      e.preventDefault();
      alert('Message sent (demo). Thank you!');
      contact.reset();
    });
  }
}

function applyUI(){
  const menuBtn = el('#menuBtn');
  const nav = el('#nav');
  if(menuBtn && nav){
    menuBtn.addEventListener('click', ()=>{
      nav.classList.toggle('open');
      if(nav.classList.contains('open')) nav.style.display='flex'; else nav.style.display='none';
    });
  }

  const tLogin = el('#toggleLoginPw');
  if(tLogin){
    tLogin.addEventListener('click', ()=>{
      const pw = el('#loginPassword');
      if(pw.type==='password'){pw.type='text'; tLogin.textContent='Hide'} else {pw.type='password'; tLogin.textContent='Show'}
    });
  }
  const tSignup = el('#toggleSignupPw');
  if(tSignup){
    tSignup.addEventListener('click', ()=>{
      const pw = el('#signupPassword');
      if(pw.type==='password'){pw.type='text'; tSignup.textContent='Hide'} else {pw.type='password'; tSignup.textContent='Show'}
    });
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderListings();
  renderHouseDetail();
  initAuthForms();
  applyUI();
});
