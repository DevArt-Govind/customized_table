
// const ROWS_PER_PAGE = 4;
// Define reusable functions

// Paginates the table rows based on the current page
// function paginateRows(rows, page) {
//     const startIndex = (page - 1) * ROWS_PER_PAGE;
//     const endIndex = startIndex + ROWS_PER_PAGE;

//     rows.forEach((row, index) => {
//         const display = index >= startIndex && index < endIndex ? "" : "none";
//         row.style.display = display;
//     });
// }