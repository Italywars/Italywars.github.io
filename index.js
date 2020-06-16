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
            location.href = "game.html";
            break;
        case "login":
            location.href = "login.html";
            break;
        case "rules":
            location.href = "rules.html";
            break;
    }
}

function main() {

    // Access information in index.html
    const joinGame_div = document.getElementById("join-game");
    const login_div = document.getElementById("login");
    const rules_div = document.getElementById("rules");

    joinGame_div.addEventListener('click', function() {
        changePage("join-game");
    })

    login_div.addEventListener('click', function() {
        changePage("login");    
    })

    rules_div.addEventListener('click', function() {
        changePage("rules");
    })
}

main();
