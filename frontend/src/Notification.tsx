import { forwardRef } from 'react';

interface NotificationProps {
  message: string;
  type?: string;
}

const Notification = forwardRef<HTMLDivElement, NotificationProps>(({ message, type="" }, ref) => {
  if (message === '') {
    return null;
  }

  if (type === "") {
    if (message.includes("quiz")) {
      type = "notification";
    } else {
      type = "error";
    }
  }

  return (
    <div className="notification-container">
      <div ref={ref} className={type} data-testid="notification">
        {message}
      </div>
    </div>
  );
});

export default Notification;
