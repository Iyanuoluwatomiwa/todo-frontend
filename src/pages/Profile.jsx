import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner";

function Profile() {
  const {token, apiUrl, isLoading, setIsLoading } = useContext(StoreContext);
  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState("");
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      setIsLoading(true);

      const res = await fetch(`${apiUrl}/profiles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setProfile(data.profile);
        setBio(data.profile.bio || "");
      } else {
        toast.error(data.error || "Failed to fetch profile");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Something went wrong");
    } 
    setIsLoading(false);
  }

  async function updateHandler(e) {
    e.preventDefault();

    try {
      setIsLoading(true);

      const res = await fetch(`${apiUrl}/profiles/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bio }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Profile updated successfully!");
        fetchProfile();
        setEditMode(false);
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Something went wrong while updating");
    } 
      setIsLoading(false);
    
  }

  if (isLoading) return <Spinner />;
  if (!profile) return <p className="text-center mt-20">Profile not found.</p>;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>

        <p className="mb-2">
          <strong>Name:</strong> {profile.user?.name || "N/A"}
        </p>
        <p className="mb-4">
          <strong>Email:</strong> {profile.user?.email}
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Bio</h3>

        {editMode ? (
          <>
            <textarea
              className="w-full border p-2 rounded mb-3"
              rows="3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write something about yourself..."
            />
            <div className="space-x-2">
              <button
                onClick={updateHandler}
                className="bg-blue-600 text-white px-4 py-1 rounded"
                disabled={isLoading}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setBio(profile.bio || "");
                  setEditMode(false);
                }}
                className="bg-gray-500 text-white px-4 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="italic text-gray-600">
              {profile.bio || "No bio yet."}
            </p>
            <button
              onClick={() => setEditMode(true)}
              className="mt-3 bg-green-600 text-white px-3 py-1 rounded"
            >
              Edit Bio
            </button>
          </>
        )}

        <div className="mt-6">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
