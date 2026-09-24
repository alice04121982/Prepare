/**
 * World series from Our World in Data, fetched 19 September 2026 via the
 * grapher CSV endpoints. Used on the "If the news is frightening you" page.
 * Each entry is [year, value]. Sources are listed with the charts.
 */
export type Point = [number, number];

/** Share of children dying before age five, per cent. OWID "global-child-mortality-timeseries" (Gapminder, UN IGME). */
export const childMortality: Point[] = [
  [1800, 42.8],
  [1805, 42.6],
  [1810, 42.5],
  [1815, 42.2],
  [1820, 42.1],
  [1825, 42.1],
  [1830, 42.2],
  [1835, 42.2],
  [1840, 42.1],
  [1845, 42.0],
  [1850, 42.0],
  [1855, 44.0],
  [1860, 42.9],
  [1865, 42.3],
  [1870, 41.9],
  [1875, 41.5],
  [1880, 41.6],
  [1885, 41.2],
  [1890, 41.5],
  [1895, 41.3],
  [1900, 40.9],
  [1905, 38.8],
  [1910, 36.4],
  [1915, 35.3],
  [1920, 34.4],
  [1925, 32.4],
  [1930, 31.6],
  [1935, 29.5],
  [1940, 27.9],
  [1945, 26.7],
  [1950, 24.7],
  [1955, 22.3],
  [1960, 20.2],
  [1965, 15.1],
  [1970, 14.2],
  [1975, 13.1],
  [1980, 11.9],
  [1985, 10.6],
  [1990, 9.4],
  [1995, 8.7],
  [2000, 7.7],
  [2005, 6.2],
  [2010, 5.1],
  [2015, 4.3],
  [2020, 3.9],
  [2024, 3.7],
];

/** Life expectancy at birth, years. OWID "life-expectancy" (UN WPP, Riley). */
export const lifeExpectancy: Point[] = [
  [1770, 28.5],
  [1800, 28.5],
  [1820, 29.0],
  [1850, 29.3],
  [1870, 29.7],
  [1900, 32.0],
  [1913, 34.1],
  [1950, 46.4],
  [1955, 50.2],
  [1960, 47.8],
  [1965, 54.0],
  [1970, 56.3],
  [1975, 58.3],
  [1980, 60.5],
  [1985, 62.2],
  [1990, 64.0],
  [1995, 64.9],
  [2000, 66.4],
  [2005, 68.1],
  [2010, 70.1],
  [2015, 71.6],
  [2020, 71.9],
  [2023, 73.2],
];

/** Share of the world population in extreme poverty, per cent. 1820 to 1980 from OWID "world-population-in-extreme-poverty-absolute" (Bourguignon and Morrisson); 1990 onward from OWID "share-of-population-in-extreme-poverty" (World Bank, $3.00 a day, 2021 prices), which runs to the latest projection. */
export const extremePoverty: Point[] = [
  [1820, 89.2],
  [1850, 87.0],
  [1870, 82.5],
  [1890, 78.7],
  [1910, 74.0],
  [1950, 63.4],
  [1960, 54.1],
  [1970, 47.9],
  [1980, 43.2],
  [1990, 43.4],
  [1995, 39.4],
  [2000, 36.2],
  [2005, 28.3],
  [2010, 21.0],
  [2015, 13.4],
  [2020, 11.4],
  [2025, 10.2],
  [2026, 10.0],
];

/** Average deaths per year from natural disasters, by decade. OWID "decadal-deaths-disasters-type" (EM-DAT). Year is the decade start. */
export const disasterDeathsPerDecade: Point[] = [
  [1900, 147261.0],
  [1910, 32409.0],
  [1920, 523942.0],
  [1930, 464277.0],
  [1940, 386725.0],
  [1950, 61464.0],
  [1960, 325904.0],
  [1970, 98906.0],
  [1980, 75210.0],
  [1990, 43341.0],
  [2000, 78095.0],
  [2010, 45432.0],
  [2020, 48067.0],
];

/** Deaths from famines, by decade. OWID "deaths-from-famines-by-decade". Year is the decade start. */
export const famineDeathsPerDecade: Point[] = [
  [1870, 16600000.0],
  [1880, 1350000.0],
  [1890, 10247797.0],
  [1900, 3082202.0],
  [1910, 7766533.0],
  [1920, 13766666.0],
  [1930, 16130000.0],
  [1940, 24953333.0],
  [1950, 5840000.0],
  [1960, 29711500.0],
  [1970, 3760500.0],
  [1980, 1385454.0],
  [1990, 1057545.0],
  [2000, 532000.0],
  [2010, 1118333.0],
  [2020, 1052666.0],
];

/**
 * World population, average for each decade, in billions. Rounded from the
 * HYDE and UN World Population Prospects series that Our World in Data uses
 * (the average of the decade's first year and the next decade's first year).
 * The 2020s are 2020 to 2024. Used only to turn disaster deaths into a rate.
 */
export const worldPopulationByDecade: Record<number, number> = {
  1900: 1.71,
  1910: 1.84,
  1920: 2.0,
  1930: 2.2,
  1940: 2.4,
  1950: 2.76,
  1960: 3.36,
  1970: 4.07,
  1980: 4.89,
  1990: 5.75,
  2000: 6.58,
  2010: 7.44,
  2020: 8.0,
};

/** Deaths a year from natural disasters per 100,000 people, by decade. */
export const disasterDeathRatePerDecade: Point[] = disasterDeathsPerDecade.map(([decade, deaths]) => [
  decade,
  Math.round((deaths / (worldPopulationByDecade[decade] * 1e9)) * 1e5 * 100) / 100,
]);
