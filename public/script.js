console.log('Client-side code running');


const coder = document.getElementById('coder');
const coderForm = document.getElementById('coderForm');
const searcher = document.getElementById('searcher');
const searcherForm = document.getElementById('searcherForm');


searcher.addEventListener('click', function(e) {
  coder.setAttribute("class", "btn btn-outline-secondary mr-5")
  searcher.setAttribute("class", "btn btn-outline-primary")
  searcherForm.setAttribute("class", "showcase2")
  coderForm.setAttribute("class", "d-none")
});

coder.addEventListener('click', function(e) {
  searcher.setAttribute("class", "btn btn-outline-secondary")
  coder.setAttribute("class", "btn btn-outline-primary  mr-5")
  coderForm.setAttribute("class", "showcase2")
  searcherForm.setAttribute("class", "d-none")
});