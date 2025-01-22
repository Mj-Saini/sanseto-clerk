import { UserProfile } from "@clerk/clerk-react";


const customAppearance = {
  variables: {
    colorPrimary: "#4caf50", 
    colorText: "#6e3b37", 
  },
  elements: {
    card: {
      bgColor: "#fff", 
      borderRadius: "2px", 
      borderColor: "#6e3b37", 
    }},
};

const UserProfilePage = () => {
  return (
    <div >
      <UserProfile  appearance={customAppearance}/>
    </div>
  );
};

export default UserProfilePage;
