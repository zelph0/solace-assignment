import { NextRequest } from 'next/server';
import type { AdvocatesResponse } from '@/types/advocate';

const USE_DATABASE = !!process.env.DATABASE_URL;

import db from '@/db';
import { advocates } from '@/db/schema';
import { sql, count, ilike, or, and, gte, lte, desc, asc } from 'drizzle-orm';

import { getCachedDataset } from '@/lib/generateLargeDataset';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');

    const search = searchParams.get('search')?.trim() || '';
    const specialty = searchParams.get('specialty')?.trim() || '';
    const city = searchParams.get('city')?.trim() || '';
    const minExperience = searchParams.get('minExperience')
      ? parseInt(searchParams.get('minExperience')!)
      : undefined;
    const maxExperience = searchParams.get('maxExperience')
      ? parseInt(searchParams.get('maxExperience')!)
      : undefined;

    const sortBy = (searchParams.get('sortBy') as 'name' | 'experience' | 'newest') || 'newest';
    const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc';

    if (page < 1 || pageSize < 1 || pageSize > 100) {
      return Response.json(
        { error: 'Invalid pagination parameters' },
        { status: 400 }
      );
    }

    if (USE_DATABASE) {
      console.log('📊 Using PRODUCTION database queries');

      const conditions = [];

      if (search) {
        conditions.push(
          or(
            ilike(advocates.firstName, `%${search}%`),
            ilike(advocates.lastName, `%${search}%`),
            ilike(advocates.city, `%${search}%`),
            ilike(advocates.degree, `%${search}%`),
            sql`${advocates.specialties}::text ILIKE ${`%${search}%`}`
          )
        );
      }

      if (specialty) {
        conditions.push(
          sql`${advocates.specialties} @> ${JSON.stringify([specialty])}`
        );
      }

      if (city) {
        conditions.push(ilike(advocates.city, city));
      }

      if (minExperience !== undefined) {
        conditions.push(gte(advocates.yearsOfExperience, minExperience));
      }

      if (maxExperience !== undefined) {
        conditions.push(lte(advocates.yearsOfExperience, maxExperience));
      }

      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

      let orderByClause;
      switch (sortBy) {
        case 'name':
          orderByClause = sortOrder === 'asc'
            ? asc(advocates.firstName)
            : desc(advocates.firstName);
          break;
        case 'experience':
          orderByClause = sortOrder === 'asc'
            ? asc(advocates.yearsOfExperience)
            : desc(advocates.yearsOfExperience);
          break;
        case 'newest':
        default:
          orderByClause = sortOrder === 'asc'
            ? asc(advocates.createdAt)
            : desc(advocates.createdAt);
          break;
      }

      const offset = (page - 1) * pageSize;

      const [advocatesData, countData] = await Promise.all([
        db
          .select({
            id: advocates.id,
            firstName: advocates.firstName,
            lastName: advocates.lastName,
            city: advocates.city,
            degree: advocates.degree,
            specialties: advocates.specialties,
            yearsOfExperience: advocates.yearsOfExperience,
            phoneNumber: advocates.phoneNumber,
            createdAt: advocates.createdAt,
          })
          .from(advocates)
          .where(whereClause)
          .orderBy(orderByClause)
          .limit(pageSize)
          .offset(offset),

        db
          .select({ count: count() })
          .from(advocates)
          .where(whereClause)
      ]);

      const totalCount = countData[0]?.count || 0;
      const totalPages = Math.ceil(totalCount / pageSize);

      const response: AdvocatesResponse = {
        data: advocatesData,
        pagination: {
          page,
          pageSize,
          totalCount,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      };

      return Response.json(response, {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      });
    }

    console.log('🔧 Using DEVELOPMENT in-memory data');

    const allAdvocates = getCachedDataset(100000);

    let filteredAdvocates = allAdvocates;

    if (search) {
      const searchLower = search.toLowerCase();
      filteredAdvocates = filteredAdvocates.filter((advocate) => {
        const fullName = `${advocate.firstName} ${advocate.lastName}`.toLowerCase();
        const cityMatch = advocate.city.toLowerCase().includes(searchLower);
        const degreeMatch = advocate.degree.toLowerCase().includes(searchLower);
        const specialtyMatch = advocate.specialties.some((s) =>
          s.toLowerCase().includes(searchLower)
        );
        const nameMatch = fullName.includes(searchLower);

        return nameMatch || cityMatch || degreeMatch || specialtyMatch;
      });
    }

    if (specialty) {
      const specialtyLower = specialty.toLowerCase();
      filteredAdvocates = filteredAdvocates.filter((advocate) =>
        advocate.specialties.some((s) => s.toLowerCase() === specialtyLower)
      );
    }

    if (city) {
      const cityLower = city.toLowerCase();
      filteredAdvocates = filteredAdvocates.filter(
        (advocate) => advocate.city.toLowerCase() === cityLower
      );
    }

    if (minExperience !== undefined) {
      filteredAdvocates = filteredAdvocates.filter(
        (advocate) => advocate.yearsOfExperience >= minExperience
      );
    }

    if (maxExperience !== undefined) {
      filteredAdvocates = filteredAdvocates.filter(
        (advocate) => advocate.yearsOfExperience <= maxExperience
      );
    }

    const sortedAdvocates = [...filteredAdvocates].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
          const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
          comparison = nameA.localeCompare(nameB);
          break;
        case 'experience':
          comparison = a.yearsOfExperience - b.yearsOfExperience;
          break;
        case 'newest':
          comparison = b.createdAt.getTime() - a.createdAt.getTime();
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    const totalCount = sortedAdvocates.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const offset = (page - 1) * pageSize;
    const paginatedAdvocates = sortedAdvocates.slice(offset, offset + pageSize);

    const response: AdvocatesResponse = {
      data: paginatedAdvocates,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };

    return Response.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    console.error('Error fetching advocates:', error);
    return Response.json(
      { error: 'Failed to fetch advocates' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { filterType } = await request.json();

    if (USE_DATABASE) {
      let uniqueValues: string[] = [];

      switch (filterType) {
        case 'specialties': {
          const result = await db.execute(sql`
            SELECT DISTINCT jsonb_array_elements_text(specialties) as specialty
            FROM advocates
            ORDER BY specialty
          `);
          uniqueValues = result.rows.map((row: any) => row.specialty);
          break;
        }
        case 'cities': {
          const result = await db
            .selectDistinct({ city: advocates.city })
            .from(advocates)
            .orderBy(asc(advocates.city));
          uniqueValues = result.map((row: any) => row.city);
          break;
        }
        case 'degrees': {
          const result = await db
            .selectDistinct({ degree: advocates.degree })
            .from(advocates)
            .orderBy(asc(advocates.degree));
          uniqueValues = result.map((row: any) => row.degree);
          break;
        }
        default:
          return Response.json({ error: 'Invalid filter type' }, { status: 400 });
      }

      return Response.json({ values: uniqueValues });
    }

    const allAdvocates = getCachedDataset(100000);
    let uniqueValues: string[] = [];

    switch (filterType) {
      case 'specialties': {
        const specialtiesSet = new Set<string>();
        allAdvocates.forEach((advocate) => {
          advocate.specialties.forEach((s) => specialtiesSet.add(s));
        });
        uniqueValues = Array.from(specialtiesSet).sort();
        break;
      }
      case 'cities': {
        const citiesSet = new Set<string>();
        allAdvocates.forEach((advocate) => citiesSet.add(advocate.city));
        uniqueValues = Array.from(citiesSet).sort();
        break;
      }
      case 'degrees': {
        const degreesSet = new Set<string>();
        allAdvocates.forEach((advocate) => degreesSet.add(advocate.degree));
        uniqueValues = Array.from(degreesSet).sort();
        break;
      }
      default:
        return Response.json({ error: 'Invalid filter type' }, { status: 400 });
    }

    return Response.json({ values: uniqueValues });
  } catch (error) {
    console.error('Error fetching filter values:', error);
    return Response.json(
      { error: 'Failed to fetch filter values' },
      { status: 500 }
    );
  }
}
