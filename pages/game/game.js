$(function () {
    $('.change-page').on('click', function () {
        let current = $(this).attr('id');
        switch(current) {
            case 'home':
                location.href = '../../index.html';
                break;
            case 'login':
                location.href = '../login/login.html';
                break;
            case 'rules':
                location.href = '../rules/rules.html';
                break;
            case 'new-game':
                location.href = '../../testGame/test-game.html';
                break;
        }
    });
});