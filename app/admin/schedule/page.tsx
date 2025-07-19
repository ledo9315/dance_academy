"use client";

import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Clock, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface ScheduleItem {
  id: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  ageGroup: string;
  className?: string;
  isActive: boolean;
}

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function AdminSchedulePage() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<ScheduleItem | null>(null);
  const [formData, setFormData] = useState({
    dayOfWeek: "Monday",
    startTime: "",
    endTime: "",
    ageGroup: "",
    className: "",
  });

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const response = await fetch("/api/schedule");
      if (response.ok) {
        const data = await response.json();
        setSchedule(data);
      } else {
        console.error("Failed to fetch schedule:", response.status);
        alert("Failed to load schedule data. Please refresh the page.");
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
      alert(
        "Network error occurred while loading schedule. Please refresh the page."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingItem
        ? `/api/schedule/${editingItem.id}`
        : "/api/schedule";

      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchSchedule();
        resetForm();
        setIsAddDialogOpen(false);
        setIsEditDialogOpen(false);
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        alert(`Error: ${errorData.error || "Failed to save schedule"}`);
      }
    } catch (error) {
      console.error("Error saving schedule:", error);
      alert("Network error occurred. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!deletingItem) return;

    try {
      const response = await fetch(`/api/schedule/${deletingItem.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchSchedule();
        setIsDeleteDialogOpen(false);
        setDeletingItem(null);
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        alert(`Error: ${errorData.error || "Failed to delete schedule"}`);
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
      alert("Network error occurred. Please try again.");
    }
  };

  const handleEdit = (item: ScheduleItem) => {
    setEditingItem(item);
    setFormData({
      dayOfWeek: item.dayOfWeek,
      startTime: item.startTime,
      endTime: item.endTime,
      ageGroup: item.ageGroup,
      className: item.className || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (item: ScheduleItem) => {
    setDeletingItem(item);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      dayOfWeek: "Monday",
      startTime: "",
      endTime: "",
      ageGroup: "",
      className: "",
    });
  };

  const scheduleByDay = daysOfWeek.reduce((acc, day) => {
    acc[day] = schedule.filter((item) => item.dayOfWeek === day);
    return acc;
  }, {} as Record<string, ScheduleItem[]>);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-text">Loading schedule...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-light">Schedule Management</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  resetForm();
                }}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Class
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Class</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Day of Week
                  </label>
                  <select
                    value={formData.dayOfWeek}
                    onChange={(e) =>
                      setFormData({ ...formData, dayOfWeek: e.target.value })
                    }
                    className="w-full p-2 border border-border bg-background"
                    required
                  >
                    {daysOfWeek.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Start Time
                    </label>
                    <input
                      type="text"
                      value={formData.startTime}
                      onChange={(e) =>
                        setFormData({ ...formData, startTime: e.target.value })
                      }
                      placeholder="5:00 PM"
                      className="w-full p-2 border border-border bg-background"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      End Time
                    </label>
                    <input
                      type="text"
                      value={formData.endTime}
                      onChange={(e) =>
                        setFormData({ ...formData, endTime: e.target.value })
                      }
                      placeholder="7:00 PM"
                      className="w-full p-2 border border-border bg-background"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Age Group
                  </label>
                  <input
                    type="text"
                    value={formData.ageGroup}
                    onChange={(e) =>
                      setFormData({ ...formData, ageGroup: e.target.value })
                    }
                    placeholder="Ages 8-12"
                    className="w-full p-2 border border-border bg-background"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Class Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.className}
                    onChange={(e) =>
                      setFormData({ ...formData, className: e.target.value })
                    }
                    placeholder="Ballet, Jazz, etc."
                    className="w-full p-2 border border-border bg-background"
                  />
                </div>

                <DialogFooter>
                  <Button type="submit">Create</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Class</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Day of Week
                </label>
                <select
                  value={formData.dayOfWeek}
                  onChange={(e) =>
                    setFormData({ ...formData, dayOfWeek: e.target.value })
                  }
                  className="w-full p-2 border border-border bg-background"
                  required
                >
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Time
                  </label>
                  <input
                    type="text"
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
                    placeholder="5:00 PM"
                    className="w-full p-2 border border-border bg-background"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Time
                  </label>
                  <input
                    type="text"
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: e.target.value })
                    }
                    placeholder="7:00 PM"
                    className="w-full p-2 border border-border bg-background"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Age Group
                </label>
                <input
                  type="text"
                  value={formData.ageGroup}
                  onChange={(e) =>
                    setFormData({ ...formData, ageGroup: e.target.value })
                  }
                  placeholder="Ages 8-12"
                  className="w-full p-2 border border-border bg-background"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Class Name (Optional)
                </label>
                <input
                  type="text"
                  value={formData.className}
                  onChange={(e) =>
                    setFormData({ ...formData, className: e.target.value })
                  }
                  placeholder="Ballet, Jazz, etc."
                  className="w-full p-2 border border-border bg-background"
                />
              </div>

              <DialogFooter>
                <Button type="submit">Update</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Class</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-text">
                Are you sure you want to delete this class? This action cannot
                be undone.
              </p>
              {deletingItem && (
                <div className="bg-accent-bg p-4 border border-accent">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="font-sans text-sm">
                      {deletingItem.startTime} - {deletingItem.endTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="font-sans text-sm text-text">
                      {deletingItem.ageGroup}
                    </span>
                  </div>
                  <div className="font-sans text-sm text-text">
                    {deletingItem.dayOfWeek}
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDelete}
                  className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                >
                  Delete
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>

        <div className="space-y-6">
          {daysOfWeek.map((day) => {
            const daySchedule = scheduleByDay[day];
            if (daySchedule.length === 0) return null;

            return (
              <div key={day} className="border border-border">
                <div className="bg-accent-bg px-6 py-4 border-b border-border">
                  <h2 className="text-lg font-light text-accent">{day}</h2>
                </div>

                <div className="divide-y divide-border">
                  {daySchedule.map((item) => (
                    <div key={item.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-accent" />
                            <span className="font-sans text-sm">
                              {item.startTime} - {item.endTime}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-accent" />
                            <span className="font-sans text-sm text-text">
                              {item.ageGroup}
                            </span>
                          </div>

                          {item.className && (
                            <span className="font-sans text-sm text-text">
                              {item.className}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteClick(item)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
