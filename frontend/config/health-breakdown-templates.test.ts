/*
Copyright (c) 2026 The Linux Foundation and each contributor.
SPDX-License-Identifier: MIT
*/

import { describe, test, expect } from 'vitest';
import type { HealthBreakdownResults } from '../types/overview/responses.types';
import { getOpenVulnRow } from './health-breakdown-templates';

describe('health-breakdown-templates', () => {
  test('getOpenVulnRow returns no-data when openVulnScore is null', () => {
    const signals = {
      openVulnScore: null,
      openCriticals: null,
      openHighs: null,
      openModerates: null,
      isGerrit: null,
      isExcluded: null,
    } as HealthBreakdownResults;

    const result = getOpenVulnRow(signals);

    expect(result.status).toBe('no-data');
  });
});
