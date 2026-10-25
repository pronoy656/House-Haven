"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { InputField } from "@/components/shared/InputField";
import { StarRating } from "@/components/shared/StarRating";

export interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

export function ReviewModal({ isOpen, onClose, onSubmit }: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setReviewComment] = useState("Heating not working");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(rating, comment);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 w-full max-w-[310px] shadow-2xl border border-slate-100 flex flex-col items-center animate-in zoom-in-95 duration-200 relative">
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          <X className="w-4 h-4" />
        </Button>

        <h3 className="text-base font-bold text-slate-900 mb-4 tracking-tight">
          Review
        </h3>

        {/* Interactive Star Rating */}
        <div className="mb-5">
          <StarRating
            rating={rating}
            size="lg"
            interactive
            onChange={setRating}
          />
        </div>

        <div className="w-full mb-5">
          <InputField
            label="Review"
            labelClassName="text-xs font-semibold text-slate-700"
            type="text"
            variant="outlined"
            inputSize="sm"
            value={comment}
            onChange={(e) => setReviewComment(e.target.value)}
            placeholder="Type your feedback..."
          />
        </div>

        <Button
          type="button"
          variant="primary"
          size="lg"
          fullWidth
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? <span>Submitting...</span> : <span>Review</span>}
        </Button>
      </div>
    </div>
  );
}
