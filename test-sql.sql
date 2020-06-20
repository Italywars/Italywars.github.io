CREATE TABLE players (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    player_name VARCHAR(150) NOT NULL,
    moves_table VARCHAR(150) NOT NULL
)

INSERT INTO players(player_name, moves_table) VALUES ('Alexander', 'alexander_moves');

CREATE TABLE alexander_moves (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    player_move VARCHAR(150) NOT NULL
);

INSERT INTO alexander_moves(player_move) VALUES ('A PIO –– SIE');