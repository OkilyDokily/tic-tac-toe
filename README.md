# _Tic Tac Toe_

#### _This demonstrates knowledge of JavaScript._

#### By _**Matthew**_


## Description

_A page demonstrates basic javascript and behavior driven development_
_Page creates a tic tac toe game_


## SPEC
| Spec                                                                                                           | Input                                 | Output                                                        |
|----------------------------------------------------------------------------------------------------------------|---------------------------------------|---------------------------------------------------------------|
| create game object that determines win state and tracks the user                                               | new Game()                            | object with properties for changing user and determing win    |
| create a method that switches the current player after each play                                               | game.changeUser()                     | game.currentPlayer = 'X'                                      |
| create an object representing the board                                                                        | new Board()                           | object with board state and functions to manipulate the board |
| create an object that represents a potential Move                                                              | new Move(column, row, currentUser     | Occupied space object that can be applied to the board object |
| create  a method on board object that accepts an occupied space object                                         | board.AddOccupiedSpace(occupiedSpace) | update the board state                                        |
| create a method on board object to determine if a space is occupied                                            | board.isOccupied(OccupiedObj)         | don't update the board state                                  |
| determine if there is a win condition step by step                                                             |                                       |                                                               |
| check if each inner array is the same.                                                                         | [xxx][xoo][oxx]                       | update game object property Winner from "" to playerX.        |
| check if each beginning of each array is the same then middle then last                                        | xoo xxo xox                           | update game object property Winner from "" to playerX         |
| check if first value of first array and second value of second array and last of third array is the same       | xoo oxo oox                           | update game object property from Winner from "" to playerX    |
| check if last value of first array and second value of second array and first value of third array is the same | oox oxo xoo                           | update game object property from winner  from "" to playerX   |
| easy game                                                                                                      |                                       |                                                               |
|                                                                                                                |                                       |                                                               |

## Setup/Installation Requirements

Clone the repo and open the .html file

## Known Bugs

_I don't think there are any bugs but please tell me if you see any._

## Support and contact details

_Open a Github issue if you see a problem or have questions_

## Technologies Used

_This is an html, css, Bootstrap, jQuery, and JavaScript thing._

### License

*Feel free to use this code as you please*

Copyright (c) 2020 **_Matthew_**