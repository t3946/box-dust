import React from "react";
import { createApp } from "@submodules/roulette/src/app";
import { Application } from "pixi.js";
import Style from "@components/pages/box/Game.module.scss";

interface IProps {
  items: Record<any, any>[];
}

export const Game: React.FC<IProps> = function (props) {
  const { items } = props;
  const [scene, setScene] = React.useState(0);
  const [counter, setCounter] = React.useState(null);

  // console.log({ items });

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

  return (
    <div className="row">
      <div className="col">
        <div id="roulette-game-container" className={Style.container}>
          <canvas id="roulette-game" />
        </div>

        <button
          onClick={() => {
            if (!scene) {
              console.log("no scene");
              return;
            }
            scene.gameStart(3);
            setCounter(counter + 1);
          }}
        >
          play {counter}
        </button>
      </div>
    </div>
  );
};

export default Game;
