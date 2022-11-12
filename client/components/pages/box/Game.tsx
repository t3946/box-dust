import React from "react";
import { createApp } from "@submodules/roulette/src/app";
import Style from "@components/pages/box/Game.module.scss";
import Interface from "@components/pages/box/Interface";

interface IProps {
  box: any;
  items: Record<any, any>[];
  handleModalPrizeShow: any;
  setPrize: any;
}

export const Game: React.FC<IProps> = function (props) {
  const { items, handleModalPrizeShow, setPrize, box } = props;
  const [scene, setScene] = React.useState<any>(null);
  const rouletteItems = items.map((boxItem) => {
    return {
      id: boxItem.item_id,
      image: {
        path: "/storage/" + boxItem.image.name,
        width: boxItem.image.width,
        height: boxItem.image.height,
      },
    };
  });
  const [gameIsActive, setGameIsActive] = React.useState(false);

  React.useEffect(() => {
    const app = createApp({
      canvas: document.getElementById("roulette-game") as HTMLCanvasElement,
      container: document.getElementById(
        "roulette-game-container"
      ) as HTMLElement,
      items: rouletteItems,
      isPrintGui: false,
      isDebug: false,
      cardBackground: "/images/pages/main/roulette/card.png",
    });

    setScene(app.stage.children[0]);
  }, []);

  function startGame(item_id: number) {
    let nextPrizeIndex = 0;

    setGameIsActive(true);

    items.map((e, i) => {
      if (e.item_id === item_id) {
        nextPrizeIndex = i;
      }
    });

    scene.gameStart({
      nextWinIndex: nextPrizeIndex,
      onComplete: () => {
        setPrize(items[nextPrizeIndex]);
        handleModalPrizeShow();
        setGameIsActive(false);
      },
    });
  }

  return (
    <>
      <div id="roulette-game-container" className={Style.container}>
        <canvas id="roulette-game" />
      </div>

      <div className="">
        <div className="col-12">
          <Interface
            className={"mt-3"}
            startGameHandler={startGame}
            box={box}
            gameIsActive={gameIsActive}
          />
        </div>
      </div>
    </>
  );
};

export default Game;
