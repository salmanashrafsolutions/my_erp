import { z } from 'zod';
import { CurrencyCodeEnum } from '../common/api';

// ==========================================
// 1. Multi-Tenancy: Company & Branch
// ==========================================

export const CompanySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(50),
  taxId: z.string().max(100).nullable().optional(),
  baseCurrency: CurrencyCodeEnum.default('USD'),
  fiscalYearStartMonth: z.number().int().min(1).max(12).default(1),
  isActive: z.boolean().default(true),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
});
export type CompanyDto = z.infer<typeof CompanySchema>;

export const CreateCompanySchema = CompanySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateCompanyDto = z.infer<typeof CreateCompanySchema>;

export const BranchSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(50),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      postalCode: z.string().optional(),
      country: z.string().optional(),
    })
    .nullable()
    .optional(),
  isActive: z.boolean().default(true),
});
export type BranchDto = z.infer<typeof BranchSchema>;

export const CreateBranchSchema = BranchSchema.omit({ id: true });
export type CreateBranchDto = z.infer<typeof CreateBranchSchema>;

// ==========================================
// 2. Auth, User & RBAC
// ==========================================

export const PermissionActionEnum = z.enum([
  'create',
  'read',
  'update',
  'delete',
  'approve',
  'confirm',
  'post',
  'reverse',
  'cancel',
  'export',
  'manage',
]);
export type PermissionAction = z.infer<typeof PermissionActionEnum>;

export const UserSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  email: z.string().email().max(255),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  phone: z.string().max(50).nullable().optional(),
  isActive: z.boolean().default(true),
  isSuperadmin: z.boolean().default(false),
  mfaEnabled: z.boolean().default(false),
  roles: z.array(z.string().uuid()).optional(),
  createdAt: z.string().datetime(),
});
export type UserDto = z.infer<typeof UserSchema>;

export const CreateUserSchema = z.object({
  companyId: z.string().uuid(),
  email: z.string().email().max(255),
  password: z.string().min(8).max(100),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  phone: z.string().max(50).optional(),
  roleIds: z.array(z.string().uuid()).optional(),
});
export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  mfaCode: z.string().length(6).optional(),
});
export type LoginDto = z.infer<typeof LoginSchema>;

export const RoleSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().nullable().optional(),
  permissions: z.array(z.string()), // e.g. "sales:order:create"
});
export type RoleDto = z.infer<typeof RoleSchema>;

export const CreateRoleSchema = RoleSchema.omit({ id: true });
export type CreateRoleDto = z.infer<typeof CreateRoleSchema>;

// ==========================================
// 3. Document Number Sequences
// ==========================================

export const NumberSequenceSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  code: z.string().min(1).max(50), // e.g. SALES_ORDER, SALES_INVOICE
  prefix: z.string().max(50),
  suffix: z.string().max(50).nullable().optional(),
  nextVal: z.coerce.number().int().min(1).default(1),
  padding: z.coerce.number().int().min(1).max(10).default(5),
});
export type NumberSequenceDto = z.infer<typeof NumberSequenceSchema>;

export const CreateNumberSequenceSchema = NumberSequenceSchema.omit({ id: true });
export type CreateNumberSequenceDto = z.infer<typeof CreateNumberSequenceSchema>;

// ==========================================
// 4. Core Audit Logs
// ==========================================

export const AuditActionEnum = z.enum([
  'CREATE',
  'UPDATE',
  'DELETE',
  'POST',
  'REVERSE',
  'APPROVE',
  'CANCEL',
]);
export type AuditAction = z.infer<typeof AuditActionEnum>;

export const AuditLogSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  actorId: z.string().uuid(),
  actorName: z.string().optional(),
  action: AuditActionEnum,
  resourceName: z.string().max(100),
  resourceId: z.string().uuid(),
  oldValues: z.record(z.unknown()).nullable().optional(),
  newValues: z.record(z.unknown()).nullable().optional(),
  ipAddress: z.string().max(45).nullable().optional(),
  createdAt: z.string().datetime(),
});
export type AuditLogDto = z.infer<typeof AuditLogSchema>;
