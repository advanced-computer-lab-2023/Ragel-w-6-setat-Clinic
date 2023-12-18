import { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          user.userType === "patient"
            ? `/patients/getPatientNotifications/${user.user._id}`
            : `/doctors/getDoctorNotifications/${user.user._id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await response.json();

        const hasUnread = data.notifications.some(
          (notification) => !notification.read
        );
        setHasNewNotifications(hasUnread);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    const interval = setInterval(() => {
      fetchNotifications();
    }, 1000);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        hasNewNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};
