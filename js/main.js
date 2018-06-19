const numPerPage = 10;
let curStudentArray = [];
let allSdudentArray = $('.student-item');

// show student with a specific page number
function showStudent(pageNum){
    // return immediately if something is wrong
    if(isNaN(pageNum) || !curStudentArray || curStudentArray.length === 0 || pageNum < 1 || pageNum > Math.ceil(curStudentArray.length / 10)) return false;

    // count the start and end index
    const start_index = (pageNum - 1) * numPerPage + 1;
    const end_index = pageNum * numPerPage > curStudentArray.length ? curStudentArray.length : pageNum * numPerPage;

    // hide all student first and then show the items in the current page
    $(allSdudentArray).hide();
    $(curStudentArray).filter(index => index >= start_index - 1 && index <= end_index - 1).show();
}

// init pageNum button and add listener
function initPageLink(){
    // clear old page link
    if($('.pagination')){
        $('.pagination').remove();
    }

    // count how many links do we need to add
    const totalPageNum = Math.ceil(curStudentArray.length / numPerPage);
    if(totalPageNum <= 1) return;    //wrong array or don't need page link


    // init the html of page link and append to the end of the page div
    let pageHtml = `<div class="pagination">
                        <ul>`;
    for(let i = 1 ; i <= totalPageNum; i ++){
        pageHtml += `<li>
                        <a ${i === 1?"class=\"active\"":""} href="#">${i}</a>
                     </li>`;
    }
    pageHtml += `    </ul>
                </div>`;
    $(".page").append(pageHtml);

    // add click listener to the page link
    $(".pagination a").on('click', pageLinkClick);
}

// page link click event listener
function pageLinkClick(){
    const curPage = $('.pagination a.active');
    if(curPage === $(this)) return;    //same page, don't need change

    //update class
    curPage.removeClass('active');
    $(this).addClass('active');

    //update student list to show
    showStudent(parseInt($(this).text()));
}

// init search component
function initSearchComp(){
    // append search component
    $('.page-header').append(` <div class="student-search">
                                  <input placeholder="Search for students..." id="searchKeyWord">
                                  <button id="searchBt">Search</button>
                                </div>`);
    $('.page-header').after(`<div class="no-result" hidden>no result</div>`);

    // init event handler for search button
    $('#searchBt').on('click', searchEventHandler);
    $('#searchKeyWord').on('keyup', searchEventHandler);
}

// search event handler
function searchEventHandler(){
    $('.no-result').hide();
    if($('#searchKeyWord').val() === ''){
        resetPage();
    } else {
        searchStudent($('#searchKeyWord').val());
    }
}

// search student and update the curStudentArray
function searchStudent(keyword){
    curStudentArray = $(allSdudentArray).has(`h3:contains(${keyword})`);
    if(curStudentArray.length === 0){
        $(allSdudentArray).hide();
        initPageLink();
        $('.no-result').show();
    } else {
        showStudent(1);
        initPageLink();
    }
}

// reset page
function resetPage(){
    curStudentArray = $(allSdudentArray);
    $('.result').hide();
    showStudent(1);
    initPageLink();
}

$(function(){
    resetPage();
    initSearchComp();  //init search component
});