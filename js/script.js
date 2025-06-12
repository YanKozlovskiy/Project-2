/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// elements
// This will create a student card 
// the structure for the student card is 
// <li>
//   <div>
//     <img>
//     <h3></h3>
//     <span></span>
//   </div>
//   <div>
//     <span></span>
//   </div>
// </li>


/*
For assistance:
Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
// selector 
const studentList = document.querySelector('.student-list');
const paginationContainer = document.querySelector('.link-list');
const visibleItems = 9;

function showPage(students) {
   studentList.replaceChildren();
   for (const [index, student] of students.entries()) {
      if (index < visibleItems) {
         const studentCard = document.createElement('li');
         const studentDetails = document.createElement('div');
         const avatar = document.createElement('img');
         const nameHeading = document.createElement('h3');
         const email = document.createElement('span');
         const joinedDetails = document.createElement('div');
         const dateJoined = document.createElement('span');
   
         studentCard.className = "student-item cf";
         studentDetails.className = "student-details";
         avatar.className = "avatar";
         email.className = "email";
         joinedDetails.className = "joined-details";
         dateJoined.className = "date";
         avatar.src = student.picture.large;
         nameHeading.textContent = `${student.name.title} ${student.name.first} ${student.name.last}`
         email.textContent = student.email;
         dateJoined.textContent = `${student.registered.date}`;
         
         studentDetails.append(avatar, nameHeading, email);
         joinedDetails.append(dateJoined);
         studentCard.append(studentDetails, joinedDetails);
         studentList.appendChild(studentCard);
      }
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(students) {
   paginationContainer.replaceChildren();
   const totalPages = Math.ceil(students.length / 9);
   for (let i = 0; i < totalPages; i++) {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.textContent = i + 1;
      button.value = i + 1;
      button.addEventListener('click', function() {
         const getStudents = getStudentsPerPage(students, this.value);
         resetActiveClass();
         this.classList.add("active");
         showPage(getStudents);
      });

      if (i === 0) {
         button.classList.add("active");
      }

      li.append(button);
      paginationContainer.append(li);
   }

}

function resetActiveClass() {
   const buttons = paginationContainer.querySelectorAll('button');
   for (const button of buttons) {
      button.classList.remove('active');
   }
}

function getStudentsPerPage(allStudents, pageNumber) {
   const startIndex = (pageNumber - 1) * 9;
   const endIndex = pageNumber * 9;

   return allStudents.slice(startIndex, endIndex);
}

function addSearch() {
   const header = document.querySelector('.header');
   const label = document.createElement('label');
   const span = document.createElement('span');
   const input = document.createElement('input');
   const button = document.createElement('button');
   const img = document.createElement('img');

   label.htmlFor = 'search';
   label.className = 'student-search';
   span.textContent = 'Search by name';
   input.placeholder = 'Search by name...';
   button.type = 'button';
   img.src = 'img/icn-search.svg';
   img.alt = 'Search icon';
   label.append(span, input, button);
   button.append(img);
   header.appendChild(label);

   button.addEventListener('click', () => {
      searchFilter(input.value.toLowerCase());
   });

   input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
         searchFilter(input.value.toLowerCase());
      }
   });

   let searchTimeout;
   input.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
         searchFilter(input.value.toLowerCase());
      }, 300);
   });
}

function searchFilter(query) {
   if (query.length === 0) {
      showPage(data);
      addPagination(data);
      return;
   } 
   //     name: {
   //    title: "Miss",
   //    first: "Ethel",
   //    last: "Dean",
   //  },
   const filteredQuery = [];
   
   for (item of data) {
      const name = `${item.name.title} ${item.name.first} ${item.name.last}`.toLowerCase();
      const searchQuery = query.toLowerCase().split(' ');
      const allWordsMatch = searchQuery.every(word => name.includes(word));
      if (allWordsMatch) {
         filteredQuery.push(item);
      }
   }
   
   if (filteredQuery.length === 0) {
      noResults();
      paginationContainer.replaceChildren();
   } else {
      showPage(filteredQuery);
      addPagination(filteredQuery);
   }

}

function noResults() {
   studentList.replaceChildren();
   const p = document.createElement("p");
   p.textContent = "No results found.";
   studentList.append(p);
}

// Call functions
showPage(data);
addPagination(data);
addSearch();