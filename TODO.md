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

- [ ] grid 3x3
- [ ] delegate the event listener to the grid container

whats the difference between a factory pattern and obj literal pattern if im revealing all functions?

se eu quisesse que o gameController q tivesse uma instancia do gameboard como eu faria e ai tipo outro gamecontroller teria outra instancia, como isso seria ?

- eu qro render o board, eu posso abordar isso de duas formas..

  - [x] eu deixo um board criado, ja que sempre vai jogar tic tac toe, e dentro dele eu so mudo os inner text

- i need the event listener on the parent container as to avoid adding event listener to every single cell from the board
  - I can do this with e.target
  - current target => doesnt change, its the element to which handler was attached
  - target => changes, element that triggered the event handler.
