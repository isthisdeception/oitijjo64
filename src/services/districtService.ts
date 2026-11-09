import { DISTRICTS_SEED, DIVISIONS } from '../data';
import { District, DivisionBn, DivisionMeta } from '../types';

export const districtService = {
  /**
   * Fetch all 64 districts
   */
  async getAll(): Promise<District[]> {
    // Simulated async boundary for future Django REST API
    return Promise.resolve([...DISTRICTS_SEED]);
  },

  /**
   * Fetch a single district by slug
   */
  async getBySlug(slug: string): Promise<District | null> {
    const found = DISTRICTS_SEED.find(
      (d) => d.slug.toLowerCase() === slug.toLowerCase()
    );
    return Promise.resolve(found ? { ...found } : null);
  },

  /**
   * Fetch a single district by ID
   */
  async getById(id: string): Promise<District | null> {
    const found = DISTRICTS_SEED.find((d) => d.id === id);
    return Promise.resolve(found ? { ...found } : null);
  },

  /**
   * Filter districts by administrative division
   */
  async getByDivision(division: DivisionBn): Promise<District[]> {
    const filtered = DISTRICTS_SEED.filter((d) => d.divisionBn === division);
    return Promise.resolve(filtered);
  },

  /**
   * Search districts by Bangla name or slug with optional division filter
   */
  async search(query: string, division?: string): Promise<District[]> {
    const q = query.trim().toLowerCase();

    const filtered = DISTRICTS_SEED.filter((d) => {
      const matchesQuery =
        !q ||
        d.nameBn.includes(q) ||
        d.slug.toLowerCase().includes(q) ||
        d.divisionBn.includes(q);

      const matchesDivision =
        !division || division === 'all' || d.divisionBn === division;

      return matchesQuery && matchesDivision;
    });

    return Promise.resolve(filtered);
  },

  /**
   * Get metadata for all 8 administrative divisions
   */
  async getDivisions(): Promise<readonly DivisionMeta[]> {
    return Promise.resolve(DIVISIONS);
  },
};
