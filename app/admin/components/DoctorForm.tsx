"use client";

import { Form, Field, FormElement, FieldWrapper, FormRenderProps } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { Card, CardBody, CardTitle } from "@progress/kendo-react-layout";
import { User } from "../types";

interface DoctorFormProps {
  doctor?: User;
  isOpen: boolean;
  onClose: () => void;
  onSave: (doctor: User) => void;
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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FormInput = (fieldRenderProps: FormInputProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div>
      <Input {...others} />
      {visited && validationMessage && (
        <div className="text-red-500 text-sm mt-1">{validationMessage}</div>
      )}
    </div>
  );
};

export default function DoctorForm({ doctor, isOpen, onClose, onSave }: DoctorFormProps) {
  const isEditMode = Boolean(doctor?.id);
  
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
    const doctorData = data as unknown as User;
    
    // Preserve the ID if in edit mode
    if (isEditMode && doctor?.id) {
      doctorData.id = doctor.id;
    }
    
    // Always set role to doctor
    doctorData.userType = "doctor";
    doctorData.role = "doctor";
    
    onSave(doctorData);
    onClose();
  };

  // Default values for a new doctor
  const defaultValues: User = {
    id: 0, // Temporary ID, will be replaced by server-generated ID
    firstName: "",
    lastName: "",
    email: "",
    userType: "doctor",
    role: "doctor",
    specialty: "",
    experience: 0,
    phone: ""
  };

  // If form is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <Card className="w-full max-w-2xl bg-white rounded-xl shadow-lg">
        <CardBody>
          <CardTitle className="text-2xl font-bold text-[var(--blue-900)] mb-6">
            {isEditMode ? "Edit Doctor" : "Add New Doctor"}
          </CardTitle>
          
          <Form
            key={doctor?.id || 'newDoctor'} 
            initialValues={doctor || defaultValues}
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
                      id="specialty"
                      name="specialty"
                      label="Specialty"
                      component={FormInput}
                      validator={requiredValidator}
                    />
                  </FieldWrapper>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <FieldWrapper>
                    <Field
                      id="experience"
                      name="experience"
                      label="Years of Experience"
                      type="number"
                      component={FormInput}
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <Field
                      id="phone"
                      name="phone"
                      label="Phone Number"
                      component={FormInput}
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
                    {isEditMode ? "Save Changes" : "Create Doctor"}
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