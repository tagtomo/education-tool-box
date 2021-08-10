import { useState } from "react";
import { FlashCard } from "./FlashCardCanvas";

const initialStateFlashcard: FlashCard = {
  title: "",
  endText: "",
  items: []
};

type useFlashCardDataReturnType = {
  isReady: boolean;
  loadData: FlashCard;
  onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const useFlashCardData = (): useFlashCardDataReturnType => {
  const [loadData, setloadData] = useState<FlashCard>(initialStateFlashcard);
  const [isReady, setIsReady] = useState(false);

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files.length > 0) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = e => {
        if (e.target.result) {
          try {
            const obj = JSON.parse(e.target.result as string);
            setloadData(obj);
            setIsReady(true);
          } catch (error) {
            console.error(error);
            setloadData(initialStateFlashcard);
          }
        } else {
          setloadData(initialStateFlashcard);
        }
      };
    } else {
      setloadData(initialStateFlashcard);
    }
    e.target.value = '';
  };

  return {
    isReady,
    loadData,
    onFileInputChange
  };
};
