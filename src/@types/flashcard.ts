export type Item = {
  leftSide: string;
  rightSide: string;
}
export type Flashcard = {
  title: string;
  endTitle: string;
  shaffle: boolean;
  loopCount: number;
  fontSize: number;
  items: Item[];
}

// フォーム用
export type FlashcardFormValues = {
  flashcard: {
    title: Flashcard["title"];
    endTitle: Flashcard["endTitle"];
    shaffle: Flashcard["shaffle"];
    loopCount: Flashcard["loopCount"];
    fontSize: Flashcard["fontSize"];
    items: {
      leftSide: Item["leftSide"];
      rightSide: Item["rightSide"];
    }[];
  };
};
