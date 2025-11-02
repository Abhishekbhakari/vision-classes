// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import Layout from "../../Layout/Layout";

// const CourseDescription = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { role, data } = useSelector((state) => state.auth);

//   useEffect(() => {
//     // scroll to the top on page render
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <Layout>
//       {/* wrapper for course description */}
//       <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
//         {/* displaying the course details */}
//         <div className="grid grid-cols-2 gap-10 py-10 relative">
//           {/* creating the left side of description box */}
//           <div className="space-y-5">
//             <img
//               className="w-full h-64"
//               src={state?.thumbnail?.secure_url}
//               alt="thumbnail"
//             />

//             {/* course details */}
//             <div className="space-y-4">
//               <div className="flex items-center justify-between text-xl">
//                 <p className="font-semibold">
//                   <span className="text-yellow-500 font-bold">
//                     Total Lectures :{" "}
//                   </span>
//                   {state.numberOfLectures}
//                 </p>
//                 <p className="font-semibold">
//                   <span className="text-yellow-500 font-bold">
//                     Instructor :{" "}
//                   </span>
//                   {state.createdBy}
//                 </p>
//               </div>

//               {/* adding the subscribe button */}
//               {role === "ADMIN" || data?.subscription?.status === "active" ? (
//                 <button
//                   onClick={() =>
//                     navigate("/course/displaylectures", {
//                       state: { ...state },
//                     })
//                   }
//                   className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
//                 >
//                   Watch Lectures
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => navigate("/checkout")}
//                   className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
//                 >
//                   Subscribe to Course
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* creating the right section of description box */}
//           <div className="space-y-2 text-xl">
//             <h1 className="text-3xl font-bold text-yellow-500 text-center mb-4">
//               {state.title}
//             </h1>

//             <p className="text-yellow-500 font-bold">Course Description :</p>

//             <p>{state.description}</p>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CourseDescription;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import Layout from '../../Layout/Layout';
import {
  getRazorpayKey,
  purchaseCourse,
  verifyCoursePayment,
} from '../../Redux/razorpaySlice';
import { getCourseLectures } from '../../Redux/lectureSlice';

function CourseDescription() {
  const { state } = useLocation(); // course data
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: userData } = useSelector((state) => state.auth);
  const { key: razorpayKey } = useSelector((state) => state.razorpay);

  // Check if the user has already purchased this course
  const isPurchased =
    userData?.purchasedCourses?.find(
      (courseId) => courseId === state._id
    ) || false;

  // Function to handle the payment flow
  async function handlePurchase() {
    if (!razorpayKey) {
      toast.error('Razorpay key not loaded');
      await dispatch(getRazorpayKey());
      return;
    }

    // 1. Create a Razorpay order
    const purchaseResult = await dispatch(
      purchaseCourse({ courseId: state._id })
    );
    
    // Check if order creation was successful
    if (!purchaseResult?.payload?.order) {
      toast.error('Failed to create payment order. Please try again.');
      return;
    }

    const order = purchaseResult.payload.order;

    // 2. Configure Razorpay options
    const options = {
      key: razorpayKey,
      amount: order.amount,
      currency: order.currency,
      name: 'Vision Classes',
      description: 'Course Purchase',
      order_id: order.id,
      
      // 3. Define the handler function for payment success
      handler: async function (response) {
        // 4. Verify the payment
        const verificationData = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          courseId: state._id,
        };

        const verificationResult = await dispatch(
          verifyCoursePayment(verificationData)
        );
        
        // 5. Navigate on successful verification
        if (verificationResult?.payload?.success) {
          toast.success('Payment successful! Course added.');
          navigate('/checkout/success');
        } else {
          toast.error('Payment verification failed. Please contact support.');
          navigate('/checkout/fail');
        }
      },
      prefill: {
        name: userData.fullName,
        email: userData.email,
        // contact: '9999999999' (optional)
      },
      theme: {
        color: '#F37254',
      },
    };

    // 6. Open the Razorpay payment modal
    try {
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Razorpay error:', error);
      toast.error('Razorpay failed to load. Please check your connection.');
    }
  }

  // Function to navigate to lectures
  function navigateToLectures() {
    navigate('/course/displaylectures', { state: { ...state } });
  }

  // Fetch Razorpay key on component mount
  useEffect(() => {
    dispatch(getRazorpayKey());
    // Also preload lectures if purchased, to check access
    if(isPurchased) {
      dispatch(getCourseLectures(state._id));
    }
  }, [dispatch, state._id, isPurchased]);

  return (
    <Layout>
      <div className="min-h-[90vh] pt-12 px-4 sm:px-20 flex flex-col items-center justify-center text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 relative">
          {/* Left Side: Course Details */}
          <div className="space-y-5">
            <img
              className="w-full h-64 rounded-lg"
              alt="thumbnail"
              src={state?.thumbnail?.secure_url}
            />
            <div className="space-y-4">
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <h1 className="text-3xl font-bold text-yellow-500 mb-3">
                  {state?.title}
                </h1>
                <p className="text-xl text-gray-200">{state?.description}</p>
              </div>

              <div className="space-y-1 text-center sm:text-left">
                <p className="text-lg">
                  <span className="text-yellow-500 font-semibold">
                    Instructor:
                  </span>{' '}
                  {state?.createdBy}
                </p>
                <p className="text-lg">
                  <span className="text-yellow-500 font-semibold">
                    Category:
                  </span>{' '}
                  {state?.category}
                </p>
                <p className="text-lg">
                  <span className="text-yellow-500 font-semibold">
                    Total Lectures:
                  </span>{' '}
                  {state?.numberOfLectures}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Price and Buy Button */}
          <div className="flex flex-col items-center justify-start space-y-4 p-6 bg-gray-800 rounded-lg shadow-lg h-fit mt-10 md:mt-0">
            <p className="text-4xl font-bold text-green-400">
              Price: ₹ {state?.price}
            </p>
            
            {isPurchased ? (
              <button
                onClick={navigateToLectures}
                className="bg-green-600 text-white font-bold text-xl rounded-md w-full py-3 hover:bg-green-700 transition-all duration-300"
              >
                Go to Lectures
              </button>
            ) : (
              <button
                onClick={handlePurchase}
                className="bg-yellow-600 text-white font-bold text-xl rounded-md w-full py-3 hover:bg-yellow-700 transition-all duration-300"
              >
                Buy Now
              </button>
            )}
            
            <p className="text-gray-400 text-sm">
              This purchase grants you lifetime access to this course.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CourseDescription;
