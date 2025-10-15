import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, TrendingUp, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const currentYearMarks = [
    { subject: "Data Structures", mid1: 85, mid2: 88, attendance: "92%" },
    { subject: "Database Systems", mid1: 78, mid2: 82, attendance: "88%" },
    { subject: "Operating Systems", mid1: 92, mid2: 90, attendance: "95%" },
  ];

  const previousYearMarks = [
    { subject: "Programming in C", final: 88, grade: "A" },
    { subject: "Digital Logic", final: 92, grade: "A+" },
    { subject: "Mathematics", final: 85, grade: "A" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Student Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current CGPA</p>
                <p className="text-2xl font-bold">8.7</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall Attendance</p>
                <p className="text-2xl font-bold">91%</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rank</p>
                <p className="text-2xl font-bold">12/120</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current">Current Year</TabsTrigger>
              <TabsTrigger value="previous">Previous Year</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="mt-6">
              <h3 className="text-xl font-bold mb-4">Current Semester Performance</h3>
              <div className="space-y-4">
                {currentYearMarks.map((mark, index) => (
                  <Card key={index} className="p-4">
                    <h4 className="font-semibold mb-3">{mark.subject}</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Mid-1</p>
                        <p className="font-semibold text-lg">{mark.mid1}/100</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Mid-2</p>
                        <p className="font-semibold text-lg">{mark.mid2}/100</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Attendance</p>
                        <p className="font-semibold text-lg">{mark.attendance}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="previous" className="mt-6">
              <h3 className="text-xl font-bold mb-4">Previous Year Results</h3>
              <div className="space-y-4">
                {previousYearMarks.map((mark, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">{mark.subject}</h4>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{mark.grade}</p>
                        <p className="text-sm text-muted-foreground">{mark.final}/100</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
