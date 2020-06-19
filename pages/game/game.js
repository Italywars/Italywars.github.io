/**
 * Created by Simon Camacho on June 15,
 * 2020. 
 * 
 * @version 1.0 (6/15/20) {
 * Editor: Simon Camacho
 * 1. Enabled change-page
 * option
 * }
 * 
 */


/** 
 * Given a page name, links the user to that page.
*/
function changePage(pageName) {
    switch (pageName) {
        case "#rules":
            location.href = "../../pages/rules/rules.html";
            break;
        case "#login":
            location.href = "../../pages/login/login.html";
            break;
        case "#home":
            location.href = "../../index.html";
            break;
        case "#new-game":
            location.href = "../../testGame/test-game.html";
            break;
    }
}

const pages = ['rules', 'login', 'home', 'new-game'];

$(document).ready(function() {
    for (let i = 0; i < pages.length; i++) {
        const page = '#' + pages[i];
        $(page).on('click', changePage(page));
    }
});