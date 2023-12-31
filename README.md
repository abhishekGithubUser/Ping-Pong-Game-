

# Pong Game

## Description

This is a simple Pong game implemented using HTML5 Canvas and JavaScript. The game features a player-controlled paddle, a computer-controlled paddle, and a ball that bounces between them. The objective is to score points by making the ball pass the opponent's paddle.

## How to Play

- Move the player paddle using your mouse to hit the ball.
- The computer-controlled paddle will try to block the ball and score points.
- The game ends when one of the players reaches a score of 5.
- The final scores are displayed at the center of the canvas.
- If you want to replay the game, refresh the page.

## Code Overview

- The game is drawn on an HTML5 Canvas element.
- The `drawRect` function is used to draw rectangles (paddles and the game area).
- The `drawMidLine` function draws a dashed line at the center of the canvas.
- The `drawCircal` function is used to draw the ball.
- Paddle and ball objects are defined with their properties.
- The `render` function is responsible for rendering the game elements.
- User paddle movement is controlled by the mouse.
- Collision detection is implemented to detect ball and paddle interactions.
- The game updates in a loop, with the `update` function handling ball movement, collisions, and scoring.
- The game ends when one player reaches a score of 5, triggering the `showGameOver` function.
- The `reset` function resets the ball's position and speed.

## Running the Game

1. Clone the repository.
2. Open the `index.html` file in a web browser.
3. Move your mouse to control the player paddle.
4. Enjoy playing the Pong game!
