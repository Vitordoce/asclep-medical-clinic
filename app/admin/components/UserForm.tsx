"use client";

import { Form, Field, FormElement, FieldWrapper, FormRenderProps } from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { Card, CardBody, CardTitle } from "@progress/kendo-react-layout";
import { User } from "../types";

interface UserFormProps {
  user?: User;
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
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

const userTypes = ["Patient", "Doctor"];

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

export default function UserForm({ user, isOpen, onClose, onSave }: UserFormProps) {
  const isEditMode = Boolean(user?.id);
  
  // Form validators
  const emailValidator = (value: string) => {
    return !value ? "Email is required." 
      : !emailRegex.test(value) ? "Please enter a valid email address." 
      : "";
  };

  const requiredValidator = (value: string) => {
    return !value ? "This field is required." : "";
  };

  const handleSubmit = (data: Record<string, unknown>) => {
    const userData = data as unknown as User;
    
    // Preserve the ID if in edit mode
    if (isEditMode && user?.id) {
      userData.id = user.id;
    }
    
    onSave(userData);
    onClose();
  };

  // Default values for a new user
  const defaultValues: User = {
    firstName: "",
    lastName: "",
    email: "",
    userType: "Patient"
  };

  // If form is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <Card className="w-full max-w-2xl bg-white rounded-xl shadow-lg">
        <CardBody>
          <CardTitle className="text-2xl font-bold text-[var(--blue-900)] mb-6">
            {isEditMode ? "Edit User" : "Add New User"}
          </CardTitle>
          
          <Form
            key={user?.id || 'newUser'} 
            initialValues={user || defaultValues}
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

                <div className="mb-8">
                  <FieldWrapper>
                    <Field
                      id="userType"
                      name="userType"
                      label="User Type"
                      component={(fieldProps: FormInputProps) => (
                        <div>
                          <label className="block text-sm font-medium text-[var(--gray-700)] mb-1">
                            {fieldProps.label}
                          </label>
                          <DropDownList
                            data={userTypes}
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

                <div className="flex justify-end space-x-4">
                  <Button 
                    onClick={onClose}
                    className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800"
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    type="submit"
                    themeColor="primary"
                    disabled={!formRenderProps.allowSubmit}
                    className="py-2 px-4 bg-[var(--blue-500)] hover:bg-[var(--blue-700)] text-white"
                  >
                    {isEditMode ? "Save Changes" : "Create User"}
                  </Button>
                </div>
              </FormElement>
            )}
          />
        </CardBody>
      </Card>
    </div>
  );
} 