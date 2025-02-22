/* eslint-disable react/no-unknown-property */

import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../../../api";
import Marquee from "react-fast-marquee";
import { RxCross2 } from "react-icons/rx";

const Notification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [filteredNotification, setFilteredNotification] = useState([]);
  // const forceLoginSuccess = localStorage.getItem("forceLoginSuccess");
  const token = localStorage.getItem("token");
  const [notification, setNotification] = useState("");
  useEffect(() => {
    axios.get(API.notification).then((res) => {
      setNotification(res?.data?.result);
    });
  }, [token]);

  useEffect(() => {
    const storedNotificationId =
      JSON.parse(localStorage.getItem("notificationId")) || [];
    if (
      (!storedNotificationId || storedNotificationId?.length === 0) &&
      notification?.length > 0
    ) {
      setShowNotification(true);
      const sortNotification = notification?.sort((a, b) => a.sort - b.sort);

      setFilteredNotification(sortNotification);
    }
    if (
      notification?.length > 0 &&
      storedNotificationId &&
      storedNotificationId?.length > 0 &&
      !showNotification
    ) {
      const filteredNotifications = notification.filter(
        (notif) => !storedNotificationId.some((nId) => nId.id == notif.id)
      );

      if (filteredNotifications?.length > 0) {
        const sortNotification = filteredNotifications?.sort(
          (a, b) => a.sort - b.sort
        );
        setFilteredNotification(sortNotification);
        setShowNotification(true);
      }
    }
  }, [
    notification,
    showNotification,
    setFilteredNotification,
    setShowNotification,
  ]);

  const closeNotification = () => {
    const notificationIds =
      JSON.parse(localStorage.getItem("notificationId")) || [];

    notification?.forEach((item) => {
      if (!notificationIds.some((notif) => notif.id === item.id)) {
        notificationIds.push({ id: item.id });
      }
    });

    localStorage.setItem("notificationId", JSON.stringify(notificationIds));

    setShowNotification(false);
  };
  return (
    <>
      {showNotification && filteredNotification?.length > 0 && (
        <div _ngcontent-htq-c82 _nghost-htq-c79>
          <Marquee>
            {filteredNotification?.map((item) => (
              <p
                _ngcontent-htq-c79
                scrollamount={3}
                className="searchClose"
                key={item?.id}
              >
                {item?.text}
              </p>
            ))}
          </Marquee>
          <RxCross2
            style={{
              position: "absolute",
              right: "15",
              bottom: "15",
              zIndex: "999",
              marginLeft: "20px",
              fontWeight: "800",
            }}
            onClick={closeNotification}
            size={20}
            cursor="pointer"
          />
        </div>
      )}
    </>
  );
};

export default Notification;
