export const ROUTES = {
  dashboard: "/dashboard",
  login: "/login",
  inviteConfirm: "/invite/confirm",
  invite: "/invite",
} as const;

type RouteKey = keyof typeof ROUTES;
type RouteValue = (typeof ROUTES)[RouteKey];
