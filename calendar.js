let currentDate = new Date(2025, 0, 1);

function updateSummary() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const counts = {
    'M': 0,
    'T': 0,
    'N': 0,
    'A': 0,
    'V': 0,
    'FL': 0,
    'B': 0,
    'PNR': 0,
    'LPF': 0,
    'VAA': 0
  };
  
  let weekendDays = 0;
  
  for (let day = 1; day <= 31; day++) {
    const date = new Date(year, month, day);
    if (date.getMonth() === month) {
      const fecha = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const turno = localStorage.getItem(fecha);
      
      const isWeekend = [0, 6].includes(date.getDay());
      if (isWeekend && turno && turno !== '' && turno !== 'V' && turno !== 'B' && turno !== 'LPF') {
        weekendDays++;
      }
      
      if (turno && counts.hasOwnProperty(turno)) {
        counts[turno]++;
      }
    }
  }
  
  document.getElementById('count-m').textContent = `Mañanas: ${counts['M']}`;
  document.getElementById('count-t').textContent = `Tardes: ${counts['T']}`;
  document.getElementById('count-n').textContent = `Noches: ${counts['N']}`;
  document.getElementById('count-a').textContent = `Adelantos: ${counts['A']}`;
  document.getElementById('count-v').textContent = `Vacaciones: ${counts['V']}`;
  document.getElementById('count-fl').textContent = `Flexibilidad: ${counts['FL']}`;
  document.getElementById('count-b').textContent = `Días de baja: ${counts['B']}`;
  document.getElementById('count-vaa').textContent = `Vacaciones año anterior: ${counts['VAA']}`;
  document.getElementById('weekend-days').textContent = `Días trabajados en fin de semana: ${weekendDays}`;
  
  const total = Object.entries(counts).reduce((sum, [key, count]) => {
    return (key !== 'B' && key !== 'LPF') ? sum + count : sum;
  }, 0);
  
  document.getElementById('count-total').textContent = `Total: ${total}`;
  
  let totalVacationDaysUsed = 0;
  for (let m = 0; m <= month; m++) {
    for (let day = 1; day <= 31; day++) {
      const fecha = `${year}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const turno = localStorage.getItem(fecha);
      if (turno === 'V') {
        totalVacationDaysUsed++;
      }
    }
  }
  const remainingVacationDays = 22 - totalVacationDaysUsed;
  document.getElementById('vacation-days').textContent = `Días de vacaciones restantes: ${remainingVacationDays}`;

  const annualSummary = document.getElementById('annual-summary');
  annualSummary.classList.toggle('visible', month === 11);
  if (month === 11) {
    calculateAnnualSummary();
  }
}

function calculateAnnualSummary() {
  const counts = {
    'M': 0,
    'T': 0,
    'N': 0,
    'A': 0,
    'V': 0,
    'FL': 0,
    'B': 0,
    'PNR': 0,
    'LPF': 0
  };
  
  let totalWeekendDays = 0;
  
  for (let month = 0; month < 12; month++) {
    for (let day = 1; day <= 31; day++) {
      const date = new Date(2025, month, day);
      if (date.getMonth() === month) {
        const fecha = `2025-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const turno = localStorage.getItem(fecha);
        
        const isWeekend = [0, 6].includes(date.getDay());
        if (isWeekend && turno && turno !== '' && turno !== 'V' && turno !== 'B' && turno !== 'LPF') {
          totalWeekendDays++;
        }
        
        if (turno && counts.hasOwnProperty(turno)) {
          counts[turno]++;
        }
      }
    }
  }
  
  document.getElementById('annual-m').textContent = `Mañanas: ${counts['M']}`;
  document.getElementById('annual-t').textContent = `Tardes: ${counts['T']}`;
  document.getElementById('annual-n').textContent = `Noches: ${counts['N']}`;
  document.getElementById('annual-a').textContent = `Adelantos: ${counts['A']}`;
  document.getElementById('annual-v').textContent = `Vacaciones: ${counts['V']}`;
  document.getElementById('annual-fl').textContent = `Flexibilidad: ${counts['FL']}`;
  document.getElementById('annual-b').textContent = `Total días de baja: ${counts['B']}`;
  document.getElementById('annual-weekend-days').textContent = `Total días trabajados en fin de semana: ${totalWeekendDays}`;
  
  const total = Object.entries(counts).reduce((sum, [key, count]) => {
    return (key !== 'B' && key !== 'LPF') ? sum + count : sum;
  }, 0);
  
  document.getElementById('annual-total').textContent = `Total días trabajados: ${total}`;
  document.getElementById('annual-vacation-days').textContent = `Total días vacaciones usados: ${counts['V']}`;
}

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const monthName = new Intl.DateTimeFormat('es-ES', {
    month: 'long',
    year: 'numeric'
  }).format(currentDate);
  document.getElementById('currentMonth').textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  const calendar = document.getElementById('calendar');
  calendar.innerHTML = '';
  const diasSemana = ['Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sab.', 'Dom.'];
  diasSemana.forEach(dia => {
    const header = document.createElement('div');
    header.className = 'day-header';
    header.textContent = dia;
    calendar.appendChild(header);
  });
  const mondayBasedDay = (firstDay.getDay() + 6) % 7;
  for (let i = 0; i < mondayBasedDay; i++) {
    calendar.appendChild(document.createElement('div'));
  }
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day);
    const dayEl = document.createElement('div');
    dayEl.className = 'day';
    const mondayBasedDayOfWeek = (date.getDay() + 6) % 7;
    if (mondayBasedDayOfWeek === 5 || mondayBasedDayOfWeek === 6) {
      dayEl.classList.add('weekend');
    } else {
      dayEl.classList.add('weekday');
    }
    const fecha = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const festivos2025 = ['2025-01-01', '2025-01-06', '2025-03-19', '2025-04-18', '2025-04-21', '2025-05-01', '2025-08-15', '2025-10-09', '2025-10-12', '2025-11-01', '2025-12-06', '2025-12-25'];
    const diasEspeciales = ['2025-03-18', '2025-12-24', '2025-12-31'];
    const diasNuevoEspeciales = ['2025-08-14', '2025-09-08'];
    const diasOctubre17 = ['2025-10-17'];
    if (festivos2025.includes(fecha)) {
      dayEl.classList.add('festivo');
    }
    if (diasEspeciales.includes(fecha)) {
      dayEl.classList.add('especial');
      const festivoText = document.createElement('div');
      festivoText.style.fontSize = '0.6rem';
      festivoText.style.fontWeight = 'bold';
      festivoText.textContent = 'Festivo Convenio';
      dayEl.appendChild(festivoText);
    }
    if (diasNuevoEspeciales.includes(fecha)) {
      dayEl.classList.add('nuevo-especial');
    }
    if (diasOctubre17.includes(fecha)) {
      dayEl.classList.add('october-17');
    }
    const savedTurno = localStorage.getItem(fecha) || '';
    if (diasOctubre17.includes(fecha) && month === 9) {
      const patronaText = document.createElement('div');
      patronaText.style.fontSize = '0.6rem';
      patronaText.style.fontWeight = 'bold';
      patronaText.textContent = 'Patrona';
      dayEl.appendChild(patronaText);
    }
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
    dayEl.innerHTML = `
      <div class="day-header">${day}</div>
      <div class="day-content ${savedTurno ? 'turno-' + savedTurno.toLowerCase() : ''}">
        <select class="turno-select" onchange="asignarTurno(this, '${fecha}')" style="background-color: ${savedTurno ? (savedTurno === 'M' ? 'var(--turno-m)' : savedTurno === 'T' ? 'var(--turno-t)' : savedTurno === 'N' ? 'var(--turno-n)' : savedTurno === 'A' ? 'var(--turno-a)' : savedTurno === 'V' ? 'var(--turno-v)' : savedTurno === 'F' ? 'var(--festivo)' : savedTurno === 'FL' ? 'var(--turno-fl)' : savedTurno === 'B' ? 'var(--turno-b)' : savedTurno === 'PNR' ? 'var(--turno-pnr)' : savedTurno === 'LPF' ? 'var(--turno-lpf)' : savedTurno === 'VAA' ? 'var(--turno-vaa)' : 'white') : 'white'}">
          <option value="" ${savedTurno === '' ? 'selected' : ''}>Descanso</option>
          <option value="M" ${savedTurno === 'M' ? 'selected' : ''}>Mañana</option>
          <option value="T" ${savedTurno === 'T' ? 'selected' : ''}>Tarde</option>
          <option value="N" ${savedTurno === 'N' ? 'selected' : ''}>Noche</option>
          <option value="A" ${savedTurno === 'A' ? 'selected' : ''}>Adelanto</option>
          <option value="V" ${savedTurno === 'V' ? 'selected' : ''}>Vacaciones</option>
          <option value="VAA" ${savedTurno === 'VAA' ? 'selected' : ''}>Vacaciones año anterior</option>
          <option value="F" ${savedTurno === 'F' ? 'selected' : ''}>Festivo</option>
          <option value="FL" ${savedTurno === 'FL' ? 'selected' : ''}>Flexibilidad</option>
          <option value="B" ${savedTurno === 'B' ? 'selected' : ''}>Baja</option>
          <option value="PNR" ${savedTurno === 'PNR' ? 'selected' : ''}>Permiso no retribuido</option>
          <option value="LPF" ${savedTurno === 'LPF' ? 'selected' : ''}>Libres por festivo</option>
        </select>
      </div>
    `;
    calendar.appendChild(dayEl);
  }
  const monthlyWorkDays = {
    0: {
      days: 21,
      hours: 168
    },
    1: {
      days: 20,
      hours: 160
    },
    2: {
      days: 19,
      hours: 152
    },
    3: {
      days: 20,
      hours: 160
    },
    4: {
      days: 21,
      hours: 168
    },
    5: {
      days: 21,
      hours: 168
    },
    6: {
      days: 23,
      hours: 184
    },
    7: {
      days: 19,
      hours: 152
    },
    8: {
      days: 21,
      hours: 168
    },
    9: {
      days: 21,
      hours: 168
    },
    10: {
      days: 20,
      hours: 160
    },
    11: {
      days: 19,
      hours: 152
    }
  };
  const workInfo = monthlyWorkDays[month];
  const workDaysInfo = document.getElementById('workDaysInfo');
  if (workInfo) {
    workDaysInfo.textContent = `Días laborables: ${workInfo.days} días ${workInfo.hours} Horas`;
  } else {
    workDaysInfo.textContent = '';
  }
  updateSummary();
}

function asignarTurno(select, fecha) {
  const turno = select.value;
  const dayContent = select.parentElement;
  dayContent.className = 'day-content';
  if (turno) {
    dayContent.classList.add(`turno-${turno.toLowerCase()}`);
  }
  select.style.backgroundColor = turno === 'M' ? 'var(--turno-m)' : 
    turno === 'T' ? 'var(--turno-t)' : 
    turno === 'N' ? 'var(--turno-n)' : 
    turno === 'A' ? 'var(--turno-a)' : 
    turno === 'V' ? 'var(--turno-v)' : 
    turno === 'F' ? 'var(--festivo)' : 
    turno === 'FL' ? 'var(--turno-fl)' : 
    turno === 'B' ? 'var(--turno-b)' : 
    turno === 'PNR' ? 'var(--turno-pnr)' : 
    turno === 'LPF' ? 'var(--turno-lpf)' : 
    turno === 'VAA' ? 'var(--turno-vaa)' : 
    'white';
  localStorage.setItem(fecha, turno);
  
  // Automatically save after each change
  saveCalendarData();
  
  // Show brief save confirmation
  const saveStatus = document.getElementById('saveStatus');
  saveStatus.classList.add('visible');
  setTimeout(() => {
    saveStatus.classList.remove('visible');
  }, 1000);
  
  updateSummary();
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

function saveCalendarData() {
  const calendarData = {};
  
  // Collect all data from localStorage related to calendar
  for (let month = 0; month < 12; month++) {
    for (let day = 1; day <= 31; day++) {
      const date = new Date(2025, month, day);
      if (date.getMonth() === month) { 
        const fecha = `2025-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const turno = localStorage.getItem(fecha);
        if (turno) {
          calendarData[fecha] = turno;
        }
      }
    }
  }

  // Save to localStorage as JSON
  localStorage.setItem('calendarData2025', JSON.stringify(calendarData));
  
  // Show save confirmation
  const saveStatus = document.getElementById('saveStatus');
  saveStatus.classList.add('visible');
  setTimeout(() => {
    saveStatus.classList.remove('visible');
  }, 2000);
}

function loadCalendarData() {
  const savedData = localStorage.getItem('calendarData2025');
  if (savedData) {
    const calendarData = JSON.parse(savedData);
    // Restore saved data to localStorage
    Object.entries(calendarData).forEach(([fecha, turno]) => {
      localStorage.setItem(fecha, turno);
    });
  }
}

// Initialize calendar when page loads
loadCalendarData();
renderCalendar();
