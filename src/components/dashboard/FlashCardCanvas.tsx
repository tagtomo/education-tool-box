import React, { FC, useEffect, RefObject } from "react";
import { useAnimationFrame } from "./useAnimationFrame";

type item = {
  leftSide: string;
  rightSide: string;
};
export type FlashCard = {
  title: string;
  endText: string;
  items: item[];
};
export type FlashCardCanvasProps = {
  width: number;
  height: number;
  isPlay: boolean;
  data: FlashCard;
  flashTime: number;
  style: React.CSSProperties;
  elmRef: RefObject<HTMLCanvasElement>
  fontSize: number;
};

const getTime = () => {
  if (!process.browser) return;
  return performance.now();
}

export const FlashCardCanvas: FC<FlashCardCanvasProps> = ({
  width,
  height,
  isPlay,
  data,
  flashTime,
  style,
  elmRef,
  fontSize
}) => {
  useEffect(() => {
    console.info(data);
  }, [data]);
  let startTime = getTime();
  let count = 0;

  // const calcFontSize = (width: number) => {
  //   let fontSize: number;
  //   if (width < 600) {
  //     fontSize = 50;
  //   } else if (width < 1000) {
  //     fontSize = 100;
  //   } else {
  //     fontSize = 300;
  //   }
  //   return fontSize;
  // };

  // テキストのセンタリング表示
  // const centerText = (
  //   ctx: CanvasRenderingContext2D,
  //   text: string,
  //   fontSize: number,
  //   width: number,
  //   height: number,
  //   paddingLeft = 0,
  //   fillStyle = "black"
  // ) => {
  //   ctx.save(); // 処理前設定保存
  //   ctx.beginPath();
  //   ctx.font = `bold ${fontSize}px Arial, meiryo, sans-serif`;
  //   ctx.fillStyle = fillStyle;
  //   ctx.textAlign = "center";
  //   ctx.fillText(text, width / 2 + paddingLeft, height / 2);
  //   ctx.restore(); // 処理前設定の戻し
  // };

  const ctxFillText = (
    ctx: CanvasRenderingContext2D,
    text,
    fontSize,
    width: number,
    height: number,
    textX,
    textY,
    fillStyle = "black",
    paddingLeft = 0,
    fontStyle = "bold",
    fontFamily = "sans-serif"
  ) => {
    ctx.save(); // 処理前設定保存
    ctx.beginPath();
    ctx.font = (
      fontStyle ? fontStyle : 'normal') + ' ' +
      fontSize + 'px ' +
      (fontFamily ? fontFamily : 'sans-serif')
    ctx.fillStyle = fillStyle;
    ctx.fillText(
      text,
      textX === 'center' ?
        (((width) - ctx.measureText(text).width) / 2) + paddingLeft :
        (textX === 'right' ?
          (width) - ctx.measureText(text).width :
          textX && textX !== 'left' ? textX : 0),
      textY === 'center' ?
        ((height + fontSize / 2) / 2) :
        (textY === 'bottom' ?
          height - fontSize / 4 :
          textY && textY !== 'top' ? textY : fontSize)
    )
    ctx.restore(); // 処理前設定の戻し
  }

  const backgroundColor = (ctx: CanvasRenderingContext2D,
    color: string
  ) => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, elmRef.current.width, elmRef.current.height);
  };

  useAnimationFrame(() => {
    const ctx = elmRef.current?.getContext("2d");
    if (!ctx) {
      return;
    }
    // 初期設定
    // const fontSize = calcFontSize(width);
    ctx.font = `bold ${fontSize}px Arial, meiryo, sans-serif`;
    ctx.clearRect(0, 0, width, height);
    backgroundColor(ctx, "oldlace");
    // centerText(ctx, data.title, fontSize, width, height);
    ctxFillText(ctx, data.title, fontSize, width, height, 'center', 'center')
    if (!isPlay) {
      return;
    }
    // 経過時間算出
    const elapsedTime = getTime() - startTime;
    if (data.items.length < count) {
      ctx.clearRect(0, 0, width, height);
      backgroundColor(ctx, "oldlace");
      // centerText(ctx, data.endText, fontSize, width, height);
      ctxFillText(ctx, data.endText, fontSize, width, height, 'center', 'center')
      return;
    }

    if (count <= 0) {
      ctx.clearRect(0, 0, width, height);
      backgroundColor(ctx, "oldlace");
      // centerText(ctx, data.title, fontSize, width, height);
      ctxFillText(ctx, data.title, fontSize, width, height, 'center', 'center')
    } else {
      ctx.clearRect(0, 0, width, height);
      backgroundColor(ctx, "oldlace");
      // centerText(ctx, data.items[count - 1].leftSide, fontSize, width / 2, height);
      ctxFillText(ctx, data.items[count - 1].leftSide, fontSize, width / 2, height, 'center', 'center')
      if (elapsedTime > flashTime) {
        // centerText(
        //   ctx,
        //   data.items[count - 1].rightSide,
        //   fontSize,
        //   width / 2,
        //   height,
        //   width / 2,
        //   "blue"
        // );
        ctxFillText(ctx, data.items[count - 1].rightSide, fontSize, width / 2, height, 'center', 'center', "blue", width / 2)
      }
      ctx.fillStyle = "black";

      // デバッグ表示
      // ctx.font = `bold 20px Arial, meiryo, sans-serif`;
      // ctx.fillText(count.toString(), 500, 400);
      // ctx.fillText(startTime.toString(), 500, 450);
      // ctx.fillText(elapsedTime.toString(), 500, 500);
    }

    // 遅延時間経過でカウントアップ
    if (elapsedTime > flashTime * 2) {
      startTime = getTime();
      count++;
    }
  });

  return <canvas ref={elmRef} width={width} height={height} style={style} />;
};
