import Card from "../Card/Card";

function RenderCards(pageActive, dataCards, onHandler, setCardsToRender) {
    let cardsRender = [];
    const firstItemOfPageActive = (pageActive - 1) * 20;
    let lastItemOfPageActive = pageActive * 20;
    if (lastItemOfPageActive > dataCards.length) {
        lastItemOfPageActive = dataCards.length;
    }
    for (let i = firstItemOfPageActive; i < lastItemOfPageActive; i++) {
        cardsRender.push(
            <Card key={i} dataCard={dataCards[i]} onHandler={onHandler}/>
        );
    }
    setCardsToRender(cardsRender);
}

export default RenderCards