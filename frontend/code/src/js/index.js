import 'bootstrap';

import '../scss/index.scss';

$('#connect_backend').on('click', () => {
  $.get("http://localhost:8001", (data, status) => {
    alert("Data from Server: " + data);
  });
});

// Your jQuery code
