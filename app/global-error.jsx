'use client';

// export default function GlobalError({ error, reset }) {
export default function GlobalError({ reset }) {
  return (
    <html lang="pl-PL">
      <body>
        <button type="button" onClick={() => reset()}>
          Try again global-error
        </button>
      </body>
    </html>
  );
}
