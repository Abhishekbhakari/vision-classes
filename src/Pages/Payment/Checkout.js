// import React, { useEffect } from "react";
// import Layout from "../../Layout/Layout";
// import { BiRupee } from "react-icons/bi";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getRazorPayId,
//   purchaseCourseBundle,
//   verifyUserPayment,
// } from "../../Redux/razorpaySlice";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const Checkout = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const razorPayKey = useSelector((state) => state.razorpay.key);
//   const subscription_id = useSelector(
//     (state) => state.razorpay.subscription_id
//   );
//   const userData = useSelector((state) => state.auth.data);
//   const { isPaymentVerified } = useSelector((state) => state.razorpay);

//   // for storing the payment details after successfull transaction
//   const paymentDetails = {
//     razorpay_payment_id: "",
//     razorpay_subscription_id: "",
//     razorpay_signature: "",
//   };

//   const handleSubscription = async (event) => {
//     event.preventDefault();

//     // checking for empty payment credential
//     if (!razorPayKey || !subscription_id) {
//       return;
//     }

//     const options = {
//       key: razorPayKey,
//       subscription_id: subscription_id,
//       name: "Coursify Pvt. Ltd.",
//       description: "Monthly Subscription",
//       handler: async function (response) {
//         paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
//         paymentDetails.razorpay_subscription_id =
//           response.razorpay_subscription_id;
//         paymentDetails.razorpay_signature = response.razorpay_signature;

//         // displaying the success message
//         toast.success("Payment Successfull");

//         // verifying the payment
//         const res = await dispatch(verifyUserPayment(paymentDetails));

//         // redirecting the user according to the verification status
//         !isPaymentVerified
//           ? navigate("/checkout/success")
//           : navigate("/checkout/fail");
//       },
//       prefill: {
//         name: userData.fullName,
//         email: userData.email,
//       },
//       theme: {
//         color: "#F37254",
//       },
//     };
//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   useEffect(() => {
//     (async () => {
//       await dispatch(getRazorPayId());
//       await dispatch(purchaseCourseBundle());
//     })();
//   }, []);

//   return (
//     <Layout>
//       {/* checkout page container */}
//       <form
//         onSubmit={handleSubscription}
//         className="min-h-[90vh] flex items-center justify-center text-white"
//       >
//         {/* checkout card */}
//         <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
//           <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
//             Subscription Bundle
//           </h1>

//           <div className="px-4 space-y-5 text-center">
//             <p className="text-[17px]">
//               This purchase will allow you to access all the available courses
//               of our platform for{" "}
//               <span className="text-yellow-500 font-bold">1 Year Duration</span>
//               . <br />
//               All the existing and new launched courses will be available to you
//               in this subscription bundle
//             </p>

//             <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
//               <BiRupee /> <span>499</span>only
//             </p>

//             <div className="text-gray-200">
//               <p>100% refund at cancellation</p>
//               <p>* Terms & Condition Applied</p>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full text-center py-2 text-xl font-bold rounded-bl-lg rounded-br-lg"
//           >
//             Buy Now
//           </button>
//         </div>
//       </form>
//     </Layout>
//   );
// };

// export default Checkout;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Layout from '../../Layout/Layout';
import {
  createPaymentOrder,
  verifyUserPayment,
  getRazorPayId,
  enrollFreeCourse,
} from '../../Redux/razorpaySlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: courseData } = useLocation(); // Get course data from location state
  const { key, order_id, amount } = useSelector((state) => state.razorpay);
  const { data: userData } = useSelector((state) => state.auth);

  // This is the payment handler, triggered by Razorpay modal
  const handlePayment = async (response) => {
    const paymentDetails = {
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_order_id: response.razorpay_order_id,
      razorpay_signature: response.razorpay_signature,
      courseId: courseData?._id, // Pass courseId for backend verification
    };

    const res = await dispatch(verifyUserPayment(paymentDetails));

    // navigate to success/fail page
    res?.payload?.success
      ? navigate('/checkout/success', { state: courseData })
      : navigate('/checkout/fail', { state: courseData });
  };

  // This function opens the Razorpay modal or handles free enrollment
  const onPurchase = async (e) => {
    e.preventDefault();

    // For FREE courses, handle enrollment directly
    if (courseData?.price <= 0) {
      toast.loading('Enrolling in course...');
      const res = await dispatch(enrollFreeCourse(courseData._id));
      toast.dismiss();
      if (res?.payload?.success) {
        toast.success('Enrolled successfully!');
        navigate('/checkout/success', { state: courseData });
      } else {
        toast.error('Failed to enroll in course');
      }
      return;
    }

    // Check if we have order details from the slice for PAID courses
    if (!key || !order_id || !amount) {
      toast.error('Could not create order, please try again.');
      return;
    }

    const options = {
      key: key,
      amount: amount,
      currency: 'INR',
      name: 'Vision Classes',
      description: `Payment for ${courseData?.title}`, // Use course title
      order_id: order_id,
      handler: handlePayment, // payment callback
      theme: {
        color: '#F37254',
      },
      prefill: {
        name: userData.fullName,
        email: userData.email,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // On component mount
  useEffect(() => {
    // If no course data, redirect
    if (!courseData?._id) {
      toast.error('No course selected');
      navigate('/courses');
      return;
    }

    // Fetch razorpay key
    dispatch(getRazorPayId());

    // Create the order ONLY for PAID courses
    if (courseData.price > 0) {
      dispatch(createPaymentOrder(courseData._id));
    }
  }, [dispatch, courseData, navigate]);

  return (
    <Layout>
      <form
        onSubmit={onPurchase}
        className="min-h-[90vh] flex items-center justify-center text-white"
      >
        <div className="w-80 h-auto flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
            {courseData?.price > 0 ? 'Checkout' : 'Free Enrollment'}
          </h1>

          <div className="px-4 space-y-5 text-center pt-20 pb-20">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">
                Course: {courseData?.title}
              </h2>
              <p className="text-gray-400">
                {courseData?.description?.substring(0, 100)}...
              </p>
              {courseData?.price > 0 ? (
                <p className="text-2xl font-bold text-yellow-500">
                  Price: ₹{courseData?.price}
                </p>
              ) : (
                <p className="text-2xl font-bold text-green-500">FREE</p>
              )}
            </div>

            <p className="text-gray-200">
              {courseData?.price > 0
                ? 'This will grant you lifetime access to this course.'
                : 'Click below to enroll in this free course'}
            </p>
          </div>

          <button
            type="submit"
            className={`${
              courseData?.price > 0
                ? 'bg-yellow-500 hover:bg-yellow-600'
                : 'bg-green-500 hover:bg-green-600'
            } transition-all ease-in-out duration-300 absolute bottom-0 w-full text-center py-3 text-xl font-bold rounded-bl-lg rounded-br-lg`}
          >
            {courseData?.price > 0 ? 'Buy Now' : 'Enroll for Free'}
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Checkout;
