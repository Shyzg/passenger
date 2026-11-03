import type * as React from 'react';

export type IconName =
  | 'play' | 'pause' | 'next' | 'previous' | 'queue-add' | 'plus' | 'minus' | 'search' | 'check' | 'close'
  | 'lock' | 'volume' | 'tap' | 'qr' | 'steering' | 'disc' | 'alert' | 'clock' | 'car' | 'back' | 'leave';

/** One icon from the Passenger set. Decorative unless `label` is given. */
export interface IconProps { name: IconName; size?: number; label?: string; className?: string }
export declare function Icon(props: IconProps): React.ReactElement | null;

/** Pill button. `iconOnly` hides the children visually but keeps them as the accessible name. */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'md' | 'lg' | 'hero';
  icon?: IconName;
  iconOnly?: boolean;
}
export declare function Button(props: ButtonProps): React.ReactElement;

/** Album artwork from Spotify, shown whole. Without `src` it draws the no-artwork tile. */
export interface ArtworkProps { src?: string; alt?: string; size?: 'row' | 'hero'; tone?: 'neutral' | 'amber' | 'signal'; className?: string }
export declare function Artwork(props: ArtworkProps): React.ReactElement;

/** "row-col", 1-based: row 1 is the front, col 1 is the left side seen from above facing forward. */
export type SeatId = string;
export interface SeatRef { seat: SeatId; name?: string; layout?: number[]; driverSide?: 'left' | 'right' }

export interface SeatTagProps extends SeatRef { size?: 'sm' | 'md'; className?: string }
export declare function SeatTag(props: SeatTagProps): React.ReactElement;

export interface SeatPickerProps {
  /** Seats per row, front to back. Default [2, 3, 2]. */
  layout?: number[];
  /** Default 'right' (Indonesia). */
  driverSide?: 'left' | 'right';
  value?: SeatId | null;
  /** Seats already taken, with the passenger's name ('' when unnamed). */
  taken?: Record<SeatId, string>;
  onChange?: (seat: SeatId) => void;
  name?: string;
  legend?: string;
  className?: string;
}
export declare function SeatPicker(props: SeatPickerProps): React.ReactElement;

/** Top of every passenger screen: your seat and, when `onLeave` is given, the Turun button. */
export interface TripHeaderProps extends SeatRef { onLeave?: () => void; leaveLabel?: string; className?: string }
export declare function TripHeader(props: TripHeaderProps): React.ReactElement;

export interface Track { title: string; artist: string; album?: string; art?: string; durationMs: number; explicit?: boolean }

export interface NowPlayingProps {
  track: Track;
  progressMs?: number;
  isPlaying?: boolean;
  /** Who queued it. Spotify does not know; Passenger keeps this record itself. */
  addedBy?: SeatRef;
  /** Spotify attribution: the official Spotify logo plus a link back to the track. */
  attribution?: React.ReactNode;
  artTone?: ArtworkProps['tone'];
  /** Usually TransportControls. */
  children?: React.ReactNode;
  className?: string;
}
export declare function NowPlaying(props: NowPlayingProps): React.ReactElement;

export type ControlKey = 'previous' | 'playPause' | 'next';
export interface TransportControlsProps {
  isPlaying?: boolean;
  onPrevious?: () => void;
  onPlayPause?: () => void;
  onNext?: () => void;
  /** Controls the driver turned off for passengers. Shown with a lock and a sentence. */
  locked?: ControlKey[];
  /** Controls Spotify blocks right now (the playback state's actions). Shown disabled. */
  unavailable?: ControlKey[];
  className?: string;
}
export declare function TransportControls(props: TransportControlsProps): React.ReactElement;

/** Render only when the active device reports supports_volume. */
export interface VolumeStepperProps { value: number; step?: number; onChange?: (value: number) => void; locked?: boolean; className?: string }
export declare function VolumeStepper(props: VolumeStepperProps): React.ReactElement;

export interface TrackRowProps {
  title: string;
  artist: string;
  art?: string;
  artTone?: ArtworkProps['tone'];
  durationMs?: number;
  explicit?: boolean;
  /** Place in the queue, 1 = plays next. */
  position?: number;
  addedBy?: SeatRef;
  status?: 'idle' | 'adding' | 'added' | 'playing';
  /** Shows the add-to-queue button (search results). */
  onAdd?: () => void;
  className?: string;
}
export declare function TrackRow(props: TrackRowProps): React.ReactElement;

export interface SearchFieldProps { value?: string; onChange?: (value: string) => void; onClear?: () => void; placeholder?: string; label?: string; busy?: boolean; id?: string; className?: string }
export declare function SearchField(props: SearchFieldProps): React.ReactElement;

/** Square input for short answers such as a nickname. The label stays visible; important help goes in `hint`. */
export interface TextFieldProps {
  id: string;
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  /** An example of the answer, never a replacement for the label. */
  placeholder?: string;
  /** Read by screen readers through aria-describedby. */
  hint?: string;
  maxLength?: number;
  type?: 'text' | 'tel' | 'email';
  autoComplete?: string;
  enterKeyHint?: string;
  className?: string;
}
export declare function TextField(props: TextFieldProps): React.ReactElement;

export type NoticePreset = 'no-trip' | 'waiting' | 'joined' | 'locked' | 'no-device' | 'premium' | 'rate-limited' | 'ended';
export interface TripNoticeProps {
  preset?: NoticePreset;
  tone?: 'neutral' | 'wait' | 'info' | 'stop';
  icon?: IconName;
  title?: string;
  /** Body text; overrides the preset's. */
  children?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}
export declare function TripNotice(props: TripNoticeProps): React.ReactElement;

export interface SettingSwitchProps { id: string; label: string; description?: string; checked: boolean; onChange?: (checked: boolean) => void; disabled?: boolean; className?: string }
export declare function SettingSwitch(props: SettingSwitchProps): React.ReactElement;

/** A passenger waiting for the driver's approval; Tolak shows when `onDecline` is given. */
export interface PendingPassengerProps extends SeatRef { onApprove?: () => void; onDecline?: () => void; className?: string }
export declare function PendingPassenger(props: PendingPassengerProps): React.ReactElement;

export interface JoinCardProps {
  /** The QR code as an SVG element: dark modules on light, 4-module quiet zone, error correction Q. */
  qr?: React.ReactNode;
  title?: string;
  /** Short URL printed for typing by hand; the same URL goes in the QR and the NFC tag. */
  url?: string;
  code?: string;
  className?: string;
}
export declare function JoinCard(props: JoinCardProps): React.ReactElement;

export declare function formatDuration(ms: number): string;
export declare function seatLabel(seat: SeatId, layout?: number[], driverSide?: 'left' | 'right'): string;

declare global {
  interface Window {
    Passenger: {
      Icon: typeof Icon; Button: typeof Button; Artwork: typeof Artwork; NowPlaying: typeof NowPlaying;
      TransportControls: typeof TransportControls; VolumeStepper: typeof VolumeStepper; TrackRow: typeof TrackRow;
      SearchField: typeof SearchField; SeatTag: typeof SeatTag; SeatPicker: typeof SeatPicker; TripNotice: typeof TripNotice;
      SettingSwitch: typeof SettingSwitch; JoinCard: typeof JoinCard;
      TextField: typeof TextField; TripHeader: typeof TripHeader; PendingPassenger: typeof PendingPassenger;
      formatDuration: typeof formatDuration; seatLabel: typeof seatLabel; iconNames: IconName[];
    };
  }
}
