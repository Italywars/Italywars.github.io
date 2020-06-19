$(function () {
    $('.change-page').on('click', function () {
        let current = $(this).attr('id');
        switch(current) {
            case 'join-game':
                location.href = '../game/game.html';
                break;
            case 'home':
                location.href = '../../index.html';
                break;
            case 'rules':
                location.href = '../rules/rules.html';
                break;
        }
    });
});