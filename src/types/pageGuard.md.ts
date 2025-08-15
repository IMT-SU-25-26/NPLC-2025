export interface PageGuardProps {
  children: React.ReactNode;
  checkAdmin?: boolean;
  competitionId?: string;
  redirectIfRegistered?: boolean; // <-- add this prop
shouldRedirectOnClose?: boolean;
  redirectTo?: string;
  should_use_is_page_locked?: boolean; // default: false
}