"use server";
import "server-only";
import { loginSchema } from "./auth-validation";

type FormState = {
  success: boolean;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
};

export async function loginAction(
  prevState: FormState,
  payload: FormData
): Promise<FormState> {
  console.log("payload received", payload);

  if (!(payload instanceof FormData)) {
    return {
      success: false,
      errors: { error: ["Invalid Form Data"] },
    };
  }
  const formData = Object.fromEntries(payload);
  console.log("form data", formData);

  const parsed = loginSchema.safeParse(formData);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const fields: Record<string, string> = {};

    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }
    console.log("error returned data", formData);
    console.log("error returned error", errors);
    return {
      success: false,
      fields,
      errors,
    };
  }

  if (parsed.data.email === "test@example.com") {
    return {
      success: false,
      errors: { email: ["email already taken"] },
      fields: parsed.data,
    };
  }
  console.log("parsed data", parsed.data);
  return {
    success: true,
  };
}
