import * as Yup from 'yup';
import { LEAVE_STS_APPROVED, LEAVE_STS_REJECTED } from 'src/constants/leave-constants';

export const processLeaveRequestSchema = Yup.object().shape({
  leaveRequestStatus: Yup.string()
    .default(LEAVE_STS_APPROVED)
    .oneOf([LEAVE_STS_APPROVED, LEAVE_STS_REJECTED], 'Status must be approved, or rejected'),

  leaveRequestRejectionReason: Yup.string().nullable(),
});
