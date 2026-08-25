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
      openVulnAvailable: null,
      openCriticals: null,
      openHighs: null,
      openModerates: null,
      isGerrit: null,
      isExcluded: null,
    } as HealthBreakdownResults;

    const result = getOpenVulnRow(signals);

    expect(result.status).toBe('no-data');
  });

  test('getOpenVulnRow returns no-data when the repo has never completed a vulnerability scan', () => {
    const signals = {
      openVulnScore: 10,
      openVulnAvailable: false,
      openCriticals: null,
      openHighs: null,
      openModerates: null,
      isGerrit: false,
      isExcluded: false,
    } as HealthBreakdownResults;

    const result = getOpenVulnRow(signals);

    expect(result.status).toBe('no-data');
  });

  test('getOpenVulnRow returns positive when the repo has been scanned and is clean', () => {
    const signals = {
      openVulnScore: 10,
      openVulnAvailable: true,
      openCriticals: 0,
      openHighs: 0,
      openModerates: 0,
      isGerrit: false,
      isExcluded: false,
    } as HealthBreakdownResults;

    const result = getOpenVulnRow(signals);

    expect(result.status).toBe('positive');
  });
});
