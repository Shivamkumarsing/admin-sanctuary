"use client";

import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Megaphone, Send, Clock, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchAnnouncements,
  createAnnouncement,
} from "@/store/slices/announcements.slice";

export default function Announcements() {
  const dispatch = useAppDispatch();

  const { list, loading, createLoading } = useAppSelector(
    (state) => state.announcementsSlice
  );

  // =========================
  // 🧠 Form State
  // =========================
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState("all");

  // =========================
  // 📥 Fetch on load
  // =========================
  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  // =========================
  // ➕ Create Announcement
  // =========================
  const handleCreate = async () => {
    if (!title || !message) return;

    await dispatch(
      createAnnouncement({
        title,
        message,
        target,
      })
    );

    // Reset form
    setTitle("");
    setMessage("");
    setTarget("all");

    // Refetch list
    dispatch(fetchAnnouncements());
  };

  // =========================
  // 🎯 Format Data
  // =========================
  const formattedAnnouncements = (list || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    target: item.target || "All Societies",
    date: new Date(item.createdAt || item.date).toLocaleDateString(),
    status: "published",
  }));

  return (
    <AdminLayout>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Announcements</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Send platform-wide or targeted announcements
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ========================= */}
        {/* ➕ Create Announcement */}
        {/* ========================= */}
        <div className="admin-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg gradient-accent">
              <Megaphone className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Create Announcement
              </h3>
              <p className="text-sm text-muted-foreground">
                Compose a new message
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter announcement title"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your announcement message..."
                className="min-h-[150px]"
              />
            </div>

            {/* Target */}
            <div className="space-y-2">
              <Label>Target Audience</Label>
              <Select value={target} onValueChange={setTarget}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      All Societies
                    </div>
                  </SelectItem>
                  <SelectItem value="basic">
                    Basic Plan Societies
                  </SelectItem>
                  <SelectItem value="premium">
                    Premium Plan Societies
                  </SelectItem>
                  <SelectItem value="enterprise">
                    Enterprise Plan Societies
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Button */}
            <Button
              onClick={handleCreate}
              disabled={createLoading}
              className="w-full gradient-accent text-accent-foreground"
            >
              <Send className="w-4 h-4 mr-2" />
              {createLoading ? "Publishing..." : "Publish Announcement"}
            </Button>
          </div>
        </div>

        {/* ========================= */}
        {/* 📜 Previous Announcements */}
        {/* ========================= */}
        <div className="admin-card overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">
              Previous Announcements
            </h3>
            <p className="text-sm text-muted-foreground">
              Recently published messages
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="p-4 text-center text-muted-foreground">
              Loading...
            </div>
          )}

          {/* Empty */}
          {!loading && formattedAnnouncements.length === 0 && (
            <div className="p-4 text-center text-muted-foreground">
              No announcements found
            </div>
          )}

          {/* List */}
          <div className="divide-y divide-border">
            {formattedAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className="p-4 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground">
                    {announcement.title}
                  </h4>
                  <span className="status-active text-xs">
                    Published
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    {announcement.target}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {announcement.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border">
            <button className="w-full text-sm text-accent hover:text-accent/80 font-medium">
              View All Announcements →
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}