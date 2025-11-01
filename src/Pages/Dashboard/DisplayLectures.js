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

// components/Course/DisplayLectures.jsx// components/Course/DisplayLectures.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import MathContent from "../../Components/MathContent";
import {
  deleteCourseLecture,
  getCourseLecture,
  addHomeworkToLecture,
  getQuestionSolution,
  updateLectureNotes,
} from "../../Redux/lectureSlice";
import { toast } from "react-hot-toast";
import DynamicHomeworkForm from "./homeworkForm";

// ✅ Reusable modal wrapper
const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3">
    <div className="bg-[#0b1220] w-[95%] md:w-[70%] max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-yellow-400">{title}</h2>
        <button
          onClick={onClose}
          className="text-xl text-gray-300 hover:text-white transition"
        >
          ✕
        </button>
      </div>
      {children}
    </div>
  </div>
);

const DisplayLectures = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);
  const courseDetails = useLocation().state;

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [selectedLectureIndex, setSelectedLectureIndex] = useState(null);

  // modals
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  // notes edit
  const [notesDraft, setNotesDraft] = useState("");

  const selectedLecture = useMemo(
    () =>
      selectedLectureIndex !== null ? lectures[selectedLectureIndex] : null,
    [selectedLectureIndex, lectures]
  );

  // fetch course lectures
  useEffect(() => {
    if (!courseDetails?._id) return navigate(-1);
    dispatch(getCourseLecture(courseDetails._id));
  }, [dispatch, courseDetails?._id, navigate]);

  // ✅ Delete lecture
  const handleLectureDelete = async (courseId, lectureId) => {
    const res = await dispatch(deleteCourseLecture({ courseId, lectureId }));
    if (res?.payload?.success) {
      toast.success("Lecture deleted successfully");
      dispatch(getCourseLecture(courseDetails._id));
      setCurrentVideoIndex(0);
    }
  };

  // ✅ Homework: fetch solution for question
  const handleFetchSolution = async (hwId, questionId) => {
    const res = await dispatch(
      getQuestionSolution({
        courseId: courseDetails._id,
        lectureId: selectedLecture._id,
        hwId,
        questionId,
      })
    );
    if (res?.payload?.solution) {
      toast.success("Solution loaded");
      dispatch(getCourseLecture(courseDetails._id));
    }
  };

  // ✅ Notes: save
  const handleSaveNotes = async () => {
    const res = await dispatch(
      updateLectureNotes({
        courseId: courseDetails._id,
        lectureId: selectedLecture._id,
        notes: notesDraft,
      })
    );
    if (res?.payload?.success) {
      toast.success("Notes saved successfully");
      closeModal();
      dispatch(getCourseLecture(courseDetails._id));
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-10 min-h-[90vh] py-10 text-white mx-[5%]">
        <h1 className="text-center text-2xl font-semibold text-yellow-500">
          {courseDetails?.title}
        </h1>

        <div className="flex flex-col md:flex-row justify-center gap-10 w-full">
          {/* ▶️ Current video section */}
          <div className="w-full md:w-[50%] rounded-lg shadow-lg bg-[#0c1222] p-3">
            {lectures?.[currentVideoIndex]?.lecture?.secure_url ? (
              <video
                src={lectures[currentVideoIndex].lecture.secure_url}
                controls
                autoPlay
                muted
                controlsList="nodownload"
                className="w-full rounded-lg mb-3"
              />
            ) : (
              <div className="text-center text-gray-400 py-10">
                No video available
              </div>
            )}
            <h2 className="font-semibold text-yellow-400">
              {lectures?.[currentVideoIndex]?.title}
            </h2>
            <p className="text-sm text-gray-300 mt-1">
              {lectures?.[currentVideoIndex]?.description}
            </p>
          </div>

          {/* 📚 Lecture List */}
          <ul className="w-full md:w-[40%] rounded-lg shadow-lg bg-[#0c1222] p-3 space-y-4">
            <li className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-yellow-400">
                Lectures List
              </h3>
              {role === "ADMIN" && (
                <button
                  onClick={() =>
                    navigate("/course/addlecture", { state: courseDetails })
                  }
                  className="px-3 py-1 bg-amber-600 rounded text-sm hover:bg-amber-500"
                >
                  + Add
                </button>
              )}
            </li>

            {lectures?.length === 0 && (
              <li className="text-gray-400 text-sm text-center">
                No lectures yet
              </li>
            )}

            {lectures?.map((lecture, i) => (
              <li
                key={lecture._id}
                className="border-b border-gray-700 pb-3 last:border-none"
              >
                <div className="flex justify-between items-start">
                  <div
                    onClick={() => setCurrentVideoIndex(i)}
                    className="cursor-pointer"
                  >
                    <p className="font-medium">
                      <span className="text-yellow-500">Lecture {i + 1}: </span>
                      {lecture.title}
                    </p>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {lecture.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setSelectedLectureIndex(i);
                        setActiveModal("video");
                      }}
                      className="px-2 py-1 bg-blue-600 rounded text-sm"
                    >
                      Video
                    </button>
                    <button
                      onClick={() => {
                        setSelectedLectureIndex(i);
                        setActiveModal("homework");
                      }}
                      className="px-2 py-1 bg-amber-600 rounded text-sm"
                    >
                      Homework
                    </button>
                    <button
                      onClick={() => {
                        setSelectedLectureIndex(i);
                        setNotesDraft(lecture.notes || "");
                        setActiveModal("notes");
                      }}
                      className="px-2 py-1 bg-green-600 rounded text-sm"
                    >
                      Notes
                    </button>
                    {role === "ADMIN" && (
                      <button
                        onClick={() =>
                          handleLectureDelete(courseDetails._id, lecture._id)
                        }
                        className="px-2 py-1 bg-red-600 rounded text-sm"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* 🧮 NOTES MODAL */}
        {activeModal === "notes" && selectedLecture && (
          <Modal title={`Notes — ${selectedLecture.title}`} onClose={closeModal}>
            <div className="mb-4">
              <h3 className="text-sm text-gray-400 mb-2">Preview</h3>
              <div className="border border-slate-700 rounded p-3 bg-[#0c1222]">
                <MathContent content={selectedLecture.notes || "No notes available"} />
              </div>
            </div>

            {role === "ADMIN" && (
              <>
                <h3 className="text-sm text-gray-400 mb-2">Edit Notes</h3>
                <textarea
                  value={notesDraft}
                  onChange={(e) => setNotesDraft(e.target.value)}
                  className="w-full p-2 bg-transparent border h-48 resize-none rounded"
                />
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleSaveNotes}
                    className="px-3 py-1 bg-green-600 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setNotesDraft(selectedLecture.notes || "")}
                    className="px-3 py-1 bg-gray-700 rounded"
                  >
                    Reset
                  </button>
                </div>
              </>
            )}
          </Modal>
        )}

        {/* 🧾 HOMEWORK MODAL */}
        {activeModal === "homework" && selectedLecture && (
          <Modal title={`Homework — ${selectedLecture.title}`} onClose={closeModal}>
            {(selectedLecture.homeworks || []).map((hw) => (
              <div key={hw._id} className="p-4 mb-4 border border-slate-700 rounded-lg bg-[#0c1222]">
                <h3 className="font-semibold text-lg text-yellow-400">{hw.title}</h3>
                <p className="text-sm text-gray-300 mb-3">{hw.description}</p>

                {(hw.questions || []).map((q) => (
                  <HomeworkQuestion
                    key={q._id}
                    question={q}
                    onFetchSolution={() =>
                      handleFetchSolution(hw._id, q._id)
                    }
                  />
                ))}
              </div>
            ))}

            {role === "ADMIN" && (
              <div className="mt-5 border-t border-slate-700 pt-3">
                <h3 className="font-semibold text-gray-300 mb-2">Add Homework</h3>
                <DynamicHomeworkForm
                  courseId={courseDetails._id}
                  lectureId={selectedLecture._id}
                  onAdded={() => dispatch(getCourseLecture(courseDetails._id))}
                />
              </div>
            )}
          </Modal>
        )}
      </div>
    </Layout>
  );
};

export default DisplayLectures;

// 📘 HomeworkQuestion component
function HomeworkQuestion({ question, onFetchSolution }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleSolution = async () => {
    if (question.solution) return setShow((prev) => !prev);
    setLoading(true);
    await onFetchSolution();
    setLoading(false);
    setShow(true);
  };

  return (
    <div className="p-3 border border-slate-700 rounded bg-[#0d152b] hover:bg-[#111d3b] transition">
      <div className="flex justify-between items-start">
        <MathContent content={question.text} />
        <button
          onClick={toggleSolution}
          className="ml-3 px-3 py-1 text-sm bg-slate-700 hover:bg-slate-600 rounded"
        >
          {loading ? "Loading..." : show ? "Hide" : "Show"}
        </button>
      </div>

      {show && (
        <div className="mt-3 bg-[#101a32] rounded p-3 text-gray-200 border border-slate-700">
          {question.solution ? (
            <MathContent content={question.solution} />
          ) : (
            <p className="italic text-gray-400">Solution not available.</p>
          )}
        </div>
      )}
    </div>
  );
}
