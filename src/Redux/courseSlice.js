// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-hot-toast";
// import axiosInstance from "../Helper/axiosInstance";

// const initialState = {
//   coursesData: [],
// };

// // function to get all courses
// export const getAllCourses = createAsyncThunk("/course/get", async () => {
//   try {
//     const res = axiosInstance.get("/courses");

//     toast.promise(res, {
//       loading: "Loading courses data...",
//       success: "Courses loaded successfully",
//       error: "Failed to get courses",
//     });

//     const response = await res;

//     return response.data.courses;
//   } catch (error) {
//     toast.error(error?.response?.data?.message);
//   }
// });

// // function to create a new course
// export const createNewCourse = createAsyncThunk(
//   "/get/courses",
//   async (data) => {
//     try {
//       // creating the form data from user data
//       let formData = new FormData();
//       formData.append("title", data?.title);
//       formData.append("description", data?.description);
//       formData.append("category", data?.category);
//       formData.append("createdBy", data?.createdBy);
//       formData.append("thumbnail", data?.thumbnail);

//       const res = axiosInstance.post("/courses", formData);

//       toast.promise(res, {
//         loading: "Creating the course...",
//         success: "Course created successfully",
//         error: "Failed to create course",
//       });

//       const response = await res;
//       return response.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//     }
//   }
// );

// // function to delete the course
// export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
//   try {
//     const res = axiosInstance.delete(`courses/${id}`);

//     toast.promise(res, {
//       loading: "Deleting the course...",
//       success: "Courses deleted successfully",
//       error: "Failed to delete course",
//     });

//     const response = await res;

//     return response.data;
//   } catch (error) {
//     toast.error(error?.response?.data?.message);
//   }
// });

// // function to update the course details
// export const updateCourse = createAsyncThunk("/course/update", async (data) => {
//   try {
//     // creating the form data from user data
//     const formData = new FormData();
//     formData.append("title", data.title);
//     formData.append("category", data.category);
//     formData.append("createdBy", data.createdBy);
//     formData.append("description", data.description);
//     // backend is not allowing change of thumbnail
//     // if (data.thumbnail) {
//     //   formData.append("thumbnail", data.thumbnail);
//     // }

//     const res = axiosInstance.put(`/courses/${data.id}`, {
//       title: data.title,
//       category: data.category,
//       createdBy: data.createdBy,
//       description: data.description,
//     });

//     toast.promise(res, {
//       loading: "Updating the course...",
//       success: "Course updated successfully",
//       error: "Failed to update course",
//     });

//     const response = await res;
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     toast.error(error?.response?.data?.message);
//   }
// });

// const courseSlice = createSlice({
//   name: "course",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(getAllCourses.fulfilled, (state, action) => {
//       if (action.payload) {
//         state.coursesData = [...action.payload];
//       }
//     });
//   },
// });

// export const {} = courseSlice.actions;
// export default courseSlice.reducer;
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

import axiosInstance from '../Helper/axiosInstance';

const initialState = {
  courseList: [],
  purchasedCourses: [], // New state for "My Courses" page
};

export const getAllCourses = createAsyncThunk(
  '/course/getAllCourses',
  async () => {
    try {
      const res = axiosInstance.get('/courses');
      toast.promise(res, {
        loading: 'Wait! fetching courses',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to load courses',
      });
      return (await res).data.courses;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// Thunk for fetching user's purchased courses
export const getMyPurchasedCourses = createAsyncThunk(
  '/course/getMyPurchasedCourses',
  async () => {
    try {
      const res = axiosInstance.get('/user/my-courses');
      toast.promise(res, {
        loading: 'Wait! fetching your courses',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to load your courses',
      });
      return (await res).data.courses;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const deleteCourse = createAsyncThunk('/course/delete', async (id) => {
  try {
    // --- THIS IS THE FIX ---
    // Added backticks (`) around the URL
    const res = axiosInstance.delete(`courses/${id}`);
    // --- END OF FIX ---

    toast.promise(res, {
      loading: 'Wait! deleting course',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to delete course',
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const createNewCourse = createAsyncThunk(
  '/course/create',
  async (data) => {
    try {
      const res = axiosInstance.post('courses', data); // data is FormData, price is already in it
      toast.promise(res, {
        loading: 'Wait! creating your course',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to create course',
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.fulfilled, (state, action) => {
        if (action.payload) {
          state.courseList = [...action.payload];
        }
      })
      .addCase(getMyPurchasedCourses.fulfilled, (state, action) => {
        if (action.payload) {
          state.purchasedCourses = [...action.payload];
        }
      });
  },
});

export default courseSlice.reducer;
