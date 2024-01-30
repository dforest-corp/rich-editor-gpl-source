declare global {
  var route: (name: string, params?: Record<string, unknown>) => string
}

export {};
