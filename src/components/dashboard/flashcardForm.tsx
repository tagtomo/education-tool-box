import React, { useEffect, useState } from 'react';
// material
import { alpha, useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Button, Container, Typography } from '@material-ui/core';
import { useForm, SubmitHandler, FormProvider, useFormContext, useFieldArray } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

// ----------------------------------------------------------------------
type FlashCard = {
  leftSide: String;
  rightSide: String;
}
type FormValues = {
  flashcards: FlashCard[];
};

export default function FlashcardForm(): JSX.Element {
  const methods = useForm<FormValues>({
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlashcardFormDetail />
        <input type="submit" />
      </form>
    </FormProvider>
  );
}

type FlashcardFormDetailProps = {};

const FlashcardFormDetail: React.FC<FlashcardFormDetailProps> = (props) => {
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
