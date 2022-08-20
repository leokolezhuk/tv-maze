globalThis.CSS = {
  supports: (value: unknown) => false,
  escape: (ident: string) => "dummy",
};
window.CSS = {
  supports: (value: unknown) => false,
  escape: (ident: string) => "dummy",
};
