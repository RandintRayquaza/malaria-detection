import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../state/authSlice';

const DEFAULT_GOALS = ['Faster diagnosis', 'Track patient scans'];

export function useNextSteps() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  const [facility, setFacility] = useState('');
  const [role, setRole] = useState('Lab Technician');
  const [experienceLevel, setExperienceLevel] = useState('Intermediate');
  const [notifications, setNotifications] = useState(true);
  const [goals, setGoals] = useState(DEFAULT_GOALS);

  function toggleGoal(goal) {
    setGoals((prev) => (prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]));
  }

  function saveProfile() {
    dispatch(
      updateUser({
        facility: facility.trim(),
        role,
        experienceLevel,
        notifications,
        goals,
        profileCompleted: true,
      }),
    );
  }

  return {
    user,
    facility,
    setFacility,
    role,
    setRole,
    experienceLevel,
    setExperienceLevel,
    notifications,
    setNotifications,
    goals,
    toggleGoal,
    saveProfile,
  };
}