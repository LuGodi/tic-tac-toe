### Start with the basic layout

- a container which is set to flex
- banner should take 100%
  scoreboard should take around 30%
  game container should take the rest of the space

need to look up how flex-basis work again

ok eu nao lembro se flex wrap eh no parent container ou no child, acho que no parent, o que tem o flex definido

- no banner eu preciso que o texto esteja alinhado, da pra fazer isso com flex no banner, eu so acho que fica flex dmais, mas n sei como fazer de outra forma
- nao sei como to tao enferrujada em flex

- flex grow eh no child?

#### Como vou da render no tabuleiro de tic tac toe ?

ele precisa ser uma grid 3x3

- [x] grid 3x3
- [x] delegate the event listener to the grid container

whats the difference between a factory pattern and obj literal pattern if im revealing all functions?

se eu quisesse que o gameController q tivesse uma instancia do gameboard como eu faria e ai tipo outro gamecontroller teria outra instancia, como isso seria ?

- eu qro render o board, eu posso abordar isso de duas formas..

  - [x] eu deixo um board criado, ja que sempre vai jogar tic tac toe, e dentro dele eu so mudo os inner text
  - eu sempre crio um board do meu board

- i need the event listener on the parent container as to avoid adding event listener to every single cell from the board

  - I can do this with e.target
  - current target => doesnt change, its the element to which handler was attached
  - target => changes, element that triggered the event handler.

- I also need to connect the board on the code - the foundation - to the board on the visual part - the walls.

  - I can access the gameboard through the gameboard api.
  - at the moment im flattening the array, running through it, I have the reference for the DOM on the tic tac toe board.

- what are the advantages of using live html collection.. ok changing a live collection may cause perfomance issues it seems, i still need to figure out the advantages and use cases.

- Should the logic for interacting with the board be on the game controller or display controller ?

> Once you have a working console game, create an object that will handle the display/DOM logic. Write a function that will render the contents of the gameboard array to the webpage (for now, you can always just fill the gameboard array with "X"s and "O"s just to see what’s going on).

> Write the functions that allow players to add marks to a specific spot on the board by interacting with the appropriate DOM elements (e.g. letting players click on a board square to place their marker). Don’t forget the logic that keeps players from playing in spots that are already taken!

> Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that shows the results upon game end!

- css properties being accessible through js domenlightement has some stuff

- visual tip on players turn

- I should move the check winner and check tie to outside the play move, and just after it gets out of the loop it should return the result

- [x] I need to render the scoreboard
- [ ] Implement ability to change player name

  - eu achei que poderia ser no player ou no createPlayer, mas so pode ser no createPlayer ja que so ele tem acesso a modificar o name, pois eh uma propriedade que ta privada atraves da closure
  - ok mas eu vou precisar da referencia dele pra modificar no playerList
  - depois de mudar o nome eu preciso render o scoreboard display tb

- [ ] Adjust for loop on display controller to use the getter for the list instead of the list itself
- [ ] visual aid green on winning matches
