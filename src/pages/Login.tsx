import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const roleConfig = {
    student: { title: "Student Portal", color: "from-blue-500 to-cyan-500" },
    faculty: { title: "Faculty Portal", color: "from-purple-500 to-pink-500" },
    admin: { title: "Admin Portal", color: "from-orange-500 to-red-500" },
  };

  const config = roleConfig[role as keyof typeof roleConfig];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - demo purposes only
    if (email && password) {
      localStorage.setItem("userRole", role || "");
      localStorage.setItem("userEmail", email);
      toast({
        title: "Login Successful",
        description: `Welcome to ${config.title}`,
      });
      navigate(`/dashboard/${role}`);
    } else {
      toast({
        title: "Login Failed",
        description: "Please enter valid credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className={`h-2 bg-gradient-to-r ${config.color}`} />
        <div className="p-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{config.title}</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email / User ID</Label>
              <Input
                id="email"
                type="text"
                placeholder="Enter your email or ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Sign In
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              Demo: Use any email and password to login
            </p>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Login;
