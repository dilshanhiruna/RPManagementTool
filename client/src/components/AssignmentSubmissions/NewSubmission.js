import * as React from "react";
import * as ReactDOM from "react-dom";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { Stepper } from "@progress/kendo-react-layout";
import { AssignmentDetails } from "./CreateSubmission";
import { DocumentUploads } from "./EditSubmission";

const stepPages = [AssignmentDetails, DocumentUploads];

export default function NewSubmission() {
  state = {
    step: 0,
    formState: {},
    steps: [
      {
        label: "Assignment Details",
        isValid: undefined,
      },
      {
        label: "Document Uploads",
        isValid: undefined,
      },
    ],
  };
  lastStepIndex = this.state.steps.length - 1;
  isLastStep = this.lastStepIndex === this.state.step;
  isPreviousStepsValid =
    this.state.steps
      .slice(0, this.state.step)
      .findIndex((currentStep) => currentStep.isValid === false) === -1;
  onStepSubmit = (event) => {
    const { isValid, values } = event;
    const currentSteps = this.state.steps.map((currentStep, index) => ({
      ...currentStep,
      isValid: index === this.state.step ? isValid : currentStep.isValid,
    }));
    this.setState({
      steps: currentSteps,
      step: Math.min(this.state.step + 1, this.lastStepIndex),
      formState: values,
    });

    if (
      this.lastStepIndex === this.state.step &&
      this.isPreviousStepsValid &&
      isValid
    ) {
      alert(JSON.stringify(values));
    }
  };
  onPrevClick = (event) => {
    event.preventDefault();
    this.setState({
      step: Math.max(this.state.step - 1, 0),
    });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Stepper value={this.state.step} items={this.state.steps} />
      <Form
        initialValues={this.state.formState}
        onSubmitClick={this.onStepSubmit}
        render={(formRenderProps) => (
          <div
            style={{
              alignSelf: "center",
            }}
          >
            <FormElement
              style={{
                width: 480,
              }}
            >
              {stepPages[this.state.step]}
              <span
                style={{
                  marginTop: "40px",
                }}
                className={"k-form-separator"}
              />
              <div
                style={{
                  justifyContent: "space-between",
                  alignContent: "center",
                }}
                className={
                  "k-form-buttons k-button k-button-md k-rounded-md k-button-solid k-button-solid-bases-end"
                }
              >
                <span
                  style={{
                    alignSelf: "center",
                  }}
                >
                  Step {this.state.step + 1} of 3
                </span>
                <div>
                  {this.state.step !== 0 ? (
                    <Button
                      style={{
                        marginRight: "16px",
                      }}
                      onClick={this.onPrevClick}
                    >
                      Previous
                    </Button>
                  ) : undefined}
                  <Button
                    themeColor={"primary"}
                    disabled={!formRenderProps.allowSubmit}
                    onClick={formRenderProps.onSubmit}
                  >
                    {this.isLastStep ? "Submit" : "Next"}
                  </Button>
                </div>
              </div>
            </FormElement>
          </div>
        )}
      />
    </div>
  );
}
