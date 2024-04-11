import { forwardRef } from 'react';

interface NotificationProps {
  message: string;
}

const Notification = forwardRef<HTMLDivElement, NotificationProps>(({ message }, ref) => {
  if (message === '') {
    return null;
  }

  return (
    <div ref={ref} className='notification'>
      {message}
    </div>
  );
});

export default Notification;
