import axiosInstance, { fetcher, endpoints } from 'src/lib/axios';

//Get all Plans
export const getAllPlans = async () => {
  try {
    const data = await fetcher(endpoints.plans.all);
    return data;
  } catch (error) {
    console.error('Error fetching plans:', error);
    throw error;
  }
};

export type PlanPayload = {
  name: string;
  description?: string;
  planType: string; // matches PlanType enum in backend
};

// Create Plan
export const createPlan = async (payload: PlanPayload, attachmentFile?: File) => {
  const formData = new FormData();

  formData.append('name', payload.name);
  if (payload.description) formData.append('description', payload.description);
  formData.append('planType', payload.planType);

  if (attachmentFile) {
    formData.append('attachment', attachmentFile);
  }

  const response = await axiosInstance.post(endpoints.plans.register, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

// Update Plan
export const updatePlan = async (
  planId: string | number,
  payload: Partial<PlanPayload>,
  attachmentFile?: File
) => {
  const formData = new FormData();

  if (payload.name) formData.append('name', payload.name);
  if (payload.description) formData.append('description', payload.description);
  if (payload.planType) formData.append('planType', payload.planType);

  if (attachmentFile) {
    formData.append('attachment', attachmentFile);
  }

  const response = await axiosInstance.put(endpoints.plans.update(planId), formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

///deletin a plan
export const deletePlan = async (id: string | number) => {
  try {
    const res = await axiosInstance.delete(`/plans/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
