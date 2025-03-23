"use client";

import { useState, useRef } from "react";
import { Form, Field, FormElement, FieldWrapper } from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { useAdminAuth, useDoctorAuth, usePatientAuth, UserRole } from "../auth";

interface FormValues {
  email: string;
  password: string;
  role: UserRole;
}

interface FormInputProps {
  validationMessage?: string;
  visited?: boolean;
  label: string;
  id: string;
  [key: string]: unknown;
}

const FormInput = (fieldRenderProps: FormInputProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div>
      <Input {...others} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

export default function LoginForm() {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("patient");
  const formRef = useRef<{ setValues: (values: FormValues) => void }>(null);
  
  // Get role-specific auth contexts
  const adminAuth = useAdminAuth();
  const doctorAuth = useDoctorAuth();
  const patientAuth = usePatientAuth();
  
  // Get the correct auth context based on selected role
  const getAuthForRole = (role: UserRole) => {
    switch (role) {
      case "admin":
        return adminAuth;
      case "doctor":
        return doctorAuth;
      case "patient":
        return patientAuth;
      default:
        return patientAuth;
    }
  };
  
  const handleRoleChange = (e: { value: UserRole }) => {
    setSelectedRole(e.value);
  };
  
  const roles = [
    { text: "Patient", value: "patient" as UserRole },
    { text: "Doctor", value: "doctor" as UserRole },
    { text: "Administrator", value: "admin" as UserRole }
  ];
  
  const emailValidator = (value: string) => {
    return !value ? "Email is required." : "";
  };
  
  const passwordValidator = (value: string) => {
    return !value ? "Password is required." : "";
  };
  
  const handleSubmit = async (formValues: Record<string, unknown>) => {
    setIsLoading(true);
    setLoginError(null);
    
    // Safe conversion with validation
    const data = {
      email: formValues.email as string,
      password: formValues.password as string,
      role: formValues.role as UserRole
    };
    
    try {
      const auth = getAuthForRole(data.role);
      const success = await auth.login(data.email, data.password);
      
      if (!success) {
        setLoginError("Invalid credentials for selected role. Please try again.");
      } else {
        // Redirect based on role or handle successful login
        window.location.href = data.role === "admin" 
          ? "/admin/dashboard" 
          : data.role === "doctor" 
          ? "/doctor/dashboard" 
          : "/patient/dashboard";
      }
    } catch (error) {
      setLoginError("An error occurred during login. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Create initial form values
  const initialValues: FormValues = {
    email: "",
    password: "",
    role: selectedRole
  };
  
  // Fill form with preset credentials
  const fillFormWithCredentials = (email: string, password: string, role: UserRole) => {
    // Update form state if form reference exists
    if (formRef.current) {
      formRef.current.setValues({
        email,
        password,
        role
      });
    }
    // Also update the role state for the dropdown
    setSelectedRole(role);
  };
  
  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[var(--blue-900)] mb-2">Log In</h2>
        <p className="text-[var(--gray-600)]">
          Access your Asclep Medical Center account
        </p>
      </div>
      
      {loginError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {loginError}
        </div>
      )}
      
      <Form
        ref={formRef}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        render={(formRenderProps) => (
          <FormElement>
            <div className="mb-4">
              <FieldWrapper>
                <Field
                  id="role"
                  name="role"
                  label="Login As"
                  component={(fieldProps) => (
                    <div>
                      <label className="block text-sm font-medium text-[var(--gray-700)] mb-1">
                        {fieldProps.label}
                      </label>
                      <DropDownList
                        data={roles}
                        textField="text"
                        dataItemKey="value"
                        value={roles.find(r => r.value === selectedRole)}
                        onChange={(e) => {
                          handleRoleChange(e);
                          fieldProps.onChange?.({ value: e.value.value });
                        }}
                      />
                    </div>
                  )}
                />
              </FieldWrapper>
            </div>
            
            <div className="mb-4">
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
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  component={FormInput}
                  validator={passwordValidator}
                />
              </FieldWrapper>
            </div>
            
            <div className="flex flex-col space-y-4">
              <Button
                type="submit"
                themeColor="primary"
                disabled={!formRenderProps.allowSubmit || isLoading}
                className="py-3 bg-[var(--blue-500)] hover:bg-[var(--blue-700)] text-white"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-sm text-[var(--gray-600)]">
                  Don&apos;t have an account?{" "}
                  <a
                    href="/signup"
                    className="font-medium text-[var(--blue-600)] hover:text-[var(--blue-800)]"
                  >
                    Create an account
                  </a>
                </p>
              </div>
            </div>
          </FormElement>
        )}
      />
      
      {/* Quick login helpers for development */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-[var(--gray-700)] mb-3">Demo Accounts</h3>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <button 
              onClick={() => fillFormWithCredentials('patient@example.com', 'patient123', 'patient')}
              className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded transition-colors"
            >
              <p className="font-bold mb-1">Patient Login</p>
              <p>patient@example.com</p>
              <p>patient123</p>
            </button>
            
            <button 
              onClick={() => fillFormWithCredentials('doctor@example.com', 'doctor123', 'doctor')}
              className="p-2 bg-green-100 hover:bg-green-200 text-green-800 rounded transition-colors"
            >
              <p className="font-bold mb-1">Doctor Login</p>
              <p>doctor@example.com</p>
              <p>doctor123</p>
            </button>
            
            <button 
              onClick={() => fillFormWithCredentials('admin@example.com', 'admin123', 'admin')}
              className="p-2 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded transition-colors"
            >
              <p className="font-bold mb-1">Admin Login</p>
              <p>admin@example.com</p>
              <p>admin123</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 