"use client";

import { useState } from "react";
import { Form, Field, FormElement, FieldWrapper, FormRenderProps } from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";

// Keep this interface for documentation purposes
// even though it's not directly used in the component's props
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: string;
}

interface FormInputProps {
  validationMessage?: string;
  visited?: boolean;
  label: string;
  id: string;
  name: string;
  value?: string;
  onChange?: (e: { value: string }) => void;
  onBlur?: () => void;
  [key: string]: unknown;
}

const userTypes = ["Patient", "Healthcare Provider", "Administrator"];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FormInput = (fieldRenderProps: FormInputProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div>
      <Input {...others} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

export default function Signup() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Form validators
  const emailValidator = (value: string) => {
    return !value ? "Email is required." 
      : !emailRegex.test(value) ? "Please enter a valid email address." 
      : "";
  };

  const requiredValidator = (value: string) => {
    return !value ? "This field is required." : "";
  };

  const passwordValidator = (value: string) => {
    return !value ? "Password is required." 
      : value.length < 8 ? "Password must be at least 8 characters long."
      : "";
  };

  const confirmPasswordValidator = (value: string, context: { password: string }) => {
    return !value ? "Please confirm your password." 
      : value !== context.password ? "Passwords do not match." 
      : "";
  };

  const handleSubmit = (data: Record<string, unknown>) => {
    // In a real app, you would make an API call to register the user
    console.log("Form data submitted:", data);
    
    try {
      // Mock successful submission
      setFormSubmitted(true);
      setSubmitError("");
    } catch {
      setSubmitError("An error occurred during signup. Please try again.");
    }
  };

  if (formSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
        <p className="text-gray-600 mb-6">Thank you for signing up with Asclep Medical Center.</p>
        <Button themeColor="primary" onClick={() => window.location.href = "/"}>
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
        <p className="text-gray-600 mt-2">Join Asclep Medical Center and manage your healthcare online</p>
      </div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {submitError}
        </div>
      )}

      <Form
        onSubmit={handleSubmit}
        render={(formRenderProps: FormRenderProps) => (
          <FormElement>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <FieldWrapper>
                <Field
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  component={FormInput}
                  validator={requiredValidator}
                />
              </FieldWrapper>

              <FieldWrapper>
                <Field
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  component={FormInput}
                  validator={requiredValidator}
                />
              </FieldWrapper>
            </div>

            <div className="mb-6">
              <FieldWrapper>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  label="Email Address"
                  component={FormInput}
                  validator={emailValidator}
                />
              </FieldWrapper>
            </div>

            <div className="mb-6">
              <FieldWrapper>
                <Field
                  id="userType"
                  name="userType"
                  label="I am a"
                  component={(fieldProps: FormInputProps) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {fieldProps.label}
                      </label>
                      <DropDownList
                        data={userTypes}
                        defaultValue="Patient"
                        onChange={fieldProps.onChange}
                        value={fieldProps.value}
                      />
                      {fieldProps.visited && fieldProps.validationMessage && (
                        <Error>{fieldProps.validationMessage}</Error>
                      )}
                    </div>
                  )}
                  validator={requiredValidator}
                />
              </FieldWrapper>
            </div>

            <div className="mb-6">
              <FieldWrapper>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  component={FormInput}
                  validator={passwordValidator}
                />
              </FieldWrapper>
            </div>

            <div className="mb-8">
              <FieldWrapper>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  component={FormInput}
                  validator={(value: string) => {
                    // Get the password from the form values
                    const password = formRenderProps.valueGetter('password');
                    return confirmPasswordValidator(value, { password });
                  }}
                />
              </FieldWrapper>
            </div>

            <div className="flex flex-col space-y-4">
              <Button
                type="submit"
                themeColor="primary"
                disabled={!formRenderProps.allowSubmit}
                className="py-3"
              >
                Create Account
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <a href="/login" className="font-medium text-blue-600 hover:text-blue-800">
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </FormElement>
        )}
      />
    </div>
  );
} 