// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-hot-toast";
// import axiosInstance from "../Helper/axiosInstance";

// const initialState = {
//   lectures: [],
// };

// // function to get all the lectures
// export const getCourseLecture = createAsyncThunk(
//   "/course/lecture/get",
//   async (courseId) => {
//     try {
//       const res = axiosInstance.get(`/courses/${courseId}`);

//       toast.promise(res, {
//         loading: "Fetching the lectures...",
//         success: "Lectures fetched successfully",
//         error: "Failed to fetch lectures",
//       });

//       const response = await res;
//       return response.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//     }
//   }
// );

// // function to add new lecture to the course
// export const addCourseLecture = createAsyncThunk(
//   "/course/lecture/add",
//   async (data) => {
//     const formData = new FormData();
//     formData.append("lecture", data.lecture);
//     formData.append("title", data.title);
//     formData.append("description", data. bdescription);

//     try {
//       const res = axiosInstance.post(`/courses/${data.id}`, formData);

//       toast.promise(res, {
//         loading: "Adding the lecture...",
//         success: "Lecture added successfully",
//         error: "Failed to add lecture",
//       });

//       const response = await res;

//       return response.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//     }
//   }
// );

// // function to delete the lecture from the course
// export const deleteCourseLecture = createAsyncThunk(
//   "/course/lecture/delete",
//   async (data) => {
//     console.log(data);
//     try {
//       const res = axiosInstance.delete(
//         `/courses/?courseId=${data.courseId}&lectureId=${data.lectureId}`
//       );

//       toast.promise(res, {
//         loading: "Deleting the lecture...",
//         success: "Lecture deleted successfully",
//         error: "Failed to delete lecture",
//       });

//       const response = await res;
//       return response.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//     }
//   }
// );

// const lectureSlice = createSlice({
//   name: "lecture",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getCourseLecture.fulfilled, (state, action) => {
//         state.lectures = action?.payload?.lectures;
//       })
//       .addCase(addCourseLecture.fulfilled, (state, action) => {
//         state.lectures = action?.payload?.course?.lectures;
//       });
//   },
// });

// export const {} = lectureSlice.actions;
// export default lectureSlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-hot-toast";
// import axiosInstance from "../Helper/axiosInstance";

// const initialState = {
//   lectures: [],
// };

// // function to get all the lectures
// export const getCourseLecture = createAsyncThunk(
//   "/course/lecture/get",
//   async (courseId) => {
//     try {
//       const res = axiosInstance.get(`/courses/${courseId}`);

//       toast.promise(res, {
//         loading: "Fetching the lectures...",
//         success: "Lectures fetched successfully",
//         error: "Failed to fetch lectures",
//       });

//       const response = await res;
//       return response.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//     }
//   }
// );

// // function to add new lecture to the course
// export const addCourseLecture = createAsyncThunk(
//   "/course/lecture/add",
//   async (data) => {
//     const formData = new FormData();
//     formData.append("lecture", data.lecture);
//     formData.append("title", data.title);
//     formData.append("description", data.description);

//     try {
//       const res = axiosInstance.post(`/courses/${data.id}`, formData);

//       toast.promise(res, {
//         loading: "Adding the lecture...",
//         success: "Lecture added successfully",
//         error: "Failed to add lecture",
//       });

//       const response = await res;

//       return response.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//     }
//   }
// );

// // function to delete the lecture from the course
// export const deleteCourseLecture = createAsyncThunk(
//   "/course/lecture/delete",
//   async (data) => {
//     console.log(data);
//     try {
//       const res = axiosInstance.delete(
//         `/courses/?courseId=${data.courseId}&lectureId=${data.lectureId}`
//       );

//       toast.promise(res, {
//         loading: "Deleting the lecture...",
//         success: "Lecture deleted successfully",
//         error: "Failed to delete lecture",
//       });

//       const response = await res;
//       return response.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//     }
//   }
// );

// const lectureSlice = createSlice({
//   name: "lecture",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getCourseLecture.fulfilled, (state, action) => {
//         state.lectures = action?.payload?.lectures;
//       })
//       .addCase(addCourseLecture.fulfilled, (state, action) => {
//         state.lectures = action?.payload?.course?.lectures;
//       });
//   },
// });

// export const {} = lectureSlice.actions;
// export default lectureSlice.reducer;

// Redux/lectureSlice.jsimport { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// --- THIS IS THE FIX ---
// Added missing imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// --- END OF FIX ---
import { toast } from 'react-hot-toast';

import axiosInstance from '../Helper/axiosInstance';

const initialState = {
  lectures: [],
  accessDenied: false, // New state to track access
};

export const getCourseLectures = createAsyncThunk(
  '/course/lecture/get',
  async (id) => {
    try {
      const res = axiosInstance.get(`courses/${id}`);
      toast.promise(res, {
        loading: 'Wait! fetching your lectures',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to load lectures',
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      // Re-throw the error to be handled by the 'rejected' case
      throw error;
    }
  }
);

export const addCourseLecture = createAsyncThunk(
  '/course/lecture/add',
  async (data) => {
    try {
      const formData = new FormData();
      formData.append('lecture', data.lecture);
      formData.append('title', data.title);
      formData.append('description', data.description);

      const res = axiosInstance.post(`courses/${data.id}`, formData);
      toast.promise(res, {
        loading: 'Wait! adding your lecture',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to add lecture',
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const deleteCourseLecture = createAsyncThunk(
  '/course/lecture/delete',
  async (data) => {
    try {
      const res = axiosInstance.delete(
        `courses?courseId=${data.courseId}&lectureId=${data.lectureId}`
      );
      toast.promise(res, {
        loading: 'Wait! deleting your lecture',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to delete lecture',
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const lectureSlice = createSlice({
  name: 'lecture',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLectures.pending, (state) => {
        state.accessDenied = false; // Reset on pending
      })
      .addCase(getCourseLectures.fulfilled, (state, action) => {
        state.lectures = action?.payload?.lectures;
        state.accessDenied = false;
      })
      .addCase(getCourseLectures.rejected, (state, action) => {
        // Handle 403 Forbidden error
        if (action.error?.message?.includes('403')) {
          state.accessDenied = true;
        }
      })
      .addCase(addCourseLecture.fulfilled, (state, action) => {
        state.lectures = action?.payload?.course?.lectures;
      })
      .addCase(deleteCourseLecture.fulfilled, (state, action) => {
        // We need to refetch lectures or manually remove it
        // For now, let's just show a success toast (handled in thunk)
      });
  },
});

export default lectureSlice.reducer;
