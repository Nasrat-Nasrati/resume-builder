import axiosInstance, { fetcher, endpoints } from 'src/lib/axios';

/** **************************************
 * Get all users
 *************************************** */
// export const getAllUsers = async () => {
//   try {
//     const res = await axios.get(endpoints.users.all);
//     return res.data;
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     throw error;
//   }
// };

export type RegisterUserPayload = {
  firstname: string;
  lastname: string;
  fathername?: string;
  dob?: string;
  gender?: string;
  nid: string;
  phone: string;
  email: string;
  username: string;
  password?: string;
  isActive: boolean;
  position: string;
};

// Register A User

export const registerUser = async (payload: any, avatarFile?: File) => {
  const formData = new FormData();

  // ⚠️ Make sure 'password' field exists, backend expects it!
  if (!payload.password) {
    payload.password = '123456'; // or prompt user to enter it
  }

  // Append the user as a JSON string
  formData.append('user', new Blob([JSON.stringify(payload)], { type: 'application/json' }));

  // Optional image
  if (avatarFile) {
    formData.append('image', avatarFile);
  }

  // Send request
  const response = await axiosInstance.post(endpoints.users.register, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// Update user
export const updateUser = async (
  userId: string,
  payload: RegisterUserPayload,
  avatarFile?: File
) => {
  const formData = new FormData();

  // Append the user payload as a JSON Blob
  formData.append('user', new Blob([JSON.stringify(payload)], { type: 'application/json' }));

  // Optional avatar image
  if (avatarFile) {
    formData.append('image', avatarFile);
  }

  // Send PATCH request using the endpoint
  const response = await axiosInstance.patch(endpoints.users.update(userId), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

//Get All Users
export const getAllUsers = async () => {
  try {
    const data = await fetcher(endpoints.users.all);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Deleting User
export const deleteUser = async (id: string | number) => {
  try {
    const res = await axiosInstance.delete(`/users/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

/// Change Password action in here
export const changePassword = async (payload: {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}) => {
  try {
    const response = await axiosInstance.put(endpoints.auth.changePassword, payload);
    return response.data;
  } catch (error: any) {
    console.error('Error changing password:', error);
    throw error.response?.data || error;
  }
};
