console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners();
  // load existing koalas on page load
  getKoalas();
}); // end doc ready

function setupClickListeners() {
  $("#searchKoalaBtn").on("click", searchKoala);
  $('#viewKoalas').on('click', '.btn-delete', deleteKoala);
  $('#viewKoalas').on(
    'click',
    '.btn-transfer',
    transferKoala
  );
  $('#addButton').on('click', function () {
    console.log('in addButton on click');
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      transfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala(koalaToSend);
  });
}

function searchKoala() {
  let value = $('#koalaSearchBox').val().toLowerCase();
  console.log(value);
  $("#viewKoalas").filter(function() {
    console.log(value);
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
}

function getKoalas() {
  console.log('in getKoalas');
  $.ajax({
    method: 'GET',
    url: '/koala',
  })
    .then(function (response) {
      renderKoala(response);
    })
    .catch(function (error) {
      console.log('error in GET', error);
    });
} // end getKoalas

function saveKoala(newKoala) {
  console.log('in saveKoala', newKoala);
  // ajax call to server to get koalas
  $.ajax({
    method: 'POST',
    url: '/koala',
    data: newKoala,
  })
    .then(function (response) {
      getKoalas();
    })
    .catch(function (error) {
      console.log('Error in POST', error);
      alert(
        'Unable to add koala at this time. Please try again later.'
      );
    });
}

function renderKoala(koalas) {
  $('#viewKoalas').empty();
  for (let i = 0; i < koalas.length; i += 1) {
    let koala = koalas[i];
    // For each koala, append a new row to our table
    let $tr = $(`<tr data-id='${koala.id}'</tr>`);
    $tr.data('koala', koala);
    $tr.append(
      `<td class="name" data-name='${koala.name}'>${koala.name}</td>`
    );
    $tr.append(`<td class="age">${koala.age}</td>`);
    $tr.append(`<td class="gender">${koala.gender}</td>`);
    $tr.append(
      `<td class="transfer" data-transfer='${koala.transfer}'>${koala.transfer}</td>`
    );
    $tr.append(`<td class="notes">${koala.notes}</td>`);
    $tr.append(
      `<td class="td-transfer"><button class='btn-transfer'>Mark For Transfer</button></td>`
    );
    $tr.append(
      `<td class="td-delete"><button class='btn-delete'>Delete</button></td>`
    );
    $('#viewKoalas').append($tr);
  }
}

function deleteKoala() {
  console.log('Deleting koala...');
  let koalaId = $(this).closest('tr').data('id');
  swal(
    'Confirm',
    'Are you sure you want to get rid of this koala?',
    'warning'
  ).then((isConfirm) => {
    if (isConfirm) {
      $.ajax({
        method: 'DELETE',
        url: `/koala/${koalaId}`, //add id to the url
      })
        .then(function (response) {
          getKoalas();
        })
        .catch(function (error) {
          console.log('Error:', error);
          alert('Something bad happened. Try again later');
        });
    } else {
      sweetAlert('Oops!', 'Something went wrong.', 'Error');
    }
  });
}

function transferKoala() {
  let id = $(this).closest('tr').data('id');
  let koalaTransfer = $(this).closest('tr').data('koala');
  console.log(koalaTransfer.transfer, id);
  $.ajax({
    method: 'PUT',
    url: `koala/${id}`,
    data: koalaTransfer,
  })
    .then(function (response) {
      getKoalas();
    })
    .catch(function (error) {
      console.error('Error:', error);
    });
}
