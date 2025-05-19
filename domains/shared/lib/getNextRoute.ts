import { ROUTES } from "../constants/routes";

export function getNextRoute(invite?: string): string {
  // @todo possibly a bug, fix redirection logic
  if (!invite) return ROUTES.dashboard;
  return (
    [invite]
      .filter(Boolean)
      .map((i) => `${ROUTES.invite}?invite_id=${i}&me=true`)
      .at(0) ?? ROUTES.dashboard
  );
}
