// HTML elements
const startGameButton = document.querySelector(".start");
const initialPile = document.querySelector("#initial-pile");
const deckCard = document.querySelector(".deck-card");
const selected = document.querySelector("#selected");

var userTxt = document.getElementById("userNameTxt");

// Constants
const suits = ["trebol", "diamante", "corazon", "espada"];
const colors = {
  corazon: "rojo",
  diamante: "rojo",
  espada: "negro",
  trebol: "negro",
};

// Data
let deck = [];
let shuffledDeck = [];
let piles = [];
let dealtCards = [];
let cardsToCheck = [];
let homes = [[], [], [], []];

// ---------- INITIAL BOARD -----------

const createDeck = () => {
  deck = [];
  for (let i = 1; i <= 13; i++) {
    for (let j = 0; j < suits.length; j++) {
      const card = {
        number: i,
        suit: suits[j],
        color: colors[suits[j]],
        isFaceUp: true,
        img: `${i}_de_${suits[j]}`,
        id: i * j,
      };
      deck.push(card);
    }
  }
};

const shuffle = () => {
  shuffledDeck = deck
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const deal = () => {
  piles = [];
  for (let i = 1; i < 8; i++) {
    piles.push([]);
    for (let j = 0; j < i; j++) {
      if (j === i - 1) {
        shuffledDeck[0].isFaceUp = false;
      }
      piles[i - 1].push(shuffledDeck[0]);
      shuffledDeck.shift();
    }
  }
  putCardsInInitialPile();
  putCardsInPiles();
};

const putCardsInInitialPile = () => {
  while (selected.firstChild) {
    selected.removeChild(selected.firstChild);
  }
  while (initialPile.firstChild) {
    initialPile.removeChild(initialPile.firstChild);
  }

  for (let i = 0; i < shuffledDeck.length; i++) {
    initialPile.appendChild(createCard(shuffledDeck[i]));
  }
};

const putCardsInPiles = () => {
  for (let i = 0; i < piles.length; i++) {
    const div = document.querySelector(`#pile-${i}`);
    div.innerHTML = "";
    for (let j = 0; j < piles[i].length; j++) {
      const isLastCardSelected = j === piles[i].length - 1;
      if (isLastCardSelected) {
        piles[i][j].isFaceUp = false;
      }
      const card = createCard(piles[i][j]);
      card.style.top = `${j * 30}px`;
      card.dataset.pile = i;
      div.appendChild(card);
    }
  }
};

const putCardsInHomes = () => {
  for (let i = 0; i < homes.length; i++) {
    const div = document.querySelector(`#home-${i}`);
    div.innerHTML = "";
    for (let j = 0; j < homes[i].length; j++) {
      const card = createCard(homes[i][j]);
      card.dataset.pile = null;
      card.dataset.home = `home-${i}`;
      div.appendChild(card);
    }
  }
};

const createCard = (card) => {
  const cardHTML = document.createElement("div");
  const image = document.createElement("img");
  image.src = `img/${card.isFaceUp ? "dorso" : card.img}.png`;
  cardHTML.dataset.number = card.number;
  cardHTML.dataset.type = card.type;
  cardHTML.dataset.color = card.color;
  cardHTML.dataset.id = card.id;
  cardHTML.dataset.img = card.img;
  cardHTML.dataset.pile = card.pile || "shuffled";
  cardHTML.classList.add("card");
  cardHTML.appendChild(image);
  cardHTML.onclick = (e) => {
    e.stopPropagation();
    checkCardClick(cardHTML);
  };
  return cardHTML;
};

const assignClickToDeck = () => {
  deckCard.onclick = () => {
    const selectedCard = shuffledDeck.pop();
    const isLastCardInDeck = !shuffledDeck.length;

    if (!!selectedCard && !isLastCardInDeck) {
      selectedCard.isFaceUp = false;
      deckCard.children[0].style.display = "block";
      initialPile.style.display = "block";
      selected.appendChild(createCard(selectedCard));
      dealtCards.unshift(selectedCard);
    } else if (!!selectedCard && isLastCardInDeck) {
      selectedCard.isFaceUp = false;
      deckCard.children[0].style.display = "none";
      initialPile.style.display = "none";
      selected.appendChild(createCard(selectedCard));
      dealtCards.unshift(selectedCard);
    } else {
      shuffledDeck = [...dealtCards];
      dealtCards = [];
      deckCard.children[0].style.display = "block";
      putCardsInInitialPile();
      initialPile.style.display = "block";
    }
  };
};

const assignClickToPiles = () => {
  for (let i = 0; i < 7; i++) {
    const pile = document.querySelector(`#pile-${i}`);
    pile.onclick = (e) => {
      e.stopPropagation();
      
      checkEmptyPileClick(i);
    };
  }
};

const assignClickToHomes = () => {
  for (let i = 0; i < 4; i++) {
    const home = document.querySelector(`#home-${i}`);
    home.onclick = (e) => {
      checkEmptyHomeClick(i);
    };
  }
};

const clearHomeHTML = () => {
  for (let i = 0; i < homes.length; i++) {
    const div = document.querySelector(`#home-${i}`);
    div.innerHTML = "";
  }
};

startGameButton.onclick = () => {
  deck = [];
  shuffledDeck = [];
  piles = [];
  dealtCards = [];
  cardsToCheck = [];
  homes = [[], [], [], []];
  selected.innerHTML = "";
  selected.innerHTML = "";

  createDeck();
  shuffle();
  deal();
  assignClickToDeck();
  assignClickToPiles();
  assignClickToHomes();
  clearHomeHTML();
};

//  ---------- JUEGO -----------

// Rule Checking

const canMoveToHomeWithCards = (card, firstClickedCard) => {
  return (
    card.dataset.number == firstClickedCard.dataset.number - 1 &&
    card.dataset.type == firstClickedCard.dataset.type
  );
};

const canMoveToEmptyPile = (card) => {
  return card.dataset.number == 13;
};

const canMoveToEmptyHome = (homeToMoveCard, firstClickedCard) => {
  return !homeToMoveCard.length && firstClickedCard.dataset.number == 1;
};

const isMoveValid = (clickedCard, firstClickedCard) => {
  return (
    Number(clickedCard.dataset.number) ==
      Number(firstClickedCard.dataset.number) + 1 &&
    clickedCard.dataset.color !== firstClickedCard.dataset.color
  );
};

// Check clicks on different elements

const checkEmptyHomeClick = (homeIndex) => {
  const firstClickedCard = cardsToCheck[0];
  const homeToMoveCard = homes[homeIndex];
  if (firstClickedCard) {
    if (canMoveToEmptyHome(homeToMoveCard, firstClickedCard)) {
      const isInDeck = isNaN(Number(firstClickedCard.dataset.pile));
      if (isInDeck) {
        removeCardFromDeck(firstClickedCard);
        const firstClickedCardObject = createCardFromHTML(
          firstClickedCard,
          `home-${homeIndex}`
        );
        homeToMoveCard.push(firstClickedCardObject);
      } else {
        const pileOfFirstClickedCard =
          piles[Number(firstClickedCard.dataset.pile)];

        pileOfFirstClickedCard.pop();
        const firstClickedCardObject = createCardFromHTML(
          firstClickedCard,
          `home-${homeIndex}`
        );
        homeToMoveCard.push(firstClickedCardObject);
      }
      putCardsInPiles();
      putCardsInHomes();
      clearSelectedCards(null, firstClickedCard);
    }
  }
};

const checkHomeClick = (homeIndex, card) => {
  const firstClickedCard = cardsToCheck[0];
  const homeToMoveCard = homes[homeIndex];
  if (firstClickedCard) {
    lastCardInHome = homeToMoveCard[homeToMoveCard.length - 1];
    if (canMoveToHomeWithCards(card, firstClickedCard)) {
      const isInDeck = isNaN(Number(firstClickedCard.dataset.pile));
      if (isInDeck) {
        removeCardFromDeck(firstClickedCard);
        const firstClickedCardObject = createCardFromHTML(
          firstClickedCard,
          `home-${homeIndex}`
        );
        homeToMoveCard.push(firstClickedCardObject);
      } else {
        const pileOfFirstClickedCard =
          piles[Number(firstClickedCard.dataset.pile)];

        pileOfFirstClickedCard.pop();
        const firstClickedCardObject = createCardFromHTML(
          firstClickedCard,
          `home-${homeIndex}`
        );
        homeToMoveCard.push(firstClickedCardObject);
      }
      putCardsInPiles();
      putCardsInHomes();
      clearSelectedCards(card, firstClickedCard);
    }
  }
};


const checkPilesWithCardsClick = (clickedCard, firstClickedCard) => {
  const isInDeck = isNaN(Number(firstClickedCard.dataset.pile));
  const pileToMoveCard = piles[Number(clickedCard.dataset.pile)];
  if (isInDeck) {
    removeCardFromDeck(firstClickedCard);
    const firstClickedCardObject = createCardFromHTML(
      firstClickedCard,
      pileToMoveCard
    );
    pileToMoveCard.push(firstClickedCardObject);
  } else {
    const siblings = getCardSiblings(firstClickedCard);
    const pileOfFirstClickedCard =
      piles[Number(firstClickedCard.dataset.pile)];

    pileOfFirstClickedCard.pop();
    const firstClickedCardObject = createCardFromHTML(
      firstClickedCard,
      pileToMoveCard
    );
    pileToMoveCard.push(firstClickedCardObject);

    if (siblings.length) {
      for (let i = 0; i < siblings.length; i++) {
        pileOfFirstClickedCard.pop();
        const siblingCardObject = createCardFromHTML(
          siblings[i],
          pileOfFirstClickedCard
        );
        pileToMoveCard.push(siblingCardObject);
      }
    }
  }
  putCardsInPiles();
  clearSelectedCards(clickedCard, firstClickedCard);
};

const checkEmptyPileClick = (pileIndex) => {
  const firstClickedCard = cardsToCheck[0];
  const pileToMoveCard = piles[pileIndex];
  if (firstClickedCard) {
    if (canMoveToEmptyPile(firstClickedCard)) {
      const isInDeck = isNaN(Number(firstClickedCard.dataset.pile));
      if (isInDeck) {
        removeCardFromDeck(firstClickedCard);
        const firstClickedCardObject = createCardFromHTML(
          firstClickedCard,
          pileToMoveCard
        );
        pileToMoveCard.push(firstClickedCardObject);
      } else {
        const siblings = getCardSiblings(firstClickedCard);
        const pileOfFirstClickedCard =
          piles[Number(firstClickedCard.dataset.pile)];

        pileOfFirstClickedCard.pop();
        const firstClickedCardObject = createCardFromHTML(
          firstClickedCard,
          pileToMoveCard
        );
        pileToMoveCard.push(firstClickedCardObject);
        if (siblings.length) {
          for (let i = 0; i < siblings.length; i++) {
            pileOfFirstClickedCard.pop();
            const siblingCardObject = createCardFromHTML(
              siblings[i],
              pileOfFirstClickedCard
            );
            pileToMoveCard.push(siblingCardObject);
          }
        }
      }
      putCardsInPiles();
      clearSelectedCards(null, firstClickedCard);
    }
  }
};
const checkCardClick = (clickedCard) => {
  if (cardsToCheck.length) {
    const firstClickedCard = cardsToCheck[0];
    if (firstClickedCard.dataset.home) {
      clearSelectedCards(clickedCard, firstClickedCard);
      return;
    }
    if (clickedCard.dataset.home) {
      checkHomeClick(
        clickedCard.dataset.home.split("-")[1],
        clickedCard
      );
    } else if (isMoveValid(clickedCard, firstClickedCard)) {
      checkPilesWithCardsClick(clickedCard, firstClickedCard);
    }
    clearSelectedCards(clickedCard, firstClickedCard);
  } else {
    clickedCard.style.border = "2px solid red";
    cardsToCheck.push(clickedCard);
  }
};

// Helper Functions

const getCardSiblings = (elem) => {
  const siblings = [];
  while ((elem = elem.nextSibling)) {
    if (elem.nodeType === 3) continue; // text node
    siblings.push(elem);
  }
  return siblings;
};

const clearSelectedCards = (clickedCard, firstClickedCard) => {
  if (clickedCard) {
    clickedCard.style.border = "none";
  }
  if (firstClickedCard) {
    firstClickedCard.style.border = "none";
  }
  cardsToCheck = [];
};

const removeCardFromDeck = (firstClickedCard) => {
  dealtCards.shift();
  selected.removeChild(firstClickedCard);
};

const createCardFromHTML = (card, pile) => {
  return {
    number: card.dataset.number,
    id: card.dataset.id,
    color: card.dataset.color,
    pile: pile,
    type: card.dataset.type,
    img: card.dataset.img,
    isFaceUp: false,
  };
};

const removeCardFromPile = (card, pile) => {
  pile[Number(card.dataset.pile)].pop();
};

function setUser() {
  loadUser();
  if (savedUser != "null") {
      userTxt.innerText = savedUser;
  } else {
      userTxt.innerText = "Sin Identificar";
  }
}

function loadUser () {
  savedUser = localStorage.getItem("username");
}

setUser();