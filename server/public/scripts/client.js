console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();
}); // end doc ready

function setupClickListeners() {
  $('#addButton').on('click', function () {
    console.log('in addButton on click');
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      readyForTransfer: 'testName',
      notes: 'testName',
    };
    // call saveKoala with the new obejct
    saveKoala(koalaToSend);
    renderKoala(koalaToSend);
  });
}

function getKoalas() {
  console.log('in getKoalas');
  $.ajax({
    method: 'GET',
    url: '/koala'
  }).then(function (response) {
    renderKoala();
  }).catch(function (error) {
    console.log('error in GET', error);
  });

} // end getKoalas

function saveKoala(newKoala) {
  console.log('in saveKoala', newKoala);
  // ajax call to server to get koalas
  $.ajax({
    method: 'POST',
    url: '/koala',
    data: newKoala
  }).then(function (response) {
    getKoalas();
  }).catch(function (error) {
    console.log('Error in POST', error);
    alert('Unable to add koala at this time. Please try again later.');
  });

}

function renderKoala(koalas) {
  $('#viewKoalas').empty();
  for (let i = 0; i < koalas.length; i += 1) {
    let koala = koalas[i];
    // For each koala, append a new row to our table
    let $tr = $(`<tr data-id='${koala.id}'</tr>`);
    $tr.data('koala', koala);
    $tr.append(`<td data-name='${koala.name}'>${koala.name}</td>`);
    $tr.append(`<td data-transfer='${koala.transfer}'>${koala.transfer}</td>`);
    $tr.append(`<td><button class='btn-delete'>Delete</button></td>`)
    $tr.append(`<td><button class='btn-transfer'>Make For Transfer</button></td>`)
    $('#viewKoalas').append($tr);
  }
}


function deleteKoala() {
  console.log('Deleting song...');
  let koalaId = $(this).closest('tr').data('id');
  $.ajax({
    method: 'DELETE',
    url: `/koala/${koalaId}` //add id to the url
  }).then(function (response) {
    //getKoalas();
  }).catch(function (error) {
    console.log('Error:', error);
    alert('Something bad happened. Try again later');
  })
}

function transferKoala() {
  $.ajax({
    method: 'PUT',
    url: `koala/${id}`,
  }).then(function (response) {
    //refreshKoala();
  }).catch(function (error) {
    console.error('Error:', error);
  })
}