import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import { AiFillCheckCircle } from 'react-icons/ai';

const CheckoutSuccess = () => {
  const { state: courseData } = useLocation();
  const navigate = useNavigate();

  return (
    <Layout>
      {/* container for checkout success card  */}
      <div className="min-h-[90vh] flex items-center justify-center text-white">
        {/* card to display message */}
        <div className="w-80 h-auto flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-green-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
            Success!
          </h1>

          <div className="px-4 flex flex-col items-center justify-center space-y-4 pt-16 pb-16">
            <AiFillCheckCircle className="text-6xl text-green-500" />
            
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold">
                {courseData?.price > 0
                  ? 'Payment Successful'
                  : 'Enrollment Successful'}
              </h2>
              <p className="text-gray-300">
                {courseData?.price > 0
                  ? 'Your payment has been processed successfully.'
                  : 'You have been successfully enrolled in the course.'}
              </p>
              <p className="text-yellow-400 font-semibold">
                Course: {courseData?.title}
              </p>
            </div>
          </div>

          {/* adding buttons */}
          <div className="flex gap-2 absolute bottom-0 w-full">
            <button
              onClick={() =>
                navigate('/course/displaylectures', { state: { ...courseData } })
              }
              className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 flex-1 text-center py-3 text-lg font-bold rounded-bl-lg"
            >
              Watch Now
            </button>
            <button
              onClick={() => navigate('/courses')}
              className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 flex-1 text-center py-3 text-lg font-bold rounded-br-lg"
            >
              More Courses
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutSuccess;
