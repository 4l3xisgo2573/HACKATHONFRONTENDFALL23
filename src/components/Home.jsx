import React from "react";

const ExampleNotifications = {
  1: {
    message: "Your guest has arrived! Someone is at the door.",
    time: "5:17 PM",
  },
  2: {
    message: "Unexpected visitor alert! Doorbell rang.",
    time: "10:45 AM",
  },
  3: {
    message: "Delivery alert! Your package has been delivered.",
    time: "3:30 PM",
  },
  4: {
    message: "Recognized face at the door! Confirm the visitor's identity.",
    time: "2:00 PM",
  },
  5: {
    message: "Surprise visit! Your friend is at the door.",
    time: "7:22 PM",
  },
};

function NotificationList({ notifications }) {
  return (
    <div>
      {Object.keys(notifications).map((key) => (
        <div key={key} class="notifications">
          <h3>Notification {key}:</h3>
          <p>{notifications[key].message}</p>
          <p>Time: {notifications[key].time}</p>
        </div>
      ))}
    </div>
  );
}

function Home() {
  return (
    <div className="content">
      <h2>Here's a little update while you have been gone...</h2>
      <NotificationList notifications={ExampleNotifications} />
    </div>
  );
}

export default Home;
