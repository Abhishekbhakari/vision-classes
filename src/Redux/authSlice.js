// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { toast } from 'react-hot-toast';

// import axiosInstance from '../Helper/axiosInstance';

// const initialState = {
//   isLoggedIn: localStorage.getItem('isLoggedIn') || false,
//   role: localStorage.getItem('role') || '',
//   // Updated: Store the whole data object
//   data:
//     localStorage.getItem('data') !== 'undefined'
//       ? JSON.parse(localStorage.getItem('data'))
//       : { purchasedCourses: [] }, // Ensure purchasedCourses is an array
// };

// export const createAccount = createAsyncThunk('/auth/signup', async (data) => {
//   try {
//     const res = axiosInstance.post('user/register', data);
//     toast.promise(res, {
//       loading: 'Wait! creating your account',
//       success: (data) => {
//         return data?.data?.message;
//       },
//       error: 'Failed to create account',
//     });
//     return (await res).data;
//   } catch (error) {
//     toast.error(error?.response?.data?.message);
//   }
// });

// export const login = createAsyncThunk('/auth/login', async (data) => {
//   try {
//     const res = axiosInstance.post('user/login', data);
//     toast.promise(res, {
//       loading: 'Wait! authenticating your account',
//       success: (data) => {
//         return data?.data?.message;
//       },
//       error: 'Failed to authenticate',
//     });
//     return (await res).data;
//   } catch (error) {
//     toast.error(error?.response?.data?.message);
//   }
// });

// export const logout = createAsyncThunk('/auth/logout', async () => {
//   try {
//     const res = axiosInstance.get('user/logout');
//     toast.promise(res, {
//       loading: 'Wait! logging out...',
//       success: (data) => {
//         return data?.data?.message;
//       },
//       error: 'Failed to logout',
//     });
//     return (await res).data;
//   } catch (error) {
//     toast.error(error?.response?.data?.message);
//   }
// });

// export const updateProfile = createAsyncThunk(
//   '/user/update/profile',
//   async (data) => {
//     try {
//       const res = axiosInstance.put(user/update, data);
//       toast.promise(res, {
//         loading: 'Wait! updating your account',
//         success: (data) => {
//           return data?.data?.message;
//         },
//         error: 'Failed to update account',
//       });
//       return (await res).data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//     }
//   }
// );

// export const getUserData = createAsyncThunk('/user/details', async () => {
//   try {
//     const res = await axiosInstance.get('user/me');
//     return res.data;
//   } catch (error) {
//     toast.error(error.message);
//   }
// });

// export const changePassword = createAsyncThunk(
//   '/auth/changePassword',
//   async (data) => {
//     try {
//       const res = axiosInstance.post('user/change-password', data);
//       toast.promise(res, {
//         loading: 'Wait! changing your password',
//         success: (data) => {
//           return data?.data?.message;
//         },
//         error: 'Failed to change password',
//       });
//       return (await res).data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//     }
//   }
// );

// export const forgetPassword = createAsyncThunk(
//   '/auth/forgetPassword',
//   async (email) => {
//     try {
//       const res = axiosInstance.post('user/reset', { email });
//       toast.promise(res, {
//         loading: 'Wait! sending verification email',
//         success: (data) => {
//           return data?.data?.message;
//         },
//         error: 'Failed to send verification email',
//       });
//       return (await res).data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//     }
//   }
// );

// export const resetPassword = createAsyncThunk(
//   '/auth/resetPassword',
//   async (data) => {
//     try {
//       const res = axiosInstance.post(`user/reset/${data.resetToken}`, {
//         password: data.password,
//       });
//       toast.promise(res, {
//         loading: 'Wait! resetting your password',
//         success: (data) => {
//           return data?.data?.message;
//         },
//         error: 'Failed to reset password',
//       });
//       return (await res).data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     // New reducer to manually add a course to state after purchase
//     addPurchasedCourse: (state, action) => {
//       const courseId = action.payload;
//       if (!state.data.purchasedCourses) {
//         state.data.purchasedCourses = [];
//       }
//       if (!state.data.purchasedCourses.includes(courseId)) {
//         state.data.purchasedCourses.push(courseId);
//         // Also update local storage
//         localStorage.setItem('data', JSON.stringify(state.data));
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.fulfilled, (state, action) => {
//         localStorage.setItem('isLoggedIn', true);
//         localStorage.setItem('role', action?.payload?.user?.role);
//         // Ensure data is stored correctly
//         const userData = { ...action?.payload?.user, purchasedCourses: action?.payload?.user?.purchasedCourses || [] };
//         localStorage.setItem('data', JSON.stringify(userData));
//         state.isLoggedIn = true;
//         state.role = action?.payload?.user?.role;
//         state.data = userData;
//       })
//       .addCase(logout.fulfilled, (state) => {
//         localStorage.clear();
//         state.isLoggedIn = false;
//         state.role = '';
//         state.data = { purchasedCourses: [] };
//       })
//       .addCase(getUserData.fulfilled, (state, action) => {
//         if (!action?.payload?.user) return;
//         localStorage.setItem('isLoggedIn', true);
//         localStorage.setItem('role', action?.payload?.user?.role);
//         // Ensure data is stored correctly
//         const userData = { ...action?.payload?.user, purchasedCourses: action?.payload?.user?.purchasedCourses || [] };
//         localStorage.setItem('data', JSON.stringify(userData));
//         state.isLoggedIn = true;
//         state.role = action?.payload?.user?.role;
//         state.data = userData;
//       });
//   },
// });

// export const { addPurchasedCourse } = authSlice.actions;
// export default authSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

import axiosInstance from '../Helper/axiosInstance';

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') || false,
  role: localStorage.getItem('role') || '',
  data:
    localStorage.getItem('data') !== 'undefined'
      ? JSON.parse(localStorage.getItem('data'))
      : { purchasedCourses: [] },
};

export const createAccount = createAsyncThunk('/auth/signup', async (data) => {
  try {
    const res = axiosInstance.post('user/register', data);
    toast.promise(res, {
      loading: 'Wait! creating your account',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to create account',
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const login = createAsyncThunk('/auth/login', async (data) => {
  try {
    const res = axiosInstance.post('user/login', data);
    toast.promise(res, {
      loading: 'Wait! authenticating your account',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to authenticate',
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const logout = createAsyncThunk('/auth/logout', async () => {
  try {
    const res = axiosInstance.get('user/logout');
    toast.promise(res, {
      loading: 'Wait! logging out...',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to logout',
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const updateProfile = createAsyncThunk(
  '/user/update/profile',
  async (data) => {
    try {
      // The backend route is /user/update, not /user/update/:id
      const res = axiosInstance.put(`user/update`, data);
      toast.promise(res, {
        loading: 'Wait! updating your account',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to update account',
      });
      // The backend now returns { success, message, user }
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const getUserData = createAsyncThunk('/user/details', async () => {
  try {
    const res = await axiosInstance.get('user/me');
    return res.data;
  } catch (error) {
    toast.error(error.message);
  }
});

export const changePassword = createAsyncThunk(
  '/auth/changePassword',
  async (data) => {
    try {
      const res = axiosInstance.post('user/change-password', data);
      toast.promise(res, {
        loading: 'Wait! changing your password',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to change password',
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  '/auth/forgetPassword',
  async (email) => {
    try {
      const res = axiosInstance.post('user/reset', { email });
      toast.promise(res, {
        loading: 'Wait! sending verification email',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to send verification email',
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  '/auth/resetPassword',
  async (data) => {
    try {
      const res = axiosInstance.post(`user/reset/${data.resetToken}`, {
        password: data.password,
      });
      toast.promise(res, {
        loading: 'Wait! resetting your password',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to reset password',
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addPurchasedCourse: (state, action) => {
      const courseId = action.payload;
      if (!state.data.purchasedCourses) {
        state.data.purchasedCourses = [];
      }
      if (!state.data.purchasedCourses.includes(courseId)) {
        state.data.purchasedCourses.push(courseId);
        localStorage.setItem('data', JSON.stringify(state.data));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('role', action?.payload?.user?.role);
        const userData = {
          ...action?.payload?.user,
          purchasedCourses: action?.payload?.user?.purchasedCourses || [],
        };
        localStorage.setItem('data', JSON.stringify(userData));
        state.isLoggedIn = true;
        state.role = action?.payload?.user?.role;
        state.data = userData;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.role = '';
        state.data = { purchasedCourses: [] };
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        if (!action?.payload?.user) return;
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('role', action?.payload?.user?.role);
        const userData = {
          ...action?.payload?.user,
          purchasedCourses: action?.payload?.user?.purchasedCourses || [],
        };
        localStorage.setItem('data', JSON.stringify(userData));
        state.isLoggedIn = true;
        state.role = action?.payload?.user?.role;
        state.data = userData;
      })
      // --- THIS IS THE FIX ---
      // This case was missing, which caused your ESLint error
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (!action?.payload?.user) return; // Don't update if no user is returned

        // Update local storage with the new user data
        localStorage.setItem('data', JSON.stringify(action?.payload?.user));

        // Update state
        state.data = action?.payload?.user;
      });
    // --- END OF FIX ---
  },
});

export const { addPurchasedCourse } = authSlice.actions;
export default authSlice.reducer;
