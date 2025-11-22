import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import { RxCrossCircled } from 'react-icons/rx';

const CheckoutFail = () => {
  const { state: courseData } = useLocation();
  const navigate = useNavigate();

  return (
    <Layout>
      {/* container for checkout fail card  */}
      <div className="min-h-[90vh] flex items-center justify-center text-white">
        {/* card to display message */}
        <div className="w-80 h-auto flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-red-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
            Payment Failed
          </h1>

          <div className="px-4 flex flex-col items-center justify-center space-y-4 pt-16 pb-16">
            <RxCrossCircled className="text-6xl text-red-500" />

            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold">Oops! Payment Failed</h2>
              <p className="text-gray-300">
                We were unable to process your payment. Please try again or contact support.
              </p>
              <p className="text-yellow-400 font-semibold">
                Course: {courseData?.title}
              </p>
            </div>
          </div>

          {/* buttons to retry or go back */}
          <div className="flex gap-2 absolute bottom-0 w-full">
            <button
              onClick={() =>
                navigate('/checkout', { state: { ...courseData } })
              }
              className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 flex-1 text-center py-3 text-lg font-bold rounded-bl-lg"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/courses')}
              className="bg-blue-500 hover:bg-blue-600 transition-all ease-in-out duration-300 flex-1 text-center py-3 text-lg font-bold rounded-br-lg"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutFail;
