/******************************************
Selected Elements
******************************************/
const page = document.querySelector('.page');
const pageHeader = document.querySelector('.page-header');
const studentItems = document.querySelectorAll('.student-item');
const studentItemsList = [...studentItems];

/******************************************
Functions
******************************************/
function showPage(studentList) {
   let start = 0;
   let end = 9;
   let filteredStudents = [];

   while(start < studentList.length){
      filteredStudents.push([...studentList.slice(start, end)]);
      start += 9;
      end += 9;
   }

   return filteredStudents;
}

function appendPageLinks(list) {
   //button container
   const btnContainer = document.createElement('div');
   const ul = document.createElement('ul');
   page.appendChild(btnContainer);
   btnContainer.appendChild(ul);
   btnContainer.className = 'pagination';

   //dynamically add buttons
   const numOfStudents = list.length;
   const numOfBtns = numOfStudents / 9;
   for(let i = 0; i < numOfBtns; i ++){
      const li = document.createElement('li');
      const pageBtn = document.createElement('a');
      pageBtn.href = "#"; 
      pageBtn.textContent = i + 1;
      ul.appendChild(li);
      li.appendChild(pageBtn);
   }

   //selects the first link and class of active is added
   const filterBtn = document.querySelector('a');
   filterBtn.className = 'active';

   /*****EVENT LISTENER*****/
   btnContainer.addEventListener('click', (e) => {
      //creates nested array
      let arrStudents = showPage(studentItemsList);
      if(e.target.tagName === 'A'){
         e.preventDefault();
         const filterBtns = [...document.querySelectorAll('a')];
         filterBtns.forEach((btn) => btn.classList.remove('active'));
         e.target.classList.add('active');       
         studentItemsList.forEach((student) => student.style.display = 'block'); 
         //hides students based off of nested array index
         const arrIndex = filterBtns.indexOf(e.target); 
         const studentsToShow = arrStudents.splice(arrIndex, 1);
         for(let i = 0; i < arrStudents.length; i++){
            for(let j = 0; j < arrStudents[i].length; j++){
               arrStudents[i][j].style.display = "none"; 
            }
         }
      }
   }); 
}

/*****EVENT LISTENER******/
/** when the DOM is loaded code below is executed **/
document.addEventListener('DOMContentLoaded', () => {
   //adds a search input and button on the top of the page; add input search functionality later
   // const inputContainer = document.createElement('div');
   // inputContainer.classList.add('student-search');
   // pageHeader.appendChild(inputContainer);  
   // const searchInput = document.createElement('input');
   // searchInput.type = 'search';
   // searchInput.placeholder = 'search for a student';      
   // const searchBtn = document.createElement('button');
   // searchBtn.textContent = 'search';
   // inputContainer.appendChild(searchInput);
   // inputContainer.appendChild(searchBtn);
   // when page is loaded the first 9 students will be shown;
   for(let i = 9; i < studentItemsList.length; i++){
      studentItemsList[i].style.display = "none"; 
   }
   appendPageLinks(studentItemsList);
});