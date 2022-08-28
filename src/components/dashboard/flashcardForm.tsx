import React, { useMemo } from 'react';
// material
import { useForm, SubmitHandler, FormProvider, useFormContext, useFieldArray } from "react-hook-form";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import yup from "../../utils/yup.locale";
import { FlashcardFormValues } from "../../@types/flashcard";
import { yupResolver } from "@hookform/resolvers/yup";

// ----------------------------------------------------------------------
type FlashCard = {
  leftSide: string;
  rightSide: string;
}
type FormValues = {
  flashcards: FlashCard[];
};

type FormValuesProps = FlashcardFormValues;

export default function FlashcardForm(): JSX.Element {

  // yup schema構築
  const FlashcardSchema = yup.object().shape({
    title: yup.string().label("タイトル").max(100).required(),
    endTitle: yup.string().label("終了タイトル").max(100).required(),
    items: yup.array().of(
      yup.object().shape({
        leftSide: yup.string().label("左側").max(100).required(),
        rightSide: yup.string().label("右側").max(100),
      })
    ),
    shaffle: yup.string().label("シャッフル").max(100).required(),
    loopCount: yup.string().label("繰返し回数").max(100).required(),
    fontSize: yup.string().label("フォントサイズ").max(100).required(),
  })

  const defaultValues: FormValuesProps = useMemo(
    () => ({
      flashcard: {
        title: "",
        endTitle: "",
        shaffle: true,
        loopCount: 1,
        fontSize: 300,
        items: [],
      }
    }), [])

  // const methods = useForm<FormValues>({
  // });

  const methods = useForm<FormValuesProps>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(FlashcardSchema),
    defaultValues,
    shouldFocusError: true,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.info(data)
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlashcardFormDetail />
        <input type="submit" />
      </form>
    </FormProvider>
  );
}

const FlashcardFormDetail: React.FC = () => {
  const {
    control,
    register,
    formState: { errors }
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `flashcards`
  });
  return (
    <React.Fragment>
      {fields.map((field, index) => {
        return (
          <div key={field.id}>
            <IconButton onClick={() => remove(index)}>
              <DeleteIcon />
            </IconButton>
            <section className={"section"} key={field.id}>
              <TextField
                id="outlined-number"
                label="leftSide"
                variant="outlined"
                type="string"
                {...register(
                  `flashcards[${index}].leftSide` as const,
                  {
                    required: true
                  }
                )}
                error={
                  !!errors?.flashcards?.[
                    index
                  ]?.leftSide
                }
                placeholder="leftSide"
              // defaultValue={field?.leftSide}
              />
              <TextField
                id="outlined-number"
                label="rightSide"
                variant="outlined"
                type="string"
                {...register(
                  `flashcards[${index}].rightSide` as const,
                  {
                    required: true
                  }
                )}
                error={
                  !!errors?.flashcards?.[
                    index
                  ]?.rightSide
                }
                placeholder="rightSide"
              // defaultValue={field?.rightSide}
              />
            </section>
          </div>
        );
      })}
      <IconButton
        onClick={() =>
          append({
            leftSide: "",
            rightSide: ""
          })
        }
      >
        <AddIcon />
      </IconButton>
    </React.Fragment>
  );
};
