// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-hot-toast";
// import axiosInstance from "../Helper/axiosInstance";

// const initialState = {
//   key: "",
//   subscription_id: "",
//   isPaymentVerified: false,
//   allPayments: {},
//   finalMonths: {},
//   monthlySalesRecord: [],
// };

// // function to get the api key
// export const getRazorPayId = createAsyncThunk("/razorPayId/get", async () => {
//   try {
//     const res = await axiosInstance.get("/payments/razorpay-key");
//     return res.data;
//   } catch (error) {
//     toast.error("Failed to load data");
//   }
// });

// // function to purchase the course bundle
// export const purchaseCourseBundle = createAsyncThunk(
//   "/purchaseCourse",
//   async () => {
//     try {
//       const res = await axiosInstance.post("/payments/subscribe");
//       return res.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//     }
//   }
// );

// // function to verify the user payment
// export const verifyUserPayment = createAsyncThunk(
//   "/verifyPayment",
//   async (paymentDetail) => {
//     try {
//       const res = await axiosInstance.post("/payments/verify", {
//         razorpay_payment_id: paymentDetail.razorpay_payment_id,
//         razorpay_subscription_id: paymentDetail.razorpay_subscription_id,
//         razorpay_signature: paymentDetail.razorpay_signature,
//       });
//       return res?.data;
//     } catch (error) {
//       toast.error("error?.response?.data?.message");
//     }
//   }
// );

// // function to get all the payment record
// export const getPaymentRecord = createAsyncThunk("paymentrecord", async () => {
//   try {
//     const res = axiosInstance.get("/payments?count=100");
//     toast.promise(res, {
//       loading: "Getting the payments record...",
//       success: (data) => {
//         return data?.data?.message;
//       },
//       error: "Failed to get payment records",
//     });

//     const response = await res;
//     return response.data;
//   } catch (error) {
//     toast.error("Operation failed");
//   }
// });

// // function to cancel the course bundle subscription
// export const cancelCourseBundle = createAsyncThunk(
//   "/cancelCourse",
//   async () => {
//     try {
//       const res = axiosInstance.post("/payments/unsubscribe");
//       toast.promise(res, {
//         loading: "Unsubscribing the bundle...",
//         success: "Bundle unsubscibed successfully",
//         error: "Failed to unsubscibe the bundle",
//       });
//       const response = await res;
//       return response.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//     }
//   }
// );

// const razorpaySlice = createSlice({
//   name: "razorpay",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getRazorPayId.rejected, () => {
//         toast.error("Failed to get razor pay id");
//       })
//       .addCase(getRazorPayId.fulfilled, (state, action) => {
//         state.key = action?.payload?.key;
//       })
//       .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
//         state.subscription_id = action?.payload?.subscription_id;
//       })
//       .addCase(verifyUserPayment.fulfilled, (state, action) => {
//         toast.success(action?.payload?.message);
//         state.isPaymentVerified = action?.payload?.success;
//       })
//       .addCase(verifyUserPayment.rejected, (state, action) => {
//         toast.error(action?.payload?.message);
//         state.isPaymentVerified = action?.payload?.success;
//       })
//       .addCase(getPaymentRecord.fulfilled, (state, action) => {
//         state.allPayments = action?.payload?.allPayments;
//         state.finalMonths = action?.payload?.finalMonths;
//         state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
//       });
//   },
// });

// export const {} = razorpaySlice.actions;
// export default razorpaySlice.reducer;
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import axiosInstance from '../Helper/axiosInstance';

const initialState = {
  key: '',
  order_id: '',
  amount: 0,
  isPaymentVerified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecord: [],
};

// function to get the api key
export const getRazorPayId = createAsyncThunk('/razorPayId/get', async () => {
  try {
    const res = await axiosInstance.get('/payments/razorpay-key');
    return res.data;
  } catch (error) {
    toast.error('Failed to load data');
  }
});

// function to purchase a single PAID course
export const createPaymentOrder = createAsyncThunk(
  '/purchaseCourse',
  async (courseId) => {
    try {
      const res = await axiosInstance.post('/payments/create-order', {
        courseId,
      });
      return res.data; // Expects { success, order_id, amount, key }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// --- NEW THUNK FOR FREE COURSES ---
export const enrollFreeCourse = createAsyncThunk(
  '/enrollFreeCourse',
  async (courseId) => {
    try {
      // This hits the same 'create-order' endpoint
      // The backend logic now handles price=0
      const res = await axiosInstance.post('/payments/create-order', {
        courseId,
      });
      return res.data; // Expects { success: true, isFree: true, user: ... }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to verify the user payment
export const verifyUserPayment = createAsyncThunk(
  '/verifyPayment',
  async (paymentDetail) => {
    try {
      const res = await axiosInstance.post(
        '/payments/verify-payment',
        paymentDetail // { razorpay_payment_id, razorpay_order_id, razorpay_signature, courseId }
      );
      return res?.data; // Expects { success, message, user }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to get all the payment record
export const getPaymentRecord = createAsyncThunk('paymentrecord', async () => {
  try {
    const res = axiosInstance.get('/payments?count=100');
    toast.promise(res, {
      loading: 'Getting the payments record...',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to get payment records',
    });

    const response = await res;
    return response.data;
  } catch (error) {
    toast.error('Operation failed');
  }
});

const razorpaySlice = createSlice({
  name: 'razorpay',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorPayId.rejected, () => {
        toast.error('Failed to get razor pay id');
      })
      .addCase(getRazorPayId.fulfilled, (state, action) => {
        state.key = action?.payload?.key;
      })
      .addCase(createPaymentOrder.fulfilled, (state, action) => {
        state.order_id = action?.payload?.order_id;
        state.amount = action?.payload?.amount;
        state.key = action?.payload?.key;
      })
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(verifyUserPayment.rejected, (state, action) => {
        toast.error(action?.payload?.message);
        state.isPaymentVerified = false;
      })
      .addCase(enrollFreeCourse.fulfilled, (state, action) => {
          if(action?.payload?.success) {
            toast.success("Enrolled successfully!");
          }
      })
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        state.allPayments = action?.payload?.allPayments;
        state.finalMonths = action?.payload?.finalMonths;
        state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
      });
  },
});

export const {} = razorpaySlice.actions;
export default razorpaySlice.reducer;
