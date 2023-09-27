export function formTitleRequired(value: string) {
  value = value.trim();
  return value ? undefined : "Title is required.";
}
