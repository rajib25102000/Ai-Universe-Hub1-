const allData = ()=>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then((res) => res.json())
    .then((data => showAllData(data.data.tools)))
}

const showAllData = (datas) => {
    console.log(datas)
    const dataContainer = document.getElementById('container-data');
    datas = datas.slice(0,6)
    datas.forEach(data => {
    // console.log(data.image)
    const div = document.createElement('div')
    div.classList.add('col')
    div.innerHTML = `
    <div class="card h-100">
    <img src="${data.image ? data.image:'No Image'}" class="card-img-top" alt="...">
    <div class="card-body">
      <h4 class="card-title">Features</h4>
      <p>1. Natural language processing</p>
      <p>2. Contextual understanding</p>
      <p>3. Text generation</p>
    </div>
    <div class="card-footer d-flex justify-content-between align-items-center">
      <div>
      <h4 class="fw-bold">${data.name}</h4>
      <span class="fw-bold">${data.published_in}</span>
      </div>
      <div onclick="showSingData('${data.id}')">
      <i class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#showModal"></i>
      </div>    
    </div>
  </div>
    `
    dataContainer.appendChild(div)  
   });

}

const showSingData = (data) => {
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${data}`)
  .then(res => res.json())
  .then(data =>modalData(data))
}

const modalData = (data) => {
  console.log(data)
  const modalImag = document.getElementById('showModalLabel')
  modalImag.innerHTML = `
  <img class ="img-thumbnail" src="${data.data.image_link[0]?data.data.image_link[0]:"No image"}" alt=""  >
    
    <span class="position-absolute  mt-4 translate-middle badge rounded-pill bg-danger">
   
    ${data.data.accuracy.score}% accuracy</span>
  <div class="text-center">
  <h3>Hi, how are you doing today?</h3>
  <p>I'm doing well, thank you for asking. How can I assist you today?</p>
  </div>
  
  `
  
}
// showSingData();
allData();