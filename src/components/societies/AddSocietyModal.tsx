import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface AddSocietyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddSocietyModal({ open, onOpenChange }: AddSocietyModalProps) {
  const [formData, setFormData] = useState({
  name: "",
  city: "",
  adminName: "",
  phone: "",
  email: "",
  planId: "",
});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const { name, city, adminName, phone, email, planId } = formData;

  if (!name || !city || !adminName || !phone || !email || !planId) {
    toast({
      title: "Validation Error",
      description: "Please fill in all fields",
      variant: "destructive",
    });
    return;
  }

  setIsLoading(true);

  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(
      "http://localhost:3002/dashboard/add-societies",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          city,
          adminName,
          phone,
          email,
          planId: Number(planId),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    toast({
      title: "Success",
      description: "Society added successfully",
    });

    setFormData({
      name: "",
      city: "",
      adminName: "",
      phone: "",
      email: "",
      planId: "",
    });

    onOpenChange(false);
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Failed to add society",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Society</DialogTitle>
          <DialogDescription>
            Enter the details for the new society. All fields are required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Society Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter society name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Select
                value={formData.city}
                onValueChange={(value) => handleSelectChange("city", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Chennai">Chennai</SelectItem>
                  <SelectItem value="Pune">Pune</SelectItem>
                  <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="Kolkata">Kolkata</SelectItem>
                  <SelectItem value="Jaipur">Jaipur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="admin">Admin Name</Label>
              <Input
                id="admin"
                name="adminName"
                placeholder="Enter admin name"
                value={formData.adminName}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
  <Label htmlFor="email">Admin Email</Label>
  <Input
    id="email"
    name="email"
    type="email"
    placeholder="admin@email.com"
    value={formData.email}
    onChange={handleInputChange}
  />
</div>
            
            <div className="space-y-2">
              <Label htmlFor="planId">Plan</Label>
              <Select
                value={formData.planId}
                onValueChange={(value) => handleSelectChange("planId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Basic</SelectItem>
                  <SelectItem value="2">Premium</SelectItem>
                  <SelectItem value="3">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Society"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
