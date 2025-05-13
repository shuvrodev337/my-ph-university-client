import { z } from "zod";

export const createSemesterSchema = z.object({
  name: z.string({ required_error: "Please select a semester name" }),
  year: z.string({ required_error: "Please select a year" }),
  startMonth: z.string({ required_error: "Please select a month" }),
  endMonth: z.string({ required_error: "Please select a month" }),
});
