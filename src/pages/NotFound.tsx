const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-background px-5 text-center">
    <p className="eyebrow">404</p>
    <h1 className="headline mt-4 text-5xl">Lost in space.</h1>
    <p className="mt-4 text-muted-foreground">This page drifted out of range.</p>
    <a href="/" className="mt-8 text-sm font-medium text-primary hover:text-foreground">
      Return home <span aria-hidden="true">›</span>
    </a>
  </div>
);

export default NotFound;
