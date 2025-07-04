import { z } from "zod";

export const doctorSchema = z.object({
  _id: z.string(),
  firstname: z
    .string()
    .nonempty("Firstname is required")
    .min(3, "Must be atleast 3 characters"),
  lastname: z
    .string()
    .nonempty("Lastname is required")
    .min(3, "Must be atleast 3 characters"),
  image: z.string().nonempty("Image URL is required"),
  experience: z.string().nonempty("Experience is required"),
  cv: z.string().min(50, "CV must be at least 50 characters"),
  specialization: z.object({
    _id: z.string().min(1, "Specialization is required"),
    name: z.string(),
  }),
  clinic: z.object({
    _id: z.string().min(1, "Clinic is required"),
    name: z.string(),
  }),
  amka: z
    .string()
    .length(11, "AMKA must be exactly 11 characters")
    .nonempty("Amka is required"),
  availableHours: z
    .array(
      z.object({
        day: z.string(),
        from: z.string(),
        to: z.string(),
      })
    )
    .optional(),
});

export type doctorType = z.infer<typeof doctorSchema>;

export const createDoctorSchema = z.object({
  firstname: z
    .string()
    .nonempty("Firstname is required")
    .min(3, "Must be atleast 3 characters"),
  lastname: z
    .string()
    .nonempty("Lastname is required")
    .min(3, "Must be atleast 3 characters"),
  image: z.string().nonempty("Image URL is required"),
  email: z.string().email().nonempty("Email is required"),
  username: z.string().min(4,"Username must be at least 4 characters").nonempty("Username is required"),
  password: z.string().min(4,"Password must be at least 4 characters"),
  experience: z.string().nonempty("Experience is required"),
  cv: z.string().min(50, "CV must be at least 50 characters"),
  specialization: z.object({
    _id: z.string().min(1, "Specialization is required"),
    name: z.string(),
  }),
  clinic: z.object({
    _id: z.string().min(1, "Clinic is required"),
    name: z.string(),
  }),
  amka: z
    .string()
    .length(11, "AMKA must be exactly 11 characters")
    .nonempty("Amka is required"),
});

export type doctorCreateType = z.infer<typeof createDoctorSchema>;

export type doctorTypeCard = {
  _id: string;
  firstname: string;
  lastname: string;
  image?: string;
  specialization: { _id: string; name: string };
  clinic: { _id: string; name: string };
};

export const doctorUpdateSchema = z.object({
  _id: z.string(),
  firstname: z
    .string()
    .nonempty("Firstname is required")
    .min(3, "Must be atleast 3 characters"),
  lastname: z
    .string()
    .nonempty("Lastname is required")
    .min(3, "Must be atleast 3 characters"),
  image: z.string().nonempty("Image URL is required"),
  experience: z.string().nonempty("Experience is required"),
  cv: z.string().min(50, "CV must be at least 50 characters"),
  specialization: z.object({
    _id: z.string().min(1, "Specialization is required"),
    name: z.string(),
  }),
  clinic: z.object({
    _id: z.string().min(1, "Clinic is required"),
    name: z.string(),
  }),
  amka: z
    .string()
    .length(11, "AMKA must be exactly 11 characters")
    .nonempty("Amka is required"),
 
});

export type doctorUpdateType = z.infer<typeof doctorUpdateSchema>;