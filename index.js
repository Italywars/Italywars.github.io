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
