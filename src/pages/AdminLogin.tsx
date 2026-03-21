import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-login", {
        body: { username, password },
      });
      if (error || !data?.token) throw new Error(data?.error || "Login failed");
      localStorage.setItem("admin_token", data.token);
      navigate("/admin/dashboard");
    } catch (err: any) {
      toast({ title: "Xatolik", description: err.message || "Login muvaffaqiyatsiz", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <Card className="w-full max-w-sm border-slate-700 bg-slate-800/80 backdrop-blur">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-white text-xl">Admin Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label className="text-slate-300">Login</Label>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="bg-slate-700 border-slate-600 text-white" />
            </div>
            <div>
              <Label className="text-slate-300">Parol</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="bg-slate-700 border-slate-600 text-white" />
            </div>
            <Button type="submit" className="w-full" disabled={loading || !username || !password}>
              <LogIn className="w-4 h-4 mr-2" />
              {loading ? "Tekshirilmoqda..." : "Kirish"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
