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
      <SignIn path="/signIn" routing="path" redirectUrl="/dashboard" appearance={customAppearance}  />
    </div>
  );
};

export default SignInUser;

