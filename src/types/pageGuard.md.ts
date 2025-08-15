export interface PageGuardProps {
  children: React.ReactNode;
  checkAdmin?: boolean;
  competitionId?: string;
  redirectIfRegistered?: boolean; // <-- add this prop
shouldRedirectOnClose?: boolean;
  redirectTo?: string;
  is_page_locked?: boolean
  should_use_is_page_locked?: boolean; // default: false
}