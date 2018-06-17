const numPerPage = 10;
let curStudentArray = [];

// show student with a specific page number
function showStudent(pageNum){
    // return immediately if the page number is wrong
    if(isNaN(pageNum) || !curStudentArray || curStudentArray.length == 0 || pageNum < 1 || pageNum > Math.ceil(curStudentArray.length / 10)) return false;

    // count the start and end index
    // PS: not array index
    const start_index = (pageNum - 1) * numPerPage + 1;
    const end_index = pageNum * numPerPage > curStudentArray.length ? curStudentArray.length : pageNum * numPerPage;

    // hide student item not in the page
    $(curStudentArray).each((index, element) => {
        if(index >= start_index - 1 && index <= end_index -1){
            $(element).show();
        } else {
            $(element).hide();
        }
    });
}

// init pageNum button and add listener
function initPageLink(){
    // count how many links do we need to add
    const totalPageNum = Math.ceil(curStudentArray.length / numPerPage);
    if(totalPageNum <= 1) return;    //wrong array or don't need page link

    // init the html of page link and append to the end of the page div
    let pageHtml = `<div class="pagination">
                        <ul>`;
    for(let i = 1 ; i <= totalPageNum; i ++){
        pageHtml += `<li>
                        <a ${i == 1?"class=\"active\"":""} href="#">${i}</a>
                     </li>`;
    }
    pageHtml += `    </ul>
                </div>`;
    $(".page").append(pageHtml);

    // add click listener to the page link
    $(".pagination a").on('click', pageLinkClick);
}

// page link click event listener
function pageLinkClick(event){
    const curPage = $('.pagination a.active');
    if(curPage === $(this)) return;    //same page, don't need change

    //update class
    curPage.removeClass('active');
    $(this).addClass('active');

    //update student list to show
    showStudent(parseInt($(this).html()));
}

// init search component
function initSearchComp(){

}

// click event handler for search
function searchStudent(){

}

// show search result
function showSearchResult(){

}

// reset page
function resetPage(){
    
}



$(function(){
    curStudentArray = $('.student-item');
    showStudent(1);  //show first page
    initPageLink();  //init page button
    initSearchComp();  //init search component
});