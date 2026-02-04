import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Building2, Search, MoreHorizontal, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AddSocietyModal } from "@/components/societies/AddSocietyModal";

const societies = [
  { id: 1, name: "Greenview Apartments", city: "Mumbai", users: 124, plan: "Premium", status: "active", admin: "Rajesh Kumar", phone: "+91 98765 43210", createdAt: "2024-01-15" },
  { id: 2, name: "Sunrise Tower", city: "Delhi", users: 89, plan: "Basic", status: "active", admin: "Priya Sharma", phone: "+91 98765 43211", createdAt: "2024-02-20" },
  { id: 3, name: "Palm Gardens", city: "Bangalore", users: 156, plan: "Enterprise", status: "pending", admin: "Arun Patel", phone: "+91 98765 43212", createdAt: "2024-03-10" },
  { id: 4, name: "Ocean View Society", city: "Chennai", users: 67, plan: "Premium", status: "active", admin: "Lakshmi Iyer", phone: "+91 98765 43213", createdAt: "2024-03-25" },
  { id: 5, name: "Mountain Heights", city: "Pune", users: 45, plan: "Basic", status: "suspended", admin: "Vikram Singh", phone: "+91 98765 43214", createdAt: "2024-04-01" },
  { id: 6, name: "City Center Plaza", city: "Hyderabad", users: 210, plan: "Enterprise", status: "active", admin: "Meena Reddy", phone: "+91 98765 43215", createdAt: "2024-04-15" },
  { id: 7, name: "Lakeside Villas", city: "Kolkata", users: 78, plan: "Premium", status: "active", admin: "Amit Das", phone: "+91 98765 43216", createdAt: "2024-05-01" },
  { id: 8, name: "Green Valley Homes", city: "Jaipur", users: 92, plan: "Basic", status: "pending", admin: "Sanjay Gupta", phone: "+91 98765 43217", createdAt: "2024-05-20" },
];

const statusStyles = {
  active: "status-active",
  pending: "status-pending",
  suspended: "status-suspended",
};

export default function Societies() {
  const [selectedSociety, setSelectedSociety] = useState<typeof societies[0] | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Societies Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage all onboarded societies and their subscriptions
          </p>
        </div>
        <Button className="gradient-accent text-accent-foreground" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Society
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search societies..." className="pl-10" />
        </div>
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="City" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            <SelectItem value="mumbai">Mumbai</SelectItem>
            <SelectItem value="delhi">Delhi</SelectItem>
            <SelectItem value="bangalore">Bangalore</SelectItem>
            <SelectItem value="chennai">Chennai</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="basic">Basic</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Table */}
      <div className="table-container animate-fade-in">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Society
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  City
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Users
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Plan
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {societies.map((society) => (
                <tr key={society.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <span className="font-medium text-foreground">{society.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">{society.city}</td>
                  <td className="py-4 px-6 text-muted-foreground">{society.users}</td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-foreground">{society.plan}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={statusStyles[society.status as keyof typeof statusStyles]}>
                      {society.status.charAt(0).toUpperCase() + society.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedSociety(society)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Society</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Suspend</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Society Details Drawer */}
      <Sheet open={!!selectedSociety} onOpenChange={() => setSelectedSociety(null)}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Society Details</SheetTitle>
            <SheetDescription>View and manage society information</SheetDescription>
          </SheetHeader>
          {selectedSociety && (
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedSociety.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedSociety.city}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary">
                  <p className="text-xs text-muted-foreground uppercase">Total Users</p>
                  <p className="text-2xl font-bold mt-1">{selectedSociety.users}</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary">
                  <p className="text-xs text-muted-foreground uppercase">Plan</p>
                  <p className="text-2xl font-bold mt-1">{selectedSociety.plan}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground uppercase">Admin Contact</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Name</span>
                    <span className="text-sm font-medium">{selectedSociety.admin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Phone</span>
                    <span className="text-sm font-medium">{selectedSociety.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Created</span>
                    <span className="text-sm font-medium">{selectedSociety.createdAt}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1" variant="outline">Edit Details</Button>
                <Button className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Suspend Society
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Add Society Modal */}
      <AddSocietyModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
    </AdminLayout>
  );
}
