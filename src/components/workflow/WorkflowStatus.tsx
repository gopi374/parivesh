'use client';

import { cn } from '@/lib/utils';
import { Check, ClipboardList, Clock, FileCheck, FileSearch, Send, ShieldCheck } from 'lucide-react';

export const WORKFLOW_STAGES = [
    { id: 'draft', label: 'Draft', icon: ClipboardList },
    { id: 'submitted', label: 'Submitted', icon: Send },
    { id: 'scrutiny', label: 'Under Scrutiny', icon: FileSearch },
    { id: 'eds', label: 'EDS Sought', icon: Clock },
    { id: 'referred', label: 'Referred', icon: FileCheck },
    { id: 'mom', label: 'MoM Generated', icon: ShieldCheck },
    { id: 'finalized', label: 'Finalized', icon: Check },
];

interface WorkflowStatusProps {
    currentStage: string;
}

export default function WorkflowStatus({ currentStage }: WorkflowStatusProps) {
    const currentIndex = WORKFLOW_STAGES.findIndex(s => s.id === currentStage);

    return (
        <div className="w-full py-8">
            <div className="relative flex justify-between">
                {/* Progress Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 z-0" />
                <div
                    className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-500 ease-in-out"
                    style={{ width: `${(currentIndex / (WORKFLOW_STAGES.length - 1)) * 100}%` }}
                />

                {/* Steps */}
                {WORKFLOW_STAGES.map((stage, index) => {
                    const isCompleted = index < currentIndex;
                    const isActive = index === currentIndex;

                    return (
                        <div key={stage.id} className="relative z-10 flex flex-col items-center">
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                                    isCompleted ? "bg-primary border-primary text-primary-foreground" :
                                        isActive ? "bg-background border-primary text-primary shadow-lg scale-110" :
                                            "bg-background border-muted text-muted-foreground"
                                )}
                            >
                                <stage.icon className="h-5 w-5" />
                            </div>
                            <span
                                className={cn(
                                    "mt-3 text-[10px] md:text-xs font-semibold text-center max-w-[80px]",
                                    isActive ? "text-primary" :
                                        isCompleted ? "text-primary/70" :
                                            "text-muted-foreground"
                                )}
                            >
                                {stage.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
