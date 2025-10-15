import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, ArrowDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import sreenidLogo from "@/assets/sreenidhi-logo.png";

const SubjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const [students, setStudents] = useState([
    { rollNo: "20CS001", name: "John Doe", mid1: 40, mid2: 45, attendance: 92, assignments: 18 },
    { rollNo: "20CS002", name: "Jane Smith", mid1: 38, mid2: 40, attendance: 88, assignments: 17 },
    { rollNo: "20CS003", name: "Mike Johnson", mid1: 45, mid2: 47, attendance: 95, assignments: 20 },
    { rollNo: "20CS004", name: "Emily Davis", mid1: 42, mid2: 46, attendance: 90, assignments: 19 },
  ]);

  const updateStudentField = (rollNo: string, field: string, value: string) => {
    setStudents(students.map(student => 
      student.rollNo === rollNo ? { ...student, [field]: parseInt(value) || 0 } : student
    ));
  };

  const handleKeyDown = (e: React.KeyboardEvent, studentIndex: number, field: string) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      moveToNextStudent(studentIndex, field);
    }
  };

  const moveToNextStudent = (currentIndex: number, field: string) => {
    if (currentIndex < students.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentStudentIndex(nextIndex);
      const nextInputKey = `${students[nextIndex].rollNo}-${field}`;
      setTimeout(() => {
        inputRefs.current[nextInputKey]?.focus();
      }, 0);
    }
  };

  const handleSave = () => {
    toast({
      title: "Marks Saved",
      description: "All student marks have been saved successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={sreenidLogo} alt="Sreenidhi Institute Logo" className="h-12" />
            <Button variant="ghost" onClick={() => navigate("/dashboard/faculty")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="p-6">
          <h1 className="text-3xl font-bold mb-2">Data Structures</h1>
          <p className="text-muted-foreground mb-6">2nd Year • CSE • Section A</p>

          <Tabs defaultValue="marks" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="marks">Mid Marks</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
            </TabsList>

            <TabsContent value="marks" className="mt-6">
              <div className="mb-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <ArrowDown className="h-4 w-4" />
                  Press <kbd className="px-2 py-1 bg-background border rounded text-xs">↓</kbd> arrow key to move to next student
                </p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Mid 1 (50)</TableHead>
                    <TableHead>Mid 2 (50)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student, index) => (
                    <TableRow key={student.rollNo}>
                      <TableCell className="font-medium">{student.rollNo}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>
                        <Input
                          ref={(el) => inputRefs.current[`${student.rollNo}-mid1`] = el}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={student.mid1}
                          onChange={(e) => updateStudentField(student.rollNo, 'mid1', e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, index, 'mid1')}
                          className="w-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          ref={(el) => inputRefs.current[`${student.rollNo}-mid2`] = el}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={student.mid2}
                          onChange={(e) => updateStudentField(student.rollNo, 'mid2', e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, index, 'mid2')}
                          className="w-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="attendance" className="mt-6">
              <div className="mb-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <ArrowDown className="h-4 w-4" />
                  Press <kbd className="px-2 py-1 bg-background border rounded text-xs">↓</kbd> arrow key to move to next student
                </p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Attendance (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student, index) => (
                    <TableRow key={student.rollNo}>
                      <TableCell className="font-medium">{student.rollNo}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>
                        <Input
                          ref={(el) => inputRefs.current[`${student.rollNo}-attendance`] = el}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={student.attendance}
                          onChange={(e) => updateStudentField(student.rollNo, 'attendance', e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, index, 'attendance')}
                          className="w-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="assignments" className="mt-6">
              <div className="mb-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <ArrowDown className="h-4 w-4" />
                  Press <kbd className="px-2 py-1 bg-background border rounded text-xs">↓</kbd> arrow key to move to next student
                </p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Assignments (out of 20)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student, index) => (
                    <TableRow key={student.rollNo}>
                      <TableCell className="font-medium">{student.rollNo}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>
                        <Input
                          ref={(el) => inputRefs.current[`${student.rollNo}-assignments`] = el}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={student.assignments}
                          onChange={(e) => updateStudentField(student.rollNo, 'assignments', e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, index, 'assignments')}
                          className="w-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave} size="lg">
              <Save className="h-4 w-4 mr-2" />
              Save All Marks
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SubjectDetails;
