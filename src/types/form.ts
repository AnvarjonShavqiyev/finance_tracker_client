import { z } from "zod";
import { CURRENCY, FIRST_ELEMENT, SIX, TRANSACTION_TYPES, TWO } from "../constants";
import { AMOUNT_TYPE, PERIOD, REPEAT_INTERVAL } from "./common";

export const SignInSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(SIX, "Password must be at least 6 characters"),
});

export const SignUpSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(SIX, "Password must be at least 6 characters"),
  username: z.string().min(TWO, "Username is required"),
});

export const TransactionSchema = z.object({
  description: z.string().min(TWO, "Please write at least 2 characters"),
  amount: z.number().positive("Amount must be greater than 0"),
  currency: z.enum(CURRENCY),
  categoryId: z.number(),
  accountId: z.string(),
  type: z.enum(TRANSACTION_TYPES),
  isRecurring: z.boolean().optional(),    
  repeatInterval: z.enum(REPEAT_INTERVAL).optional(),
});

export const CategorySchema = z.object({
  name: z.string().min(TWO, "Please write at least 2 characters"),
}) 

export const BudgetSchema = z.object({
  limit: z
    .number()
    .min(FIRST_ELEMENT, { message: "Limit should be higher than 0" }),
  currency: z.enum(CURRENCY),
  categoryId: z.number(),
})

export const DownloadReportsAndSettingsSchema = z.object({
  topNTransaction: z.number().min(1, {message: "Please enter a number greater than 0"}),
  period: z.enum(PERIOD),
})

export const TransactionFiltersSchema = z.object({
  fromDate: z.union([z.string(), z.date()]).optional(),
  toDate: z.union([z.string(), z.date()]).optional(),
  categoryId: z.union([z.string(), z.number()]).optional(),
  amount: z.number().optional(),  
  amountType: z.enum(AMOUNT_TYPE).optional(),
})

export const SettingsSchema = z.object({
  sendDailyReports: z.boolean().optional()
})

export type SignInForm = z.infer<typeof SignInSchema>;
export type SignUpForm = z.infer<typeof SignUpSchema>;
export type TransactionForm = z.infer<typeof TransactionSchema>;
export type CategoryForm = z.infer<typeof CategorySchema>;
export type BudgetForm = z.infer<typeof BudgetSchema>;
export type DownloadReportsAndSettingsForm = z.infer<typeof DownloadReportsAndSettingsSchema>;
export type TransactionFiltersForm = z.infer<typeof TransactionFiltersSchema>;
export type SettingsForm = z.infer<typeof SettingsSchema>;