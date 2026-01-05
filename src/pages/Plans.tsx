import { AdminLayout } from "@/components/layout/AdminLayout";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: 1,
    name: "Basic",
    price: { monthly: 99, yearly: 990 },
    features: [
      "Up to 100 residents",
      "Basic reporting",
      "Email support",
      "1 admin account",
      "Community announcements",
    ],
    popular: false,
    active: true,
  },
  {
    id: 2,
    name: "Premium",
    price: { monthly: 299, yearly: 2990 },
    features: [
      "Up to 500 residents",
      "Advanced analytics",
      "Priority support",
      "5 admin accounts",
      "Community announcements",
      "Visitor management",
      "Maintenance tracking",
    ],
    popular: true,
    active: true,
  },
  {
    id: 3,
    name: "Enterprise",
    price: { monthly: 599, yearly: 5990 },
    features: [
      "Unlimited residents",
      "Custom reporting",
      "24/7 phone support",
      "Unlimited admins",
      "All Premium features",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
    ],
    popular: false,
    active: true,
  },
];

export default function Plans() {
  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Plans Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create and manage subscription plans
          </p>
        </div>
        <Button className="gradient-accent text-accent-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Plan
        </Button>
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className="text-sm font-medium text-foreground">Monthly</span>
        <Switch />
        <span className="text-sm font-medium text-muted-foreground">
          Yearly <span className="text-accent">(Save 17%)</span>
        </span>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "admin-card p-6 relative animate-fade-in",
              plan.popular && "ring-2 ring-accent"
            )}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 rounded-full text-xs font-medium gradient-accent text-accent-foreground">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-foreground">${plan.price.monthly}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-accent/10">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground">Plan Active</span>
              <Switch defaultChecked={plan.active} />
            </div>

            <Button
              variant={plan.popular ? "default" : "outline"}
              className={cn("w-full mt-4", plan.popular && "gradient-accent text-accent-foreground")}
            >
              Edit Plan
            </Button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
