import React from 'react';
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <Card className="bg-gray-800 border-gray-700 overflow-hidden hover:bg-gray-750 transition-colors">
      {/* Event Image */}
      {event.eventImage && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={event.eventImage}
            alt={event.eventName}
            width={400}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center space-x-2 text-white">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-paragraph">
                {formatDate(event.eventDate)}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Event Header */}
        <div className="mb-4">
          <h3 className="text-xl font-heading font-bold text-foreground mb-2">
            {event.eventName}
          </h3>
          <p className="text-gray-300 font-paragraph leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Event Details */}
        <div className="space-y-3 mb-6">
          {!event.eventImage && (
            <div className="flex items-center space-x-3 text-gray-300">
              <Calendar className="h-5 w-5 text-secondary" />
              <span className="font-paragraph">
                {formatDate(event.eventDate)}
              </span>
            </div>
          )}
          
          <div className="flex items-center space-x-3 text-gray-300">
            <div className="h-5 w-5 flex items-center justify-center">
              <span className="text-accent-teal">🕐</span>
            </div>
            <span className="font-paragraph">
              {formatTime(event.eventTime)}
            </span>
          </div>
          
          <div className="flex items-center space-x-3 text-gray-300">
            <MapPin className="h-5 w-5 text-accent-pink" />
            <span className="font-paragraph">
              {event.location}
            </span>
          </div>
        </div>

        {/* Event Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-400">
              <Users className="h-4 w-4" />
              <span className="text-sm font-paragraph">
                {Math.floor(Math.random() * 50) + 10} attending
              </span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <span className="text-sm font-paragraph">
                {Math.floor(Math.random() * 20) + 5} interested
              </span>
            </div>
          </div>
          <div className="text-gray-400 text-sm">
            Free Event
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            RSVP
          </Button>
          <Button variant="outline" className="flex-1 border-gray-600 text-foreground hover:bg-gray-700">
            <Users className="h-4 w-4 mr-2" />
            Interested
          </Button>
          {event.registrationLink && (
            <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-700">
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span className="font-paragraph">Hosted by Student Activities</span>
            <span>📅 Add to calendar</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;