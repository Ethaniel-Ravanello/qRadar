import React from 'react';
import {
  X,
  FileCheck2,
  AlertOctagon,
  Rocket,
  CheckCircle2,
  Clock,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Squad } from '../../types';

interface SquadModalProps {
  squad: Squad | null;
  onClose: () => void;
  onApproveStep: (squadId: string, step: string) => void;
}

export const SquadModal: React.FC<SquadModalProps> = ({
  squad,
  onClose,
  onApproveStep,
}) => {
  if (!squad) return null;

  const spPercent = Math.round(
    (squad.metrics.completedStoryPoints / squad.metrics.totalStoryPoints) * 100
  );

  const handleCelebrate = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const isAllApproved =
    squad.metrics.approvals.brd &&
    squad.metrics.approvals.sitSignOff &&
    squad.metrics.approvals.uatSignOff &&
    squad.metrics.approvals.secmanSignOff &&
    squad.metrics.approvals.rfcDeployment;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div
          className="p-6 border-b border-slate-800 flex items-start justify-between relative"
          style={{
            background: `linear-gradient(to right, ${squad.zoneColor}22, rgba(15, 23, 42, 0.8))`,
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: squad.zoneColor }}
              />
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-sky-400">
                BRI SQUAD COMMAND CENTER
              </span>
            </div>
            <h2 className="text-xl font-black text-white">{squad.name}</h2>
            <div className="flex items-center gap-3 mt-1 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                Lead: <strong className="text-white">{squad.leadPN}</strong>
              </span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold border border-slate-700">
                {squad.sprint}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Sprint Goal Banner */}
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              🎯 Sprint Goal:
            </span>
            <p className="text-sm font-semibold text-slate-100">{squad.sprintGoal}</p>
          </div>

          {/* Story Points & Sprint Burndown Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-300 uppercase tracking-wider">
                Sprint Story Points Completion
              </span>
              <span className="font-mono font-bold text-sky-400 text-sm">
                {squad.metrics.completedStoryPoints} / {squad.metrics.totalStoryPoints} SP ({spPercent}%)
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden border border-slate-700 p-0.5">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${spPercent}%`,
                  backgroundColor: spPercent > 80 ? '#22c55e' : spPercent > 50 ? '#38bdf8' : '#f59e0b',
                }}
              />
            </div>
          </div>

          {/* Document Approval Matrix (Crucial for Banking!) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-sky-400" />
                <span>Governance & Sign-Off Matrix</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-medium">Click to toggle approval</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* BRD */}
              <button
                onClick={() => onApproveStep(squad.id, 'brd')}
                className={`p-3 rounded-xl border flex items-center justify-between transition text-left ${
                  squad.metrics.approvals.brd
                    ? 'bg-emerald-950/40 border-emerald-600/60 text-emerald-200'
                    : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                <div>
                  <span className="font-semibold block text-slate-200">1. BRD Sign-Off</span>
                  <span className="text-[10px] opacity-80">Product & Business User</span>
                </div>
                {squad.metrics.approvals.brd ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Clock className="w-4 h-4 text-slate-500" />
                )}
              </button>

              {/* SIT */}
              <button
                onClick={() => onApproveStep(squad.id, 'sitSignOff')}
                className={`p-3 rounded-xl border flex items-center justify-between transition text-left ${
                  squad.metrics.approvals.sitSignOff
                    ? 'bg-emerald-950/40 border-emerald-600/60 text-emerald-200'
                    : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                <div>
                  <span className="font-semibold block text-slate-200">2. SIT Sign-Off</span>
                  <span className="text-[10px] opacity-80">QA & Dev Integration Test</span>
                </div>
                {squad.metrics.approvals.sitSignOff ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Clock className="w-4 h-4 text-slate-500" />
                )}
              </button>

              {/* UAT */}
              <button
                onClick={() => onApproveStep(squad.id, 'uatSignOff')}
                className={`p-3 rounded-xl border flex items-center justify-between transition text-left ${
                  squad.metrics.approvals.uatSignOff
                    ? 'bg-emerald-950/40 border-emerald-600/60 text-emerald-200'
                    : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                <div>
                  <span className="font-semibold block text-slate-200">3. UAT Sign-Off</span>
                  <span className="text-[10px] opacity-80">Business Acceptance Test</span>
                </div>
                {squad.metrics.approvals.uatSignOff ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Clock className="w-4 h-4 text-slate-500" />
                )}
              </button>

              {/* Secman */}
              <button
                onClick={() => onApproveStep(squad.id, 'secmanSignOff')}
                className={`p-3 rounded-xl border flex items-center justify-between transition text-left ${
                  squad.metrics.approvals.secmanSignOff
                    ? 'bg-emerald-950/40 border-emerald-600/60 text-emerald-200'
                    : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                <div>
                  <span className="font-semibold block text-slate-200">4. Secman Clearance</span>
                  <span className="text-[10px] opacity-80">IT Security VA & Pentest</span>
                </div>
                {squad.metrics.approvals.secmanSignOff ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Clock className="w-4 h-4 text-slate-500" />
                )}
              </button>

              {/* RFC Deployment */}
              <button
                onClick={() => onApproveStep(squad.id, 'rfcDeployment')}
                className={`p-3 rounded-xl border flex items-center justify-between transition text-left sm:col-span-2 ${
                  squad.metrics.approvals.rfcDeployment
                    ? 'bg-emerald-950/40 border-emerald-600/60 text-emerald-200'
                    : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                <div>
                  <span className="font-semibold block text-slate-200">
                    5. RFC (Request for Change) & CAB Approval
                  </span>
                  <span className="text-[10px] opacity-80">IT Operations Production Release Approval</span>
                </div>
                {squad.metrics.approvals.rfcDeployment ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Clock className="w-4 h-4 text-slate-500" />
                )}
              </button>
            </div>
          </div>

          {/* Defect Radar & Quality Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Defect Count */}
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/80 space-y-2">
              <span className="font-bold text-slate-300 uppercase tracking-wider block flex items-center gap-1.5">
                <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
                <span>Open Defect Status</span>
              </span>
              <div className="flex items-center gap-2 pt-1">
                <div
                  className={`flex-1 p-2 rounded-xl text-center border ${
                    squad.metrics.defects.p1 > 0
                      ? 'bg-red-950 border-red-500 text-red-200 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="text-base">{squad.metrics.defects.p1}</div>
                  <div className="text-[10px] uppercase">P1 (Critical)</div>
                </div>
                <div className="flex-1 p-2 rounded-xl text-center border bg-slate-900 border-slate-800 text-slate-300">
                  <div className="text-base font-bold text-orange-400">{squad.metrics.defects.p2}</div>
                  <div className="text-[10px] uppercase">P2 (Major)</div>
                </div>
                <div className="flex-1 p-2 rounded-xl text-center border bg-slate-900 border-slate-800 text-slate-300">
                  <div className="text-base font-bold text-yellow-400">{squad.metrics.defects.p3}</div>
                  <div className="text-[10px] uppercase">P3 (Minor)</div>
                </div>
              </div>
            </div>

            {/* Pipeline Stage */}
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/80 space-y-2 flex flex-col justify-between">
              <div>
                <span className="font-bold text-slate-300 uppercase tracking-wider block flex items-center gap-1.5">
                  <Rocket className="w-3.5 h-3.5 text-sky-400" />
                  <span>Pipeline Stage</span>
                </span>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-base font-mono font-extrabold text-sky-300">
                    {squad.metrics.pipeline.stage}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      squad.metrics.pipeline.health === 'green'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : squad.metrics.pipeline.health === 'yellow'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {squad.metrics.pipeline.health} health
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-700/60">
                <span>SonarQube Coverage:</span>
                <span className="font-mono font-bold text-slate-200">
                  {squad.metrics.pipeline.sonarCoverage}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-slate-800 bg-slate-900 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            {isAllApproved ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Semua Approval & Quality Gate terpenuhi!
              </span>
            ) : (
              <span>Menunggu clearance Secman & RFC CAB untuk deploy.</span>
            )}
          </div>

          <button
            onClick={handleCelebrate}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition shadow-lg ${
              isAllApproved
                ? 'bg-emerald-500 hover:bg-emerald-400 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Simulate Deploy Celebrate</span>
          </button>
        </div>
      </div>
    </div>
  );
};
