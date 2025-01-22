import { SignUp } from '@clerk/clerk-react';


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
const SignUpUser = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <SignUp
        path="/signUp"
        routing="path"
        redirectUrl="/dashboard" 
        afterSignUpUrl="/dashboard" 
        appearance={customAppearance}
      />
    </div>
  );
};

export default SignUpUser;
