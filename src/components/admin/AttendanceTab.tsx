"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Save, Check } from "lucide-react";

export default function AttendanceTab({ classes, enrollments }: { classes: any[], enrollments: any[] }) {
  const [selectedClassId, setSelectedClassId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [presentEmails, setPresentEmails] = useState<string[]>([]);
  const [recordId, setRecordId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (selectedClassId && date) {
      fetchAttendance();
    }
  }, [selectedClassId, date]);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/attendance?classId=${selectedClassId}&date=${date}`);
      const data = await res.json();
      if (data.success && data.data.length > 0) {
        setPresentEmails(data.data[0].presentEmails || []);
        setRecordId(data.data[0]._id);
      } else {
        setPresentEmails([]);
        setRecordId(null);
      }
    } catch (error) {
      console.error("Failed to fetch attendance", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStudent = (email: string) => {
    if (presentEmails.includes(email)) {
      setPresentEmails(presentEmails.filter(e => e !== email));
    } else {
      setPresentEmails([...presentEmails, email]);
    }
  };

  const saveAttendance = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId: selectedClassId,
          date,
          presentEmails,
          recordId
        })
      });
      const data = await res.json();
      if (data.success) {
        alert("Attendance saved successfully!");
        if (data.data._id) setRecordId(data.data._id);
      }
    } catch (error) {
      console.error("Failed to save", error);
      alert("Failed to save attendance.");
    } finally {
      setSaving(false);
    }
  };

  const currentClass = classes.find(c => c._id === selectedClassId);
  const classStudents = enrollments.filter(e => e.preferred_style === currentClass?.style && e.status === "approved");

  return (
    <motion.div
      key="attendance"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-academy-gray border border-gray-800 rounded-3xl shadow-2xl overflow-hidden p-6"
    >
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6 pb-6 border-b border-gray-800">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Mark Attendance</h2>
          <p className="text-sm text-gray-400">Select a class and date to mark student attendance.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <select 
            className="bg-academy-black border border-gray-700 text-white rounded-lg px-4 py-2 min-w-[200px]"
            value={selectedClassId}
            onChange={e => setSelectedClassId(e.target.value)}
          >
            <option value="">Select a Class...</option>
            {classes.map(c => (
              <option key={c._id} value={c._id}>{c.title} ({c.day})</option>
            ))}
          </select>
          
          <input 
            type="date" 
            className="bg-academy-black border border-gray-700 text-white rounded-lg px-4 py-2"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
      </div>

      {!selectedClassId ? (
        <div className="text-center py-12 text-gray-500">
          Please select a class from the dropdown above.
        </div>
      ) : loading ? (
        <div className="text-center py-12 text-academy-gold">
          Loading attendance data...
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg text-white font-medium">Students Enrolled: {classStudents.length}</h3>
            <button 
              onClick={saveAttendance}
              disabled={saving}
              className="bg-academy-gold hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Attendance"}
            </button>
          </div>
          
          {classStudents.length === 0 ? (
            <div className="text-center py-8 text-gray-500 border border-gray-800 rounded-lg">
              No approved students found for this class style.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classStudents.map(student => {
                const isPresent = presentEmails.includes(student.email);
                return (
                  <div 
                    key={student._id}
                    onClick={() => toggleStudent(student.email)}
                    className={`cursor-pointer border rounded-xl p-4 flex items-center justify-between transition-all ${
                      isPresent 
                        ? 'border-academy-gold bg-academy-gold/10' 
                        : 'border-gray-800 bg-academy-black hover:border-gray-600'
                    }`}
                  >
                    <div>
                      <div className="text-white font-medium">{student.student_name}</div>
                      <div className="text-xs text-gray-400">{student.email}</div>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isPresent ? 'bg-academy-gold text-black' : 'bg-gray-800 text-gray-500'
                    }`}>
                      {isPresent && <Check className="w-4 h-4" />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
