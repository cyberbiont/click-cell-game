# Hit the Cell: Interactive Game

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/cyberbiont/hit-the-cell-game)

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.5.

## Development server

To start a local development server, run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## specifications

Interactive Mini-Game
Game Elements: 10x10 grid of blue squares
"Start" button
Input field for time in milliseconds
Score display (Player vs Computer)

## Game Rules

1. When the player clicks "Start":

- A random blue cell turns yellow (highlighted)
- The player has N milliseconds to click this cell

2. Scoring:

- If player clicks the yellow cell within N milliseconds:
- Cell turns green permanently
- Player scores 1 point
- If player fails to click within time limit:
- Cell turns red permanently
- Computer scores 1 point

3. Game End:

- First to reach 10 points wins
- A custom modal window displays the game results
- Game stops (no more highlights)

## Additional features:

The game is configurable using GAME_CONFIG injection token. You can set grid size, timeout limits, default timeout and the score user has to reach to win. Config is validated
Timeout input is validated to fit the specified limits.
Errors handling with toast window displayed to the user.
A vbon to show the rules to the user run a modal window.
Results history ans statistics (to be impplemented)
