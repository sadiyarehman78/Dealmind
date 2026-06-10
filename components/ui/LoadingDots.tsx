export function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="h-1.5 w-1.5 rounded-full bg-current [animation:pulse_1s_infinite_ease-in-out]" />
      <span className="h-1.5 w-1.5 rounded-full bg-current [animation:pulse_1s_0.15s_infinite_ease-in-out]" />
      <span className="h-1.5 w-1.5 rounded-full bg-current [animation:pulse_1s_0.3s_infinite_ease-in-out]" />
    </span>
  );
}
