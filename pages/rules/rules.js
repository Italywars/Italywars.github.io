$(document).ready(function () {
    const home = document.getElementById('home');
    const login = document.getElementById('login');
    const joinGame = document.getElementById('join-game');

    $(home).on('click', function () {
        location.href = '../../index.html';
    });

    $(login).on('click', function () {
        location.href = '../login/login.html';
    });

    $(joinGame).on('click', function () {
        location.href = '../game/game.html';
    });
});