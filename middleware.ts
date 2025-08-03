import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

// const isSignInPage = createRouteMatcher(["/signin"]);
// const isProtectedRoute = createRouteMatcher(["/", "/server"]);
const isOnboardingPage = createRouteMatcher(["/onboarding"]);
const isProfilePage = createRouteMatcher(["/profile"]);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  // if (isSignInPage(request) && (await convexAuth.isAuthenticated())) {
  //   return nextjsMiddlewareRedirect(request, "/");
  // }
  // if (isProtectedRoute(request) && !(await convexAuth.isAuthenticated())) {
  //   return nextjsMiddlewareRedirect(request, "/signin");
  // }
  const isAuth = await convexAuth.isAuthenticated();

  if (isOnboardingPage(request) && !isAuth) {
    return nextjsMiddlewareRedirect(request, "/");
  }

  if (isProfilePage(request) && !isAuth) {
    return nextjsMiddlewareRedirect(request, "/");
  }

});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
