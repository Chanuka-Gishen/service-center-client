import { EMP_ROLES } from 'src/constants/emp-role';
import { GENDER_FEMALE, GENDER_MALE, GENDER_OTHER } from 'src/constants/gender';
import {
  MARTIAL_STS_DIVORCED,
  MARTIAL_STS_MARRIED,
  MARTIAL_STS_SEPERATED,
  MARTIAL_STS_SINGLE,
  MARTIAL_STS_WIDOWED,
} from 'src/constants/martial-status';
import {
  EMP_RELATION_CHILDREN,
  EMP_RELATION_FAMILY,
  EMP_RELATION_OTHER,
  EMP_RELATION_RELATIVE,
  EMP_RELATION_SPOUSE,
} from 'src/constants/relationship-constants';
import * as Yup from 'yup';

export const EmployeeValidationSchema = Yup.object().shape({
  empFullName: Yup.string()
    .required('Full name is required')
    .max(100, 'Full name cannot exceed 100 characters')
    .trim(),

  empDob: Yup.date()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth cannot be in the future'),

  empGender: Yup.string()
    .required('Gender is required')
    .oneOf(
      [GENDER_MALE, GENDER_FEMALE, GENDER_OTHER],
      'Gender must be one of Male, Female, or Other'
    ),

  empMaritalStatus: Yup.string()
    .oneOf(
      [
        MARTIAL_STS_SINGLE,
        MARTIAL_STS_MARRIED,
        MARTIAL_STS_DIVORCED,
        MARTIAL_STS_SEPERATED,
        MARTIAL_STS_WIDOWED,
      ],
      'Invalid marital status'
    )
    .default(MARTIAL_STS_SINGLE),

  empEmail: Yup.string()
    .email('Please provide a valid email address')
    .lowercase()
    .notRequired()
    .nullable(),

  empNic: Yup.string().required('NIC is required'),

  empPhone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),

  empEmergencyContact: Yup.object().shape({
    name: Yup.string().notRequired().nullable().default(''),
    relationship: Yup.string()
      .notRequired()
      .nullable()
      .test(
        'is-valid-relationship-or-empty',
        'Invalid emergency relationship',
        (value) =>
          !value ||
          [
            EMP_RELATION_CHILDREN,
            EMP_RELATION_FAMILY,
            EMP_RELATION_OTHER,
            EMP_RELATION_RELATIVE,
            EMP_RELATION_SPOUSE,
          ].includes(value)
      )
      .default(''),
    phone: Yup.string()
      .notRequired()
      .nullable()
      .matches(
        /(^$|^[0-9]{10}$)/, // Either empty string OR 10 digits
        'Emergency phone must be 10 digits if provided'
      )
      .default(''),
  }),

  empAddress: Yup.object()
    .shape({
      street: Yup.string().required('Street address is required'),
      city: Yup.string().required('City is required'),
      province: Yup.string().nullable().notRequired(),
      postalCode: Yup.string().nullable().notRequired(),
      country: Yup.string().default('Sri Lanka').required('Country is required'),
    })
    .required(),

  empId: Yup.string().required('Employee Id Required'),

  empJobTitle: Yup.string().required('Job title is required'),

  empRole: Yup.string()
    .required('Employee role is required')
    .oneOf(EMP_ROLES, 'Invalid employee role'),

  empEmploymentType: Yup.string()
    .required('Employment type is required')
    .oneOf(
      ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Intern'],
      'Invalid employment type'
    ),

  empHireDate: Yup.date()
    .default(() => new Date())
    .max(new Date(), 'Hire date cannot be in the future'),

  empTerminationDate: Yup.date()
    .when('empHireDate', (empHireDate, schema) => {
      if (empHireDate) {
        return schema.min(empHireDate, 'Termination date must be after hire date');
      }
      return schema;
    })
    .nullable()
    .notRequired(),

  empIsActive: Yup.boolean().default(true),

  empSalary: Yup.number().required('Salary is required').min(0, 'Salary cannot be negative'),

  empPayFrequency: Yup.string()
    .required('Pay frequency is required')
    .oneOf(['Monthly', 'Weekly', 'Hourly'], 'Invalid pay frequency'),

  empBankDetails: Yup.object()
    .shape({
      accountNumber: Yup.string().nullable().default('').notRequired(),
      bankName: Yup.string().nullable().default('').notRequired(),
      branch: Yup.string().nullable().default('').notRequired(),
      accountType: Yup.string()
        .notRequired()
        .nullable()
        .test(
          'is-valid-account-type-or-empty',
          'Invalid account type',
          (value) => !value || ['current', 'Savings'].includes(value)
        )
        .default(''),
    })
    .required(),

  empLeaveBalance: Yup.object()
    .shape({
      vacation: Yup.number().min(0).default(0),
      sick: Yup.number().min(0).default(0),
      personal: Yup.number().min(0).default(0),
    })
    .required(),
});
