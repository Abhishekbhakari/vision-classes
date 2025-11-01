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

// Redux/lectureSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../Helper/axiosInstance";

const initialState = {
  lectures: [],
  loading: false,
};

export const getCourseLecture = createAsyncThunk(
  "/course/lecture/get",
  async (courseId, thunkAPI) => {
    try {
      const res = axiosInstance.get(`/courses/${courseId}`);
      toast.promise(res, {
        loading: "Fetching the lectures...",
        success: "Lectures fetched successfully",
        error: "Failed to fetch lectures",
      });
      const response = await res;
      // expecting { lectures: [...] } or { course: { lectures: [...] } } depending on backend
      // normalize: if response.data.lectures => use that; else if course => course.lectures
      if (response?.data?.lectures) return response.data;
      if (response?.data?.course?.lectures) return { lectures: response.data.course.lectures };
      if (response?.data?.course?.lectures === undefined && response?.data?.course) {
        // fallback: if course object returned
        return { lectures: response.data.course.lectures || [] };
      }
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addCourseLecture = createAsyncThunk(
  "/course/lecture/add",
  async (data, thunkAPI) => {
    const formData = new FormData();
    formData.append("lecture", data.lecture);
    formData.append("title", data.title);
    formData.append("description", data.description);

    try {
      const res = axiosInstance.post(`/courses/${data.id}`, formData);
      toast.promise(res, {
        loading: "Adding the lecture...",
        success: "Lecture added successfully",
        error: "Failed to add lecture",
      });
      const response = await res;
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCourseLecture = createAsyncThunk(
  "/course/lecture/delete",
  async (data, thunkAPI) => {
    try {
      const res = axiosInstance.delete(
        `/courses/?courseId=${data.courseId}&lectureId=${data.lectureId}`
      );

      toast.promise(res, {
        loading: "Deleting the lecture...",
        success: "Lecture deleted successfully",
        error: "Failed to delete lecture",
      });

      const response = await res;
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/**
 * NEW: add homework to a lecture (admin)
 * body: { title, description, questions: [{ text, solution }] }
 */
export const addHomeworkToLecture = createAsyncThunk(
  "/course/homework/add",
  async ({ courseId, lectureId, homework }, thunkAPI) => {
    try {
      const res = axiosInstance.post(
        `/courses/${courseId}/lectures/${lectureId}/homeworks`,
        homework
      );

      toast.promise(res, {
        loading: "Adding homework...",
        success: "Homework added",
        error: "Failed to add homework",
      });

      return res.then((r) => r.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/**
 * NEW: fetch a single question solution (lazy-load)
 */
export const getQuestionSolution = createAsyncThunk(
  "/course/question/solution/get",
  async ({ courseId, lectureId, hwId, questionId }, thunkAPI) => {
    try {
      const res = axiosInstance.get(
        `/courses/${courseId}/lectures/${lectureId}/homeworks/${hwId}/questions/${questionId}/solution`
      );
      const response = await res;
      return response.data; // { solution: '...' }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch solution");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/**
 * NEW: update lecture notes (admin)
 * body: { notes }
 */
export const updateLectureNotes = createAsyncThunk(
  "/course/lecture/notes/update",
  async ({ courseId, lectureId, notes }, thunkAPI) => {
    try {
      const res = axiosInstance.put(
        `/courses/${courseId}/lectures/${lectureId}/notes`,
        { notes }
      );

      toast.promise(res, {
        loading: "Updating notes...",
        success: "Notes updated",
        error: "Failed to update notes",
      });

      return res.then((r) => r.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLecture.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCourseLecture.fulfilled, (state, action) => {
        state.loading = false;
        state.lectures = action?.payload?.lectures || [];
      })
      .addCase(getCourseLecture.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addCourseLecture.fulfilled, (state, action) => {
        // backend returns course; keep current behaviour: re-fetch recommended from UI
        state.lectures = action?.payload?.course?.lectures || state.lectures;
      })
      .addCase(deleteCourseLecture.fulfilled, (state, action) => {
        // after delete most UI calls getCourseLecture to refresh; keep safe fallback
      })
      .addCase(addHomeworkToLecture.fulfilled, (state, action) => {
        // UI should re-fetch lectures after this; no optimistic change here
      })
      .addCase(updateLectureNotes.fulfilled, (state, action) => {
        // UI should re-fetch lectures after this; no direct mutation
      });
  },
});

export default lectureSlice.reducer;
