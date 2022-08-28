import React, { useMemo } from 'react';
// material
import { useForm, useFormContext, useFieldArray } from "react-hook-form";
import { Stack } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import yup from "../../utils/yup.locale";
import { FlashcardFormValues } from "../../@types/flashcard";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFTextField from "../hook-form/RHFTextField";
import RHFSwitch from "../hook-form/RHFSwitch";
import RHFSlider from "../hook-form/RHFSlider";
import FormProvider from "../hook-form/FormProvider";

// ----------------------------------------------------------------------
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
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column">
        <RHFTextField
          name={`flashcard.title`}
          label="title"
          placeholder={"title"}
        />
        <RHFTextField
          name={`flashcard.endTitle`}
          label="endTitle"
          placeholder={"endTitle"}
        />
        <RHFSwitch
          name={`flashcard.shaffle`}
          label="shaffle"
          placeholder={"shaffle"}
        />
        <RHFSlider
          name={`flashcard.loopCount`}
          label="loopCount"
          placeholder={"loopCount"}
          step={1}
          min={1}
          max={5}
        />
        <RHFSlider
          name={`flashcard.fontSize`}
          label="fontSize"
          placeholder={"fontSize"}
          step={100}
          min={100}
          max={1000}
        />
        <FlashcardFormDetail />
        <input type="submit" />
      </Stack>
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
          <Stack direction="row">
            <RHFTextField
              name={`flashcard.items[${index}].leftSide`}
              label="leftSide"
              placeholder={"leftSide"}
            />
            <RHFTextField
              name={`flashcard.items[${index}].leftSide`}
              label="leftSide"
              placeholder={"leftSide"}
            />

            <IconButton onClick={() => remove(index)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
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
