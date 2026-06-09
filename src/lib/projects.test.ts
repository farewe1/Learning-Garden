import { describe, expect, it } from 'vitest';
import { projects, validateProjects } from './projects';

describe('projects', () => {
  it('keeps project entries ready for display with at least one useful link', () => {
    expect(() => validateProjects(projects)).not.toThrow();
    expect(projects.length).toBeGreaterThanOrEqual(3);
  });
});
