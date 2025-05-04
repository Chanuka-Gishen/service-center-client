import * as Yup from 'yup';

// Individual assignee schema
const assigneeSchema = Yup.object({
  _id: Yup.string()
    .required('Employee ID is required')
    .matches(/^[0-9a-fA-F]{24}$/, 'Invalid employee ID format'),
  empFullName: Yup.string()
    .required('Employee name is required')
    .min(2, 'Employee name must be at least 2 characters')
    .max(50, 'Employee name cannot exceed 50 characters'),
});

// Array of assignees schema (optional, default empty array)
const workOrderAssigneesSchema = Yup.object({
  assignees: Yup.array()
    .of(assigneeSchema)
    .optional()
    .default([])
    .max(10, 'Cannot assign more than 10 employees to a work order'),
});

export default workOrderAssigneesSchema;
