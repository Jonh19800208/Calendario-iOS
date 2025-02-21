// Constants and data
const festivos2025 = ['2025-01-01', '2025-01-06', '2025-03-19', '2025-04-18', '2025-04-21', '2025-05-01', '2025-08-15', '2025-10-09', '2025-10-12', '2025-11-01', '2025-12-06', '2025-12-25'];
const diasEspeciales = ['2025-03-18', '2025-12-24', '2025-12-31'];
const diasNuevoEspeciales = ['2025-08-14', '2025-09-08'];
const diasOctubre17 = ['2025-10-17'];

const turnosText = {
  '': 'Descanso',
  'M': 'Mañana',
  'T': 'Tarde',
  'N': 'Noche',
  'A': 'Adelanto',
  'V': 'Vacaciones',
  'F': 'Festivo',
  'FL': 'Flexibilidad',
  'B': 'Baja',
  'PNR': 'Permiso no retribuido',
  'LPF': 'Libres por festivo',
  'VAA': 'Vacaciones año anterior'
};

const diasSemana = ['Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sab.', 'Dom.'];

const monthlyWorkDays = {
  0: { days: 21, hours: 168 },
  1: { days: 20, hours: 160 },
  2: { days: 19, hours: 152 },
  3: { days: 20, hours: 160 },
  4: { days: 21, hours: 168 },
  5: { days: 21, hours: 168 },
  6: { days: 23, hours: 184 },
  7: { days: 19, hours: 152 },
  8: { days: 21, hours: 168 },
  9: { days: 21, hours: 168 },
  10: { days: 20, hours: 160 },
  11: { days: 19, hours: 152 }
};

function getTurnoColor(turno) {
  const colors = {
    '': 'white',
    'M': 'var(--turno-m)',
    'T': 'var(--turno-t)',
    'N': 'var(--turno-n)',
    'A': 'var(--turno-a)',
    'V': 'var(--turno-v)',
    'F': 'var(--festivo)',
    'FL': 'var(--turno-fl)',
    'B': 'var(--turno-b)',
    'PNR': 'var(--turno-pnr)',
    'LPF': 'var(--turno-lpf)',
    'VAA': 'var(--turno-vaa)'
  };
  return colors[turno] || 'white';
}
