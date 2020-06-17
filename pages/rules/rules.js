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
 * Given a page name, links 
 * the user to that page.
*/
function changePage(pageName) {
    switch (pageName) {
        case "join-game":
            location.href = "../../pages/game/game.html";
            break;
        case "login":
            location.href = "../../pages/login/login.html";
            break;
        case "home":
            location.href = "../../index.html";
            break;
    }
}

function main() {

    // Access information in index.html
    const joinGame_div = document.getElementById("join-game");
    const login_div = document.getElementById("login");
    const home_div = document.getElementById("home");

    joinGame_div.addEventListener('click', () => changePage("join-game"));
    login_div.addEventListener('click', () => changePage("login"));
    home_div.addEventListener('click', () => changePage("home"));

    // Just for fun. This isn't actually necessary.
    return 0;
}

main();