$(function () {
    $('.change-page').on('click', function () {
        let current = $(this).attr('id');
        switch(current) {
            case 'join-game':
                location.href = 'pages/game/game.html';
                break;
            case 'login':
                location.href = 'pages/login/login.html';
                break;
            case 'rules':
                location.href = 'pages/rules/rules.html';
                break;
        }
    });
});