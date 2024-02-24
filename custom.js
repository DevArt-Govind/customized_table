// // pagination
// function displayTableRows(table, pageNumber) {
//     const rowsPerPage = 4; // number of rows to display per page
//     const startIndex = (pageNumber - 1) * rowsPerPage; // calculate start index of rows to display
//     const endIndex = startIndex + rowsPerPage; // calculate end index of rows to display

//     const rows = table.getElementsByTagName("tr"); // get all rows from table

//     // hide all rows except the header row
//     for (let i = 1; i < rows.length; i++) {
//         rows[i].style.display = "none";
//     }

//     // display rows for the current page
//     for (let i = startIndex + 1; i < endIndex && i < rows.length; i++) {
//         rows[i].style.display = "";
//     }
// }
// const table = document.getElementById("gb-table");
// const pagination = document.getElementById("pagination");

// displayTableRows(table, 1); // display first page of rows

// add event listener to pagination links
// pagination.addEventListener("click", (event) => {
//     event.preventDefault(); // prevent default link behavior
//     if (event.target.tagName === "A") {
//         const pageNumber = parseInt(event.target.textContent);
//         displayTableRows(table, pageNumber);
//     }
// });






// active link effect
const pagLink = document.querySelectorAll(".pagination-link");


for (var i = 0; i < pagLink.length; i++) {
    pagLink[i].addEventListener('click', function () {
        for (var j = 0; j < pagLink.length; j++) {
            pagLink[j].classList.remove('active-link');
        }
        this.classList.add('active-link');
    });
}




// Define constants and variables
const TABLE_ID = "gb-table";
const PAGINATION_ID = "pagination";
const SEARCH_INPUT_ID = "gb-search-input";


const table = document.getElementById(TABLE_ID);
const pagination = document.getElementById(PAGINATION_ID);
const searchInput = document.getElementById(SEARCH_INPUT_ID);
let currentPage = 1;

// // search functionality
// function searchTable() {
//     const searchValue = searchInput.value.toLowerCase();
//     const rows = document.querySelectorAll('#gb-table tbody tr');

//     rows.forEach(row => {
//         const text = row.textContent.toLowerCase();
//         if (text.includes(searchValue)) {
//             row.style.display = '';
//         } else {
//             row.style.display = 'none';

//         }
//     });
// }

// // const searchInput = document.getElementById('gb-search-input');
// searchInput.addEventListener('input', searchTable);

// Filters the table rows based on the search term
// function filterRows(rows, searchTerm) {
//     rows.forEach((row, index) => {
//         const text = row.textContent.toLowerCase();
//         const display = text.includes(searchTerm) ? "" : "none";
//         if (searchTerm === "") {
//             if (index < ROWS_PER_PAGE) {
//                 row.style.display = "";
//             } else {
//                 row.style.display = "none";
//             }
//         } else {
//             row.style.display = display;
//         }
//     });
// }


// Initializes the table by displaying the first page of rows and adding event listeners
function initTable() {
    const rows = Array.from(table.querySelectorAll("tbody tr"));
    paginateRows(rows, currentPage);

    pagination.addEventListener("click", (event) => {
        event.preventDefault();
        if (event.target.tagName === "LI" || event.target.tagName === "A") {
            currentPage = parseInt(event.target.textContent);
            paginateRows(rows, currentPage);
            setActiveLink(event.target);
        }
    });

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        filterRows(rows, searchTerm);
        currentPage = 1;
        setActiveLink(pagination.querySelector(".pagination-link"));
    });
}

// Initialize the table on page load
window.addEventListener("load", initTable);



// delete functionality
document.querySelector('#master').addEventListener('click', function (e) {
    if (this.checked) {
        var subCheckboxes = document.querySelectorAll('.gb-checkbox');
        for (var i = 0; i < subCheckboxes.length; i++) {
            subCheckboxes[i].checked = true;
        }
    } else {
        var subCheckboxes = document.querySelectorAll('.gb-checkbox');
        for (var i = 0; i < subCheckboxes.length; i++) {
            subCheckboxes[i].checked = false;
        }
    }
});

document.querySelector('.delete_all').addEventListener('click', function (e) {
    var allVals = [];
    var subCheckboxes = document.querySelectorAll('.gb-checkbox:checked');
    for (var i = 0; i < subCheckboxes.length; i++) {
        allVals.push(subCheckboxes[i].getAttribute('data-id'));
    }
    if (allVals.length <= 0) {
        alert("Please select row.");
    } else {
        var WRN_PROFILE_DELETE = "Are you sure you want to delete this row?";
        var check = confirm(WRN_PROFILE_DELETE);
        if (check == true) {
            allVals.forEach(function (value, index) {
                var row = document.querySelector('#gb-table tr[data-row-id="' + value + '"]');
                if (row) {
                    row.remove();
                }
            });
        }
    }
});

var removeRowBtns = document.querySelectorAll('.gb-remove-row');
removeRowBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        var WRN_PROFILE_DELETE = "Are you sure you want to delete this row?";
        var check = confirm(WRN_PROFILE_DELETE);
        if (check == true) {
            var row = btn.closest('tr');
            if (row) {
                row.remove();
            }
        }
    });
});


// row selection in a dropdown

const DEFAULT_ROWS_PER_PAGE = 5;
var rowsPerPage = DEFAULT_ROWS_PER_PAGE;

function paginateRows(rows, page) {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    rows.forEach((row, index) => {
        const display = index >= startIndex && index < endIndex ? "" : "none";
        row.style.display = display;
    });
}

document.getElementById("rowSelector").addEventListener("change", updateTable);

function updateTable() {
    rowsPerPage = document.getElementById("rowSelector").value;
    var tableRows = document.getElementById("gb-table").getElementsByTagName("tr");
    for (var i = 1; i < tableRows.length; i++) {
        if (i <= rowsPerPage) {
            tableRows[i].style.display = "table-row";
        } else {
            tableRows[i].style.display = "none";
        }
    }
}


