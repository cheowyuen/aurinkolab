import { forwardRef } from 'react';

interface NotificationProps {
  message: string;
}

const Notification = forwardRef<HTMLDivElement, NotificationProps>(({ message }, ref) => {
  if (message === '') {
    return null;
  }

  return (
    <div className="notification-container">
      <div ref={ref} className={`${!message.includes("quiz") ? "error" : "notification"}`} data-testid="notification">
        {message}
      </div>
    </div>
  );
});

export default Notification;
