import { isRef } from "vue";

export function validateNoEmpty(data) {
  return data.trim() !== "";
}

export function validatePassword(password) {
  return password.trim() !== "" && password.length >= 6;
}

export function validateConfirmPassword(newPassword, confirmPassword) {
  if (isRef(newPassword)) return confirmPassword === newPassword.value;
  return confirmPassword === newPassword;
}
