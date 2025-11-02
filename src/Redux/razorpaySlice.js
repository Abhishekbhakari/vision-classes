// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { toast } from 'react-hot-toast';

// import axiosInstance from '../Helper/axiosInstance';
// import { addPurchasedCourse } from './authSlice'; // Import the new reducer

// const initialState = {
//   key: '',
//   order: null, // Replaced subscription_id with order
//   isPaymentVerified: false,
// };

// // Thunk to get Razorpay key
// export const getRazorpayKey = createAsyncThunk('/razorpay/getKey', async () => {
//   try {
//     const response = await axiosInstance.get('/payments/razorpay-key');
//     return response.data;
//   } catch (error) {
//     toast.error('Failed to load Razorpay key');
//   }
// });

// // Thunk to create a new order for a course
// export const purchaseCourse = createAsyncThunk(
//   '/razorpay/purchaseCourse',
//   async (data) => {
//     try {
//       const response = await axiosInstance.post(
//         '/payments/purchase-course',
//         data
//       );
//       toast.success('Order created successfully');
//       return response.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message || 'Failed to create order');
//       throw error;
//     }
//   }
// );

// // Thunk to verify the payment
// export const verifyCoursePayment = createAsyncThunk(
//   '/razorpay/verifyPayment',
//   async (data, { dispatch }) => {
//     try {
//       const response = await axiosInstance.post(
//         '/payments/verify-payment',
//         data
//       );
//       toast.success(response?.data?.message);
      
//       // Dispatch action to add course to auth state
//       dispatch(addPurchasedCourse(data.courseId));
      
//       return response.data;
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message || 'Payment verification failed'
//       );
//       throw error;
//     }
//   }
// );

// const razorpaySlice = createSlice({
//   name: 'razorpay',
//   initialState,
//   reducers: {
//     clearOrder: (state) => {
//       state.order = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getRazorpayKey.fulfilled, (state, action) => {
//         state.key = action?.payload?.key;
//       })
//       .addCase(purchaseCourse.fulfilled, (state, action) => {
//         state.order = action?.payload?.order;
//       })
//       .addCase(verifyCoursePayment.fulfilled, (state, action) => {
//         state.isPaymentVerified = action?.payload?.success;
//       })
//       .addCase(verifyCoursePayment.rejected, (state) => {
//         state.isPaymentVerified = false;
//       });
//   },
// });

// export const { clearOrder } = razorpaySlice.actions;
// export default razorpaySlice.reducer;
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

import axiosInstance from '../Helper/axiosInstance';
import { addPurchasedCourse } from './authSlice';

const initialState = {
  key: '',
  order: null,
  isPaymentVerified: false,
  allPayments: [], // --- NEW STATE for Admin Dashboard
};

export const getRazorpayKey = createAsyncThunk('/razorpay/getKey', async () => {
  try {
    const response = await axiosInstance.get('/payments/razorpay-key');
    return response.data;
  } catch (error) {
    toast.error('Failed to load Razorpay key');
  }
});

export const purchaseCourse = createAsyncThunk(
  '/razorpay/purchaseCourse',
  async (data) => {
    try {
      const response = await axiosInstance.post(
        '/payments/purchase-course',
        data
      );
      toast.success('Order created successfully');
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create order');
      throw error;
    }
  }
);

export const verifyCoursePayment = createAsyncThunk(
  '/razorpay/verifyPayment',
  async (data, { dispatch }) => {
    try {
      const response = await axiosInstance.post(
        '/payments/verify-payment',
        data
      );
      toast.success(response?.data?.message);
      dispatch(addPurchasedCourse(data.courseId));
      return response.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Payment verification failed'
      );
      throw error;
    }
  }
);

// --- THIS IS THE NEW THUNK ---
export const fetchAllPayments = createAsyncThunk(
  '/razorpay/fetchAllPayments',
  async () => {
    try {
      const response = await axiosInstance.get('/payments');
      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Failed to fetch payments'
      );
      throw error;
    }
  }
);
// --- END OF NEW THUNK ---

const razorpaySlice = createSlice({
  name: 'razorpay',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRazorpayKey.fulfilled, (state, action) => {
        state.key = action?.payload?.key;
      })
      .addCase(purchaseCourse.fulfilled, (state, action) => {
        state.order = action?.payload?.order;
      })
      .addCase(verifyCoursePayment.fulfilled, (state, action) => {
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(verifyCoursePayment.rejected, (state) => {
        state.isPaymentVerified = false;
      })
      // --- NEW REDUCER CASE ---
      .addCase(fetchAllPayments.fulfilled, (state, action) => {
        state.allPayments = action?.payload?.payments;
      });
  },
});

export const { clearOrder } = razorpaySlice.actions;
export default razorpaySlice.reducer;
