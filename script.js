const reminders = {};

const calendarDays = document.getElementById('calendar-days');
const monthYear = document.getElementById('month-year');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const reminderDate = document.getElementById('reminder-date');
const reminderText = document.getElementById('reminder-text');
const addReminderBtn = document.getElementById('add-reminder');

let currentDate = new Date();

function renderCalendar() {
    let startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    let endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    let date = startDate;
    let html = '';

    while (date <= endDate) {
        let dateHtml = '<div class="calendar-date">';
        if (date.toDateString() === new Date().toDateString()) {
            dateHtml += '<div class="today">';
        } else {
            dateHtml += '<div>';
        }

        if (reminders[date.toDateString()]) {
            dateHtml += `<div class="reminder" id="${date.toDateString()}" onclick="displayReminder(this)">${date.getDate()}</div>`;
        } else {
            dateHtml += `<div id="${date.toDateString()}" onclick="displayReminder(this)">${date.getDate()}</div>`;
        }

        dateHtml += '</div></div>';
        html += dateHtml;
        date.setDate(date.getDate() + 1);
    }

    calendarDays.innerHTML = html;
    monthYear.textContent = currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' });
}

function addReminder() {
    let date = new Date(reminderDate.value);
    let text = reminderText.value;

    if (!date || !text) {
        alert('Введите дату и текст напоминания');
        return;
    }

    reminders[date.toDateString()] = text;
    renderCalendar();
}

function displayReminder(day) {
    const reminderText = reminders[day.id];
    if (reminderText) {
        alert(`Напоминание на ${day.id}:\n\n${reminderText}`);
    }
}

function removeReminder(day) {
    delete reminders[day.id];
    renderCalendar();
}

calendarDays.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('reminder')) {
        if (confirm('Вы уверены, что хотите удалить это напоминание?')) {
            removeReminder(target);
        }
    }
});

prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

addReminderBtn.addEventListener('click', addReminder);

renderCalendar();