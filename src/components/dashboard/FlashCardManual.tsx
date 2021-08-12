import React from 'react';
import { Container, Box } from '@material-ui/core';
import Markdown from '../Markdown'

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

type FlashcardManualProps = {
  steps: any;
}

export default function FlashcardManual({ steps }: FlashcardManualProps): JSX.Element {
  const [activeStep, setActiveStep] = React.useState(0);
  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep = isLastStep() ? 0 : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ width: "100%" }}>
          <Typography variant="h3" sx={{ mt: 2, mb: 1 }}>
            フラッシュカード作成ツール（利用マニュアル）
          </Typography>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((item, index) => (
              <Step key={item.document.data.id} >
                <StepButton color="inherit" onClick={handleStep(index)}>
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
            </Box>
          </div>
          <div>
            <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
              【 ステップ {activeStep + 1} 】{steps[activeStep].document.data.title}
            </Typography>
            <Markdown
              content={steps[activeStep].document.content}
              key={steps[activeStep].document.data.id}
            />
          </div>
        </Box>
      </Container>
    </ >
  );
}
