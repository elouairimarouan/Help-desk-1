import React, { useState } from 'react'
import { toast } from "sonner";
import { Loader, Loader2, RefreshCw } from 'lucide-react';
import axiosInstance from '../utils/axiosInstance';
function ChangeAccountStatus({ id, isActive, onStatusChange }) {
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async () => {
      setLoading(true);
      try {
        await axiosInstance.patch(`/change-account-status/${id}/`);
        toast.success("Account status has been changed successfully.");
        onStatusChange(id);
      } catch (error) {
        console.error("Error changing status:", error);
        toast.error(error.response?.data?.message || "Failed to change status.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <>
        {loading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <RefreshCw
            onClick={handleSubmit}
            className="cursor-pointer"
            size={18}
          />
        )}
      </>
    );
  }
  
  export default ChangeAccountStatus;
  