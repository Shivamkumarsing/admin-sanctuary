import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Shield, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

const roles = [
  { id: "super-admin", name: "Super Admin", description: "Full platform access" },
  { id: "society-admin", name: "Society Admin", description: "Manage single society" },
  { id: "support-agent", name: "Support Agent", description: "Handle support tickets" },
];

const permissions = [
  { id: "dashboard", name: "Dashboard", actions: ["view"] },
  { id: "societies", name: "Societies", actions: ["view", "create", "edit", "delete"] },
  { id: "users", name: "Users", actions: ["view", "create", "edit", "delete"] },
  { id: "subscriptions", name: "Subscriptions", actions: ["view", "edit"] },
  { id: "plans", name: "Plans", actions: ["view", "create", "edit", "delete"] },
  { id: "revenue", name: "Revenue", actions: ["view", "export"] },
  { id: "support", name: "Support", actions: ["view", "respond", "assign"] },
  { id: "announcements", name: "Announcements", actions: ["view", "create"] },
  { id: "audit-logs", name: "Audit Logs", actions: ["view"] },
  { id: "settings", name: "Settings", actions: ["view", "edit"] },
];

const rolePermissions = {
  "super-admin": {
    dashboard: ["view"],
    societies: ["view", "create", "edit", "delete"],
    users: ["view", "create", "edit", "delete"],
    subscriptions: ["view", "edit"],
    plans: ["view", "create", "edit", "delete"],
    revenue: ["view", "export"],
    support: ["view", "respond", "assign"],
    announcements: ["view", "create"],
    "audit-logs": ["view"],
    settings: ["view", "edit"],
  },
  "society-admin": {
    dashboard: ["view"],
    societies: ["view"],
    users: ["view"],
    subscriptions: ["view"],
    plans: [],
    revenue: [],
    support: ["view"],
    announcements: ["view"],
    "audit-logs": [],
    settings: [],
  },
  "support-agent": {
    dashboard: ["view"],
    societies: ["view"],
    users: ["view"],
    subscriptions: ["view"],
    plans: [],
    revenue: [],
    support: ["view", "respond"],
    announcements: ["view"],
    "audit-logs": [],
    settings: [],
  },
};

export default function Roles() {
  const [selectedRole, setSelectedRole] = useState("super-admin");

  const currentPermissions = rolePermissions[selectedRole as keyof typeof rolePermissions];

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Roles & Permissions</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage access control for different user roles
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Role Selector */}
        <div className="admin-card p-4">
          <h3 className="font-semibold text-foreground mb-4">Roles</h3>
          <div className="space-y-2">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={cn(
                  "w-full p-3 rounded-lg text-left transition-colors",
                  selectedRole === role.id
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-secondary"
                )}
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4" />
                  <div>
                    <p className="font-medium text-sm">{role.name}</p>
                    <p className={cn(
                      "text-xs",
                      selectedRole === role.id ? "text-accent-foreground/70" : "text-muted-foreground"
                    )}>
                      {role.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Permissions Matrix */}
        <div className="lg:col-span-3 admin-card overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">
              Permissions for {roles.find(r => r.id === selectedRole)?.name}
            </h3>
            <p className="text-sm text-muted-foreground">Manage what this role can access</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Module
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    View
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Create
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Edit
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {permissions.map((perm) => {
                  const rolePerms = currentPermissions[perm.id as keyof typeof currentPermissions] || [];
                  return (
                    <tr key={perm.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                      <td className="py-4 px-6 font-medium text-foreground">{perm.name}</td>
                      {["view", "create", "edit", "delete"].map((action) => (
                        <td key={action} className="py-4 px-4 text-center">
                          {perm.actions.includes(action) ? (
                            <div className="flex justify-center">
                              <Checkbox
                                checked={rolePerms.includes(action)}
                                className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                              />
                            </div>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
