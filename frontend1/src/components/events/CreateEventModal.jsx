import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useAppStore from '@/store/useAppStore';
import { Image } from '@/components/ui/image';

const CreateEventModal = () => {
  const { isCreateEventModalOpen, setCreateEventModalOpen, addEvent } = useAppStore();

  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    eventDate: '',
    eventTime: '',
    location: '',
    registrationLink: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.eventName.trim() || !formData.eventDate || !formData.eventTime || !formData.location.trim()) {
      return;
    }

    const newEvent = {
      ...formData,
      eventImage: imagePreview
    };

    addEvent(newEvent);
    
    // Reset form
    setFormData({
      eventName: '',
      description: '',
      eventDate: '',
      eventTime: '',
      location: '',
      registrationLink: ''
    });
    setImageFile(null);
    setImagePreview(null);
    setCreateEventModalOpen(false);
  };

  if (!isCreateEventModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-gray-800 border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading font-bold text-foreground">Create Event</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCreateEventModalOpen(false)}
              className="text-gray-400 hover:bg-gray-700"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Name */}
            <div>
              <label className="block text-foreground font-paragraph font-medium mb-2">
                Event Name *
              </label>
              <Input
                name="eventName"
                value={formData.eventName}
                onChange={handleInputChange}
                placeholder="Enter event name"
                className="bg-gray-700 border-gray-600 text-foreground placeholder-gray-400"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-foreground font-paragraph font-medium mb-2">
                Description
              </label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your event..."
                className="bg-gray-700 border-gray-600 text-foreground placeholder-gray-400 min-h-[100px] resize-none"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-foreground font-paragraph font-medium mb-2">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Date *
                </label>
                <Input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600 text-foreground"
                  required
                />
              </div>
              <div>
                <label className="block text-foreground font-paragraph font-medium mb-2">
                  <Clock className="h-4 w-4 inline mr-2" />
                  Time *
                </label>
                <Input
                  type="time"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600 text-foreground"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-foreground font-paragraph font-medium mb-2">
                <MapPin className="h-4 w-4 inline mr-2" />
                Location *
              </label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter event location"
                className="bg-gray-700 border-gray-600 text-foreground placeholder-gray-400"
                required
              />
            </div>

            {/* Registration Link */}
            <div>
              <label className="block text-foreground font-paragraph font-medium mb-2">
                Registration Link
              </label>
              <Input
                type="url"
                name="registrationLink"
                value={formData.registrationLink}
                onChange={handleInputChange}
                placeholder="https://example.com/register"
                className="bg-gray-700 border-gray-600 text-foreground placeholder-gray-400"
              />
            </div>

            {/* Event Image */}
            <div>
              <label className="block text-foreground font-paragraph font-medium mb-2">
                Event Image
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors">
                {imagePreview ? (
                  <div className="relative">
                    <Image src={imagePreview} alt="Event preview" className="max-w-full h-48 object-cover rounded-lg mx-auto" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 font-paragraph mb-2">
                      Upload an event image
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="event-image-upload"
                    />
                    <label
                      htmlFor="event-image-upload"
                      className="cursor-pointer text-primary hover:text-primary/80"
                    >
                      Browse files
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Event Categories */}
            <div>
              <label className="block text-foreground font-paragraph font-medium mb-3">
                Event Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {['Academic', 'Social', 'Sports', 'Arts', 'Technology', 'Wellness'].map((category) => (
                  <Button
                    key={category}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateEventModalOpen(false)}
                className="border-gray-600 text-foreground hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default CreateEventModal;