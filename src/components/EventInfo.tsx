import React from 'react';

function EventInfo({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: React.ReactNode;
}) {
  return (
    <div className="flex gap-x-2 items-center">
      {icon}
      {text}
    </div>
  );
}
export default EventInfo;
