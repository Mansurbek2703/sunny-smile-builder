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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 p-4">
      <Card className="w-full max-w-sm border-blue-700 bg-blue-900/80 backdrop-blur">
        <CardHeader className="text-center">
          <img src="/images/webquest6/aysek_logo.webp" alt="AYSEK Logo" className="mx-auto h-14 w-auto mb-3" />
          <div className="mx-auto w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-2">
            <Lock className="w-6 h-6 text-cyan-400" />
          </div>
          <CardTitle className="text-white text-xl">Admin Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label className="text-gray-200">Login</Label>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="bg-blue-800 border-blue-700 text-white placeholder:text-gray-400" />
            </div>
            <div>
              <Label className="text-gray-200">Parol</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="bg-blue-800 border-blue-700 text-white placeholder:text-gray-400" />
            </div>
            <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white" disabled={loading || !username || !password}>
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
