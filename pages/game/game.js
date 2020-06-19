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
        case "rules":
            location.href = "../../pages/rules/rules.html";
            break;
        case "login":
            location.href = "../../pages/login/login.html";
            break;
        case "home":
            location.href = "../../index.html";
            break;
        case "new-game":
            location.href = "../../testGame/test-game.html";
            break;
    }
}

function main() {

    // Access information in index.html
    const joinGame_div = document.getElementById("join-game");
    const rules_div = document.getElementById("rules");
    const home_div = document.getElementById("home");
    const newGame_div = document.getElementById("new-game");

    joinGame_div.addEventListener('click', () => changePage("join-game"));
    rules_div.addEventListener('click', () => changePage("rules"));
    home_div.addEventListener('click', () => changePage("home"));
    newGame_div.addEventListener('click', () => changePage("new-game"));

    // Just for fun. This isn't actually necessary.
    return 0;
}

main();