export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

export const genders = ["male", "female", "other"];

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
export const monthOptions = months.map((month) => ({
  value: month,
  label: month,
}));
export const genderOptions = genders.map((gender) => ({
  value: gender,
  label: gender,
}));
export const bloodGroupOptions = bloodGroups.map((bloodGroup) => ({
  value: bloodGroup,
  label: bloodGroup,
}));
export const daysOptions = days.map((day) => ({
  value: day,
  label: day,
}));
