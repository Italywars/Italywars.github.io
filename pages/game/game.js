$(document).ready(function () {
    const home = document.getElementById('home');
    const login = document.getElementById('login');
    const rules = document.getElementById('rules');
    const newGame = document.getElementById('new-game');

    $(home).on('click', function () {
        location.href = '../../index.html';
    });

    $(login).on('click', function () {
        location.href = '../login/login.html';
    });

    $(rules).on('click', function () {
        location.href = '../rules/rules.html';
    });

    $(newGame).on('click', function () {
        location.href = '../../testGame/test-game.html';
    });
});