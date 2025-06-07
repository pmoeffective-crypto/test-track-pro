import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

interface UserRoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  userName: string;
  setUserName: (name: string) => void;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export function UserRoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>('student');
  const [userName, setUserName] = useState('Utilisateur');

  return (
    <UserRoleContext.Provider value={{ role, setRole, userName, setUserName }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
}