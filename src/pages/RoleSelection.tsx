import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { GraduationCap, UserCog, Users } from "lucide-react";
import collegeCover from "@/assets/college-cover.jpg";
import sreenidLogo from "@/assets/sreenidhi-logo.png";

const RoleSelection = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: "student",
      title: "Student Portal",
      description: "Access your marks, attendance, and academic records",
      icon: GraduationCap,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "faculty",
      title: "Faculty Portal",
      description: "Manage classes, students, and academic activities",
      icon: Users,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "admin",
      title: "Admin Portal",
      description: "Oversee and manage institutional operations",
      icon: UserCog,
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div 
        className="h-64 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${collegeCover})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative h-full flex items-center justify-center text-white px-4">
          <img src={sreenidLogo} alt="Sreenidhi Institute Logo" className="h-16 absolute top-4 left-4" />
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              College Management Portal
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Select your role to continue
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 pb-20">
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card
                key={role.id}
                onClick={() => navigate(`/login/${role.id}`)}
                className="cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${role.gradient}`} />
                <div className="p-8">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${role.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-foreground">
                    {role.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {role.description}
                  </p>
                  <div className="mt-6 flex items-center text-primary font-medium">
                    <span>Access Portal</span>
                    <span className="ml-2 group-hover:ml-4 transition-all">→</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
