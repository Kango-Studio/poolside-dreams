export type Achievement = {
  id: string;
  image: string;
  title: string;
  publication: string;
  year?: string;
};

// Add approved award artwork and magazine covers here. Reference covers from
// other companies must not be presented as SJ awards or press coverage.
export const achievements: Achievement[] = [];
