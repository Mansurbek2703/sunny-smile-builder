import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { RespondentData } from "@/hooks/useRespondent";
import { UserPlus } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onRegister: (data: RespondentData) => Promise<string>;
  onSuccess: () => void;
}

export default function RegistrationModal({ open, onClose, onRegister, onSuccess }: Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<RespondentData>({
    email: "",
    first_name: "",
    last_name: "",
    father_name: "",
    course_direction: "",
    university: "",
  });

  const set = (key: keyof RespondentData, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const valid =
    form.email.includes("@") &&
    form.first_name.trim().length > 0 &&
    form.last_name.trim().length > 0 &&
    form.course_direction.trim().length > 0 &&
    form.university.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    try {
      await onRegister(form);
      toast({ title: "Registration Successful!", description: "You can now access all WebQuests." });
      onSuccess();
    } catch (err: any) {
      toast({ title: "Error", description: err?.message || "Something went wrong", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <UserPlus className="w-5 h-5 text-primary" />
            Registration
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Please fill in the following information to access the WebQuests. This only needs to be done once.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3 mt-2">
          <div>
            <Label htmlFor="reg-email">Email *</Label>
            <Input id="reg-email" type="email" required placeholder="email@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="reg-ln">Last Name *</Label>
              <Input id="reg-ln" required placeholder="Last Name" value={form.last_name} onChange={(e) => set("last_name", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="reg-fn">First Name *</Label>
              <Input id="reg-fn" required placeholder="First Name" value={form.first_name} onChange={(e) => set("first_name", e.target.value)} />
            </div>
          </div>
          <div>
            <Label htmlFor="reg-pn">Father's Name</Label>
            <Input id="reg-pn" placeholder="Father's Name (optional)" value={form.father_name} onChange={(e) => set("father_name", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="reg-cd">Course & Direction *</Label>
            <Input id="reg-cd" required placeholder="e.g., 3rd year, English Language" value={form.course_direction} onChange={(e) => set("course_direction", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="reg-uni">University *</Label>
            <Input id="reg-uni" required placeholder="University name" value={form.university} onChange={(e) => set("university", e.target.value)} />
          </div>
          <Button type="submit" className="w-full" disabled={!valid || loading}>
            {loading ? "Loading..." : "Register & Start"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
