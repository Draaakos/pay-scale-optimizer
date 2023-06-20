
function formatNumber(number) {
  const formattedNumber = new Intl.NumberFormat("es-CL").format(number);
  return formattedNumber;
}


function adquisitiveText(adjusted, before) {
  const value = adjusted - before;

  return value > 0 ? `subio $${formatNumber(value.toFixed(0))}` : `bajo $${formatNumber(value.toFixed(0)) * -1}`;
}


const calculateSalary = (evt) => {
  evt.preventDefault();

  const beforeMonth = document.querySelector('#beforeMonth').value;
  const beforeYear = document.querySelector('#beforeYear').value;
  const beforeSalary = document.querySelector('#beforeSalary').value;

  const afterMonth = document.querySelector('#afterMonth').value;
  const afterYear = document.querySelector('#afterYear').value;
  const afterSalary = document.querySelector('#afterSalary').value;


  const beforeCoincidence = ipc.find(item => item.date == `${beforeMonth}.${beforeYear}`);
  const afterCoincidence = ipc.find(item => item.date == `${afterMonth}.${afterYear}`);


  const inflationRate = ((afterCoincidence.ipc - beforeCoincidence.ipc) / beforeCoincidence.ipc) * 100;
  const adjustedSalary = afterSalary / (1 + inflationRate / 100);

  const text = `Si comparamos tu sueldo de $${formatNumber(beforeSalary)} del ${beforeMonth} ${beforeYear} con el actual de $${formatNumber(afterSalary)} es equivalente $${formatNumber(adjustedSalary.toFixed(0))} en las fechas antes mencionadas, esto quiere decir que tu poder adquisitivo ${adquisitiveText(adjustedSalary, beforeSalary)}`;
  document.querySelector('#calculate').innerText = text;
}