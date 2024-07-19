function convertToMinutes (time) {
  const [hour, minutes] = time.split(':');
  const minutesInOneHour = 60;

  return parseInt(hour, 10) * minutesInOneHour + parseInt(minutes, 10);
}

function checkMeeting(dayStart, dayEnd, meetingStart, meetingDuration) {
  const dayStartInMinutes = convertToMinutes(dayStart);
  const dayEndInMinutes = convertToMinutes(dayEnd);
  const meetingStartInMinutes = convertToMinutes(meetingStart);

  return meetingStartInMinutes >= dayStartInMinutes &&
  meetingStartInMinutes + meetingDuration <= dayEndInMinutes;
}

checkMeeting('08:00', '17:30', '14:00', 90);
//console.log(checkMeeting('08:00', '17:30', '14:00', 90)); // true
//console.log(checkMeeting('8:0', '10:0', '8:0', 120));     // true
//console.log(checkMeeting('08:00', '14:30', '14:00', 90)); // false
//console.log(checkMeeting('14:00', '17:30', '08:0', 90));  // false
//console.log(checkMeeting('8:00', '17:30', '08:00', 900)); // false
