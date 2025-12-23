import { PrismaClient, InfractionSeverity } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const infractions = [
    {
      code: 'SPD_20',
      description: 'Excesso de velocidade até 20%',
      severity: InfractionSeverity.MEDIA,
      points: 4,
      fineAmount: 130.16,
      autoSuspend: false,
    },
    {
      code: 'SPD_50',
      description: 'Excesso de velocidade entre 20% e 50%',
      severity: InfractionSeverity.GRAVE,
      points: 5,
      fineAmount: 195.23,
      autoSuspend: false,
    },
    {
      code: 'SPD_50_PLUS',
      description: 'Excesso de velocidade acima de 50%',
      severity: InfractionSeverity.GRAVISSIMA,
      points: 7,
      fineAmount: 880.41,
      autoSuspend: true,
    },
    {
      code: 'ALC',
      description: 'Dirigir sob efeito de álcool',
      severity: InfractionSeverity.GRAVISSIMA,
      points: 7,
      fineAmount: 2934.70,
      autoSuspend: true,
    },
  ];

  for (const infraction of infractions) {
    await prisma.infractionType.upsert({
      where: { code: infraction.code },
      update: {},
      create: infraction,
    });
  }

  console.log('✅ Infractions seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
