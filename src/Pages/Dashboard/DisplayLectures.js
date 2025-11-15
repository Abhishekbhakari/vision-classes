// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import Layout from "../../Layout/Layout";
// import {
//   deleteCourseLecture,
//   getCourseLecture,
// } from "../../Redux/lectureSlice";

// const DisplayLectures = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // for getting the data from location of previous component
//   const courseDetails = useLocation().state;
//   const { lectures } = useSelector((state) => state.lecture);
//   const { role } = useSelector((state) => state.auth);

//   // to play the video accordingly
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

//   // function to handle lecture delete
//   const handleLectureDelete = async (courseId, lectureId) => {
//     const data = { courseId, lectureId };
//     await dispatch(deleteCourseLecture(data));
//     await dispatch(getCourseLecture(courseDetails._id));
//   };

//   // fetching the course lecture data
//   useEffect(() => {
//     (async () => {
//       await dispatch(getCourseLecture(courseDetails._id));
//     })();
//   }, []);
//   return (
//     <Layout>
//       <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
//         {/* displaying the course name */}

//         <h1 className="text-center text-2xl font-semibold text-yellow-500">
//           Course Name : {courseDetails?.title}
//         </h1>

//         <div className="flex justify-center gap-10 w-full">
//           {/* left section for playing the video and displaying course details to admin */}
//           <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
//             <video
//               className="object-fill rounded-tl-lg rounded-tr-lg w-full"
//               src={lectures && lectures[currentVideoIndex]?.lecture?.secure_url}
//               controls
//               disablePictureInPicture
//               muted
//               controlsList="nodownload"
//             ></video>
//             <div>
//               <h1>
//                 <span className="text-yellow-500">Title : </span>
//                 {lectures && lectures[currentVideoIndex]?.title}
//               </h1>
//               <p>
//                 {" "}
//                 <span className="text-yellow-500 line-clamp-4">
//                   Description :{" "}
//                 </span>
//                 {lectures && lectures[currentVideoIndex]?.description}
//               </p>
//             </div>
//           </div>

//           {/* right section for displaying all the lectures of the course */}
//           <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
//             <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
//               <p>Lectures List</p>
//               {role === "ADMIN" && (
//                 <button
//                   onClick={() =>
//                     navigate("/course/addlecture", {
//                       state: { ...courseDetails },
//                     })
//                   }
//                   className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
//                 >
//                   Add New Lecture
//                 </button>
//               )}
//             </li>
//             {lectures &&
//               lectures.map((element, index) => {
//                 return (
//                   <li className="space-y-2" key={element._id}>
//                     <p
//                       className="cursor-pointer"
//                       onClick={() => setCurrentVideoIndex(index)}
//                     >
//                       <span className="text-yellow-500">
//                         {" "}
//                         Lecture {index + 1} :{" "}
//                       </span>
//                       {element?.title}
//                     </p>
//                     {role === "ADMIN" && (
//                       <button
//                         onClick={() =>
//                           handleLectureDelete(courseDetails?._id, element?._id)
//                         }
//                         className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
//                       >
//                         Delete Lecture
//                       </button>
//                     )}
//                   </li>
//                 );
//               })}
//           </ul>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default DisplayLectures;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import Layout from "../../Layout/Layout";
// import {
//   deleteCourseLecture,
//   getCourseLecture,
// } from "../../Redux/lectureSlice";

// const DisplayLectures = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // for getting the data from location of previous component
//   const courseDetails = useLocation().state;
//   const { lectures } = useSelector((state) => state.lecture);
//   const { role } = useSelector((state) => state.auth);

//   // to play the video accordingly
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

//   // function to handle lecture delete
//   const handleLectureDelete = async (courseId, lectureId) => {
//     const data = { courseId, lectureId };
//     await dispatch(deleteCourseLecture(data));
//     await dispatch(getCourseLecture(courseDetails._id));
//   };

//   // fetching the course lecture data
//   useEffect(() => {
//     (async () => {
//       await dispatch(getCourseLecture(courseDetails._id));
//     })();
//   }, []);
//   return (
//     <Layout>
//       <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
//         {/* displaying the course name */}

//         <h1 className="text-center text-2xl font-semibold text-yellow-500">
//           Course Name : {courseDetails?.title}
//         </h1>

//         <div className="flex justify-center gap-10 w-full">
//           {/* left section for playing the video and displaying course details to admin */}
//           <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
//             <video
//               className="object-fill rounded-tl-lg rounded-tr-lg w-full"
//               src={lectures && lectures[currentVideoIndex]?.lecture?.secure_url}
//               controls
//               disablePictureInPicture
//               muted
//               controlsList="nodownload"
//             ></video>
//             <div>
//               <h1>
//                 <span className="text-yellow-500">Title : </span>
//                 {lectures && lectures[currentVideoIndex]?.title}
//               </h1>
//               <p>
//                 {" "}
//                 <span className="text-yellow-500 line-clamp-4">
//                   Description :{" "}
//                 </span>
//                 {lectures && lectures[currentVideoIndex]?.description}
//               </p>
//             </div>
//           </div>

//           {/* right section for displaying all the lectures of the course */}
//           <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
//             <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
//               <p>Lectures List</p>
//               {role === "ADMIN" && (
//                 <button
//                   onClick={() =>
//                     navigate("/course/addlecture", {
//                       state: { ...courseDetails },
//                     })
//                   }
//                   className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
//                 >
//                   Add New Lecture
//                 </button>
//               )}
//             </li>
//             {lectures &&
//               lectures.map((element, index) => {
//                 return (
//                   <li className="space-y-2" key={element._id}>
//                     <p
//                       className="cursor-pointer"
//                       onClick={() => setCurrentVideoIndex(index)}
//                     >
//                       <span className="text-yellow-500">
//                         {" "}
//                         Lecture {index + 1} :{" "}
//                       </span>
//                       {element?.title}
//                     </p>
//                     {role === "ADMIN" && (
//                       <button
//                         onClick={() =>
//                           handleLectureDelete(courseDetails?._id, element?._id)
//                         }
//                         className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
//                       >
//                         Delete Lecture
//                       </button>
//                     )}
//                   </li>
//                 );
//               })}
//           </ul>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default DisplayLectures;

// // components/Course/DisplayLectures.jsx// components/Course/DisplayLectures.jsx
// import React, { useEffect, useState, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import Layout from "../../Layout/Layout";
// import HtmlMathContent from "../../Components/HtmlMathContent";
// import {
//   deleteCourseLecture,
//   getCourseLecture,
//   addHomeworkToLecture,
//   getQuestionSolution,
//   updateLectureNotes,
// } from "../../Redux/lectureSlice";
// import { toast } from "react-hot-toast";
// import DynamicHomeworkForm from "./homeworkForm";

// // ✅ Reusable modal wrapper
// const Modal = ({ title, children, onClose }) => (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3">
//     <div className="bg-[#0b1220] w-[95%] md:w-[70%] max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-5">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg md:text-xl font-semibold text-yellow-400">{title}</h2>
//         <button
//           onClick={onClose}
//           className="text-xl text-gray-300 hover:text-white transition"
//         >
//           ✕
//         </button>
//       </div>
//       {children}
//     </div>
//   </div>
// );

// const DisplayLectures = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { lectures } = useSelector((state) => state.lecture);
//   const { role } = useSelector((state) => state.auth);
//   const courseDetails = useLocation().state;

//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   const [selectedLectureIndex, setSelectedLectureIndex] = useState(null);

//   // modals
//   const [activeModal, setActiveModal] = useState(null);
//   const closeModal = () => setActiveModal(null);

//   // notes edit
//   const [notesDraft, setNotesDraft] = useState("");

//   const selectedLecture = useMemo(
//     () =>
//       selectedLectureIndex !== null ? lectures[selectedLectureIndex] : null,
//     [selectedLectureIndex, lectures]
//   );

//   // fetch course lectures
//   useEffect(() => {
//     if (!courseDetails?._id) return navigate(-1);
//     dispatch(getCourseLecture(courseDetails._id));
//   }, [dispatch, courseDetails?._id, navigate]);

//   // ✅ Delete lecture
//   const handleLectureDelete = async (courseId, lectureId) => {
//     const res = await dispatch(deleteCourseLecture({ courseId, lectureId }));
//     if (res?.payload?.success) {
//       toast.success("Lecture deleted successfully");
//       dispatch(getCourseLecture(courseDetails._id));
//       setCurrentVideoIndex(0);
//     }
//   };

//   // ✅ Homework: fetch solution for question
//   const handleFetchSolution = async (hwId, questionId) => {
//     const res = await dispatch(
//       getQuestionSolution({
//         courseId: courseDetails._id,
//         lectureId: selectedLecture._id,
//         hwId,
//         questionId,
//       })
//     );
//     if (res?.payload?.solution) {
//       toast.success("Solution loaded");
//       dispatch(getCourseLecture(courseDetails._id));
//     }
//   };

//   // ✅ Notes: save
//   const handleSaveNotes = async () => {
//     const res = await dispatch(
//       updateLectureNotes({
//         courseId: courseDetails._id,
//         lectureId: selectedLecture._id,
//         notes: notesDraft,
//       })
//     );
//     if (res?.payload?.success) {
//       toast.success("Notes saved successfully");
//       closeModal();
//       dispatch(getCourseLecture(courseDetails._id));
//     }
//   };

//   return (
//     <Layout>
//       <div className="flex flex-col gap-10 min-h-[90vh] py-10 text-white mx-[5%]">
//         <h1 className="text-center text-2xl font-semibold text-yellow-500">
//           {courseDetails?.title}
//         </h1>

//         <div className="flex flex-col md:flex-row justify-center gap-10 w-full">
//           {/* ▶️ Current video section */}
//           <div className="w-full md:w-[50%] rounded-lg shadow-lg bg-[#0c1222] p-3">
//             {lectures?.[currentVideoIndex]?.lecture?.secure_url ? (
//               <video
//                 src={lectures[currentVideoIndex].lecture.secure_url}
//                 controls
//                 autoPlay
//                 muted
//                 controlsList="nodownload"
//                 className="w-full rounded-lg mb-3"
//               />
//             ) : (
//               <div className="text-center text-gray-400 py-10">
//                 No video available
//               </div>
//             )}
//             <h2 className="font-semibold text-yellow-400">
//               {lectures?.[currentVideoIndex]?.title}
//             </h2>
//             <p className="text-sm text-gray-300 mt-1">
//               {lectures?.[currentVideoIndex]?.description}
//             </p>
//           </div>

//           {/* 📚 Lecture List */}
//           <ul className="w-full md:w-[40%] rounded-lg shadow-lg bg-[#0c1222] p-3 space-y-4">
//             <li className="flex items-center justify-between">
//               <h3 className="text-xl font-semibold text-yellow-400">
//                 Lectures List
//               </h3>
//               {role === "ADMIN" && (
//                 <button
//                   onClick={() =>
//                     navigate("/course/addlecture", { state: courseDetails })
//                   }
//                   className="px-3 py-1 bg-amber-600 rounded text-sm hover:bg-amber-500"
//                 >
//                   + Add
//                 </button>
//               )}
//             </li>

//             {lectures?.length === 0 && (
//               <li className="text-gray-400 text-sm text-center">
//                 No lectures yet
//               </li>
//             )}

//             {lectures?.map((lecture, i) => (
//               <li
//                 key={lecture._id}
//                 className="border-b border-gray-700 pb-3 last:border-none"
//               >
//                 <div className="flex justify-between items-start">
//                   <div
//                     onClick={() => setCurrentVideoIndex(i)}
//                     className="cursor-pointer"
//                   >
//                     <p className="font-medium">
//                       <span className="text-yellow-500">Lecture {i + 1}: </span>
//                       {lecture.title}
//                     </p>
//                     <p className="text-sm text-gray-400 line-clamp-2">
//                       {lecture.description}
//                     </p>
//                   </div>
//                   <div className="flex flex-col gap-2">
//                     <button
//                       onClick={() => {
//                         setSelectedLectureIndex(i);
//                         setActiveModal("video");
//                       }}
//                       className="px-2 py-1 bg-blue-600 rounded text-sm"
//                     >
//                       Video
//                     </button>
//                     <button
//                       onClick={() => {
//                         setSelectedLectureIndex(i);
//                         setActiveModal("homework");
//                       }}
//                       className="px-2 py-1 bg-amber-600 rounded text-sm"
//                     >
//                       Homework
//                     </button>
//                     <button
//                       onClick={() => {
//                         setSelectedLectureIndex(i);
//                         setNotesDraft(lecture.notes || "");
//                         setActiveModal("notes");
//                       }}
//                       className="px-2 py-1 bg-green-600 rounded text-sm"
//                     >
//                       Notes
//                     </button>
//                     {role === "ADMIN" && (
//                       <button
//                         onClick={() =>
//                           handleLectureDelete(courseDetails._id, lecture._id)
//                         }
//                         className="px-2 py-1 bg-red-600 rounded text-sm"
//                       >
//                         Delete
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* 🧮 NOTES MODAL */}
//         {activeModal === "notes" && selectedLecture && (
//           <Modal title={`Notes — ${selectedLecture.title}`} onClose={closeModal}>
//             <div className="mb-4">
//               <h3 className="text-sm text-gray-400 mb-2">Preview</h3>
//               <div className="border border-slate-700 rounded p-3 bg-[#0c1222]">
//                 <HtmlMathContent content={selectedLecture.notes || "No notes available"} />
//               </div>
//             </div>

//             {role === "ADMIN" && (
//               <>
//                 <h3 className="text-sm text-gray-400 mb-2">Edit Notes</h3>
//                 <textarea
//                   value={notesDraft}
//                   onChange={(e) => setNotesDraft(e.target.value)}
//                   className="w-full p-2 bg-transparent border h-48 resize-none rounded"
//                 />
//                 <div className="flex gap-2 mt-3">
//                   <button
//                     onClick={handleSaveNotes}
//                     className="px-3 py-1 bg-green-600 rounded"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={() => setNotesDraft(selectedLecture.notes || "")}
//                     className="px-3 py-1 bg-gray-700 rounded"
//                   >
//                     Reset
//                   </button>
//                 </div>
//               </>
//             )}
//           </Modal>
//         )}

//         {/* 🧾 HOMEWORK MODAL */}
//         {activeModal === "homework" && selectedLecture && (
//           <Modal title={`Homework — ${selectedLecture.title}`} onClose={closeModal}>
//             {(selectedLecture.homeworks || []).map((hw) => (
//               <div key={hw._id} className="p-4 mb-4 border border-slate-700 rounded-lg bg-[#0c1222]">
//                 <h3 className="font-semibold text-lg text-yellow-400">{hw.title}</h3>
//                 <p className="text-sm text-gray-300 mb-3">{hw.description}</p>

//                 {(hw.questions || []).map((q) => (
//                   <HomeworkQuestion
//                     key={q._id}
//                     question={q}
//                     onFetchSolution={() =>
//                       handleFetchSolution(hw._id, q._id)
//                     }
//                   />
//                 ))}
//               </div>
//             ))}

//             {role === "ADMIN" && (
//               <div className="mt-5 border-t border-slate-700 pt-3">
//                 <h3 className="font-semibold text-gray-300 mb-2">Add Homework</h3>
//                 <DynamicHomeworkForm
//                   courseId={courseDetails._id}
//                   lectureId={selectedLecture._id}
//                   onAdded={() => dispatch(getCourseLecture(courseDetails._id))}
//                 />
//               </div>
//             )}
//           </Modal>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default DisplayLectures;

// // 📘 HomeworkQuestion component
// function HomeworkQuestion({ question, onFetchSolution }) {
//   const [show, setShow] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const toggleSolution = async () => {
//     if (question.solution) return setShow((prev) => !prev);
//     setLoading(true);
//     await onFetchSolution();
//     setLoading(false);
//     setShow(true);
//   };

//   return (
//     <div className="p-3 border border-slate-700 rounded bg-[#0d152b] hover:bg-[#111d3b] transition">
//       <div className="flex justify-between items-start">
//         <HtmlMathContent content={question.text} />
//         <button
//           onClick={toggleSolution}
//           className="ml-3 px-3 py-1 text-sm bg-slate-700 hover:bg-slate-600 rounded"
//         >
//           {loading ? "Loading..." : show ? "Hide" : "Show"}
//         </button>
//       </div>

//       {show && (
//         <div className="mt-3 bg-[#101a32] rounded p-3 text-gray-200 border border-slate-700">
//           {question.solution ? (
//             <HtmlMathContent content={question.solution} />
//           ) : (
//             <p className="italic text-gray-400">Solution not available.</p>
//           )}
// //         </div>
// import React, { useEffect, useState, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Button } from "../../Components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "../../Components/ui/card";
// import { Progress } from "../../Components/ui/progress";
// import { ScrollArea } from "../../Components/ui/scroll-area";
// import { Separator } from "../../Components/ui/separator";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../Components/ui/tabs";
// import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../../Components/ui/collapsible";
// import {
//   PlayCircle,
//   FileText,
//   ClipboardList,
//   ChevronDown,
//   ChevronUp,
//   CheckCircle2,
//   Trash2,
//   Plus,
//   ArrowLeft,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { toast } from "react-hot-toast";
// import Layout from "../../Layout/Layout";
// import HtmlMathContent from "../../Components/HtmlMathContent";
// import DynamicHomeworkForm from "./homeworkForm";
// import {
//   deleteCourseLecture,
//   getCourseLecture,
//   getQuestionSolution,
//   updateLectureNotes,
// } from "../../Redux/lectureSlice";

// export default function DisplayLectures() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { lectures = [] } = useSelector((state) => state.lecture || {});
//   const { role } = useSelector((state) => state.auth || {});
//   const courseDetails = useLocation().state || {};

//   const [selectedLectureIndex, setSelectedLectureIndex] = useState(0);
//   const [activeTab, setActiveTab] = useState("video");
//   const [expandedQuestions, setExpandedQuestions] = useState(new Set());
//   const [notesDraft, setNotesDraft] = useState("");
//   const [isEditingNotes, setIsEditingNotes] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const selectedLecture = useMemo(() => lectures?.[selectedLectureIndex] || null, [selectedLectureIndex, lectures]);

//   useEffect(() => {
//     if (!courseDetails?._id) return navigate(-1);
//     dispatch(getCourseLecture(courseDetails._id));
//   }, [dispatch, courseDetails?._id, navigate]);

//   useEffect(() => {
//     if (selectedLecture) {
//       setNotesDraft(selectedLecture.notes || "");
//       setIsEditingNotes(false);
//     }
//   }, [selectedLecture]);

//   const handleLectureDelete = async (courseId, lectureId) => {
//     const res = await dispatch(deleteCourseLecture({ courseId, lectureId }));
//     if (res?.payload?.success) {
//       toast.success("Lecture deleted successfully");
//       dispatch(getCourseLecture(courseDetails._id));
//       setSelectedLectureIndex(0);
//     } else {
//       toast.error("Could not delete lecture");
//     }
//   };

//   const handleFetchSolution = async (hwId, questionId) => {
//     const res = await dispatch(
//       getQuestionSolution({
//         courseId: courseDetails._id,
//         lectureId: selectedLecture._id,
//         hwId,
//         questionId,
//       })
//     );
//     if (res?.payload?.solution) {
//       toast.success("Solution loaded");
//       dispatch(getCourseLecture(courseDetails._id));
//     }
//   };

//   const handleSaveNotes = async () => {
//     const res = await dispatch(
//       updateLectureNotes({
//         courseId: courseDetails._id,
//         lectureId: selectedLecture._id,
//         notes: notesDraft,
//       })
//     );
//     if (res?.payload?.success) {
//       toast.success("Notes saved successfully");
//       setIsEditingNotes(false);
//       dispatch(getCourseLecture(courseDetails._id));
//     } else {
//       toast.error("Failed to save notes");
//     }
//   };

//   const toggleQuestion = (questionId) => {
//     const newExpanded = new Set(expandedQuestions);
//     if (newExpanded.has(questionId)) newExpanded.delete(questionId);
//     else newExpanded.add(questionId);
//     setExpandedQuestions(newExpanded);
//   };

//   const completedCount = lectures?.filter((l) => l.completed)?.length || 0;
//   const progress = lectures?.length > 0 ? (completedCount / lectures.length) * 100 : 0;

//   // keyboard friendly next/prev navigation
//   const goPrev = () => setSelectedLectureIndex((s) => Math.max(0, s - 1));
//   const goNext = () => setSelectedLectureIndex((s) => Math.min(lectures.length - 1, s + 1));

//   return (
//     <Layout>
//       <div className="min-h-screen  py-6">
//         <div className="container bg-gray-100 mx-auto px-4">
//           {/* Top header with back and course info */}
//           <div className="flex bg-white items-center justify-between mb-6 gap-4">
//             <div className="flex items-center gap-3">
//               <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
//                 <ArrowLeft className="h-4 w-4 mr-1" />
//                 Back
//               </Button>
//               <div>
//                 <h2 className="text-lg font-semibold">{courseDetails?.title || "Course"}</h2>
//                 <p className="text-sm text-muted-foreground">{courseDetails?.subtitle}</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="text-right hidden sm:block">
//                 <div className="text-sm text-muted-foreground">Progress</div>
//                 <div className="flex items-center gap-3">
//                   <div className="w-40">
//                     <Progress value={progress} className="h-2 rounded-full" />
//                   </div>
//                   <div className="text-sm font-medium">{Math.round(progress)}%</div>
//                 </div>
//               </div>

//               {role === "ADMIN" && (
//                 <Button onClick={() => navigate("/course/addlecture", { state: courseDetails })}>
//                   <Plus className="h-4 w-4 mr-2" />Add Lecture
//                 </Button>
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//             {/* Sidebar */}
//             <aside
//               className={`lg:col-span-4 xl:col-span-3 bg-white transition-all duration-300 ${
//                 sidebarOpen ? "block" : "hidden lg:block"
//               }`}
//             >
//               <Card className="h-full shadow-lg sticky top-6">
//                 <CardHeader>
//                   <div className="flex items-center justify-between">
//                     <CardTitle className="text-base">Course Content</CardTitle>
//                     <div className="flex items-center gap-2">
//                       <button
//                         className="hidden lg:inline-flex items-center gap-2 text-sm px-2 py-1 rounded-md hover:bg-muted"
//                         onClick={() => setSidebarOpen((s) => !s)}
//                       >
//                         {sidebarOpen ? "Collapse" : "Expand"}
//                       </button>
//                       <button
//                         className="inline-flex lg:hidden items-center gap-2 text-sm px-2 py-1 rounded-md hover:bg-muted"
//                         onClick={() => setSidebarOpen((s) => !s)}
//                         aria-label="Toggle sidebar"
//                       >
//                         {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
//                       </button>
//                     </div>
//                   </div>
//                 </CardHeader>

//                 <CardContent className="p-0">
//                   <div className="px-4 pb-4 pt-2">
//                     <div className="flex items-center justify-between mb-3">
//                       <div className="text-sm text-muted-foreground">{completedCount} / {lectures.length} completed</div>
//                       <div className="text-sm font-semibold">{Math.round(progress)}%</div>
//                     </div>
//                     <ScrollArea className="h-[520px]">
//                       <ul className="space-y-2">
//                         {lectures.length === 0 && (
//                           <li className="text-center text-sm text-muted-foreground py-6">No lectures yet</li>
//                         )}

//                         {lectures.map((lecture, i) => (
//                           <li key={lecture._id}>
//                             <button
//                               onClick={() => {
//                                 setSelectedLectureIndex(i);
//                                 setActiveTab("video");
//                               }}
//                               className={`w-full p-3 rounded-lg flex items-start gap-3 transition-shadow hover:shadow-md focus:shadow-md text-left ${
//                                 selectedLectureIndex === i ? "bg-gradient-to-r from-primary/10 to-transparent ring-1 ring-primary/20" : "bg-white"
//                               }`}
//                             >
//                               <div className="shrink-0 mt-1">
//                                 {lecture.completed ? (
//                                   <CheckCircle2 className="h-5 w-5 text-secondary" />
//                                 ) : (
//                                   <div className="h-5 w-5 rounded-full border-2 border-slate-200" />
//                                 )}
//                               </div>

//                               <div className="flex-1 min-w-0">
//                                 <div className="flex items-center justify-between gap-2">
//                                   <div className="text-sm font-medium truncate">Lecture {i + 1}: {lecture.title}</div>
//                                   <div className="text-xs text-muted-foreground">{lecture.duration || ''}</div>
//                                 </div>
//                                 <div className="text-xs text-muted-foreground truncate mt-1">{lecture.description}</div>

//                                 {role === "ADMIN" && (
//                                   <div className="mt-2">
//                                     <Button
//                                       size="sm"
//                                       variant="ghost"
//                                       className="h-7 px-2 text-destructive"
//                                       onClick={(e) => {
//                                         e.stopPropagation();
//                                         handleLectureDelete(courseDetails._id, lecture._id);
//                                       }}
//                                     >
//                                       <Trash2 className="h-3 w-3 mr-1" /> Delete
//                                     </Button>
//                                   </div>
//                                 )}
//                               </div>
//                             </button>
//                           </li>
//                         ))}
//                       </ul>
//                     </ScrollArea>
//                   </div>
//                 </CardContent>
//               </Card>
//             </aside>

//             {/* Main area */}
//             <main className="lg:col-span-8 xl:col-span-9">
//               {selectedLecture ? (
//                 <div className="space-y-6">
//                   <Card className="shadow-lg">
//                     <CardHeader>
//                       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//                         <div>
//                           <CardTitle className="text-lg">{selectedLecture.title}</CardTitle>
//                           {selectedLecture.description && <p className="text-sm text-muted-foreground mt-1">{selectedLecture.description}</p>}
//                         </div>

//                         <div className="flex items-center gap-3">
//                           <div className="hidden sm:flex items-center gap-2">
//                             <div className="text-xs text-muted-foreground">Lecture</div>
//                             <div className="px-2 py-1 bg-muted rounded text-sm">{selectedLectureIndex + 1} / {lectures.length}</div>
//                           </div>

//                           <div className="flex items-center gap-2">
//                             <Button variant="outline" size="sm" disabled={selectedLectureIndex === 0} onClick={goPrev}>
//                               <ChevronLeft className="h-4 w-4" />
//                               Prev
//                             </Button>

//                             <Button size="sm" onClick={() => {/* mark as complete - leave existing action for integration */}}>
//                               Mark Complete
//                             </Button>

//                             <Button variant="outline" size="sm" disabled={selectedLectureIndex === lectures.length - 1} onClick={goNext}>
//                               Next
//                               <ChevronRight className="h-4 w-4" />
//                             </Button>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="mt-4">
//                         <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)}>
//                           <TabsList className="grid grid-cols-3 w-full">
//                             <TabsTrigger value="video"><PlayCircle className="h-4 w-4 mr-2"/>Video</TabsTrigger>
//                             <TabsTrigger value="homework"><ClipboardList className="h-4 w-4 mr-2"/>Homework</TabsTrigger>
//                             <TabsTrigger value="notes"><FileText className="h-4 w-4 mr-2"/>Notes</TabsTrigger>
//                           </TabsList>
//                         </Tabs>
//                       </div>
//                     </CardHeader>

//                     <CardContent className="p-6">
//                       {activeTab === "video" && (
//                         <div className="space-y-4">
//                           {selectedLecture.lecture?.secure_url ? (
//                             <div>
//                               <div className="w-full rounded-lg overflow-hidden shadow-sm bg-black/80 aspect-video">
//                                 <video
//                                   src={selectedLecture.lecture.secure_url}
//                                   controls
//                                   className="w-full h-full object-cover"
//                                   controlsList="nodownload"
//                                   title={selectedLecture.title}
//                                   playsInline
//                                 />
//                               </div>

//                               <div className="flex items-center justify-between mt-3 gap-3 flex-col sm:flex-row">
//                                 <div className="text-sm text-muted-foreground">{selectedLecture.lectureNotes || ''}</div>
//                                 <div className="flex items-center gap-2">
//                                   <Button variant="outline" size="sm" disabled={selectedLectureIndex === 0} onClick={goPrev}>Prev</Button>
//                                   <Button size="sm" onClick={() => { /* keep for integration */ }}>Mark as Complete</Button>
//                                   <Button variant="outline" size="sm" disabled={selectedLectureIndex === lectures.length - 1} onClick={goNext}>Next</Button>
//                                 </div>
//                               </div>
//                             </div>
//                           ) : (
//                             <div className="text-center text-muted-foreground py-14">No video available for this lecture</div>
//                           )}
//                         </div>
//                       )}

//                       {activeTab === "homework" && (
//                         <div className="space-y-4">
//                           <div>
//                             <h3 className="text-lg font-semibold">Practice Questions</h3>
//                             <p className="text-sm text-muted-foreground">Test your understanding with these questions. Expand to view answers or load solutions.</p>
//                           </div>

//                           <Separator />

//                           {selectedLecture.homeworks?.length === 0 && (
//                             <p className="text-sm text-muted-foreground text-center py-6">No homework available yet</p>
//                           )}

//                           {selectedLecture.homeworks?.map((hw) => (
//                             <div key={hw._id} className="space-y-4">
//                               <div className="flex items-center justify-between">
//                                 <div>
//                                   <div className="text-sm font-semibold text-primary">{hw.title}</div>
//                                   {hw.description && <div className="text-xs text-muted-foreground">{hw.description}</div>}
//                                 </div>
//                                 {role === "ADMIN" && <div className="text-xs text-muted-foreground">Admin</div>}
//                               </div>

//                               <div className="space-y-3">
//                                 {hw.questions?.map((question, index) => (
//                                   <Card key={question._id} className="p-0">
//                                     <Collapsible>
//                                       <CollapsibleTrigger asChild>
//                                         <button
//                                           onClick={() => toggleQuestion(question._id)}
//                                           className="w-full text-left p-4 flex items-start justify-between gap-4 hover:bg-muted/50 transition-colors"
//                                         >
//                                           <div className="flex-1">
//                                             <div className="flex items-start gap-3">
//                                               <div className="text-sm font-medium text-primary">Q{index + 1}.</div>
//                                               <div className="min-w-0">
//                                                 <HtmlMathContent content={question.text} />
//                                               </div>
//                                             </div>
//                                           </div>

//                                           <div className="shrink-0">
//                                             {expandedQuestions.has(question._id) ? (
//                                               <ChevronUp className="h-5 w-5 text-muted-foreground" />
//                                             ) : (
//                                               <ChevronDown className="h-5 w-5 text-muted-foreground" />
//                                             )}
//                                           </div>
//                                         </button>
//                                       </CollapsibleTrigger>

//                                       <CollapsibleContent>
//                                         <div className="p-4 bg-muted rounded-b">
//                                           {question.solution ? (
//                                             <div className="border-l-4 border-secondary/60 pl-4">
//                                               <div className="font-semibold text-secondary mb-2">Answer</div>
//                                               <HtmlMathContent content={question.solution} />
//                                             </div>
//                                           ) : (
//                                             <div className="flex items-center gap-3">
//                                               <div className="flex-1 text-sm text-muted-foreground">Solution not loaded.</div>
//                                               <Button size="sm" onClick={() => handleFetchSolution(hw._id, question._id)}>Load Solution</Button>
//                                             </div>
//                                           )}
//                                         </div>
//                                       </CollapsibleContent>
//                                     </Collapsible>
//                                   </Card>
//                                 ))}
//                               </div>

//                               {/* moved Add Homework form out of per-homework block so it doesn't repeat for each homework */}
//                             </div>
//                           ))}

//                           {role === "ADMIN" && (
//                             <>
//                               <Separator className="my-6" />
//                               <div className="space-y-4">
//                                 <h3 className="text-lg font-semibold">Add Homework</h3>
//                                 <DynamicHomeworkForm
//                                   courseId={courseDetails._id}
//                                   lectureId={selectedLecture._id}
//                                   onAdded={() => dispatch(getCourseLecture(courseDetails._id))}
//                                 />
//                               </div>
//                             </>
//                           )}
//                         </div>
//                       )}

//                       {activeTab === "notes" && (
//                         <div className="space-y-4">
//                           <div className="flex items-center justify-between">
//                             <h3 className="text-lg font-semibold">Lecture Notes</h3>
//                             {role === "ADMIN" && (
//                               <div className="flex items-center gap-2">
//                                 {isEditingNotes ? (
//                                   <>
//                                     <Button size="sm" onClick={handleSaveNotes}>Save</Button>
//                                     <Button size="sm" variant="outline" onClick={() => { setNotesDraft(selectedLecture.notes || ""); setIsEditingNotes(false); }}>Cancel</Button>
//                                   </>
//                                 ) : (
//                                   <Button size="sm" onClick={() => setIsEditingNotes(true)}>Edit Notes</Button>
//                                 )}
//                               </div>
//                             )}
//                           </div>

//                           {isEditingNotes && role === "ADMIN" ? (
//                             <div className="space-y-4">
//                               <div>
//                                 <label className="text-sm font-medium mb-2 block">Edit Notes (Markdown & LaTeX supported)</label>
//                                 <textarea value={notesDraft} onChange={(e) => setNotesDraft(e.target.value)} className="w-full min-h-[220px] p-4 bg-white rounded-lg border border-input resize-vertical" placeholder="Enter lecture notes here..." />
//                               </div>

//                               <div>
//                                 <label className="text-sm font-medium mb-2 block">Preview</label>
//                                 <div className="bg-muted/50 p-6 rounded-lg border border-input">
//                                   <HtmlMathContent content={notesDraft || "No notes to preview"} />
//                                 </div>
//                               </div>
//                             </div>
//                           ) : (
//                             <div className="bg-muted/50 p-6 rounded-lg">
//                               {selectedLecture.notes ? <HtmlMathContent content={selectedLecture.notes} /> : <p className="text-sm text-muted-foreground italic">No notes available for this lecture</p>}
//                             </div>
//                           )}
//                         </div>
//                       )}
//                     </CardContent>
//                   </Card>
//                 </div>
//               ) : (
//                 <Card className="shadow-lg p-6">
//                   <div className="text-center text-muted-foreground">Select a lecture from the left to view details</div>
//                 </Card>
//               )}
//             </main>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }
"use client"
import { useEffect, useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import Layout from "../../Layout/Layout"
import {
  deleteCourseLecture,
  getCourseLecture,
  getQuestionSolution,
  updateLectureNotes,
  deleteHomeworkQuestion,
  deleteHomework
} from "../../Redux/lectureSlice"
import HtmlMathContent from "../../Components/HtmlMathContent"
import DynamicHomeworkForm from "./homeworkForm"
import {
  FiPlayCircle as PlayCircle,
  FiFileText as FileText,
  FiClipboard as ClipboardList,
  FiChevronDown as ChevronDown,
  FiChevronUp as ChevronUp,
  FiCheckCircle as CheckCircle2,
  FiTrash2 as Trash2,
  FiPlus as Plus,
  FiArrowLeft as ArrowLeft,
  FiChevronLeft as ChevronLeft,
  FiChevronRight as ChevronRight,
  FiMenu as Menu,
  FiX as X,
} from "react-icons/fi"

const DisplayLectures = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { lectures = [] } = useSelector((state) => state.lecture || {})
  const { role } = useSelector((state) => state.auth || {})
  const courseDetails = useLocation().state || {}

  const [selectedLectureIndex, setSelectedLectureIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("video")
  const [expandedQuestions, setExpandedQuestions] = useState(new Set())
  const [notesDraft, setNotesDraft] = useState("")
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const selectedLecture = useMemo(
    () => lectures?.[selectedLectureIndex] || null,
    [selectedLectureIndex, lectures],
  )

  useEffect(() => {
    if (!courseDetails?._id) return navigate(-1)
    dispatch(getCourseLecture(courseDetails._id))
  }, [dispatch, courseDetails?._id, navigate])

  useEffect(() => {
    if (selectedLecture) {
      setNotesDraft(selectedLecture.notes || "")
      setIsEditingNotes(false)
    }
  }, [selectedLecture])

  const handleLectureDelete = async (courseId, lectureId) => {
    if (window.confirm("Are you sure you want to delete this lecture?")) {
      const res = await dispatch(deleteCourseLecture({ courseId, lectureId }))
      if (res?.payload?.success) {
        toast.success("Lecture deleted successfully")
        dispatch(getCourseLecture(courseDetails._id))
        setSelectedLectureIndex(0)
      } else {
        toast.error("Could not delete lecture")
      }
    }
  }

  // --- THIS FUNCTION IS NOW FIXED ---
  const handleDeleteQuestion = async (hwId, questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      const data = {
        courseId: courseDetails._id, // Fixed: Use courseDetails
        lectureId: selectedLecture._id, // Fixed: Use selectedLecture
        hwId: hwId,
        questionId: questionId,
      }
      const res = await dispatch(deleteHomeworkQuestion(data))
      if (res?.payload?.success) {
        toast.success("Question deleted successfully")
        // Refresh lectures to show updated homework
        dispatch(getCourseLecture(courseDetails._id))
      } else {
        toast.error("Failed to delete question")
      }
    }
  }
  // -----------------------------------

  const handleDeleteHomework = async (hwId) => {
  if (window.confirm("Are you sure you want to delete this entire homework assignment?")) {
    const data = {
      courseId: courseDetails._id,
      lectureId: selectedLecture._id,
      hwId: hwId,
    }
    const res = await dispatch(deleteHomework(data))
    if (res?.payload?.success) {
      toast.success("Homework deleted successfully")
      // Refresh lectures to show updated list
      dispatch(getCourseLecture(courseDetails._id))
    } else {
      toast.error("Failed to delete homework")
    }
  }
}
  const handleFetchSolution = async (hwId, questionId) => {
    const res = await dispatch(
      getQuestionSolution({
        courseId: courseDetails._id,
        lectureId: selectedLecture._id,
        hwId,
        questionId,
      }),
    )
    if (res?.payload?.solution) {
      toast.success("Solution loaded")
      // Refresh lectures to get the loaded solution
      dispatch(getCourseLecture(courseDetails._id))
    }
  }

  const handleSaveNotes = async () => {
    const res = await dispatch(
      updateLectureNotes({
        courseId: courseDetails._id,
        lectureId: selectedLecture._id,
        notes: notesDraft,
      }),
    )
    if (res?.payload?.success) {
      toast.success("Notes saved successfully")
      setIsEditingNotes(false)
      // Refresh lectures to get updated notes
      dispatch(getCourseLecture(courseDetails._id))
    } else {
      toast.error("Failed to save notes")
    }
  }

  const toggleQuestion = (questionId) => {
    const newExpanded = new Set(expandedQuestions)
    if (newExpanded.has(questionId)) newExpanded.delete(questionId)
    else newExpanded.add(questionId)
    setExpandedQuestions(newExpanded)
  }

  const completedCount = lectures?.filter((l) => l.completed)?.length || 0
  const progress =
    lectures?.length > 0 ? (completedCount / lectures.length) * 100 : 0

  const goPrev = () => setSelectedLectureIndex((s) => Math.max(0, s - 1))
  const goNext = () =>
    setSelectedLectureIndex((s) => Math.min(lectures.length - 1, s + 1))

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Header */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {courseDetails?.title || "Course"}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {courseDetails?.subtitle || "Lecture Player"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs text-gray-600 font-medium">
                      Progress
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {Math.round(progress)}%
                      </div>
                    </div>
                  </div>
                </div>

                {role === "ADMIN" && (
                  <button
                    onClick={() =>
                      navigate("/course/addlecture", { state: courseDetails })
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    <Plus className="w-4 h-4" />
                    Add Lecture
                  </button>
                )}

                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {sidebarOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar */}
            <aside
              className={`lg:col-span-4 xl:col-span-3 transition-all duration-300 ${
                sidebarOpen ? "block" : "hidden lg:block"
              }`}
            >
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6 max-h-[calc(100vh-120px)] overflow-y-auto">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Course Content
                </h3>

                <div className="mb-4">
                  <div className="text-sm text-gray-600 font-medium">
                    {completedCount} of {lectures.length} completed
                  </div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {Math.round(progress)}% complete
                  </div>
                </div>

                <div className="border-t border-gray-200 my-4" />

                <ul className="space-y-2">
                  {lectures.length === 0 && (
                    <li className="text-center text-sm text-gray-500 py-6">
                      No lectures yet
                    </li>
                  )}

                  {lectures.map((lecture, i) => (
                    <li key={lecture._id}>
                      <button
                        onClick={() => {
                          setSelectedLectureIndex(i)
                          setActiveTab("video")
                          setSidebarOpen(false) // Close sidebar on mobile after selection
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                          selectedLectureIndex === i
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 shadow-md"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {lecture.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5" />
                          )}

                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-gray-900 truncate">
                              Lecture {i + 1}: {lecture.title}
                            </div>
                            <div className="text-xs text-gray-600 truncate mt-1">
                              {lecture.description || "No description"}
                            </div>
                            {role === "ADMIN" && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleLectureDelete(
                                    courseDetails._id,
                                    lecture._id,
                                  )
                                }}
                                className="mt-2 text-xs px-2 py-1 text-red-600 hover:bg-red-50 rounded transition-colors flex items-center gap-1"
                              >
                                <Trash2 className="w-3 h-3" /> Delete
                              </button>
                            )}
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-8 xl:col-span-9">
              {selectedLecture ? (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Lecture Header */}
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            {selectedLecture.title}
                          </h3>
                          {selectedLecture.description && (
                            <p className="text-gray-600 mt-2">
                              {selectedLecture.description}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-sm bg-blue-50 px-3 py-1 rounded-lg w-fit">
                          <span className="text-gray-600 font-medium">
                            Lecture
                          </span>
                          <span className="font-bold text-blue-600">
                            {selectedLectureIndex + 1} / {lectures.length}
                          </span>
                        </div>
                      </div>

                      {/* Tab Navigation */}
                      <div className="mt-6 -mb-px flex gap-4 border-b border-gray-200">
                        {[
                          { id: "video", icon: PlayCircle, label: "Video" },
                          {
                            id: "homework",
                            icon: ClipboardList,
                            label: "Homework",
                          },
                          { id: "notes", icon: FileText, label: "Notes" },
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-3 px-1 sm:px-4 font-medium transition-colors flex items-center gap-2 border-b-2 ${
                              activeTab === tab.id
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900"
                            }`}
                          >
                            <tab.icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{tab.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-4 sm:p-6">
                      {activeTab === "video" && (
                        <div className="space-y-4">
                          {selectedLecture.lecture?.secure_url ? (
                            <div className="space-y-4">
                              <div className="w-full rounded-lg overflow-hidden shadow-lg bg-black aspect-video">
                                <video
                                  key={selectedLecture.lecture.secure_url} // Add key to re-mount video player
                                  src={selectedLecture.lecture.secure_url}
                                  controls
                                  controlsList="nodownload"
                                  className="w-full h-full"
                                  title={selectedLecture.title}
                                  playsInline
                                />
                              </div>

                              <div className="flex flex-wrap gap-3 justify-between items-center">
                                <div className="text-sm text-gray-600">
                                  {selectedLecture.duration &&
                                    `Duration: ${selectedLecture.duration}`}
                                </div>

                                <div className="flex gap-2">
                                  <button
                                    disabled={selectedLectureIndex === 0}
                                    onClick={goPrev}
                                    className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    <ChevronLeft className="w-4 h-4" /> Previous
                                  </button>

                                  <button
                                    onClick={() =>
                                      toast.success("Marked as complete!")
                                    }
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                                  >
                                    <CheckCircle2 className="w-4 h-4" />{" "}
                                    Complete
                                  </button>

                                  <button
                                    disabled={
                                      selectedLectureIndex ===
                                      lectures.length - 1
                                    }
                                    onClick={goNext}
                                    className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    Next{" "}
                                    <ChevronRight className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center text-gray-500 py-12">
                              <PlayCircle className="w-12 h-12 mx-auto mb-3 opacity-40" />
                              <p>No video available for this lecture</p>
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === "homework" && (
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">
                              Practice Questions
                            </h4>
                            <p className="text-gray-600 text-sm">
                              Test your understanding with these questions.
                              Click to expand and view answers.
                            </p>
                          </div>

                          <div className="border-t border-gray-200 pt-4" />

                          {selectedLecture.homeworks?.length === 0 ? (
                            <div className="text-center py-8">
                              <ClipboardList className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                              <p className="text-gray-500">
                                No homework available for this lecture
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {selectedLecture.homeworks.map((hw) => (
                                <div
                                  key={hw._id}
                                  className="border border-gray-200 rounded-lg p-4 space-y-3"
                                >
                                  <div>
                                    <h5 className="font-semibold text-blue-600">
                                      {hw.title}
                                    </h5>
                                    {role === "ADMIN" && (
                                      <button
                                        onClick={() =>
                                          handleDeleteHomework(hw._id)
                                        }
                                        className="inline-flex items-center transition-colors"
                                      >
                                        <Trash2 className="w-4 h-4 text-red-500" /> 
                                      </button>
                                    )}
                                    {hw.description && (
                                      <p className="text-sm text-gray-600 mt-1">
                                        {hw.description}
                                      </p>
                                    )}
                                  </div>

                                  <div className="space-y-2">
                                    {hw.questions?.map((question, idx) => (
                                      <div
                                        key={question._id}
                                        className="border border-gray-200 rounded-lg"
                                      >
                                        <button
                                          onClick={() =>
                                            toggleQuestion(question._id)
                                          }
                                          className="w-full text-left p-3 hover:bg-gray-50 transition-colors"
                                        >
                                          <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                              <div className="flex items-start gap-2">
                                                <span className="font-semibold text-blue-600 flex-shrink-0">
                                                  Q{idx + 1}.
                                                </span>
                                                <div className="text-gray-900 text-sm">
                                                  <HtmlMathContent
                                                    htmlContent={question.text}
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            {/* --- CONTAINER FOR BUTTONS --- */}
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                              {role === "ADMIN" && (
                                                <button
                                                  onClick={(e) => {
                                                    e.stopPropagation() // Prevent toggle
                                                    handleDeleteQuestion(
                                                      hw._id,
                                                      question._id,
                                                    )
                                                  }}
                                                  className="p-1 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                                                  title="Delete question"
                                                >
                                                  <Trash2 className="w-4 h-4" />
                                                </button>
                                              )}
                                              {expandedQuestions.has(
                                                question._id,
                                              ) ? (
                                                <ChevronUp className="w-5 h-5 text-gray-400" />
                                              ) : (
                                                <ChevronDown className="w-5 h-5 text-gray-400" />
                                              )}
                                            </div>
                                            {/* ----------------------------- */}
                                          </div>
                                        </button>

                                        {expandedQuestions.has(
                                          question._id,
                                        ) && (
                                          <div className="mt-3 pt-3 border-t border-gray-200 p-3">
                                            {question.solution ? (
                                              <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-600">
                                                <div className="text-sm font-semibold text-blue-900 mb-2">
                                                  Answer:
                                                </div>
                                                <div className="text-gray-800 text-sm">
                                                  <HtmlMathContent
                                                    htmlContent={
                                                      question.solution
                                                    }
                                                  />
                                                </div>
                                              </div>
                                            ) : (
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation()
                                                  handleFetchSolution(
                                                    hw._id,
                                                    question._id,
                                                  )
                                                }}
                                                className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition-colors"
                                              >
                                                Load Solution
                                              </button>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {role === "ADMIN" && (
                            <div className="border-t border-gray-200 pt-6 mt-6">
                              <h4 className="text-lg font-bold text-gray-900 mb-4">
                                Add Homework
                              </h4>
                              <DynamicHomeworkForm
                                courseId={courseDetails._id}
                                lectureId={selectedLecture._id}
                                onAdded={() =>
                                  dispatch(getCourseLecture(courseDetails._id))
                                }
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === "notes" && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-bold text-gray-900">
                              Lecture Notes
                            </h4>
                            {role === "ADMIN" && (
                              <div className="flex gap-2">
                                {isEditingNotes ? (
                                  <>
                                    <button
                                      onClick={handleSaveNotes}
                                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={() => {
                                        setNotesDraft(
                                          selectedLecture.notes || "",
                                        )
                                        setIsEditingNotes(false)
                                      }}
                                      className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded-lg text-sm font-medium transition-colors"
                                    >
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    onClick={() => setIsEditingNotes(true)}
                                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                                  >
                                    Edit
                                  </button>
                                )}
                              </div>
                            )}
                          </div>

                          {isEditingNotes && role === "ADMIN" ? (
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-semibold text-gray-900 block mb-2">
                                  Edit Notes (Markdown & LaTeX supported)
                                </label>
                                <textarea
                                  value={notesDraft}
                                  onChange={(e) => setNotesDraft(e.target.value)}
                                  className="w-full min-h-[250px] p-4 border border-gray-300 rounded-lg bg-white text-gray-900 resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Enter your lecture notes here..."
                                />
                              </div>

                              <div>
                                <label className="text-sm font-semibold text-gray-900 block mb-2">
                                  Preview
                                </label>
                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 min-h-[100px]">
                                  <HtmlMathContent
                                    htmlContent={
                                      notesDraft || "No notes to preview"
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 min-h-[100px]">
                              {selectedLecture.notes ? (
                                <HtmlMathContent
                                  htmlContent={selectedLecture.notes}
                                />
                              ) : (
                                <p className="text-gray-600 italic">
                                  No notes available for this lecture
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <PlayCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-600 text-lg">
                    {lectures.length > 0
                      ? "Select a lecture from the left to begin learning"
                      : "Loading lectures..."}
                  </p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DisplayLectures
