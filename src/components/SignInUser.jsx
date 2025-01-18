import { SignIn } from '@clerk/clerk-react';

const customAppearance = {
  variables: {
    colorPrimary: "#c43b1e", 
    colorText: "#6e3b37", 
  },
  elements: {
    card: {
      bgColor: "#fff", 
      borderRadius: "2px", 
      borderColor: "#6e3b37", 
    },
    
  },
};


const SignInUser = () => {
  return (
    <div className='flex justify-center items-center h-screen' >
      <SignIn path="/sign-in" routing="path" redirectUrl="/dashboard" appearance={customAppearance}  />
    </div>
  );
};

export default SignInUser;



// import { SignIn } from '@clerk/clerk-react';

// const SignInUser = () => {
//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white  rounded-lg shadow-lg">
//         <SignIn
//           path="/sign-in"
//           routing="path"
//           redirectUrl="/dashboard"
//           appearance={{
//             elements: {
//               formButtonPrimary: 'btn_dark text-white hover:bg-blue-600',
//               input: 'text-gray-800 border-[#6e3b37] border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6e3b37] shadow-none',
//               logo: 'hidden',
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default SignInUser;
