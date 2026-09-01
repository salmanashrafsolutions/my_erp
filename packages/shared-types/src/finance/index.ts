import { z } from 'zod';
import { CurrencyCodeEnum } from '../common/api';

// ==========================================
// 1. Chart of Accounts (COA)
// ==========================================

export const AccountTypeEnum = z.enum([
  'ASSET',
  'LIABILITY',
  'EQUITY',
  'REVENUE',
  'EXPENSE',
]);
export type AccountType = z.infer<typeof AccountTypeEnum>;

export const COAAccountSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  accountCode: z.string().min(1).max(50),
  accountName: z.string().min(1).max(255),
  accountType: AccountTypeEnum,
  parentId: z.string().uuid().nullable().optional(),
  currency: CurrencyCodeEnum.default('USD'),
  isReconciled: z.boolean().default(false),
  isActive: z.boolean().default(true),
  currentBalance: z.coerce.number().default(0),
});
export type COAAccountDto = z.infer<typeof COAAccountSchema>;

export const CreateCOAAccountSchema = COAAccountSchema.omit({
  id: true,
  currentBalance: true,
});
export type CreateCOAAccountDto = z.infer<typeof CreateCOAAccountSchema>;

// ==========================================
// 2. Double-Entry Journal Entry
// ==========================================

export const JournalStatusEnum = z.enum(['DRAFT', 'POSTED', 'VOID']);
export type JournalStatus = z.infer<typeof JournalStatusEnum>;

export const JournalSourceModuleEnum = z.enum([
  'SALES',
  'PURCHASE',
  'INVENTORY',
  'BANKING',
  'MANUAL',
]);
export type JournalSourceModule = z.infer<typeof JournalSourceModuleEnum>;

export const JournalEntryLineSchema = z.object({
  id: z.string().uuid().optional(),
  accountId: z.string().uuid(),
  accountCode: z.string().optional(),
  accountName: z.string().optional(),
  description: z.string().max(500).nullable().optional(),
  debitAmount: z.coerce.number().min(0).default(0),
  creditAmount: z.coerce.number().min(0).default(0),
  partnerType: z.enum(['CUSTOMER', 'VENDOR']).nullable().optional(),
  partnerId: z.string().uuid().nullable().optional(),
});
export type JournalEntryLineDto = z.infer<typeof JournalEntryLineSchema>;

export const JournalEntrySchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  entryNumber: z.string().max(100),
  entryDate: z.string().date(),
  sourceModule: JournalSourceModuleEnum.default('MANUAL'),
  sourceRefId: z.string().uuid().nullable().optional(),
  memo: z.string().min(1).max(500),
  totalDebit: z.coerce.number().min(0),
  totalCredit: z.coerce.number().min(0),
  status: JournalStatusEnum.default('DRAFT'),
  postedAt: z.string().datetime().nullable().optional(),
  postedBy: z.string().uuid().nullable().optional(),
  lines: z.array(JournalEntryLineSchema).min(2),
  createdAt: z.string().datetime().optional(),
});
export type JournalEntryDto = z.infer<typeof JournalEntrySchema>;

// Custom refinement to enforce sum(Debit) === sum(Credit)
export const CreateJournalEntrySchema = JournalEntrySchema.omit({
  id: true,
  entryNumber: true,
  postedAt: true,
  postedBy: true,
  createdAt: true,
}).refine(
  (data) => {
    const totalDebit = data.lines.reduce((sum, line) => sum + Number(line.debitAmount), 0);
    const totalCredit = data.lines.reduce((sum, line) => sum + Number(line.creditAmount), 0);
    return Math.abs(totalDebit - totalCredit) < 0.001;
  },
  {
    message: 'Total Debit must equal Total Credit for double-entry balance.',
    path: ['lines'],
  }
);
export type CreateJournalEntryDto = z.infer<typeof CreateJournalEntrySchema>;

// ==========================================
// 3. Payments & AR/AP Settlements
// ==========================================

export const PaymentMethodEnum = z.enum([
  'CASH',
  'BANK_TRANSFER',
  'CREDIT_CARD',
  'CHECK',
  'ONLINE',
]);
export type PaymentMethod = z.infer<typeof PaymentMethodEnum>;

export const PaymentTypeEnum = z.enum(['RECEIPT', 'DISBURSEMENT']);
export type PaymentType = z.infer<typeof PaymentTypeEnum>;

export const PaymentAllocationSchema = z.object({
  id: z.string().uuid().optional(),
  invoiceId: z.string().uuid().optional(),
  billId: z.string().uuid().optional(),
  allocatedAmount: z.coerce.number().positive(),
});
export type PaymentAllocationDto = z.infer<typeof PaymentAllocationSchema>;

export const PaymentSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  paymentNumber: z.string().max(100),
  paymentType: PaymentTypeEnum,
  paymentDate: z.string().date(),
  partnerId: z.string().uuid(),
  partnerType: z.enum(['CUSTOMER', 'VENDOR']),
  amount: z.coerce.number().positive(),
  paymentMethod: PaymentMethodEnum,
  referenceNumber: z.string().max(100).nullable().optional(),
  bankAccountId: z.string().uuid(),
  notes: z.string().max(500).nullable().optional(),
  allocations: z.array(PaymentAllocationSchema).optional(),
});
export type PaymentDto = z.infer<typeof PaymentSchema>;
