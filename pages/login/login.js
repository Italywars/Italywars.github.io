$(document).ready(function () {
    const home = document.getElementById('home');
    const rules = document.getElementById('rules');
    const joinGame = document.getElementById('join-game');

    $(home).on('click', function () {
        location.href = '../../index.html';
    });

    $(rules).on('click', function () {
        location.href = '../rules/rules.html';
    });

    $(joinGame).on('click', function () {
        location.href = '../game/game.html';
    });
});