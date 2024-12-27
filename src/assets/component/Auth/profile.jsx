import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import './auth.css';
import { useNavigate } from "react-router-dom";

function Profile() {
  // Inside your component
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();

    // Redirect to Home after 3 seconds
    const timer = setTimeout(() => {
      navigate("/home");
    }, 8000); // 3000ms = 3 seconds

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <div>
            {userDetails ? (
              <>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={userDetails.photo}
                    width={"50%"}
                    style={{ borderRadius: "50%" }}
                    alt="User"
                  />
                </div>
                <br />
               
                <h3>Welcome {userDetails.firstName} 🙏🙏</h3>
                <div>
                  <p>Email: {userDetails.email}</p>
                  <p>User: {userDetails.firstName}</p>
                  {/* <p>Last Name: {userDetails.lastName}</p> */}
                </div>
                <div className="Website">
                  <button className="btn btn-primary" onClick={() => navigate('/home')}>
                    Go to Codetracker
                  </button>
                  <button className="btn btn-primary" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
                    <div>
     <br/>
      <p>You will be redirected to the home page shortly...</p>
    </div>
              </>
            ) : (
          <p></p>
            )
            }
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Profile;
