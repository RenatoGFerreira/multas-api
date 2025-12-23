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
    {
      code: 'RED',
      description: 'Avançar Sinal Vermelho',
      severity: InfractionSeverity.GRAVISSIMA,
      points: 7,
      fineAmount: 293.47,
      autoSuspend: false,
    },
    {
      code: 'CEL',
      description: 'Uso de celular ao volante',
      severity: InfractionSeverity.MEDIA,
      points: 4,
      fineAmount: 130.16,
      autoSuspend: false,
    },
    {
      code: 'SEAT',
      description: 'Não usar cinto de segurança',
      severity: InfractionSeverity.GRAVE,
      points: 5,
      fineAmount: 195.23,
      autoSuspend: false
    },
    {
      code: 'HELM',
      description: 'Conduzir motocicleta sem capacete',
      severity: InfractionSeverity.GRAVISSIMA,
      points: 7,
      fineAmount: 293.47,
      autoSuspend: false,
    },
    {
      code: 'PARK',
      description: 'Estacionamento irregular',
      severity: InfractionSeverity.LEVE,
      points: 3,
      fineAmount: 88.38,
      autoSuspend: false,
    },
    {
      code: 'LIGHT',
      description: 'Trafegar com farol desligado durante a noite',
      severity: InfractionSeverity.LEVE,
      points: 3,
      fineAmount: 88.38,
      autoSuspend: false,
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
