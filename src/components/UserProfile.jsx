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
    sidebarNavItem: { // Customize sidebar navigation item
      color: "#6e3b37", // Text color for all items
      hoverColor: "#4caf50", // Hover text color
      activeBgColor: "#e0f7fa", // Active background color
      activeColor: "#ffffff", // Active text color
    },
};

const UserProfilePage = () => {
  return (
    <div >
      <UserProfile  appearance={customAppearance}/>
    </div>
  );
};

export default UserProfilePage;
