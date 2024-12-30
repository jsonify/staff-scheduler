// app/calendar/page.tsx
'use client';

import React from 'react';
import { databases } from '@/app/lib/appwrite/schema';
import { ParaEducatorBank } from '@/app/components/calendar/ParaEducatorBank';
import { TimeGrid } from '@/app/components/calendar/TimeGrid';
import { AssignmentModal } from '@/app/components/calendar/AssignmentModal';
import { useAuth } from '@/app/hooks/useAuth';
import { AssignmentWithDetails, ParaEducator, Classroom } from '@/app/types';

export default function CalendarPage() {
  const { user } = useAuth();
  const [paraEducators, setParaEducators] = React.useState<ParaEducator[]>([]);
  const [assignments, setAssignments] = React.useState<AssignmentWithDetails[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedAssignment, setSelectedAssignment] = React.useState<AssignmentWithDetails | undefined>();
  const [draggedParaEducator, setDraggedParaEducator] = React.useState<ParaEducator | null>(null);

  const classrooms: Classroom[] = React.useMemo(() => [
    { id: 'room1', name: 'Room 1', timeSlots: [] },
    { id: 'room2', name: 'Room 2', timeSlots: [] },
    { id: 'room3', name: 'Room 3', timeSlots: [] },
    { id: 'room4', name: 'Room 4', timeSlots: [] },
    { id: 'room5', name: 'Room 5', timeSlots: [] },
    { id: 'room6', name: 'Room 6', timeSlots: [] },
    { id: 'room7', name: 'Room 7', timeSlots: [] },
    { id: 'room8', name: 'Room 8', timeSlots: [] },
    { id: 'room9', name: 'Room 9', timeSlots: [] },
    { id: 'room10', name: 'Room 10', timeSlots: [] },
  ], []);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [paraResponse, assignResponse] = await Promise.all([
          databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!, 'paraeducators'),
          databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!, 'assignments')
        ]);

        setParaEducators(paraResponse.documents.map(doc => ({
          $id: doc.$id,
          name: doc.name,
          timeBank: doc.timeBank
        } as ParaEducator)));
        
        const assignmentsWithDetails = assignResponse.documents.map(assignment => ({
          ...assignment,
          paraEducatorName: paraEducators.find(p => p.$id === assignment.paraEducator)?.name || 'Unknown',
          paraEducator: assignment.paraEducator,
          time: assignment.time,
          classroom: assignment.classroom,
          createdBy: assignment.createdBy
        } as AssignmentWithDetails));
        
        setAssignments(assignmentsWithDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDrop = async (time: string, classroom: string) => {
    if (!draggedParaEducator || !user) return;

    try {
      const assignment = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        'assignments',
        'unique()',
        {
          paraEducator: draggedParaEducator.$id,
          time,
          classroom,
          createdBy: user.$id,
          date: new Date().toISOString()
        }
      );

      setAssignments(prev => [...prev, {
        ...assignment,
        paraEducator: draggedParaEducator.$id,
        time,
        classroom,
        createdBy: user.$id,
        paraEducatorName: draggedParaEducator.name
      } as AssignmentWithDetails]);
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  const handleSaveAssignment = async (data: Partial<AssignmentWithDetails>) => {
    if (!user) return;
    try {
      if (selectedAssignment) {
        const updated = await databases.updateDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          'assignments',
          selectedAssignment.$id,
          data
        );
        setAssignments(prev => prev.map(a => 
          a.$id === selectedAssignment.$id ? { ...a, ...updated } as AssignmentWithDetails : a
        ));
      }
    } catch (error) {
      console.error('Error saving assignment:', error);
    }
  };

  const handleDeleteAssignment = async (id: string) => {
    if (!user) return;
    try {
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        'assignments',
        id
      );
      setAssignments(prev => prev.filter(a => a.$id !== id));
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
  };

  return (
    <div className="flex gap-4 p-4 h-screen bg-slate-950">
      <ParaEducatorBank
        paraEducators={paraEducators}
        onDragStart={setDraggedParaEducator}
      />
      <div className="flex-1 overflow-hidden">
        <TimeGrid
          classrooms={classrooms}
          assignments={assignments}
          onDrop={handleDrop}
          onEditAssignment={(assignment) => {
            setSelectedAssignment(assignment);
            setIsModalOpen(true);
          }}
          onDeleteAssignment={handleDeleteAssignment}
        />
      </div>
      <AssignmentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAssignment(undefined);
        }}
        assignment={selectedAssignment}
        paraEducators={paraEducators}
        onSave={handleSaveAssignment}
      />
    </div>
  );
}