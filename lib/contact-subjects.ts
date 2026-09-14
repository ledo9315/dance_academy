/** Subjects offered by the contact form; shared by the form and the action. */
export const CONTACT_SUBJECTS = [
  { value: "class-information", label: "Class Information" },
  { value: "enrollment", label: "Enrollment" },
  { value: "events", label: "Performances & Events" },
  { value: "general", label: "General Inquiry" },
  { value: "other", label: "Other" },
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number]["value"];
