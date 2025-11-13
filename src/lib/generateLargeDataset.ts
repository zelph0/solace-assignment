import type { Advocate } from '@/types/advocate';

const firstNames = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
  'William', 'Barbara', 'David', 'Elizabeth', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Christopher', 'Karen', 'Charles', 'Nancy', 'Daniel', 'Lisa',
  'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley',
  'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
  'Kenneth', 'Carol', 'Kevin', 'Amanda', 'Brian', 'Dorothy', 'George', 'Melissa',
  'Timothy', 'Deborah', 'Ronald', 'Stephanie', 'Edward', 'Rebecca', 'Jason', 'Sharon',
  'Jeffrey', 'Laura', 'Ryan', 'Cynthia', 'Jacob', 'Kathleen', 'Gary', 'Amy',
  'Nicholas', 'Angela', 'Eric', 'Shirley', 'Jonathan', 'Anna', 'Stephen', 'Brenda',
  'Larry', 'Pamela', 'Justin', 'Emma', 'Scott', 'Nicole', 'Brandon', 'Helen',
  'Benjamin', 'Samantha', 'Samuel', 'Katherine', 'Raymond', 'Christine', 'Gregory', 'Debra',
  'Alexander', 'Rachel', 'Patrick', 'Carolyn', 'Frank', 'Janet', 'Jack', 'Catherine',
  'Dennis', 'Maria', 'Jerry', 'Heather', 'Tyler', 'Diane', 'Aaron', 'Ruth',
  'Jose', 'Julie', 'Adam', 'Olivia', 'Nathan', 'Joyce', 'Henry', 'Virginia',
  'Douglas', 'Victoria', 'Zachary', 'Kelly', 'Peter', 'Lauren', 'Kyle', 'Christina',
  'Ethan', 'Joan', 'Jeremy', 'Evelyn', 'Walter', 'Judith', 'Christian', 'Megan',
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
  'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
  'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young',
  'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell',
  'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker',
  'Cruz', 'Edwards', 'Collins', 'Reyes', 'Stewart', 'Morris', 'Morales', 'Murphy',
  'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper', 'Peterson', 'Bailey',
  'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson',
  'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza',
  'Ruiz', 'Hughes', 'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers',
];

const cities = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego',
  'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco',
  'Indianapolis', 'Seattle', 'Denver', 'Washington', 'Boston', 'El Paso', 'Nashville', 'Detroit',
  'Oklahoma City', 'Portland', 'Las Vegas', 'Memphis', 'Louisville', 'Baltimore', 'Milwaukee', 'Albuquerque',
  'Tucson', 'Fresno', 'Mesa', 'Sacramento', 'Atlanta', 'Kansas City', 'Colorado Springs', 'Omaha',
  'Raleigh', 'Miami', 'Long Beach', 'Virginia Beach', 'Oakland', 'Minneapolis', 'Tulsa', 'Tampa',
  'Arlington', 'New Orleans', 'Wichita', 'Cleveland', 'Bakersfield', 'Aurora', 'Anaheim', 'Honolulu',
  'Santa Ana', 'Riverside', 'Corpus Christi', 'Lexington', 'Stockton', 'Henderson', 'Saint Paul', 'Cincinnati',
];

const degrees = [
  'RN', 'MSW', 'PhD', 'PsyD', 'LCSW', 'MD', 'MPH', 'BSN', 'MSN', 'DNP',
  'Licensed Counselor', 'Certified Life Coach', 'Peer Advocate', 'Patient Navigator',
];

const specialties = [
  'Cardiology',
  'Diabetes Management',
  'Orthopedics',
  'Physical Therapy',
  'Mental Health Support',
  'Nutrition Counseling',
  'Pain Management',
  'Palliative Care',
  'Geriatric Care',
  'Pediatrics',
  'Women\'s Health',
  'Men\'s Health',
  'Chronic Disease Management',
  'Post-Surgery Recovery',
  'Rehabilitation Services',
  'Respiratory Therapy',
  'Neurology',
  'Gastroenterology',
  'Dermatology',
  'Endocrinology',
  'Rheumatology',
  'Nephrology',
  'Urology',
  'Ophthalmology',
  'Dental Health',
  'Sleep Medicine',
  'Infectious Disease',
  'Allergy & Immunology',
  'Financial Navigation',
  'Insurance Assistance',
  'Care Coordination',
];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomElements<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function generatePhoneNumber(): string {
  const areaCode = randomInt(200, 999);
  const prefix = randomInt(200, 999);
  const lineNumber = randomInt(1000, 9999);
  return `${areaCode}${prefix}${lineNumber}`;
}

function generateAdvocate(id: number): Advocate {
  const firstName = randomElement(firstNames);
  const lastName = randomElement(lastNames);
  const city = randomElement(cities);
  const degree = randomElement(degrees);

  const specialtyCount = Math.random() < 0.7 ? randomInt(1, 3) : randomInt(4, 6);
  const advocateSpecialties = randomElements(specialties, specialtyCount);

  const yearsOfExperience = randomInt(0, 35);
  const phoneNumber = generatePhoneNumber();

  const daysAgo = randomInt(0, 1825);
  const createdAt = new Date();
  createdAt.setDate(createdAt.getDate() - daysAgo);

  return {
    id,
    firstName,
    lastName,
    city,
    degree,
    specialties: advocateSpecialties,
    yearsOfExperience,
    phoneNumber,
    createdAt,
  };
}

export function generateLargeDataset(count: number = 100000): Advocate[] {
  console.log(`Generating ${count.toLocaleString()} advocates...`);
  const startTime = Date.now();

  const advocates: Advocate[] = [];

  for (let i = 1; i <= count; i++) {
    advocates.push(generateAdvocate(i));

    if (i % 10000 === 0) {
      console.log(`Generated ${i.toLocaleString()} advocates...`);
    }
  }

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  console.log(`Generated ${count.toLocaleString()} advocates in ${duration}s`);

  return advocates;
}

let cachedDataset: Advocate[] | null = null;

export function getCachedDataset(count: number = 100000): Advocate[] {
  if (!cachedDataset) {
    cachedDataset = generateLargeDataset(count);
  }
  return cachedDataset;
}

export function getDatasetStats(advocates: Advocate[]) {
  const specialtyCounts = new Map<string, number>();
  const cityCounts = new Map<string, number>();
  const degreeCounts = new Map<string, number>();

  advocates.forEach(advocate => {
    advocate.specialties.forEach(specialty => {
      specialtyCounts.set(specialty, (specialtyCounts.get(specialty) || 0) + 1);
    });
    cityCounts.set(advocate.city, (cityCounts.get(advocate.city) || 0) + 1);
    degreeCounts.set(advocate.degree, (degreeCounts.get(advocate.degree) || 0) + 1);
  });

  return {
    total: advocates.length,
    specialties: Object.fromEntries(specialtyCounts),
    cities: Object.fromEntries(cityCounts),
    degrees: Object.fromEntries(degreeCounts),
    avgExperience: advocates.reduce((sum, a) => sum + a.yearsOfExperience, 0) / advocates.length,
  };
}
