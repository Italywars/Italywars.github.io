$(document).ready(function () {
    const joinGame= document.getElementById('join-game');
    const login = document.getElementById('login');
    const rules = document.getElementById('rules');

    $(joinGame).on('click', function () {
        location.href = 'pages/game/game.html';
    });

    $(login).on('click', function () {
        location.href = 'pages/login/login.html';
    });

    $(rules).on('click', function () {
        location.href = 'pages/rules/rules.html';
    });
})