// 🔧 Development Debug Wrapper - Only for Hackathon Testing
// This component can be temporarily enabled for demonstration purposes

import React from "react";
import AuthDebug from "./AuthDebug";
import SecurityAudit from "./SecurityAudit";

interface DebugWrapperProps {
  enabled?: boolean;
  children: React.ReactNode;
}

export default function DebugWrapper({ enabled = false, children }: DebugWrapperProps) {
  return (
    <>
      {children}
      {/* Only show debug panels if explicitly enabled AND in development */}
      {enabled && import.meta.env.DEV && (
        <>
          <AuthDebug />
          <SecurityAudit />
        </>
      )}
    </>
  );
}

// Usage:
// For normal users: <DebugWrapper>{content}</DebugWrapper>
// For hackathon demo: <DebugWrapper enabled={true}>{content}</DebugWrapper>
// For production: Debug panels are automatically hidden