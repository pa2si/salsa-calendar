import React, { useState } from 'react';
import { Image } from '@nextui-org/react';
import { Event } from '@/types/eventTypes'; // Ensure the path is correct

interface EventCarouselProps {
  events: Event[];
}

const EventCarousel: React.FC<EventCarouselProps> = ({ events }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : events.length - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex < events.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="relative w-full">
      <Image
        shadow="sm"
        radius="lg"
        width="100%"
        src={events[activeIndex].imageUrl}
        alt={events[activeIndex].title}
        className="w-full object-cover"
      />
      {events.length > 1 && (
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <button className="btn btn-circle" onClick={handlePrev}>
            ❮
          </button>
          <button className="btn btn-circle" onClick={handleNext}>
            ❯
          </button>
        </div>
      )}
    </div>
  );
};

export default EventCarousel;
