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
  myCourses: [], // <-- STATE for purchased courses
  error: null, // <-- STATE for storing error information
};

// This thunk gets ALL courses for the public course list
export const getAllCourses = createAsyncThunk(
  '/courses/get',
  async (_, { rejectWithValue }) => {
    try {
      const res = axiosInstance.get('/courses');
      toast.promise(res, {
        loading: 'Loading courses...',
        success: 'Courses loaded successfully',
        error: 'Failed to load courses',
      });
      const response = await res;
      return response.data; // Assumes { success: true, courses: [...] }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      // Return a serializable error object
      return rejectWithValue({
        message: error?.response?.data?.message || 'Failed to load courses',
        status: error?.response?.status
      });
    }
  }
);

// --- NEW THUNK for "My Courses" ---
export const getMyCourses = createAsyncThunk(
  '/user/my-courses',
  async (_, { rejectWithValue }) => {
    try {
      const res = axiosInstance.get('/user/my-courses');

      toast.promise(res, {
        loading: 'Fetching your courses...',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to fetch courses',
      });

      const response = await res;
      return response.data; // Expects { success: true, courses: [...] }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue({
        message: error?.response?.data?.message || 'Failed to fetch courses',
        status: error?.response?.status
      });
    }
  }
);
// --- END NEW THUNK ---

// --- ADDED MISSING THUNKS FOR ADMIN ---
export const createNewCourse = createAsyncThunk(
  '/course/create',
  async (data, { rejectWithValue }) => {
    try {
      // Pass FormData directly. Axios will set the 'multipart/form-data' header automatically.
      let res = axiosInstance.post('/courses', data);

      toast.promise(res, {
        loading: 'Creating new course...',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to create course',
      });

      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue({
        message: error?.response?.data?.message || 'Failed to create course',
        status: error?.response?.status
      });
    }
  }
);

export const deleteCourse = createAsyncThunk(
  '/course/delete',
  async (id, { rejectWithValue }) => {
    try {
      let res = axiosInstance.delete(`/courses/${id}`); // Assumes DELETE /courses/:id route

      toast.promise(res, {
        loading: 'Deleting course...',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to delete course',
      });

      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue({
        message: error?.response?.data?.message || 'Failed to delete course',
        status: error?.response?.status
      });
    }
  }
);

export const updateCourse = createAsyncThunk("/course/update", async (data) => {
  try {
    // data is [id, formData]
    const [courseId, formData] = data;

    // Log the FormData contents for debugging
    console.log('Updating course:', courseId);
    for (let [key, value] of formData.entries()) {
      console.log(`FormData field - ${key}:`, value instanceof File ? 'File: ' + value.name : value);
    }

    // Set the proper headers for multipart/form-data
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const res = axiosInstance.put(`/courses/${courseId}`, formData, config);

    toast.promise(res, {
      loading: "Updating the course...",
      success: "Course updated successfully",
      error: "Failed to update course",
    });

    const response = await res;
    return response.data;
  } catch (error) {
    console.error('Update course error:', error?.response?.data || error);
    toast.error(error?.response?.data?.message);
  }
});
// --- END ADDED MISSING THUNKS ---

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAllCourses cases
      .addCase(getAllCourses.fulfilled, (state, action) => {
        if (action.payload) {
          state.courseList = action.payload.courses;
          state.error = null;
        }
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.error = action.payload || { message: 'Failed to load courses' };
      })
      // getMyCourses cases
      .addCase(getMyCourses.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          state.myCourses = action.payload.courses;
          state.error = null;
        }
      })
      .addCase(getMyCourses.rejected, (state, action) => {
        state.error = action.payload || { message: 'Failed to fetch courses' };
      })
      // Other action cases
      .addCase(createNewCourse.rejected, (state, action) => {
        state.error = action.payload || { message: 'Failed to create course' };
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.error = action.payload || { message: 'Failed to update course' };
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.error = action.payload || { message: 'Failed to delete course' };
      });
  },
});

export const {} = courseSlice.actions;
export default courseSlice.reducer;
