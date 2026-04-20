export const CONSULTATION_MODES = ["AUDIO", "VIDEO"] as const;
export const CONSULTATION_DURATIONS = [30, 60] as const;

export type ConsultationMode = (typeof CONSULTATION_MODES)[number];
export type ConsultationDuration = (typeof CONSULTATION_DURATIONS)[number];

export type BookingOptions = {
  consultationMode: ConsultationMode;
  durationMinutes: ConsultationDuration;
  kundliCount: number;
};

export const BOOKING_OPTION_LIMITS = {
  minKundlis: 1,
  maxKundlis: 5,
};

export const CONSULTATION_MODE_LABELS: Record<ConsultationMode, string> = {
  AUDIO: "Audio Call",
  VIDEO: "Video Call",
};

export const CONSULTATION_MODE_MULTIPLIERS: Record<ConsultationMode, number> = {
  AUDIO: 1,
  VIDEO: 1.25,
};

export const DEFAULT_BOOKING_OPTIONS: BookingOptions = {
  consultationMode: "AUDIO",
  durationMinutes: 30,
  kundliCount: 1,
};

export function isConsultationMode(value: unknown): value is ConsultationMode {
  return CONSULTATION_MODES.includes(value as ConsultationMode);
}

export function isConsultationDuration(
  value: unknown
): value is ConsultationDuration {
  return CONSULTATION_DURATIONS.includes(value as ConsultationDuration);
}

export function getDurationMultiplier(durationMinutes: ConsultationDuration) {
  return durationMinutes / 30;
}

export function getKundliMultiplier(kundliCount: number) {
  return 2 ** (kundliCount - 1);
}

export function calculateBookingAmount(
  basePrice: number,
  options: BookingOptions
) {
  return Math.round(
    basePrice *
      CONSULTATION_MODE_MULTIPLIERS[options.consultationMode] *
      getDurationMultiplier(options.durationMinutes) *
      getKundliMultiplier(options.kundliCount)
  );
}

export function parseBookingOptions(input: unknown): BookingOptions | null {
  if (typeof input !== "object" || input === null) {
    return null;
  }

  const consultationMode =
    "consultationMode" in input ? input.consultationMode : undefined;
  const durationMinutes =
    "durationMinutes" in input ? input.durationMinutes : undefined;
  const kundliCount = "kundliCount" in input ? input.kundliCount : undefined;

  if (!isConsultationMode(consultationMode)) {
    return null;
  }

  if (!isConsultationDuration(durationMinutes)) {
    return null;
  }

  if (
    typeof kundliCount !== "number" ||
    !Number.isInteger(kundliCount) ||
    kundliCount < BOOKING_OPTION_LIMITS.minKundlis ||
    kundliCount > BOOKING_OPTION_LIMITS.maxKundlis
  ) {
    return null;
  }

  return {
    consultationMode,
    durationMinutes,
    kundliCount,
  };
}
