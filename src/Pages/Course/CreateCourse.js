// import React, { useState } from "react";
// import { toast } from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Layout from "../../Layout/Layout";
// import { createNewCourse, updateCourse } from "../../Redux/courseSlice";
// import { AiOutlineArrowLeft } from "react-icons/ai";

// const CreateCourse = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // for getting the data from location of previous component
//   const { initialCourseData } = useLocation().state;

//   // for toggling disable of image input box
//   const [isDisabled, setIsDisabled] = useState(!initialCourseData?.newCourse);

//   // for storing the user input
//   const [userInput, setUserInput] = useState({
//     title: initialCourseData?.title,
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Layout from '../../Layout/Layout';
import { createNewCourse, updateCourse } from '../../Redux/courseSlice';

const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // Support both patterns: location.state or location.state.initialCourseData
  const initial = location.state?.initialCourseData ?? location.state ?? null;

  const [userInput, setUserInput] = useState({
    title: initial?.title || '',
    description: initial?.description || '',
    category: initial?.category || '',
    createdBy: initial?.createdBy || '',
    price: initial?.price || 0,
    thumbnail: null,
    previewImage: initial?.thumbnail?.secure_url || '',
  });

  // handle image selection and show preview
  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setUserInput((prev) => ({ ...prev, previewImage: reader.result, thumbnail: file }));
    };
  };

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { title, description, category, createdBy, price, thumbnail } = userInput;

    if (!title || !description || !category || !createdBy) {
      toast.error('All fields except price are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('createdBy', createdBy);
    formData.append('price', price ?? 0);
    if (thumbnail) formData.append('thumbnail', thumbnail);

    try {
      // debug FormData keys
      // (binary values won't be printed fully)
      for (const pair of formData.entries()) {
        // eslint-disable-next-line no-console
        console.log('FormData:', pair[0], pair[1]);
      }

      let res;
      if (initial && initial._id) {
        // update expects [id, formData]
        res = await dispatch(updateCourse([initial._id, formData])).unwrap();
      } else {
        res = await dispatch(createNewCourse(formData)).unwrap();
      }

      // some thunks return { success: true, ... } or { payload: { success: true } }
      const ok = res?.success || res?.payload?.success || (res && res.success === true);
      if (ok) {
        setUserInput({ title: '', description: '', category: '', createdBy: '', price: 0, thumbnail: null, previewImage: '' });
        navigate('/courses');
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Create/Update course failed:', err);
      const message = err?.message || err?.payload?.message || err?.response?.data?.message || String(err) || 'Failed to create/update course';
      toast.error(message);
    }
  };

  useEffect(() => {
    // If you need to add access control (only admins) you can check user role here and redirect.
  }, []);

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[90vh] py-10 text-white">
        <form onSubmit={handleFormSubmit} className="flex flex-col justify-center gap-5 rounded-lg p-4 w-[700px] my-10 shadow-[0_0_10px_black] relative">
          <Link to={'/admin/dashboard'} className="absolute top-8 text-2xl link text-accent cursor-pointer">
            <AiOutlineArrowLeft />
          </Link>

          <h1 className="text-center text-2xl font-bold">{initial ? 'Update Course' : 'Create New Course'}</h1>

          <main className="grid grid-cols-2 gap-x-10">
            <div className="space-y-6">
              <div>
                <label htmlFor="image_uploads" className="cursor-pointer">
                  {userInput.previewImage ? (
                    <img className="w-full h-44 m-auto border" src={userInput.previewImage} alt="preview" />
                  ) : (
                    <div className="w-full h-44 m-auto flex items-center justify-center border">
                      <h1 className="font-bold text-lg">Upload course thumbnail</h1>
                    </div>
                  )}
                </label>
                <input type="file" name="image_uploads" id="image_uploads" accept=".jpg, .jpeg, .png" className="hidden" onChange={handleImageUpload} />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="text-lg font-semibold">Course Title</label>
                <input type="text" name="title" id="title" placeholder="Enter course title" className="bg-transparent px-2 py-1 border" value={userInput.title} onChange={handleUserInput} />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <label htmlFor="createdBy" className="text-lg font-semibold">Instructor Name</label>
                <input type="text" name="createdBy" id="createdBy" placeholder="Enter instructor name" className="bg-transparent px-2 py-1 border" value={userInput.createdBy} onChange={handleUserInput} />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="category" className="text-lg font-semibold">Course Category</label>
                <input type="text" name="category" id="category" placeholder="Enter course category" className="bg-transparent px-2 py-1 border" value={userInput.category} onChange={handleUserInput} />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="price" className="text-lg font-semibold">Course Price (in ₹)</label>
                <input type="number" min="0" name="price" id="price" placeholder="Enter course price (e.g., 0 for free)" className="bg-transparent px-2 py-1 border" value={userInput.price} onChange={handleUserInput} />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-lg font-semibold">Course Description</label>
                <textarea name="description" id="description" placeholder="Enter course description" className="bg-transparent px-2 py-1 border h-24 resize-none" value={userInput.description} onChange={handleUserInput} />
              </div>
            </div>
          </main>

          <button type="submit" className="w-full py-2 rounded-sm font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 ease-in-out">
            {initial ? 'Update Course' : 'Create Course'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateCourse;
//                 </label>
