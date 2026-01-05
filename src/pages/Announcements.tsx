import { useState } from "react";
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
import { cn } from "@/lib/utils";

const previousAnnouncements = [
  { id: 1, title: "Scheduled Maintenance - May 15th", target: "All Societies", date: "2024-05-10", status: "published" },
  { id: 2, title: "New Feature: Visitor Management", target: "Premium Plans", date: "2024-05-05", status: "published" },
  { id: 3, title: "Payment Gateway Update", target: "All Societies", date: "2024-04-28", status: "published" },
  { id: 4, title: "Holiday Support Hours", target: "All Societies", date: "2024-04-20", status: "published" },
];

export default function Announcements() {
  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Announcements</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Send platform-wide or targeted announcements
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create Announcement */}
        <div className="admin-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg gradient-accent">
              <Megaphone className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Create Announcement</h3>
              <p className="text-sm text-muted-foreground">Compose a new message</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter announcement title" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Write your announcement message here..."
                className="min-h-[150px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Target Audience</Label>
              <Select>
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
                  <SelectItem value="basic">Basic Plan Societies</SelectItem>
                  <SelectItem value="premium">Premium Plan Societies</SelectItem>
                  <SelectItem value="enterprise">Enterprise Plan Societies</SelectItem>
                  <SelectItem value="specific">Specific Society</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full gradient-accent text-accent-foreground">
              <Send className="w-4 h-4 mr-2" />
              Publish Announcement
            </Button>
          </div>
        </div>

        {/* Previous Announcements */}
        <div className="admin-card overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Previous Announcements</h3>
            <p className="text-sm text-muted-foreground">Recently published messages</p>
          </div>

          <div className="divide-y divide-border">
            {previousAnnouncements.map((announcement) => (
              <div key={announcement.id} className="p-4 hover:bg-secondary/30 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground">{announcement.title}</h4>
                  <span className="status-active text-xs">Published</span>
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
            <button className="w-full text-sm text-accent hover:text-accent/80 font-medium transition-colors">
              View All Announcements →
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
