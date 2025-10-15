import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import sreenidLogo from "@/assets/sreenidhi-logo.png";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Dr. Sarah Johnson",
    qualification: "Ph.D. in Computer Science",
    designation: "Associate Professor",
    dateOfJoining: "2018-07-15",
  });

  const subjects = [
    { year: "2nd Year", department: "CSE", section: "A", subject: "Data Structures" },
    { year: "3rd Year", department: "CSE", section: "B", subject: "Database Systems" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your details have been saved successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={sreenidLogo} alt="Sreenidhi Institute Logo" className="h-12" />
            <h1 className="text-2xl font-bold text-foreground">Faculty Dashboard</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Profile Information</h2>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            ) : (
              <div className="space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                disabled={!isEditing}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div className="space-y-2">
              <Label>Qualification</Label>
              <Input
                value={profile.qualification}
                onChange={(e) => setProfile({ ...profile, qualification: e.target.value })}
                disabled={!isEditing}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div className="space-y-2">
              <Label>Designation</Label>
              <Input
                value={profile.designation}
                onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
                disabled={!isEditing}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div className="space-y-2">
              <Label>Date of Joining</Label>
              <Input
                type="date"
                value={profile.dateOfJoining}
                onChange={(e) => setProfile({ ...profile, dateOfJoining: e.target.value })}
                disabled={!isEditing}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Current Subjects Handling</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {subjects.map((subject, index) => (
              <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{subject.subject}</h3>
                      <p className="text-sm text-muted-foreground">
                        {subject.year} • {subject.department} • Section {subject.section}
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => navigate(`/faculty/subject/${index}`)}
                >
                  View Details
                </Button>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FacultyDashboard;
