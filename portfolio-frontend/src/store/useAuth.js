import { create } from "zustand";
import { toast } from "react-hot-toast";

const API_BASE_URL = "http://localhost:3131/api"; // Define the base URL

export const useAuth = create((set, get) => ({
    githubURL: "https://github.com/dilshand3",
    instagramURL: "https://www.instagram.com/dilshan.d3?igsh=OTI2MXJneWtraWZo",
    linkedinURL: "https://www.linkedin.com/in/dilshan-dilshan-79452a31a/",
    twitterURL: "https://x.com/dilshan_d3?t=SRTKOS3Z-yTvGrpZSIr1MA&s=08",
    userDetails: null,
    showAuthentication: false,
    isSignUp: true,
    adminData: null,
    projects: [],
    toggleAuthentication: () => set((state) => ({
        showAuthentication: !state.showAuthentication,
        authError: null
    })),
    
    toggleFormType: () => set((state) => ({
        isSignUp: !state.isSignUp,
        authError: null
    })),
    MyLocation: "https://www.google.com/maps/place/Hanumangarh,+Rajasthan+335513/@29.5825602,74.310579,14z/data=!3m1!4b1!4m6!3m5!1s0x39168cb43c941537:0x3537015abc38d416!8m2!3d29.5821848!4d74.3292106!16zL20vMDZncV8w?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D",
    authError: null,

    signUp: async (formData, onSuccess) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("Sign up successful");
                set({ userDetails: data.user });
                onSuccess();
                set({ authError: null });
            } else {
                set({ authError: data.message || 'Sign up failed' });
            }
        } catch (error) {
            set({ authError: 'User already exists' });
        }
    },

    logIn: async (formData, onSuccess) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await response.json();
            if (response.ok) {
                set({ userDetails: data.user });
                onSuccess();
                if (data.user.isAdmin) {
                    toast.success("Welcome Back Sir");
                    const adminVoiceMessage = new SpeechSynthesisUtterance("Welcome Back sir");
                    window.speechSynthesis.speak(adminVoiceMessage);
                } else {
                    const adminVoiceMessage = new SpeechSynthesisUtterance(`welcome back ${data.user.username}`);
                    window.speechSynthesis.speak(adminVoiceMessage);
                    toast.success("Log in successful");
                }
                set({ authError: null });
            } else {
                set({ authError: data.message || 'Log in failed' });
            }
        } catch (error) {
            set({ authError: 'An error occurred during log in' });
        }
    },

    checkAuth: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/checkAuth`, {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                set({ userDetails: data.user }); 
                return { isAuthenticated: true, user: data.user }; 
            } else {
                set({ userDetails: null }); 
                return { isAuthenticated: false, user: null };
            }
        } catch (error) {
            set({ userDetails: null }); 
            return { isAuthenticated: false, user: null };
        }
    },

    logout: async (onSuccess) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/logout`, {
                method: 'POST',
                credentials: 'include'
            });
            if (response.ok) {
                set({ userDetails: null });
                onSuccess();
                setTimeout(() => {
                    toast.success("Logged out successfully");
                }, 500);
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    },

    SendFeedback: async (name, feedback, email) => {
        try {
            const response = await fetch(`${API_BASE_URL}/feedback/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, feedback })
            });
            const response1 = await response.json();
            if (response.ok) {
                toast.success("Message sent successfully");
            } else {
                toast.error("Failed to send feedback");
            }
        } catch (error) {
            toast.error("Error sending feedback");
        }
    },

    VerifyUser: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/VerifyUser`, {
                method: "GET",
                credentials: "include"
            });
            const data = await response.json();
            if (response.ok) {
                return data; 
            } else {
                return null; 
            }
        } catch (error) {
            return null; 
        }
    },

    AllProject: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/project/Allproject`);
            const data = await response.json();
            if (response.ok) {
                set({ projects: data });
            } else {
                return null
            }
        } catch (error) {
            return null
        }
    },

    addProject: async (projectData, onSuccess) => {
        set({ isSubmitting: true }); 
        try {
          const response = await fetch(`${API_BASE_URL}/project/Addproject`, {
            method: 'POST',
            body: projectData, 
            credentials: 'include'
          });
      
          const data = await response.json();
          if (response.ok) {
            toast.success("Project added successfully");   
            onSuccess(); // Call onSuccess callback
          } else {
            toast.error("Failed to add project");
          }
        } catch (error) {
          toast.error("Error adding project");
        } finally {
          set({ isSubmitting: false }); 
        }
      },

    isSubmitting: false, 

    fetchAllFeedback: async () => { 
        try {
            const response = await fetch(`${API_BASE_URL}/feedback/allFeedback`); // Fetch feedbacks
            const data = await response.json();
            if (response.ok) {
                return data; 
            } else {
                toast.error("Failed to fetch feedbacks"); 
                return [];
            }
        } catch (error) {
            toast.error("Error fetching feedbacks"); 
            return [];
        }
    },

    deleteFeedback: async (feedbackId) => { 
        try {
            const response = await fetch(`${API_BASE_URL}/feedback/deleteFeedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: feedbackId }), // Send feedback ID as 'id'
                credentials: 'include'
            });

            if (response.ok) {
                toast.success("Feedback deleted successfully");
            } else {
                toast.error("Failed to delete feedback"); // Show error toast
            }
        } catch (error) {
            console.error('Error deleting feedback:', error);
            toast.error("Error deleting feedback"); // Show error toast
        }
    },

    shareAdmin: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/shareAdmin`);
            const data = await response.json();
            set({ adminData: data }); 
        } catch (error) {
            return null; 
        }
    },

    uploadProfileImage: async (file) => {
        try {
            const formData = new FormData();
            formData.append('ProfileImg', file);

            const response = await fetch(`${API_BASE_URL}/admin/profileimg`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("Profile image uploaded successfully");
            } else {
                toast.error("Failed to upload profile image");
            }
        } catch (error) {
            toast.error("Error uploading profile image");
        }
    },

    uploadAboutImage: async (file) => {
        try {
            const formData = new FormData();
            formData.append('AboutImg', file);

            const response = await fetch(`${API_BASE_URL}/admin/aboutimg`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("About image uploaded successfully");
            } else {
                toast.error("Failed to upload about image");
            }
        } catch (error) {
            toast.error("Error uploading about image");
        }
    },

    uploadCV: async (file) => {
        try {
            const formData = new FormData();
            formData.append('myCV', file);

            const response = await fetch(`${API_BASE_URL}/admin/mycv`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("CV uploaded successfully");
            } else {
                toast.error("Failed to upload CV");
            }
        } catch (error) {
            toast.error("Error uploading CV");
        }
    },

    deleteProject: async (projectId) => { 
        try {
            const response = await fetch(`${API_BASE_URL}/project/Deleteproject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: projectId }), 
                credentials: 'include'
            });

            if (response.ok) {
                toast.success("Project deleted successfully");
                await get().AllProject(); 
            } else {
                toast.error("Failed to delete project");
            }
        } catch (error) {
            toast.error("Error deleting project");
        }
    },

    setUserDetails: (user) => set({ userDetails: user }), 

    NonVerifyUser: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/NonVerifyUser`, {
                method: "GET",
                credentials: "include"
            });
            const data = await response.json();
            if (response.ok) {
                return data; 
            } else {
               return null
            }
        } catch (error) {
            return null; 
        }
    },

}));
