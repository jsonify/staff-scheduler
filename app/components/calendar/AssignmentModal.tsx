// app/components/calendar/AssignmentModal.tsx

import React from 'react';
import { AssignmentWithDetails, ParaEducator } from '@/app/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';

interface AssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignment?: AssignmentWithDetails;
  paraEducators: ParaEducator[];
  onSave: (data: Partial<AssignmentWithDetails>) => Promise<void>;
}

export function AssignmentModal({ 
  isOpen, 
  onClose, 
  assignment, 
  paraEducators,
  onSave 
}: AssignmentModalProps) {
  const [formData, setFormData] = React.useState({
    paraEducator: assignment?.paraEducator || '',
    time: assignment?.time || '',
    date: assignment?.date || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 text-slate-200">
        <DialogHeader>
          <DialogTitle>
            {assignment ? 'Edit Assignment' : 'New Assignment'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">ParaEducator</label>
            <select
              value={formData.paraEducator}
              onChange={(e) => setFormData(prev => ({ ...prev, paraEducator: e.target.value }))}
              className="w-full bg-slate-800 rounded p-2"
              required
            >
              <option value="">Select ParaEducator</option>
              {paraEducators.map((para) => (
                <option key={para.$id} value={para.$id}>
                  {para.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Time</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
              className="w-full bg-slate-800 rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full bg-slate-800 rounded p-2"
              required
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded bg-slate-700 hover:bg-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded bg-blue-600 hover:bg-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}