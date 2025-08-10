
// seed.ts

// Lancer juste le seeding :
// npx ts-node seed.ts

// Lancer reset + seeding :
// npx ts-node seed.ts --reset

// # Reset + seeding en prod (avec confirmation obligatoire)
// NODE_ENV=production npx ts-node seed.ts --reset

// TAPER "CONFIRMER" pour lancer 


// seed.ts

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';
import type { FormData } from '@/app/types/types'; // adapte le chemin si nécessaire
import readline from 'readline';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
const NODE_ENV = process.env.NODE_ENV || 'development';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('❌ SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY doivent être définis dans .env');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

interface ProfileSeed {
  email: string;
  password: string;
  username: string;
  data: FormData;
}

// Profils de test
const profilesData: ProfileSeed[] = [
  {
    email: 'karim.benali@example.com',
    password: 'Password123!',
    username: 'karim_dev',
    data: {
      language: 'fr',
      dateFormat: 'yyyy-mm-dd',
      personalInfo: {
        firstName: 'Karim',
        lastName: 'Benali',
        passportId: 'P1234567',
        workPermit: 'WP789456',
        dob: '1990-04-15',
        placeOfBirth: 'Casablanca',
        placeOfBirthCountry: 'Maroc',
        gender: 'Male',
        nationality: 'Marocaine',
        email: 'karim.benali@example.com',
        phone: '612345678',
        phoneCountryCode: '+212',
        addressType: 'Domicile',
        addressLine1: '12 Rue des Fleurs',
        addressLine2: 'Appartement 4B',
        postalCode: '20000',
        city: 'Casablanca',
        country: 'Maroc'
      },
      workExperiences: [
        {
          jobTitle: 'Développeur Full Stack',
          employer: 'Tech Innov SARL',
          city: 'Casablanca',
          country: 'Maroc',
          addressDetails: 'Technopark, Bâtiment A',
          fromDate: '2018-03-01',
          toDate: '',
          ongoing: true,
          mainActivities: 'Développement d’applications web avec React et Node.js',
          moreDetails: 'Gestion d’équipe de 4 développeurs'
        }
      ],
      educationTrainings: [
        {
          qualification: 'Master en Informatique',
          organisation: 'Université Hassan II',
          website: 'https://www.univh2c.ma',
          eqfLevel: '7',
          city: 'Casablanca',
          country: 'Maroc',
          fromDate: '2015-09-01',
          toDate: '2017-06-30',
          ongoing: false,
          moreDetails: 'Spécialisation en développement logiciel'
        }
      ],
      personalSkills: {
        motherTongues: ['Arabe'],
        otherLanguages: [
          { language: 'Français', level: 'C1' },
          { language: 'Anglais', level: 'B2' }
        ],
        skills: [
          { category: 'Programmation', skill: 'JavaScript' },
          { category: 'Framework', skill: 'React' },
          { category: 'Backend', skill: 'Node.js' }
        ]
      }
    }
  },
  {
    email: 'amina.diallo@example.com',
    password: 'Password123!',
    username: 'amina_design',
    data: {
      language: 'fr',
      dateFormat: 'yyyy-mm-dd',
      personalInfo: {
        firstName: 'Amina',
        lastName: 'Diallo',
        passportId: 'PA987654',
        workPermit: 'WP123987',
        dob: '1995-07-20',
        placeOfBirth: 'Dakar',
        placeOfBirthCountry: 'Sénégal',
        gender: 'Female',
        nationality: 'Sénégalaise',
        email: 'amina.diallo@example.com',
        phone: '776543210',
        phoneCountryCode: '+221',
        addressType: 'Domicile',
        addressLine1: '45 Avenue de la Liberté',
        postalCode: '10000',
        city: 'Dakar',
        country: 'Sénégal'
      },
      workExperiences: [
        {
          jobTitle: 'Designer UX/UI',
          employer: 'CréaLab Studio',
          city: 'Dakar',
          country: 'Sénégal',
          fromDate: '2020-01-15',
          toDate: '',
          ongoing: true,
          mainActivities: 'Conception d’interfaces utilisateurs pour applications mobiles',
          moreDetails: 'Travail en collaboration avec les développeurs front-end'
        }
      ],
      educationTrainings: [
        {
          qualification: 'Licence en Design Graphique',
          organisation: 'École Supérieure Polytechnique',
          city: 'Dakar',
          country: 'Sénégal',
          fromDate: '2014-10-01',
          toDate: '2017-07-15',
          ongoing: false,
          moreDetails: 'Mention Bien'
        }
      ],
      personalSkills: {
        motherTongues: ['Français'],
        otherLanguages: [
          { language: 'Anglais', level: 'B1' }
        ],
        skills: [
          { category: 'Design', skill: 'Figma' },
          { category: 'Design', skill: 'Adobe XD' },
          { category: 'Communication', skill: 'Ateliers UX' }
        ]
      }
    }
  }
];

async function resetDatabase() {
  console.log('🗑 Suppression des profils...');
  const { error: profilesError } = await supabase.from('profiles').delete().neq('id', '');
  if (profilesError) {
    console.error('Erreur suppression profils:', profilesError);
  }

  console.log('🗑 Suppression des utilisateurs Auth...');
  const { data: allUsers } = await supabase.auth.admin.listUsers();
  for (const profile of profilesData) {
    const user = allUsers?.users?.find(u => u.email === profile.email);
    if (user) {
      const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);
      if (deleteError) {
        console.error(`Erreur suppression utilisateur ${profile.email}:`, deleteError);
      }
    }
  }
}

async function seedDatabase() {
  for (const profile of profilesData) {
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: profile.email,
      password: profile.password,
      email_confirm: true
    });

    if (authError) {
      console.error(`❌ Erreur création utilisateur ${profile.email}:`, authError);
      continue;
    }

    const userId = authData.user.id;

    const { error: insertError } = await supabase
      .from('profiles')
      .insert({
        user_id: userId,
        username: profile.username,
        data: profile.data
      });

    if (insertError) {
      console.error(`❌ Erreur insertion profil ${profile.username}:`, insertError);
    } else {
      console.log(`✅ Profil créé pour ${profile.username} (${profile.email})`);
    }
  }
}

(async () => {
  const mode = process.argv[2];

  if (mode === '--reset') {
    // 🔒 Sécurité : bloquer si prod
    if (NODE_ENV === 'production') {
      console.error('🚫 RESET interdit en production sans confirmation manuelle.');
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      rl.question('Tapez "CONFIRMER" pour continuer : ', async (answer) => {
        if (answer !== 'CONFIRMER') {
          console.log('❌ Opération annulée.');
          rl.close();
          process.exit(1);
        }
        rl.close();
        console.log('🔄 Mode RESET activé...');
        await resetDatabase();
        await seedDatabase();
        console.log('✅ Reset et seeding terminés.');
      });
    } else {
      console.log('🔄 Mode RESET activé...');
      await resetDatabase();
      await seedDatabase();
      console.log('✅ Reset et seeding terminés.');
    }
  } else {
    console.log('🚀 Mode SEED uniquement...');
    await seedDatabase();
    console.log('✅ Seeding terminé.');
  }
})();
